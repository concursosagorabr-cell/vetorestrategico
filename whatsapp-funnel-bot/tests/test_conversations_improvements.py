import pytest
import os
import sys

# Adiciona o diretório do bot ao sys.path para importação dos módulos
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.core.name_cleaner import (
    clean_human_name,
    extract_speaker_name,
    extract_location_update,
    detect_auto_reply
)
from src.core.llm_classifier import LLMClassifier
from src.core.niche_presets import get_niche_preset, NICHE_PRESETS


def test_extract_speaker_name_real_conversations():
    """Valida extração de nomes em mensagens reais de leads."""
    msg1 = "Olá, tudo bem? 😊\nSou a Giovanna da DS Clinic.\nQual o seu nome por favor?🤍"
    assert extract_speaker_name(msg1) == "Giovanna"

    msg2 = "Ola, boa tarde. Trabalhamos sim. Qual o seu nome, por favor?"
    # Aqui não tem auto-apresentação do lead, apenas pergunta o nome do interlocutor
    assert extract_speaker_name(msg2) is None

    msg3 = "Olá! Me chamo Beatriz, sou da recepção"
    assert extract_speaker_name(msg3) == "Beatriz"

    msg4 = "Aqui é a Dra. Fabiana, pode falar"
    assert extract_speaker_name(msg4) == "Dra. Fabiana"

    msg5 = "Sou o Dr. Carlos da clínica"
    assert extract_speaker_name(msg5) == "Dr. Carlos"

    msg6 = "Giovanna falando, em que posso ajudar?"
    assert extract_speaker_name(msg6) == "Giovanna"


def test_extract_location_update():
    """Valida detecção quando o lead informa/corrige sua localização."""
    loc1 = "Nós estamos localizadas na Penha"
    assert extract_location_update(loc1) == "Penha"

    loc2 = "Estamos localizados no Tatuapé"
    assert extract_location_update(loc2) == "Tatuapé"

    loc3 = "Nossa clínica fica em Mogi das Cruzes"
    assert extract_location_update(loc3) == "Mogi das Cruzes"

    loc4 = "Atendemos na Penha - SP"
    assert extract_location_update(loc4) == "Penha"

    loc5 = "Somos de Suzano"
    assert extract_location_update(loc5) == "Suzano"

    loc6 = "Trabalhamos sim. Qual o seu nome?"
    assert extract_location_update(loc6) is None


@pytest.mark.asyncio
async def test_llm_classifier_heuristic_portfolio_intent():
    """Valida classificação da solicitação de portfólio / Instagram / referências."""
    classifier = LLMClassifier(provider="heuristic")

    msg_portfolio1 = "Antes me mande alguns Instagrans de páginas de administram"
    res1 = classifier._heuristic_fallback(msg_portfolio1, step_number=2, contact_name="Beatriz")
    assert res1["classification"] == "objection_portfolio"

    msg_portfolio2 = "Vocês têm exemplos de sites que já criaram?"
    res2 = classifier._heuristic_fallback(msg_portfolio2, step_number=2, contact_name="Beatriz")
    assert res2["classification"] == "objection_portfolio"

    msg_portfolio3 = "Tem algum portfólio para eu ver?"
    res3 = classifier._heuristic_fallback(msg_portfolio3, step_number=2, contact_name="Beatriz")
    assert res3["classification"] == "objection_portfolio"


@pytest.mark.asyncio
async def test_llm_classifier_heuristic_price_and_hosting_details():
    """Valida classificação de dúvidas específicas sobre o que está incluso e hospedagem."""
    classifier = LLMClassifier(provider="heuristic")

    msg_included = "O que está incluído nesse valor?"
    res_inc = classifier._heuristic_fallback(msg_included, step_number=2, contact_name="Beatriz")
    assert res_inc["classification"] == "ask_whats_included"

    msg_hosting = "Esse valor já com a hospedagem incluída?"
    res_host = classifier._heuristic_fallback(msg_hosting, step_number=2, contact_name="Beatriz")
    assert res_host["classification"] == "ask_hosting"

    msg_hosting2 = "A hospedagem já tá inclusa nos 97?"
    res_host2 = classifier._heuristic_fallback(msg_hosting2, step_number=2, contact_name="Beatriz")
    assert res_host2["classification"] == "ask_hosting"

    msg_hosting3 = "A hospedagem já tá inclusa nos 147?"
    res_host3 = classifier._heuristic_fallback(msg_hosting3, step_number=2, contact_name="Beatriz")
    assert res_host3["classification"] == "ask_hosting"


@pytest.mark.asyncio
async def test_llm_classifier_heuristic_bot_objection():
    """Valida detecção de quando o lead reclama de automação/robô."""
    classifier = LLMClassifier(provider="heuristic")

    msg_bot = "Gostaria de falar com uma pessoa, não com mensagem automática"
    res_bot = classifier._heuristic_fallback(msg_bot, step_number=2, contact_name="Beatriz")
    assert res_bot["classification"] == "objection_bot"

    msg_bot2 = "Isso é robô ou humano?"
    res_bot2 = classifier._heuristic_fallback(msg_bot2, step_number=2, contact_name="Beatriz")
    assert res_bot2["classification"] == "objection_bot"


@pytest.mark.asyncio
async def test_llm_classifier_heuristic_step1_affirmative_with_question():
    """Valida confirmação no passo 1 mesmo quando o lead pergunta o nome ou é cordial."""
    classifier = LLMClassifier(provider="heuristic")

    msg_sim_nome = "Ola, boa tarde. Trabalhamos sim. Qual o seu nome, por favor?"
    res = classifier._heuristic_fallback(msg_sim_nome, step_number=1, contact_name="Beatriz")
    assert res["classification"] == "yes"
    assert res["action"] == "advance_step"
    assert res["next_step"] == 2


def test_niche_presets_have_portfolio_and_details_responses():
    """Valida que todos os nichos contêm respostas estruturadas para portfólio, inclusões, hospedagem e bot."""
    for niche_key, preset in NICHE_PRESETS.items():
        assert preset["price_default"] == "R$ 147/mês", f"Preço padrão incorreto no nicho {niche_key}"
        step2 = preset["steps"][1]
        assert "on_objection_portfolio" in step2, f"Falta on_objection_portfolio no nicho {niche_key}"
        assert "on_ask_whats_included" in step2, f"Falta on_ask_whats_included no nicho {niche_key}"
        assert "on_ask_hosting" in step2, f"Falta on_ask_hosting no nicho {niche_key}"
        assert "on_objection_bot" in step2, f"Falta on_objection_bot no nicho {niche_key}"

        # Verifica conteúdo essencial da resposta de portfólio solicitada pelo usuário
        assert step2["on_objection_portfolio"].get("media_path") == "assets/concursosagora-analytics.png"
        portfolio_msg = step2["on_objection_portfolio"]["message"]
        assert "concursosagora.com.br" in portfolio_msg
        assert "2mil" in portfolio_msg or "2 mil" in portfolio_msg or "2.000" in portfolio_msg
        assert "Next.js" in portfolio_msg
        assert "Google Analytics" in portfolio_msg or "google analitytics" in portfolio_msg.lower()
        assert "fidelidade" in portfolio_msg.lower()


def test_format_message_company_and_price_variables():
    """Valida variáveis da empresa e preço R$ 147/mês na formatação."""
    from src.core.funnel_engine import FunnelEngine
    from src.database.models import Contact, Campaign

    engine = FunnelEngine.__new__(FunnelEngine)
    contact = Contact(name="Giovanna", phone="5511999999999", custom_data={})
    campaign = Campaign(name="Teste", settings={})

    template = "Olá {name}, sou {sender_name} da {company_name} ({company_website}). Nosso plano é {price}."
    formatted = engine._format_message(template, contact, campaign)
    assert "Giovanna" in formatted
    assert "Marco Antonio" in formatted
    assert "Vetor Estratégico" in formatted
    assert "www.vetorestrategico.com" in formatted
    assert "R$ 147/mês" in formatted


@pytest.mark.asyncio
async def test_funnel_sends_proof_image_on_portfolio_request(db_session, mock_evolution, mock_classifier):
    """Valida que o bot envia a imagem de prova do Vercel/Google Analytics quando o lead pede portfólio."""
    from src.core.funnel_engine import FunnelEngine

    campaign_data = {
        "name": "Campanha Estética com Imagem",
        "contacts": [
            {
                "name": "Dra. Cintia",
                "phone": "5511983938258",
                "service": "estética",
                "city": "Ferraz de Vasconcelos"
            }
        ],
        "settings": {
            "delay_between_contacts_seconds": 0
        }
    }
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign = await engine.create_campaign(campaign_data)
    await engine.start_campaign(campaign.id)

    # Avança para Step 2
    mock_classifier.classify_response.return_value = "yes"
    await engine.handle_incoming_message("5511983938258", "Trabalhamos sim!", campaign.id)

    mock_evolution.reset_mock()

    # Lead pede exemplos / portfólio de páginas que geraram acessos
    await engine.handle_incoming_message(
        "5511983938258",
        "Antes me mande alguns Instagrans de páginas de administram",
        campaign.id
    )

    # Verifica se chamou send_media_message com a imagem de prova e o texto explicativo
    assert mock_evolution.send_media_message.call_count == 1
    call_kwargs = mock_evolution.send_media_message.call_args.kwargs
    if not call_kwargs and mock_evolution.send_media_message.call_args.args:
        # Se passado por argumentos posicionais
        args = mock_evolution.send_media_message.call_args.args
        phone_arg = args[0]
        media_arg = args[1]
        caption_arg = mock_evolution.send_media_message.call_args.kwargs.get("caption") or (args[2] if len(args) > 2 else "")
    else:
        phone_arg = call_kwargs.get("phone")
        media_arg = call_kwargs.get("media_path_or_url")
        caption_arg = call_kwargs.get("caption")

    assert phone_arg == "5511983938258"
    assert "concursosagora-analytics.png" in media_arg
    assert "concursosagora.com.br" in caption_arg
    assert "2mil" in caption_arg or "2 mil" in caption_arg or "2.000" in caption_arg

