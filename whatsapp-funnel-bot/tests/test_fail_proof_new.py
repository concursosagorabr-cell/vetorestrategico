import pytest
from unittest.mock import AsyncMock, patch
from src.core.llm_classifier import LLMClassifier
from src.core.evolution_client import EvolutionClient

@pytest.mark.asyncio
async def test_fallback_handles_has_sample_sent():
    classifier = LLMClassifier(provider='groq', api_key='dummy')
    
    # 1. Objecao de Preco
    res_price = classifier._heuristic_fallback(
        message="ta muito caro",
        has_sample_sent=True,
        contact_name="Fulano"
    )
    assert "o que achou dele" in res_price["generated_reply"]
    assert "24h" not in res_price["generated_reply"]
    
    res_price_no_sample = classifier._heuristic_fallback(
        message="ta muito caro",
        has_sample_sent=False,
        contact_name="Fulano"
    )
    assert "24h" in res_price_no_sample["generated_reply"]
    
    # 2. Resposta neutra/generica (Other)
    res_other = classifier._heuristic_fallback(
        message="achei bonito",
        has_sample_sent=True,
        contact_name="Fulano"
    )
    assert "conseguiu dar uma olhada" in res_other["generated_reply"]
    
    res_other_no_sample = classifier._heuristic_fallback(
        message="hm legal",
        has_sample_sent=False,
        contact_name="Fulano"
    )
    assert "Faz sentido eu te mandar a prévia amanhã?" in res_other_no_sample["generated_reply"]

@pytest.mark.asyncio
async def test_evolution_client_retries_on_failure():
    client = EvolutionClient()
    
    with patch('httpx.AsyncClient.post', new_callable=AsyncMock) as mock_post:
        # Configura para falhar duas vezes e ter sucesso na terceira
        mock_resp_fail = AsyncMock()
        mock_resp_fail.status_code = 502
        mock_resp_fail.text = "Bad Gateway"
        
        mock_resp_success = AsyncMock()
        mock_resp_success.status_code = 200
        
        mock_post.side_effect = [mock_resp_fail, mock_resp_fail, mock_resp_success]
        
        # Testando envio de texto
        success = await client.send_text_message("123", "ola")
        
        # Deve retornar True pois a terceira tentativa deu 200
        assert success is True
        assert mock_post.call_count == 3

@pytest.mark.asyncio
async def test_evolution_client_returns_false_after_max_retries():
    client = EvolutionClient()
    
    with patch('httpx.AsyncClient.post', new_callable=AsyncMock) as mock_post:
        mock_resp_fail = AsyncMock()
        mock_resp_fail.status_code = 500
        mock_post.return_value = mock_resp_fail
        
        success = await client.send_text_message("123", "ola")
        
        assert success is False
        assert mock_post.call_count == 3

@pytest.mark.asyncio
async def test_llm_classifier_json_parsing_resilience():
    classifier = LLMClassifier(provider='groq', api_key='dummy')
    
    # Simular LLM retornando JSON com markdown e texto extra (alucinação)
    hallucinated_resp = '''
    Aqui está a análise solicitada:
    ```json
    {
        "classification": "doubt",
        "intent": "duvida",
        "emotion": "curioso",
        "thinking": "Ele quer saber mais.",
        "action": "invented_action",
        "generated_reply": "Posso ajudar com mais algo?"
    }
    ```
    Espero que ajude!
    '''
    
    with patch.object(classifier, '_call_groq', new_callable=AsyncMock) as mock_groq:
        mock_groq.return_value = hallucinated_resp
        
        # Como o json.loads vai falhar (porque raw_json não tem apenas o JSON limpo),
        # ele deve cair no heuristic_fallback, protegendo o sistema.
        res = await classifier.decide_step_action(
            lead_message="Como funciona?",
            bot_last_message="Olá",
            step_number=1,
            contact_info={}
        )
        
        # Como caiu no fallback, ele deve detectar "como funciona" que é uma intent de dúvida.
        assert res["intent"] == "doubt"
        assert res["classification"] == "doubt"
