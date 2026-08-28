import os
import logging
import httpx
import json
import re
from typing import Literal, Dict, Any, List, Optional
from src.core.name_cleaner import clean_human_name, detect_auto_reply, extract_speaker_name

logger = logging.getLogger(__name__)

ClassificationResult = Literal[
    "yes",
    "no",
    "greeting",
    "doubt",
    "objection_portfolio",
    "ask_whats_included",
    "ask_hosting",
    "objection_bot",
    "ask_identity",
    "objection_budget",
    "objection_has_solution",
    "objection_no_time",
    "objection_already_uses_alternative",
    "objection_trust",
    "objection_social_media",
    "objection_has_website",
    "opt_out",
    "away",
    "other"
]


class LLMClassifier:
    def __init__(self, provider: str = None, model: str = None, api_key: str = None, api_url: str = None):
        self.provider = (provider or os.getenv("LLM_PROVIDER", "groq")).lower()
        self.model = model or os.getenv("LLM_MODEL", "openai/gpt-oss-120b")
        self.api_key = api_key or os.getenv("LLM_API_KEY") or os.getenv("GROQ_API_KEY", "")
        self.api_url = api_url or os.getenv("LLM_API_URL", "http://localhost:11434")
        self._groq_client = None

    def _get_groq_client(self):
        if self._groq_client is None and self.api_key:
            try:
                from groq import AsyncGroq
                http_client = httpx.AsyncClient(verify=False, timeout=20.0)
                self._groq_client = AsyncGroq(api_key=self.api_key, http_client=http_client)
            except Exception as e:
                logger.warning(f"Não foi possível inicializar AsyncGroq SDK: {e}")
        return self._groq_client

    async def decide_step_action(
        self,
        lead_message: str,
        bot_last_message: str = "",
        step_number: int = 1,
        contact_info: Optional[Dict[str, Any]] = None,
        step_config: Optional[Dict[str, Any]] = None,
        conversation_history: Optional[List[Dict[str, str]]] = None
    ) -> Dict[str, Any]:
        """
        Analisa a resposta do lead com IA contextual utilizando o framework humanizado de atendimento multi-nicho,
        respeitando o contrato de saída JSON com classificação, confiança, justificativa e próximo passo.
        """
        contact_info = contact_info or {}
        step_config = step_config or {}

        raw_name = contact_info.get("name", "Lead")
        human_name = clean_human_name(raw_name, lead_message)
        city = contact_info.get("city", "sua cidade")
        service = contact_info.get("service", "seus serviços")
        sender_name = contact_info.get("sender_name") or contact_info.get("custom_data", {}).get("sender_name") or "Vetor Estratégico"
        specialty = contact_info.get("specialty") or contact_info.get("niche") or step_config.get("specialty") or "Empresas e Negócios Locais"
        niche_persona = contact_info.get("niche_persona") or step_config.get("niche_persona") or f"Você é um assistente de pré-atendimento comercial para {specialty}."
        tone = contact_info.get("tone") or "profissional, direto, breve, acolhedor e humano"
        step_name = step_config.get("name", f"Passo {step_number}")
        expected_response = step_config.get("expected_response", "")

        # Verificação prévia de auto-resposta do WhatsApp Business
        is_auto, auto_type = detect_auto_reply(lead_message)

        system_prompt = f"""# Instruções de Atendimento — IA Multi-Nicho Humanizada (WhatsApp Funnel Bot)

## 1. Papel e Objetivo
Você é o classificador de respostas do funil de prospecção e pré-atendimento comercial via WhatsApp, agindo em nome de {sender_name}, para empresas de {specialty} em {city}.
DIRETRIZ DE PERSONA: {niche_persona}
TOM DE VOZ: {tone} (Natural, desenrolado, acolhedor, nunca robótico).

Seus objetivos são:
1. Confirmar se o contato ainda atua no serviço/nicho pesquisado ({service}).
2. Identificar aceites, recusas, dúvidas ou objeções comuns sem insistência.
3. Tratar o interlocutor pelo nome humano mais adequado ('{human_name}' ou quem se apresentar no chat), NUNCA repetindo nomes longos de cadastro do Google Maps (ex: 'Estética Kauane Ohana' -> 'Kauane'; 'Dra Fabiana Oliveira - Harmonização' -> 'Dra. Fabiana' ou 'Suelen' se a assistente Suelen responder).
4. Classificar com rigor a resposta do lead no contrato estruturado.

## 2. Princípios Gerais de Atendimento
- Breve e Humano: 1 a 3 frases no estilo natural do WhatsApp, sem formalismos antiquados.
- Uma pergunta por vez.
- Auto-respostas do WhatsApp:
  * Se o lead enviar mensagem automática de agendamento/catálogo/link: isso confirma que o negócio está ativo -> 'yes' (avança para o Pitch).
  * Se o lead enviar mensagem de ausência/fora de expediente ("não estou disponível no momento", "responderemos assim que possível"): classifique como 'away'.
- Compliance e Opt-out: Se o lead pedir para ser removido ("tira da lista", "não me chame mais"), classifique como 'opt_out'.
- Saída elegante: Se recusar, classifique como 'no'.

## 3. Categorias Universais de Classificação
- 'yes': aceitou avançar / confirmou serviço / atendente humano se apresentou / auto-resposta com agendamento ativo (inclusive se respondeu "Trabalhamos sim. Qual o seu nome?")
- 'no': recusou / disse que não faz mais / sem interesse no momento
- 'away': mensagem de ausência automática ("não estamos disponíveis no momento", "assim que possível responderemos")
- 'doubt': pediu detalhes genéricos, perguntou "como funciona?", "qual o valor?"
- 'objection_portfolio': pediu exemplos de sites, portfólio, Instagrams de páginas que administram, referências ou trabalhos anteriores ("mande alguns Instagrans", "tem exemplos de sites?")
- 'ask_whats_included': perguntou especificamente o que está incluído no valor de R$ 147/mês / escopo ("o que está incluído nesse valor?", "o que vem no plano?")
- 'ask_hosting': perguntou especificamente se a hospedagem/SSL está inclusa no valor ("esse valor já com a hospedagem incluída?", "já inclui hospedagem?")
- 'objection_bot': reclamou de mensagem automática / pediu para falar com uma pessoa/humano ("gostaria de falar com uma pessoa, não com mensagem automática", "é robô?")
- 'ask_identity': perguntou exclusivamente quem está falando / qual o seu nome ("qual o seu nome por favor?", "quem é você?")
- 'objection_budget': sem dinheiro / sem orçamento agora / aperto financeiro
- 'objection_has_solution': já tem solução equivalente (já tem site, já tem fornecedor)
- 'objection_no_time': sem tempo agora / depois eu vejo / muito corrido
- 'objection_already_uses_alternative': usa canal alternativo (Instagram, Facebook, WhatsApp apenas, indicação)
- 'objection_trust': desconfiança / perguntou procedência ("é golpe?", "quem indicou?")
- 'opt_out': solicitou expressamente não ser mais contatado / descadastro
- 'other': saudação isolada, emoji sem texto, mensagem neutra

## 4. Regras de Decisão por Passo do Funil
- Passo 1 (A Isca):
  * Confirmação / Atendente se apresentou / Agendamento automático ativo / "Trabalhamos sim. Qual seu nome?" -> classification='yes', action='advance_step', suggested_next_step=2
  * Mensagem de ausência automática -> classification='away', action='acknowledge_away', suggested_next_step=1
  * Saudação educada isolada -> classification='other', action='repeat_step', suggested_next_step=1
  * Dúvida sobre procedência / quem é -> classification='doubt', action='repeat_step', suggested_next_step=1
  * Recusa -> classification='no', action='end_negative', suggested_next_step='end_negative'
  * Pedido de remoção -> classification='opt_out', action='end_negative', suggested_next_step='end_negative'

- Passo 2 (O Pitch & Inversão de Risco):
  * Aceite do modelo/esboço -> classification='yes', action='end_positive', suggested_next_step='end_positive'
  * Recusa -> classification='no', action='end_negative', suggested_next_step='end_negative'
  * Pedido de portfólio / Instagram / referências -> classification='objection_portfolio', action='handle_objection', suggested_next_step=2
  * Dúvida do que está incluso -> classification='ask_whats_included', action='handle_objection', suggested_next_step=2
  * Dúvida sobre hospedagem inclusa -> classification='ask_hosting', action='handle_objection', suggested_next_step=2
  * Reclamação de robô / quer pessoa -> classification='objection_bot', action='handle_objection', suggested_next_step=2
  * Objeção redes sociais / canal alternativo -> classification='objection_already_uses_alternative', action='handle_objection', suggested_next_step=3
  * Objeção orçamento -> classification='objection_budget', action='handle_objection', suggested_next_step=4
  * Objeção já tem site/solução -> classification='objection_has_solution', action='handle_objection', suggested_next_step=5
  * Objeção sem tempo -> classification='objection_no_time', action='repeat_step', suggested_next_step=2
  * Dúvida genérica -> classification='doubt', action='repeat_step', suggested_next_step=2

## 5. Contrato de Saída Obrigatório (JSON)
Responda EXCLUSIVAMENTE em JSON no seguinte formato:
{{
  "classification": "yes" | "no" | "away" | "doubt" | "objection_portfolio" | "ask_whats_included" | "ask_hosting" | "objection_bot" | "ask_identity" | "objection_budget" | "objection_has_solution" | "objection_no_time" | "objection_already_uses_alternative" | "objection_trust" | "opt_out" | "other",
  "clean_name": "{human_name}",
  "confidence": 0.95,
  "reasoning": "Breve justificativa em 1 frase",
  "suggested_next_step": 2 | "end_positive" | "end_negative" | null
}}"""

        user_prompt = f"""DADOS DA EMPRESA/CONTATO:
- Nome no Cadastro: {raw_name}
- Nome Humanizado Sugerido: {human_name}
- Cidade: {city}
- Serviço/Segmento: {service}
- Especialidade/Nicho: {specialty}
- Remetente: {sender_name}

ESTADO ATUAL DO ATENDIMENTO:
- Passo Atual: {step_number} ({step_name})
- Objetivo do Passo: {expected_response}
- Última mensagem enviada pelo Bot: "{bot_last_message}"
- Mensagem recebida do Lead: "{lead_message}"
"""
        if conversation_history:
            history_str = "\n".join([f"{m.get('role', 'msg')}: {m.get('content', '')}" for m in conversation_history[-4:]])
            user_prompt += f"\nHISTÓRICO DA CONVERSA:\n{history_str}\n"

        user_prompt += "\nClassifique a resposta do lead considerando se é humano ou auto-resposta:"

        try:
            raw_json = None
            if self.provider == "groq":
                raw_json = await self._call_groq(system_prompt, user_prompt, json_mode=True)
            elif self.provider in ["openai", "openrouter"]:
                raw_json = await self._call_openai(system_prompt, user_prompt, json_mode=True)
            elif self.provider == "ollama":
                raw_json = await self._call_ollama(system_prompt, user_prompt)

            if raw_json:
                data = json.loads(raw_json)
                classification = str(data.get("classification") or data.get("intent", "")).lower().strip()
                action = str(data.get("action", "")).lower().strip()
                suggested_step = data.get("suggested_next_step", data.get("next_step"))
                reasoning = data.get("reasoning", "")
                confidence = float(data.get("confidence", 0.9))
                parsed_clean_name = data.get("clean_name") or human_name

                # Normalização de aliases legados
                if classification == "objection_social_media":
                    classification = "objection_already_uses_alternative"
                elif classification == "objection_has_website":
                    classification = "objection_has_solution"

                # Mapeia ação se omitida pelo LLM
                if not action:
                    if classification == "yes":
                        action = "advance_step" if step_number == 1 else "end_positive"
                    elif classification in ["no", "opt_out"]:
                        action = "end_negative"
                    elif classification == "away":
                        action = "acknowledge_away"
                    elif classification.startswith("objection_") or classification.startswith("ask_"):
                        action = "handle_objection"
                    else:
                        action = "repeat_step"

                # Mapeia próximo passo se omitido
                if suggested_step is None:
                    if classification == "yes":
                        suggested_step = 2 if step_number == 1 else "end_positive"
                    elif classification in ["no", "opt_out"]:
                        suggested_step = "end_negative"
                    elif classification in ["objection_already_uses_alternative", "objection_social_media"]:
                        suggested_step = 3
                    elif classification == "objection_budget":
                        suggested_step = 4
                    elif classification in ["objection_has_solution", "objection_has_website"]:
                        suggested_step = 5
                    elif classification in ["objection_portfolio", "ask_whats_included", "ask_hosting", "objection_bot", "ask_identity"]:
                        suggested_step = 2
                    else:
                        suggested_step = step_number

                valid_categories = {
                    "yes", "no", "greeting", "doubt", "objection_portfolio", "ask_whats_included",
                    "ask_hosting", "objection_bot", "ask_identity", "objection_budget",
                    "objection_has_solution", "objection_no_time", "objection_already_uses_alternative",
                    "objection_trust", "objection_social_media", "objection_has_website", "opt_out",
                    "away", "other"
                }

                if classification in valid_categories:
                    return {
                        "classification": classification,
                        "intent": classification,  # Compatibilidade retroativa
                        "action": action,
                        "next_step": suggested_step,
                        "suggested_next_step": suggested_step,
                        "confidence": confidence,
                        "clean_name": parsed_clean_name,
                        "reasoning": reasoning
                    }
        except Exception as e:
            logger.warning(f"Erro ao chamar LLM ({self.provider}/{self.model}): {e}. Aplicando heurística inteligente.")

        # Heurística resiliente com regras completas
        return self._heuristic_fallback(lead_message, step_number, raw_name)

    async def classify_response(self, user_message: str, expected_context: str = "") -> ClassificationResult:
        """Compatibilidade para classificação rápida de intenção."""
        decision = await self.decide_step_action(
            lead_message=user_message,
            bot_last_message=expected_context,
            step_number=1
        )
        return decision.get("classification", decision.get("intent", "other"))

    def _heuristic_fallback(self, message: str, step_number: int = 1, contact_name: str = "") -> Dict[str, Any]:
        """
        Regras determinísticas de PLN em português com humanização e detecção de auto-resposta.
        """
        msg = message.lower().strip()
        msg_clean = re.sub(r"[^\w\s]", "", msg)
        h_name = clean_human_name(contact_name, message)

        # 1. Opt-out explícito (Compliance)
        opt_out_phrases = [
            "tira da lista", "tire da lista", "remover meu numero", "remover meu contato",
            "nao me chame mais", "não me chame mais", "para de mandar", "parar de mandar",
            "descadastrar", "sair da lista", "spam", "bloquear", "nao autorizo"
        ]
        for phrase in opt_out_phrases:
            if phrase in msg:
                return {
                    "classification": "opt_out",
                    "intent": "opt_out",
                    "action": "end_negative",
                    "next_step": "end_negative",
                    "suggested_next_step": "end_negative",
                    "confidence": 1.0,
                    "clean_name": h_name,
                    "reasoning": "Compliance: lead solicitou expressamente cancelamento de contato (opt-out)."
                }

        # 2. Detecção de Auto-respostas do WhatsApp Business
        is_auto, auto_type = detect_auto_reply(message)
        if is_auto:
            if auto_type == "scheduling":
                return {
                    "classification": "yes",
                    "intent": "yes",
                    "action": "advance_step" if step_number == 1 else "end_positive",
                    "next_step": 2 if step_number == 1 else "end_positive",
                    "suggested_next_step": 2 if step_number == 1 else "end_positive",
                    "confidence": 0.95,
                    "clean_name": h_name,
                    "reasoning": "Auto-resposta ativa com link de agendamento confirmando atividade do negócio."
                }
            elif auto_type == "away":
                return {
                    "classification": "away",
                    "intent": "away",
                    "action": "acknowledge_away",
                    "next_step": step_number,
                    "suggested_next_step": step_number,
                    "confidence": 0.95,
                    "clean_name": h_name,
                    "reasoning": "Auto-resposta de ausência ou fora de expediente do WhatsApp Business."
                }

        # 3. Reclamação de Automação / Robô (objection_bot)
        bot_phrases = [
            "falar com uma pessoa", "falar com pessoa", "mensagem automatica", "mensagem automática",
            "nao com mensagem automatica", "não com mensagem automática", "atendente humano",
            "falar com humano", "voce e robo", "você é robô", "e robo", "é robô", "e bot", "é bot",
            "uma pessoa ou robo", "uma pessoa ou robô", "atendimento automatico", "atendimento automático"
        ]
        if any(p in msg for p in bot_phrases):
            return {
                "classification": "objection_bot",
                "intent": "objection_bot",
                "action": "handle_objection",
                "next_step": 2,
                "suggested_next_step": 2,
                "confidence": 0.95,
                "clean_name": h_name,
                "reasoning": "Heurística: lead solicitou atendimento humano ou questionou automação/robô."
            }

        # 4. Solicitação de Portfólio / Casos / Instagrams de páginas administradas (objection_portfolio)
        portfolio_phrases = [
            "mande alguns instagrans", "mande alguns instagram", "manda alguns instagrans",
            "paginas de administram", "páginas de administram", "paginas que administram", "páginas que administram",
            "sites que administram", "exemplos de paginas", "exemplos de páginas", "exemplos de sites",
            "exemplos de site", "sites que ja criaram", "sites que já criaram", "paginas que ja criaram",
            "páginas que já criaram", "sites que ja fizeram", "sites que já fizeram", "portfólio", "portfolio",
            "trabalhos anteriores", "algum trabalho", "ver trabalhos", "ver exemplos", "mostrar exemplos",
            "referencias", "referências", "algum modelo pronto", "algum site pronto", "modelos que ja fez"
        ]
        if any(p in msg for p in portfolio_phrases):
            return {
                "classification": "objection_portfolio",
                "intent": "objection_portfolio",
                "action": "handle_objection",
                "next_step": 2,
                "suggested_next_step": 2,
                "confidence": 0.95,
                "clean_name": h_name,
                "reasoning": "Heurística: lead solicitou exemplos de portfólio / Instagrams / referências de sites."
            }

        # 5. Dúvidas Específicas de Hospedagem Inclusa (ask_hosting)
        if "hospedagem" in msg and (
            any(w in msg for w in ["inclus", "inclui", "incluso", "inclusa", "valor", "preco", "preço", "97", "147", "mensal", "taxa", "custo", "pagar", "gratis", "grátis"])
            or any(p in msg for p in ["com a hospedagem", "com hospedagem", "ja com", "já com", "ja ta", "já tá", "ja esta", "já está"])
        ):
            return {
                "classification": "ask_hosting",
                "intent": "ask_hosting",
                "action": "handle_objection",
                "next_step": 2,
                "suggested_next_step": 2,
                "confidence": 0.95,
                "clean_name": h_name,
                "reasoning": "Heurística: lead questionou se a hospedagem/infraestrutura está inclusa no valor."
            }

        # 6. Dúvidas Específicas de Escopo / O que está incluso (ask_whats_included)
        included_phrases = [
            "o que esta incluido", "o que está incluído", "o que esta incluso", "o que está incluso",
            "o que vem no valor", "o que vem no plano", "o que inclui", "o que abrange", "o que cobre",
            "o que tem direito", "o que acompanha", "o que esta incluso nesse valor", "o que está incluído nesse valor"
        ]
        if any(p in msg for p in included_phrases):
            return {
                "classification": "ask_whats_included",
                "intent": "ask_whats_included",
                "action": "handle_objection",
                "next_step": 2,
                "suggested_next_step": 2,
                "confidence": 0.95,
                "clean_name": h_name,
                "reasoning": "Heurística: lead perguntou detalhes do escopo e serviços inclusos no valor."
            }

        # 7. Atendente se apresentou (ex: "Sou a Giovanna da DS Clinic", "Me chamo Suelen")
        speaker = extract_speaker_name(message)
        if speaker and (any(w in msg for w in ["assistente", "clinica", "clínica", "consultorio", "consultório", "estamos prontos", "posso te ajudar", "como posso ajudar", "o que deseja", "atendimento"]) or "da " in msg or "do " in msg):
            return {
                "classification": "yes",
                "intent": "yes",
                "action": "advance_step" if step_number == 1 else "end_positive",
                "next_step": 2 if step_number == 1 else "end_positive",
                "suggested_next_step": 2 if step_number == 1 else "end_positive",
                "confidence": 0.95,
                "clean_name": speaker,
                "reasoning": f"Atendente ({speaker}) se apresentou receptivamente no chat."
            }

        # 8. Confirmações afirmativas fortes (Sim / Atendemos / Aceite de Demonstração)
        yes_keywords = [
            "trabalhamos sim", "trabalhamos", "fazemos sim", "fazemos", "atendemos sim", "atendemos",
            "sim", "com certeza", "claro", "opa", "pode mandar", "quero ver", "pode ser", "topo",
            "pode fazer", "pode comecar", "pode começar", "pode montar", "pode preparar", "pode criar",
            "pode desenhar", "pode enviar", "manda ai", "manda aí", "bora", "perfeito", "otimo", "ótimo",
            "show", "beleza", "realizamos", "realizamos sim", "positivo", "manda ver", "faz sentido"
        ]
        for kw in yes_keywords:
            if re.search(rf"\b{re.escape(kw)}\b", msg_clean) or kw in msg:
                if step_number == 1:
                    return {
                        "classification": "yes",
                        "intent": "yes",
                        "action": "advance_step",
                        "next_step": 2,
                        "suggested_next_step": 2,
                        "confidence": 0.95,
                        "clean_name": speaker or h_name,
                        "reasoning": "Heurística: confirmação afirmativa de atendimento."
                    }
                else:
                    return {
                        "classification": "yes",
                        "intent": "yes",
                        "action": "end_positive",
                        "next_step": "end_positive",
                        "suggested_next_step": "end_positive",
                        "confidence": 0.95,
                        "clean_name": speaker or h_name,
                        "reasoning": "Heurística: aceite da proposta/esboço."
                    }

        # 9. Objeções Universais
        # a) Sem tempo / Depois eu vejo
        if any(w in msg_clean for w in ["sem tempo", "muito corrido", "depois eu vejo", "depois te respondo", "agora nao posso", "agora não posso", "estou ocupado", "me chama semana que vem"]):
            return {
                "classification": "objection_no_time",
                "intent": "objection_no_time",
                "action": "repeat_step",
                "next_step": step_number,
                "suggested_next_step": step_number,
                "confidence": 0.9,
                "clean_name": h_name,
                "reasoning": "Heurística: objeção por falta de tempo ou adiamento."
            }

        # b) Desconfiança / Procedência
        if any(w in msg_clean for w in ["e golpe", "é golpe", "quem indicou", "como conseguiu", "como pegou meu numero", "quem passou meu contato"]):
            return {
                "classification": "objection_trust",
                "intent": "objection_trust",
                "action": "repeat_step",
                "next_step": step_number,
                "suggested_next_step": step_number,
                "confidence": 0.9,
                "clean_name": h_name,
                "reasoning": "Heurística: objeção de confiança ou questionamento de procedência."
            }

        # c) Canais alternativos (Redes Sociais, WhatsApp apenas, etc.)
        if any(w in msg_clean for w in ["instagram", "insta", "facebook", "face", "redes sociais", "rede social", "so pelo whats", "boca a boca", "so por indicacao"]):
            return {
                "classification": "objection_already_uses_alternative",
                "intent": "objection_social_media",
                "action": "handle_objection",
                "next_step": 3,
                "suggested_next_step": 3,
                "confidence": 0.9,
                "clean_name": h_name,
                "reasoning": "Heurística: objeção por uso de canais alternativos de captação."
            }

        # d) Orçamento / Falta de dinheiro
        if any(w in msg_clean for w in ["sem orcamento", "sem orçamento", "sem grana", "sem dinheiro", "sem verba", "muito caro", "ta caro", "tá caro", "aperto financeiro", "nao posso gastar"]):
            return {
                "classification": "objection_budget",
                "intent": "objection_budget",
                "action": "handle_objection",
                "next_step": 4,
                "suggested_next_step": 4,
                "confidence": 0.9,
                "clean_name": h_name,
                "reasoning": "Heurística: objeção de orçamento financeiro."
            }

        # e) Já possui solução (Já tem site/fornecedor)
        if any(w in msg_clean for w in ["ja temos site", "já temos site", "ja possuimos site", "já possuímos site", "temos site", "nosso site", "meu site", "ja tenho fornecedor", "ja tenho equipe"]):
            return {
                "classification": "objection_has_solution",
                "intent": "objection_has_website",
                "action": "handle_objection",
                "next_step": 5,
                "suggested_next_step": 5,
                "confidence": 0.9,
                "clean_name": h_name,
                "reasoning": "Heurística: objeção de já possuir solução/site ativo."
            }

        # 10. Recusas explícitas
        no_keywords = [
            "nao quero", "não quero", "sem interesse", "nao temos interesse", "não temos interesse",
            "deixa pra la", "deixa pra lá", "nao obrigado", "não obrigado", "nao fazemos mais",
            "não fazemos mais", "nao realizamos", "não realizamos"
        ]
        for kw in no_keywords:
            if kw in msg:
                return {
                    "classification": "no",
                    "intent": "no",
                    "action": "end_negative",
                    "next_step": "end_negative",
                    "suggested_next_step": "end_negative",
                    "confidence": 0.95,
                    "clean_name": h_name,
                    "reasoning": "Heurística: recusa explícita de interesse."
                }
        if msg_clean in ["nao", "não", "nop", "nem"]:
            return {
                "classification": "no",
                "intent": "no",
                "action": "end_negative",
                "next_step": "end_negative",
                "suggested_next_step": "end_negative",
                "confidence": 0.95,
                "clean_name": h_name,
                "reasoning": "Heurística: resposta monossilábica negativa."
            }

        # 11. Pergunta de Identidade do Remetente (ask_identity)
        if any(w in msg_clean for w in ["qual o seu nome", "qual seu nome", "quem esta falando", "quem está falando", "quem fala", "com quem falo", "quem e voce", "quem é você"]):
            return {
                "classification": "ask_identity",
                "intent": "ask_identity",
                "action": "repeat_step",
                "next_step": step_number,
                "suggested_next_step": step_number,
                "confidence": 0.9,
                "clean_name": h_name,
                "reasoning": "Heurística: lead perguntou a identidade ou nome do remetente."
            }

        # 12. Saudações isoladas sem confirmação direta
        greetings = ["boa tarde", "bom dia", "boa noite", "ola", "olá", "oi", "oii", "oiii", "tudo bem", "tudo bom", "como vai"]
        if any(g in msg_clean for g in greetings) and len(msg_clean.split()) <= 6:
            return {
                "classification": "other",
                "intent": "greeting",
                "action": "repeat_step",
                "next_step": step_number,
                "suggested_next_step": step_number,
                "confidence": 0.85,
                "clean_name": h_name,
                "reasoning": "Heurística: saudação educada sem confirmação afirmativa do serviço."
            }

        # 13. Dúvidas gerais sobre a proposta
        if any(w in msg_clean for w in ["quem e", "quem é", "como funciona", "qual valor", "quanto custa", "sobre o que"]):
            return {
                "classification": "doubt",
                "intent": "doubt",
                "action": "repeat_step",
                "next_step": step_number,
                "suggested_next_step": step_number,
                "confidence": 0.85,
                "clean_name": h_name,
                "reasoning": "Heurística: contato solicitou maiores esclarecimentos."
            }

        return {
            "classification": "other",
            "intent": "other",
            "action": "repeat_step",
            "next_step": step_number,
            "suggested_next_step": step_number,
            "confidence": 0.5,
            "clean_name": h_name,
            "reasoning": "Heurística: mensagem neutra ou indefinida."
        }

        return {
            "classification": "other",
            "intent": "other",
            "action": "repeat_step",
            "next_step": step_number,
            "suggested_next_step": step_number,
            "confidence": 0.5,
            "clean_name": h_name,
            "reasoning": "Heurística: mensagem neutra ou indefinida."
        }

    async def _call_groq(self, system: str, user: str, json_mode: bool = False) -> str:
        groq_client = self._get_groq_client()
        if groq_client:
            kwargs = {
                "model": self.model if self.model != "llama-3.3-70b-versatile" else "openai/gpt-oss-120b",
                "messages": [
                    {"role": "system", "content": system},
                    {"role": "user", "content": user}
                ],
                "temperature": 0.2,
                "max_completion_tokens": 1024,
            }
            if json_mode:
                kwargs["response_format"] = {"type": "json_object"}
            resp = await groq_client.chat.completions.create(**kwargs)
            return resp.choices[0].message.content

        # Fallback direct HTTP
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.model if self.model != "llama-3.3-70b-versatile" else "openai/gpt-oss-120b",
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user}
            ],
            "temperature": 0.2,
            "max_tokens": 1024
        }
        if json_mode:
            payload["response_format"] = {"type": "json_object"}

        async with httpx.AsyncClient(verify=False, timeout=20.0) as client:
            resp = await client.post(url, headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()
            return data["choices"][0]["message"]["content"]

    async def _call_openai(self, system: str, user: str, json_mode: bool = False) -> str:
        url = self.api_url if self.api_url != "http://localhost:11434" else "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user}
            ],
            "temperature": 0.2,
            "max_tokens": 1024
        }
        if json_mode:
            payload["response_format"] = {"type": "json_object"}

        async with httpx.AsyncClient(verify=False, timeout=20.0) as client:
            resp = await client.post(url, headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()
            return data["choices"][0]["message"]["content"]

    async def _call_ollama(self, system: str, user: str) -> str:
        url = f"{self.api_url}/api/chat"
        payload = {
            "model": self.model or "llama3",
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user}
            ],
            "stream": False,
            "format": "json"
        }
        async with httpx.AsyncClient(verify=False, timeout=30.0) as client:
            resp = await client.post(url, json=payload)
            resp.raise_for_status()
            data = resp.json()
            return data["message"]["content"]
