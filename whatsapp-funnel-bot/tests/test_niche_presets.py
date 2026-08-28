import pytest
from unittest.mock import AsyncMock, MagicMock
from src.core.niche_presets import get_niche_preset, normalize_niche_key, get_available_niches
from src.core.funnel_engine import FunnelEngine
from src.core.llm_classifier import LLMClassifier
from src.core.evolution_client import EvolutionClient


def test_niche_preset_normalization():
    assert normalize_niche_key("odontologia") == "odontologia"
    assert normalize_niche_key("dentista") == "odontologia"
    assert normalize_niche_key("mecanica") == "mecanica"
    assert normalize_niche_key("auto center") == "mecanica"
    assert normalize_niche_key("veterinario") == "veterinaria"
    assert normalize_niche_key("pet shop") == "veterinaria"
    assert normalize_niche_key("advogado") == "advocacia"
    assert normalize_niche_key("clinica estetica") == "estetica"


def test_get_available_niches():
    niches = get_available_niches()
    keys = [n["key"] for n in niches]
    assert "odontologia" in keys
    assert "mecanica" in keys
    assert "veterinaria" in keys
    assert "estetica" in keys
    assert "advocacia" in keys


@pytest.fixture
def mock_evolution():
    evo = MagicMock(spec=EvolutionClient)
    evo.send_text_message = AsyncMock(return_value=True)
    return evo


@pytest.fixture
def mock_classifier():
    classifier = MagicMock(spec=LLMClassifier)
    classifier.classify_response = AsyncMock(return_value="yes")

    async def fake_decide(lead_message="", bot_last_message="", step_number=1, contact_info=None, step_config=None, conversation_history=None):
        h = LLMClassifier._heuristic_fallback(None, lead_message, step_number)
        intent = h.get("intent", "yes")
        action = "advance_step" if intent == "yes" else "end_negative" if intent == "no" else "handle_objection" if intent.startswith("objection_") else "repeat_step"
        next_step = 2 if (intent == "yes" and step_number == 1) else "end_positive" if intent == "yes" else "end_negative" if intent == "no" else 3 if intent == "objection_social_media" else 4 if intent == "objection_budget" else 5 if intent == "objection_has_website" else step_number
        return {
            "intent": intent,
            "action": action,
            "next_step": next_step,
            "reasoning": f"Niche Decision for {contact_info.get('specialty', '')}"
        }

    classifier.decide_step_action = AsyncMock(side_effect=fake_decide)
    return classifier


@pytest.mark.asyncio
async def test_odontologia_campaign_auto_attaches_dental_script(db_session, mock_evolution, mock_classifier):
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign_data = {
        "name": "Campanha Odontologia SP",
        "niche": "odontologia",
        "contacts": [
            {
                "name": "Dr. Carlos Odonto",
                "phone": "5511999990001",
                "service": "implantes dentários e próteses",
                "city": "São Paulo"
            }
        ],
        "settings": {
            "delay_between_contacts_seconds": 0
        }
    }
    campaign = await engine.create_campaign(campaign_data)
    assert campaign.settings["niche"] == "odontologia"
    assert "Odontológicos" in campaign.settings["specialty"]
    assert len(campaign.script_config) == 5
    assert "A Isca - Odontologia" in campaign.script_config[0]["name"]

    await engine.start_campaign(campaign.id)
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert "implantes dentários e próteses" in msg
    assert "São Paulo" in msg
    assert "consultório" in msg


@pytest.mark.asyncio
async def test_mecanica_campaign_auto_attaches_mecanica_script(db_session, mock_evolution, mock_classifier):
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign_data = {
        "name": "Campanha Mecânicas SP",
        "niche": "mecanica",
        "contacts": [
            {
                "name": "Auto Mecânica Precision",
                "phone": "5511999990003",
                "service": "câmbio automático",
                "city": "Guarulhos"
            }
        ],
        "settings": {
            "delay_between_contacts_seconds": 0
        }
    }
    campaign = await engine.create_campaign(campaign_data)
    assert campaign.settings["niche"] == "mecanica"
    assert "Mecânicas" in campaign.settings["specialty"]
    assert "A Isca - Mecânica" in campaign.script_config[0]["name"]

    await engine.start_campaign(campaign.id)
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert "câmbio automático" in msg
    assert "Guarulhos" in msg
    assert "oficina" in msg


@pytest.mark.asyncio
async def test_veterinaria_campaign_auto_attaches_vet_script(db_session, mock_evolution, mock_classifier):
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign_data = {
        "name": "Campanha Veterinários SP",
        "niche": "veterinaria",
        "contacts": [
            {
                "name": "Hospital Pet Care",
                "phone": "5511999990005",
                "service": "atendimento veterinário 24h",
                "city": "Santo André"
            }
        ],
        "settings": {
            "delay_between_contacts_seconds": 0
        }
    }
    campaign = await engine.create_campaign(campaign_data)
    assert campaign.settings["niche"] == "veterinaria"
    assert "Veterinárias" in campaign.settings["specialty"]
    assert "A Isca - Veterinária" in campaign.script_config[0]["name"]

    await engine.start_campaign(campaign.id)
    phone, msg = mock_evolution.send_text_message.call_args[0]
    assert "atendimento veterinário 24h" in msg
    assert "Santo André" in msg
    assert "clínica" in msg


@pytest.mark.asyncio
async def test_compliance_opt_out_ends_negative_without_sending_message(db_session, mock_evolution, mock_classifier):
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign_data = {
        "name": "Campanha Opt-out Test",
        "niche": "estetica",
        "contacts": [
            {
                "name": "Clínica Teste",
                "phone": "5511999990099",
                "service": "harmonização",
                "city": "São Paulo"
            }
        ],
        "settings": {"delay_between_contacts_seconds": 0}
    }
    campaign = await engine.create_campaign(campaign_data)
    await engine.start_campaign(campaign.id)

    mock_evolution.send_text_message.reset_mock()

    # Lead solicita opt-out
    await engine.handle_incoming_message("5511999990099", "Por favor me tire da lista e não me chame mais!", campaign.id)

    # Verifica que NÃO enviou nenhuma mensagem de volta (compliance)
    assert mock_evolution.send_text_message.call_count == 0

    # Verifica que status foi marcado como completed/negative
    contacts = await engine.contact_repo.list_by_campaign(campaign.id)
    assert contacts[0].status == "completed"
    assert contacts[0].result == "negative"


@pytest.mark.asyncio
async def test_universal_variables_formatting(db_session, mock_evolution, mock_classifier):
    engine = FunnelEngine(db_session, mock_evolution, mock_classifier)
    campaign_data = {
        "name": "Campanha Variáveis",
        "niche": "estetica",
        "settings": {
            "sender_name": "Agência Alta Conversão",
            "offer": "diagnóstico gratuito de velocidade",
            "price": "R$ 149/mês"
        },
        "contacts": [
            {
                "name": "Clínica Bella",
                "phone": "5511999990088",
                "service": "limpeza de pele",
                "city": "Campinas"
            }
        ]
    }
    campaign = await engine.create_campaign(campaign_data)
    contacts = await engine.contact_repo.list_by_campaign(campaign.id)
    c = contacts[0]

    template = "Olá {name}! Sou da {sender_name} em {city}. Oferecemos {offer} por apenas {price} para empresas de {service}."
    formatted = engine._format_message(template, c, campaign)

    assert "Bella" in formatted
    assert "Agência Alta Conversão" in formatted
    assert "Campinas" in formatted
    assert "diagnóstico gratuito de velocidade" in formatted
    assert "R$ 149/mês" in formatted
    assert "limpeza de pele" in formatted

