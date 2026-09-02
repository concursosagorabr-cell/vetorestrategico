import pytest
import pytest_asyncio
import uuid
from datetime import datetime
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from unittest.mock import AsyncMock, MagicMock

from src.database.models import Base, Campaign, Contact, Message
from src.core.funnel_engine import FunnelEngine
from src.core.evolution_client import EvolutionClient
from src.core.llm_classifier import LLMClassifier


@pytest_asyncio.fixture
async def db_session():
    engine = create_async_engine('sqlite+aiosqlite:///:memory:', echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with session_factory() as session:
        yield session
    
    await engine.dispose()


@pytest.fixture
def mock_evolution():
    evo = MagicMock(spec=EvolutionClient)
    evo.send_text_message = AsyncMock(return_value=True)
    return evo


@pytest.fixture
def mock_classifier():
    classifier = MagicMock(spec=LLMClassifier)
    classifier.classify_response = AsyncMock(return_value='yes')

    async def fake_decide(lead_message="", bot_last_message="", step_number=1, contact_info=None, step_config=None, conversation_history=None):
        # Heurística base
        h = LLMClassifier._heuristic_fallback(None, lead_message, step_number)
        
        # Se o teste explicitamente alterou classifier.classify_response.return_value
        if classifier.classify_response.return_value != 'yes':
            intent = classifier.classify_response.return_value
        else:
            intent = h.get('intent', 'yes')

        action = "advance_step" if intent == "yes" else "end_negative" if intent == "no" else "handle_objection" if intent.startswith("objection_") else "repeat_step"
        next_step = 2 if (intent == "yes" and step_number == 1) else "end_positive" if intent == "yes" else "end_negative" if intent == "no" else 3 if intent == "objection_social_media" else 4 if intent == "objection_budget" else 5 if intent == "objection_has_website" else step_number
        return {
            "intent": intent,
            "action": action,
            "next_step": next_step,
            "reasoning": "Mock/Heuristic Decision"
        }

    classifier.decide_step_action = AsyncMock(side_effect=fake_decide)
    return classifier


@pytest.fixture
def sales_campaign_data():
    return {
        'campaign_name': 'Prospeccao Sites Alta Performance - Ferraz de Vasconcelos',
        'contacts': [
            {
                'name': 'Dr. Carlos - Odonto',
                'phone': '5511999990001',
                'service': 'Implantes Dentarios',
                'city': 'Ferraz de Vasconcelos'
            },
            {
                'name': 'Oficina do Marcos',
                'phone': '5511999990002',
                'service': 'Cambio Automatico',
                'city': 'Ferraz de Vasconcelos'
            }
        ],
        'script': [
            {
                'step': 1,
                'name': 'Topo de Funil - Isca',
                'message': 'Oi, bom dia! Sou aqui de {city}. Vocês ainda trabalham com {service}?',
                'wait_for_reply': True,
                'timeout_hours': 24,
                'on_yes': {
                    'next_step': 2
                },
                'on_no': {
                    'next_step': 'end_negative',
                    'message': 'Entendido! Muito obrigado pela atenção e um ótimo dia.'
                },
                'on_doubt': {
                    'next_step': 1,
                    'message': 'Oi! Sou morador aqui de {city} e pesquiso empresas de {service}. Vocês realizam esse atendimento?'
                }
            },
            {
                'step': 2,
                'name': 'Meio de Funil - Pitch 24h',
                'message': 'Maravilha. O motivo da pergunta é que notei que vocês estão sem site no Google e estão perdendo clientes por isso. Eu crio sites de alta performance para o seu segmento e topo desenhar a página da sua empresa de graça. Em 24 horas te mando o link do site funcionando.\n\nSe você gostar do resultado, fechamos apenas a manutenção de R$ 147/mês. Sem contrato de fidelidade e risco zero. Se não quiser ficar com o site, não me paga nada. Posso começar o seu esboço para te mostrar amanhã?',
                'wait_for_reply': True,
                'timeout_hours': 24,
                'on_yes': {
                    'next_step': 'end_positive',
                    'message': 'Perfeito, {name}! Já dei início ao desenho da página de alta performance da sua empresa. Em até 24 horas te envio o link exclusivo por aqui para você testar. Muito obrigado!'
                },
                'on_no': {
                    'next_step': 'end_negative',
                    'message': 'Sem problemas, {name}! Agradeço muito pelo seu tempo. Se um dia quiser aumentar suas vendas no Google, estou à disposição. Abraços!'
                },
                'on_objection_social_media': {
                    'next_step': 3,
                    'message': 'O Instagram é ótimo como vitrine, mas quem pesquisa {service} em {city} no Google está com o problema na mão, querendo fechar na hora. O site não concorre com sua rede social, ele pesca o cliente que tem urgência. Posso montar o esboço sem custo para você ver a diferença?'
                },
                'on_objection_budget': {
                    'next_step': 4,
                    'message': 'Exatamente por isso eu assumo 100% do risco. Crio o design inicial sem te cobrar um centavo. Você só paga a manutenção se colocar no ar. Um único cliente novo que o Google te trouxer já paga essa taxa de R$ 147 com folga. Posso começar o esboço de graça hoje?'
                },
                'on_objection_has_website': {
                    'next_step': 5,
                    'message': 'Eu dei uma olhada e notei que ele demora alguns segundos para carregar no 3G/4G. O Google pune sites lentos não recomendando a página. Eu crio uma versão muito mais rápida. A gente joga os dois no PageSpeed Insights (a ferramenta oficial do Google). Se o meu não for visivelmente mais rápido e com nota maior, não fechamos negócio. Topa fazer esse teste sem custo?'
                }
            },
            {
                'step': 3,
                'name': 'Tratativa Objeção 1 - Redes Sociais',
                'wait_for_reply': True,
                'timeout_hours': 24,
                'on_yes': {
                    'next_step': 'end_positive',
                    'message': 'Maravilha, {name}! Vou estruturar a página do seu negócio e em 24h te envio o link funcionando.'
                },
                'on_no': {
                    'next_step': 'end_negative',
                    'message': 'Compreendo perfeitamente, {name}! Muito obrigado pela atenção e sucesso nas vendas!'
                }
            },
            {
                'step': 4,
                'name': 'Tratativa Objeção 2 - Orçamento',
                'wait_for_reply': True,
                'timeout_hours': 24,
                'on_yes': {
                    'next_step': 'end_positive',
                    'message': 'Excelente, {name}! Já vou colocar a mão na massa no seu esboço gratuito. Em 24h te mando o link por aqui!'
                },
                'on_no': {
                    'next_step': 'end_negative',
                    'message': 'Tudo bem, {name}! Obrigado pela atenção e sucesso com o negócio!'
                }
            },
            {
                'step': 5,
                'name': 'Tratativa Objeção 3 - Já possui site',
                'wait_for_reply': True,
                'timeout_hours': 24,
                'on_yes': {
                    'next_step': 'end_positive',
                    'message': 'Fechado, {name}! Vou criar uma versão ultra-rápida e em 24h te envio com o teste comparativo do Google. Até amanhã!'
                },
                'on_no': {
                    'next_step': 'end_negative',
                    'message': 'Combinado, {name}! Muito obrigado e parabéns pelo site atual.'
                }
            }
        ],
        'settings': {
            'delay_between_contacts_seconds': 0,
            'default_city': 'Ferraz de Vasconcelos',
            'default_service': 'Serviços Especializados'
        }
    }


@pytest.mark.asyncio
async def test_create_campaign_and_variable_formatting(db_session, mock_evolution, mock_classifier, sales_campaign_data):
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign = await engine.create_campaign(sales_campaign_data)
    
    assert campaign.name == sales_campaign_data['campaign_name']
    assert campaign.total_contacts == 2

    # Start campaign to send Step 1
    await engine.start_campaign(campaign.id)
    
    assert mock_evolution.send_text_message.call_count == 2
    
    # Check first message formatting
    call_args_1 = mock_evolution.send_text_message.call_args_list[0]
    phone_1, msg_1 = call_args_1[0]
    assert phone_1 == '5511999990001'
    assert 'Sou aqui de Ferraz de Vasconcelos' in msg_1
    assert 'Implantes Dentarios' in msg_1


@pytest.mark.asyncio
async def test_funnel_step1_yes_transitions_to_step2_pitch(db_session, mock_evolution, mock_classifier, sales_campaign_data):
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign = await engine.create_campaign(sales_campaign_data)
    await engine.start_campaign(campaign.id)
    
    mock_evolution.send_text_message.reset_mock()
    mock_classifier.classify_response.return_value = 'yes'
    
    # Lead answers 'Sim, trabalhamos sim' to Step 1
    await engine.handle_incoming_message('5511999990001', 'Sim, fazemos implantes aqui sim!', campaign.id)
    
    # Step 2 Pitch message should be sent
    assert mock_evolution.send_text_message.call_count == 1
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert phone == '5511999990001'
    assert 'estão sem site no Google' in msg
    assert 'R$ 147/mês' in msg


@pytest.mark.asyncio
async def test_funnel_step2_pitch_yes_ends_positive(db_session, mock_evolution, mock_classifier, sales_campaign_data):
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign = await engine.create_campaign(sales_campaign_data)
    await engine.start_campaign(campaign.id)
    
    # Advance to Step 2
    mock_classifier.classify_response.return_value = 'yes'
    await engine.handle_incoming_message('5511999990001', 'Sim, fazemos!', campaign.id)
    
    mock_evolution.send_text_message.reset_mock()
    
    # Lead responds positively to Pitch: 'Pode mandar!'
    mock_classifier.classify_response.return_value = 'yes'
    await engine.handle_incoming_message('5511999990001', 'Pode mandar, quero ver o esboço', campaign.id)
    
    # Confirmation message sent & contact marked positive
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert 'Dr. Carlos' in msg
    assert 'Em até 24 horas te envio o link' in msg
    
    report = await engine.get_report(campaign.id)
    assert report['positive'] == 1
    assert report['positive_list'][0]['phone'] == '5511999990001'


@pytest.mark.asyncio
async def test_funnel_objection_social_media_flow(db_session, mock_evolution, mock_classifier, sales_campaign_data):
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign = await engine.create_campaign(sales_campaign_data)
    await engine.start_campaign(campaign.id)
    
    # Lead confirms step 1 -> goes to step 2
    mock_classifier.classify_response.return_value = 'yes'
    await engine.handle_incoming_message('5511999990001', 'Sim, fazemos!', campaign.id)
    
    mock_evolution.send_text_message.reset_mock()
    
    # Lead gives objection 1: 'Já uso Instagram e WhatsApp'
    mock_classifier.classify_response.return_value = 'objection_social_media'
    await engine.handle_incoming_message('5511999990001', 'Já usamos bastante o Instagram e WhatsApp, não precisamos de site', campaign.id)
    
    # Objection message 1 sent
    assert mock_evolution.send_text_message.call_count == 1
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert 'Instagram é ótimo como vitrine' in msg
    assert 'Implantes Dentarios' in msg
    assert 'Ferraz de Vasconcelos' in msg
    
    mock_evolution.send_text_message.reset_mock()
    
    # Lead accepts after objection
    mock_classifier.classify_response.return_value = 'yes'
    await engine.handle_incoming_message('5511999990001', 'Entendi, faz sentido. Pode montar o esboço para eu ver!', campaign.id)
    
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert 'Vou estruturar a página do seu negócio' in msg
    
    report = await engine.get_report(campaign.id)
    assert report['positive'] == 1


@pytest.mark.asyncio
async def test_funnel_objection_budget_flow(db_session, mock_evolution, mock_classifier, sales_campaign_data):
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign = await engine.create_campaign(sales_campaign_data)
    await engine.start_campaign(campaign.id)
    
    # Step 1 -> Step 2
    mock_classifier.classify_response.return_value = 'yes'
    await engine.handle_incoming_message('5511999990002', 'Sim!', campaign.id)
    
    mock_evolution.send_text_message.reset_mock()
    
    # Objection budget
    mock_classifier.classify_response.return_value = 'objection_budget'
    await engine.handle_incoming_message('5511999990002', 'Estamos sem orçamento no momento para novos investimentos', campaign.id)
    
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert 'assumo 100% do risco' in msg
    assert 'R$ 147' in msg
    
    mock_evolution.send_text_message.reset_mock()
    
    # Rejection after objection
    mock_classifier.classify_response.return_value = 'no'
    await engine.handle_incoming_message('5511999990002', 'Não queremos agora, obrigado', campaign.id)
    
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert 'Tudo bem' in msg
    
    report = await engine.get_report(campaign.id)
    assert report['negative'] == 1


@pytest.mark.asyncio
async def test_funnel_objection_has_website_flow(db_session, mock_evolution, mock_classifier, sales_campaign_data):
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign = await engine.create_campaign(sales_campaign_data)
    await engine.start_campaign(campaign.id)
    
    # Step 1 -> Step 2
    mock_classifier.classify_response.return_value = 'yes'
    await engine.handle_incoming_message('5511999990001', 'Sim', campaign.id)
    
    mock_evolution.send_text_message.reset_mock()
    
    # Objection has website
    mock_classifier.classify_response.return_value = 'objection_has_website'
    await engine.handle_incoming_message('5511999990001', 'Nós já temos um site institucional', campaign.id)
    
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert 'PageSpeed Insights' in msg
    
    mock_evolution.send_text_message.reset_mock()
    
    # Accepts PageSpeed challenge
    mock_classifier.classify_response.return_value = 'yes'
    await engine.handle_incoming_message('5511999990001', 'Topo o teste do PageSpeed', campaign.id)
    
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert 'versão ultra-rápida' in msg
    
    report = await engine.get_report(campaign.id)
    assert report['positive'] == 1


@pytest.mark.asyncio
async def test_live_conversations_query_and_history(db_session, mock_evolution, mock_classifier, sales_campaign_data):
    from src.database.repository import ContactRepository, MessageRepository
    
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign = await engine.create_campaign(sales_campaign_data)
    await engine.start_campaign(campaign.id)
    
    # Simula resposta do lead
    mock_classifier.classify_response.return_value = 'yes'
    await engine.handle_incoming_message('5511999990001', 'Sim, atendemos!', campaign.id)
    
    # Testa ContactRepository.list_all
    c_repo = ContactRepository(db_session)
    contacts = await c_repo.list_all(limit=10)
    assert len(contacts) == 2
    
    # Testa MessageRepository.list_by_contact
    m_repo = MessageRepository(db_session)
    c1 = [c for c in contacts if c.phone == '5511999990001'][0]
    messages = await m_repo.list_by_contact(c1.id)
    
    assert len(messages) >= 3  # Outbound Isca, Inbound Yes, Outbound Pitch
    assert messages[0].direction == 'outbound'
    assert messages[0].content is not None
    assert messages[1].direction == 'inbound'
    assert messages[1].content == 'Sim, atendemos!'
    assert messages[1].classification == 'yes'


@pytest.mark.asyncio
async def test_flexible_json_and_double_braces_campaign_creation(db_session, mock_evolution, mock_classifier):
    flexible_data = {
        "name": "Campanha Flexível Estética",
        "contacts": [
            {
                "nome": "Carla Teles Estética",
                "telefone": "+55 (11) 99578-8035",
                "custom_data": {
                    "service": "estética facial",
                    "cidade": "Ferraz de Vasconcelos"
                }
            },
            {
                "nome": "Contato Inválido Sem Telefone",
                "telefone": None
            }
        ],
        "steps": [
            {
                "step": 1,
                "name": "A Isca",
                "message": "Oi! Vi o perfil da {{name}} aqui em {{city}}. Vocês fazem {{service}}?",
                "wait_for_reply": True,
                "on_yes": {
                    "step": 2,
                    "name": "Pitch",
                    "message": "Ótimo {{name}}! Topa um site para {{service}}?"
                }
            }
        ],
        "settings": {
            "default_city": "Ferraz de Vasconcelos",
            "default_service": "estética"
        }
    }
    
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign = await engine.create_campaign(flexible_data)
    
    assert campaign.name == "Campanha Flexível Estética"
    assert campaign.total_contacts == 1  # 1 válido, 1 descartado
    
    await engine.start_campaign(campaign.id)
    phone, msg = mock_evolution.send_text_message.call_args[0]
    
    assert phone == "5511995788035"
    assert "Carla" in msg
    assert "Ferraz de Vasconcelos" in msg
    assert "estética facial" in msg


@pytest.mark.asyncio
async def test_direct_leads_list_auto_attaches_default_sales_funnel(db_session, mock_evolution, mock_classifier, monkeypatch):
    monkeypatch.setattr('asyncio.sleep', AsyncMock())
    simple_leads_list = [
        {
            "nome": "Carla Teles Estética Avançada",
            "telefone": "5511995788035",
            "area_de_atuacao": "clínica de estética",
            "cidade": "Ferraz de Vasconcelos"
        },
        {
            "nome": "Dr. Carlos Odontologia",
            "telefone": "5511999990001",
            "servico": "consultório odontológico"
        }
    ]
    
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign = await engine.create_campaign(simple_leads_list)
    
    assert campaign.total_contacts == 2
    assert len(campaign.script_config) == 5  # Funil completo de 5 passos foi acoplado
    assert campaign.script_config[0]["name"] == "A Isca - Topo de Funil"
    
    await engine.start_campaign(campaign.id)
    phone, msg = mock_evolution.send_text_message.call_args_list[0][0]
    
    assert "Ferraz de Vasconcelos" in msg
    assert "clínica de estética" in msg


@pytest.mark.asyncio
async def test_gio_estetica_real_case_advances_to_step2_pitch(db_session, mock_evolution, mock_classifier):
    """Testa o caso real do print 1: Lead responde 'Oii Boa tarde, tudo bem? 💜 Trabalhamos sim'"""
    campaign_data = {
        "name": "Prospecção Estética",
        "contacts": [
            {
                "name": "GiO Estética Avançada Centro",
                "phone": "5511995738934",
                "service": "depilação a laser",
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

    mock_evolution.send_text_message.reset_mock()

    # Lead responde positivamente com emoji e saudação
    await engine.handle_incoming_message("5511995738934", "Oii Boa tarde, tudo bem? 💜 Trabalhamos sim", campaign.id)

    # Verifica que NÃO foi finalizado como negativo, e sim avançou para o Passo 2 com o Pitch
    assert mock_evolution.send_text_message.call_count == 1
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert phone == "5511995738934"
    assert "GiO Estética Avançada Centro" in msg or "Maravilha" in msg
    assert "estão sem site" in msg
    assert "Google" in msg
    assert "R$ 147/mês" in msg

    # Verifica status do contato no banco
    contacts = await engine.contact_repo.list_by_campaign(campaign.id)
    assert contacts[0].status == "waiting_reply"
    assert contacts[0].current_step == 1  # Step 2 (índice 1)
    assert contacts[0].result is None  # Não foi descartado como negativo!


@pytest.mark.asyncio
async def test_royal_face_greeting_keeps_lead_waiting_reply_in_step1(db_session, mock_evolution, mock_classifier):
    """Testa o caso real do print 2: Lead responde apenas saudação 'Boa tarde, tudo bem?'"""
    campaign_data = {
        "name": "Prospecção Estética",
        "contacts": [
            {
                "name": "Royal Face Clínica de Estética",
                "phone": "5511943202044",
                "service": "estética facial e corporal",
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

    mock_evolution.send_text_message.reset_mock()

    # Lead apenas cumprimenta
    await engine.handle_incoming_message("5511943202044", "Boa tarde, tudo bem?", campaign.id)

    # Bot deve responder educadamente e manter no Passo 1
    assert mock_evolution.send_text_message.call_count == 1
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert phone == "5511943202044"
    assert "Ferraz de Vasconcelos" in msg
    assert "estética facial e corporal" in msg

    # Contato NÃO pode ser finalizado como negativo, deve continuar aguardando
    contacts = await engine.contact_repo.list_by_campaign(campaign.id)
    assert contacts[0].status == "waiting_reply"
    assert contacts[0].current_step == 0
    assert contacts[0].result is None


@pytest.mark.asyncio
async def test_dra_cintia_no_duplicate_closing_message_when_lead_confirms_or_thanks(db_session, mock_evolution, mock_classifier):
    """
    Testa o cenário real da Dra Cintia:
    1. Bot envia Isca
    2. Lead confirma atendimento -> Bot envia Pitch de 24h
    3. Lead aceita proposta -> Bot envia mensagem de fechamento de 24h
    4. Lead envia 'Perfeito, obrigada!' ou 'Show' -> Bot NÃO DEVE enviar a mensagem de 24h novamente
    """
    campaign_data = {
        "name": "Prospecção Estética Dra Cintia",
        "contacts": [
            {
                "name": "Dra Cintia Estética Avançada",
                "phone": "5511988887777",
                "service": "harmonização facial",
                "city": "São Paulo"
            }
        ],
        "settings": {
            "delay_between_contacts_seconds": 0
        }
    }
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign = await engine.create_campaign(campaign_data)
    await engine.start_campaign(campaign.id)

    # 1. Isca inicial enviada
    assert mock_evolution.send_text_message.call_count == 1
    mock_evolution.send_text_message.reset_mock()

    # 2. Dra Cintia confirma que trabalha com harmonização
    await engine.handle_incoming_message("5511988887777", "Olá, trabalhamos sim!", campaign.id)
    assert mock_evolution.send_text_message.call_count == 1
    phone, pitch_msg = mock_evolution.send_text_message.call_args[0]
    assert "harmonização facial" in pitch_msg
    assert "R$ 147" in pitch_msg
    mock_evolution.send_text_message.reset_mock()

    # 3. Dra Cintia aceita ver o esboço gratuito
    await engine.handle_incoming_message("5511988887777", "Pode mandar sim, quero ver como fica", campaign.id)
    assert mock_evolution.send_text_message.call_count == 1
    phone, closing_msg = mock_evolution.send_text_message.call_args[0]
    assert "24h" in closing_msg or "24 horas" in closing_msg
    mock_evolution.send_text_message.reset_mock()

    # 4. Dra Cintia responde com confirmação/agradecimento pós-fechamento: 'Perfeito, obrigada!'
    await engine.handle_incoming_message("5511988887777", "Perfeito, obrigada Marco!", campaign.id)

    # O bot NÃO pode reenviar a mensagem de fechamento de 24h!
    assert mock_evolution.send_text_message.call_count == 0

    # 5. Dra Cintia envia mais uma mensagem: 'Combinado'
    await engine.handle_incoming_message("5511988887777", "Combinado 👍", campaign.id)
    assert mock_evolution.send_text_message.call_count == 0

    # Verifica que o contato está concluído como positivo e todas as mensagens constam no histórico
    contacts = await engine.contact_repo.list_by_campaign(campaign.id)
    assert contacts[0].status == "completed"
    assert contacts[0].result == "positive"
