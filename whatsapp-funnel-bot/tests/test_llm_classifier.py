import pytest
import json
from unittest.mock import AsyncMock, patch
from src.core.llm_classifier import LLMClassifier

@pytest.mark.asyncio
async def test_llm_classifier_decide_step_action():
    classifier = LLMClassifier(provider='groq', api_key='dummy')
    
    mock_resp = json.dumps({
        "classification": "yes",
        "confidence": 0.98,
        "action": "advance_step",
        "suggested_next_step": 2,
        "reasoning": "Confirmou atendimento do serviço"
    })
    
    with patch.object(classifier, '_call_groq', new_callable=AsyncMock) as mock_groq:
        mock_groq.return_value = mock_resp
        res = await classifier.decide_step_action(
            lead_message="Oii Boa tarde, tudo bem? 💜 Trabalhamos sim",
            bot_last_message="Vocês ainda trabalham com depilação a laser?",
            step_number=1,
            contact_info={"name": "GiO Estética", "city": "Ferraz de Vasconcelos", "service": "depilação a laser"}
        )
        assert res["classification"] == "yes"
        assert res["intent"] == "yes"
        assert res["action"] == "advance_step"
        assert res["next_step"] == 2
        assert res["confidence"] == 0.98

@pytest.mark.asyncio
async def test_heuristic_fallback_scenarios():
    classifier = LLMClassifier(provider='groq', api_key='')

    # Caso 1: Trabalhamos sim
    res1 = classifier._heuristic_fallback("Oii Boa tarde, tudo bem? 💜 Trabalhamos sim", step_number=1)
    assert res1["classification"] == "yes"
    assert res1["next_step"] == 2

    # Caso 2: Saudação isolada
    res2 = classifier._heuristic_fallback("Boa tarde, tudo bem?", step_number=1)
    assert res2["intent"] == "greeting"
    assert res2["action"] == "repeat_step"

    # Caso 3: Objeção Redes Sociais / Alternativas
    res3 = classifier._heuristic_fallback("Já uso Instagram e WhatsApp, não preciso de site", step_number=2)
    assert res3["classification"] == "objection_already_uses_alternative"
    assert res3["next_step"] == 3

    # Caso 4: Objeção Orçamento
    res4 = classifier._heuristic_fallback("Estamos sem orçamento no momento", step_number=2)
    assert res4["classification"] == "objection_budget"
    assert res4["next_step"] == 4

    # Caso 5: Objeção Já Tem Site / Solução
    res5 = classifier._heuristic_fallback("Já possuímos site no ar", step_number=2)
    assert res5["classification"] == "objection_has_solution"
    assert res5["next_step"] == 5

    # Caso 6: Recusa
    res6 = classifier._heuristic_fallback("Não temos interesse", step_number=1)
    assert res6["classification"] == "no"
    assert res6["action"] == "end_negative"

    # Caso 7: Dúvida
    res7 = classifier._heuristic_fallback("Como funciona? Qual o valor?", step_number=1)
    assert res7["classification"] == "doubt"
    assert res7["action"] == "repeat_step"

    # Caso 8: Opt-out / Compliance
    res8 = classifier._heuristic_fallback("Por favor me tira da lista e não me chame mais", step_number=1)
    assert res8["classification"] == "opt_out"
    assert res8["action"] == "end_negative"

    # Caso 9: Sem tempo / Adiar
    res9 = classifier._heuristic_fallback("Estou muito corrido agora, sem tempo", step_number=2)
    assert res9["classification"] == "objection_no_time"
    assert res9["action"] == "repeat_step"

    # Caso 10: Desconfiança
    res10 = classifier._heuristic_fallback("É golpe? Quem passou meu contato?", step_number=1)
    assert res10["classification"] == "objection_trust"
    assert res10["action"] == "repeat_step"

@pytest.mark.asyncio
async def test_classify_response_compat():
    classifier = LLMClassifier(provider='groq', api_key='')
    res = await classifier.classify_response("Trabalhamos sim com certeza!")
    assert res == "yes"