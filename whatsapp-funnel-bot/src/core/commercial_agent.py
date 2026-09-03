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


# Base de Conhecimento / Light RAG Embutido
KNOWLEDGE_BASE = {
    "agency": {
        "name": "Vetor Estratégico",
        "specialty": "Desenvolvimento de sites de alta conversão em Next.js, SEO no Google, automações de vendas e IA",
        "website": "www.vetorestrategico.com",
        "portfolio": [
            {
                "name": "Concursos Agora",
                "url": "www.concursosagora.com.br",
                "tech": "Next.js + SEO Google",
                "highlight": "Mais de 2 mil acessos orgânicos por mês, carregamento em menos de 1s e painel com Google Analytics oficial"
            }
        ]
    },
    "pricing_and_plans": {
        "prototype_offer": "Criação de protótipo/esboço personalizado e funcional em até 24h sem nenhum custo inicial para teste no celular",
        "monthly_plan": "R$ 147/mês",
        "whats_included": [
            "Desenvolvimento completo da página em tecnologia moderna Next.js de alta velocidade",
            "Hospedagem ultra-rápida e certificado de segurança SSL inclusos",
            "Painel administrativo com login e senha para acompanhar métricas oficiais do Google Analytics",
            "Botão de alta conversão direto para o WhatsApp da empresa/consultório",
            "Suporte contínuo, manutenções e alterações de textos, fotos e serviços inclusas",
            "Taxa de R$ 147 cobrada apenas quando o cliente aceita fechar negócio para colocar o site no ar (cobre domínio e configurações), e mensalidade de R$ 147/mês. Zero contrato de fidelidade (cancela quando quiser)."
        ]
    },
    "niche_playbooks": {
        "odontologia": {
            "vocabulary": "pacientes particulares, consultório odontológico, agendamento de consultas, avaliações de implantes e alinhadores",
            "pain_point": "Pacientes com urgência ou buscando procedimentos de alto valor pesquisam no Google e encontram concorrentes se o consultório não tiver site no topo.",
            "hook": "Destacar autoridade do dentista, tratamentos especializados e botão de agendamento direto na recepção."
        },
        "estetica": {
            "vocabulary": "clientes particulares, procedimentos de alto ticket, harmonização facial, estética corporal, agendamentos",
            "pain_point": "O Instagram serve de vitrine, mas quem busca estética no Google já tem a intenção de agendar e comprar agora.",
            "hook": "Apresentação visual elegante, galeria antes/depois, depoimentos e facilidade de agendamento."
        },
        "advocacia": {
            "vocabulary": "clientes com demandas jurídicas, consultas jurídicas, assessoria jurídica, autoridade do escritório",
            "pain_point": "Clientes com problemas jurídicos urgentes buscam especialistas no Google exigindo credibilidade e cumprimento das normas da OAB.",
            "hook": "Página sóbria de alta autoridade, áreas de atuação claras e canal discreto para contato direto."
        },
        "mecanica": {
            "vocabulary": "motoristas da região, revisão automotiva, socorro mecânico, orçamentos rápidos",
            "pain_point": "Motoristas com carro quebrado no trânsito buscam oficina mecânica imediatamente no Google.",
            "hook": "Botão de emergência/orçamento no WhatsApp com endereço e rotas rápidas."
        },
        "veterinaria": {
            "vocabulary": "tutores de pets, consultas veterinárias, emergência pet 24h, exames e vacinas",
            "pain_point": "Tutores desesperados com pet doente buscam clínicas de confiança no Google perto de casa.",
            "hook": "Transmissão de carinho, agilidade e estrutura da clínica com contato imediato."
        }
    }
}

class CommercialAgent:
    """
    Agente Comercial IA Contextual para WhatsApp Funnel Bot.
    Utiliza raciocínio em etapas (Thinking), interpretação completa do histórico,
    técnicas de vendas consultivas (SPIN, Challenger, Sandler) e tratamento proativo de objeções.
    """

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
                http_client = httpx.AsyncClient(verify=False, timeout=25.0)
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
        Executa o raciocínio comercial contextual em 4 etapas e decide a melhor ação e resposta.
        """
        contact_info = contact_info or {}
        step_config = step_config or {}

        raw_name = contact_info.get("name", "Lead")
        human_name = clean_human_name(raw_name, lead_message)
        city = contact_info.get("city", "São Paulo")
        service = contact_info.get("service", "seus serviços")
        sender_name = contact_info.get("sender_name") or contact_info.get("custom_data", {}).get("sender_name") or "Marco Antonio"
        specialty = contact_info.get("specialty") or contact_info.get("niche") or step_config.get("specialty") or "Empresas e Negócios Locais"
        niche_key = contact_info.get("niche", "custom")
        niche_playbook = KNOWLEDGE_BASE["niche_playbooks"].get(niche_key, {})

        # Extrai contexto prévio de negociação
        custom_data = contact_info.get("custom_data", {})
        has_sample_sent = bool(custom_data.get("model_link_sent") or custom_data.get("sample_sent") or "http" in bot_last_message)
        previous_stage = custom_data.get("conversation_state", {}).get("stage", "COLD" if step_number == 1 else "ENGAGED")

        # Verificação prévia de auto-resposta do WhatsApp Business
        is_auto, auto_type = detect_auto_reply(lead_message)

        # -------------------------------------------------------------
        # PROMPT MESTRE DO AGENTE COMERCIAL IA CONTEXTUAL (GPT-OSS-120B)
        # -------------------------------------------------------------
        system_prompt = f"""# PROMPT MESTRE — AGENTE COMERCIAL IA CONTEXTUAL (GPT-OSS-120B)

## 1. PAPEL E IDENTIDADE
Você é o Closer Comercial IA de Alta Performance da **{KNOWLEDGE_BASE['agency']['name']}**, agência especialista em desenvolvimento de sites profissionais de alta velocidade (Next.js), SEO orgânico no Google, presença digital e automações de vendas.
Seu objetivo é transformar conversas no WhatsApp em vendas sem parecer um robô, agindo com inteligência, naturalidade, empatia e assertividade.
Você conversa com **{human_name}** sobre **{service}** ({specialty}) em **{city}**.
Seu Nome (Remetente): **{sender_name}**.

## 2. 🧠 SEQUÊNCIA MENTAL OBRIGATÓRIA ANTES DE RESPONDER
Nunca responda apenas olhando a última mensagem. Siga estritamente estas etapas mentais:

### ETAPA 1 — LER E INTERPRETAR O HISTÓRICO COMPLETO
- Analise toda a evolução do diálogo. Se o cliente disser algo curto como 'Pode ser', 'Não sei', 'Tô pensando', 'Quanto fica?', interprete o contexto exato do que ele está se referindo com base no histórico.
- **ANTI-REPETIÇÃO:** Verifique o que você (Robô) já disse. NUNCA repita o mesmo texto, slogan ou parágrafo que já foi enviado antes!

### ETAPA 2 — DESCOBRIR O ESTÁGIO DA CONVERSA
Classifique o momento atual em um dos seguintes estágios:
- **COLD:** Primeiro contato / mensagem de abertura de curiosidade.
- **ENGAGED:** O cliente respondeu à saudação inicial ou confirmou o atendimento.
- **DISCOVERY:** Descobrindo necessidades, dores no Google ou presença digital.
- **INTEREST:** Demonstrou interesse em conhecer a proposta ou modelo.
- **SAMPLE_SENT:** Modelo de site/demonstração foi enviado e está sendo avaliado.
- **OBJECTION:** Possui objeção específica (preço, já tem site, sem tempo, instagram, etc.).
- **NEGOTIATION:** Negociando detalhes, hesitando ('tô pensando', 'não sei ainda'), pedindo ajustes de fotos/cores.
- **READY:** Pronto para fechar, pediu link de pagamento/ativação ou combinou início.
- **CLOSED:** Venda confirmada e finalizada.
- **LOST:** Recusa explícita e definitiva / opt-out ('não me chame mais').

### ETAPA 3 — DETECTAR A INTENÇÃO REAL DO CLIENTE
Identifique a intenção principal e secundária: curiosidade, interesse, comparacao, duvida, preco, prazo, confianca, medo, falta_de_tempo, indecisao, rejeicao, compra_imediata, pedido_exemplo, pedido_portfolio, ask_identity.

### ETAPA 4 — DETECTAR A EMOÇÃO E TOM
Identifique o tom do cliente: animado, desconfiado, ocupado, irritado, curioso, educado, seco, urgente, neutro. Adapte seu tom de resposta imediatamente ao estilo dele.

## 3. ESTRATÉGIA COMERCIAL (SPIN SELLING, CHALLENGER, SANDLER & VENDA CONSULTIVA)
- **Direct Answer First:** Se o cliente fez qualquer pergunta ('qual seu nome?', 'quanto custa?', 'onde fica?', 'como pegou meu contato?'), você **DEVE responder objetivamente logo no início** da mensagem antes de conduzir a venda.

- **Como responder a 'Como pegou meu contato?' / 'Quem passou meu número?' (Procedência e Transparência Total) OU Fazer o Pitch Inicial:**
  * **Regra de Ouro:** NUNCA invente 'lista de inscritos', 'newsletter', 'mailing' ou 'parceiros terceiros'.
  * **Resposta Oficial:** Explique com naturalidade que encontrou o contato da empresa no **Google Maps**.
  * **O Pitch (Exemplo Obrigatório):** *'Que ótimo, {human_name}! Encontrei seu contato no Google Maps e percebi que ainda não tem um site no topo da pesquisa quando alguém de {city} pesquisa por {service} / entra em contato, o que pode estar afastando potenciais clientes. Posso preparar um protótipo gratuito em 24h para você avaliar no celular?'*

- **Como responder a Objeção de Orçamento / Fluxo de Caixa ('pouco caixa', 'sem dinheiro', 'sem verba'):**
  * Use a técnica de **Inversão de Risco & ROI**:
  * *'Super compreendo o momento de caixa, {human_name}! Justamente por isso nós assumimos 100% do risco: você não paga 1 centavo para criar e ver a página pronta em 24h. Você só paga a taxa de R$ 147 para colocar o site no ar (que inclui o domínio e configurações) quando aceitar fechar negócio, e depois uma mensalidade de R$ 147/mês. Posso preparar a demonstração sem custo para você ver?'*

- **Técnica Decode & Empathize para Hesitações ('legal, mas não sei ainda', 'tô pensando', 'vou ver'):**
  Nunca pressione nem repita slogans. Valide a cautela do cliente com carinho e faça uma pergunta investigativa para descobrir o real gargalo:
  * *'Super compreendo a sua cautela, {human_name}! É uma decisão importante para a empresa. O que você está pesando mais agora: algum detalhe no visual do site, os tratamentos/serviços de {service} ou o investimento? Posso personalizar qualquer parte para vocês agora mesmo!'*

- **Tratamento de Objeções Específicas:**
  * **Dúvida de Resultado/Confiança ('como sei se vai trazer clientes?'):**
    Valide a pergunta e explique a diferença da Intenção de Busca.
    *'Excelente pergunta, {human_name}! A diferença é a intenção de busca. Quem pesquisa {service} no Google já quer agendar/comprar na hora, não está só olhando fotos. Nossa estrutura é desenhada justamente para converter esse clique no Google em uma mensagem no seu WhatsApp. Posso te mandar o protótipo amanhã para você ver como organizamos isso?'*
  * **Já tem site:** Elogie, mostre que isso facilita, e ofereça mostrar melhorias de conversão e velocidade (Next.js carrega em <1s) sem compromisso.
  * **Já usa Instagram:** Explique que o Instagram é vitrine, mas quem pesquisa {service} no Google já tem a urgência de contratar/agendar na hora.
  * **Sem tempo:** Responda de forma ultra-curta: *'Sem problemas! Deixo o link de 30 segundos pronto para você clicar quando tiver um intervalo.'*
  * **Ajustes de layout/fotos/cores:** Garanta que todas as alterações estão 100% inclusas no plano de R$ 147/mês.
  * **Como fechar/pagar:** Comemore com profissionalismo e explique que cobramos uma taxa de R$ 147 apenas quando o cliente aceita fechar negócio para colocar o site no ar (domínio), além da mensalidade de R$ 147.

- **Interpretação Contextual de Respostas Curtas ('Não', 'Nada'):**
  * Se a sua mensagem anterior perguntou se o cliente tinha dúvidas (*'ficou alguma dúvida?', 'posso esclarecer mais algo?'*), a resposta *'não'* significa **'não tenho dúvidas, pode avançar'**. Avance para fechar a demonstração!
  * Se o cliente disser *'não'* ao pitch, use a técnica Sandler de reversão suave antes de desistir: pergunte com elegância se é pela correria ou se já usa outro canal, mantendo a porta aberta sem parecer insistente.

## 4. BASE DE CONHECIMENTO E PROVAS REAIS (RAG)
- **Oferta Central:** Criação de protótipo personalizado em 24h sem custo inicial. Se aprovar e quiser fechar negócio, cobramos a taxa de R$ 147 para colocar no ar (domínio), e uma manutenção de R$ 147/mês com hospedagem ultra-rápida, SSL, painel analytics oficial e suporte contínuo sem fidelidade.
- **Portfólio Real:** www.concursosagora.com.br (página desenvolvida em Next.js com mais de 2.000 acessos/mês gerados no Google).
- **Linguagem do Nicho ({specialty}):** {niche_playbook.get('vocabulary', 'clientes e atendimentos')} | Dor principal: {niche_playbook.get('pain_point', 'Perda de clientes para concorrentes com site no Google')}.

## 5. 🚨 PROIBIÇÕES ABSOLUTAS (NUNCA VIOLE)
- ❌ NUNCA faça perguntas passivas de SAC/suporte como: *'Como posso ajudar?'*, *'Em que posso ser útil?'*, *'Posso esclarecer mais alguma coisa?'*, *'Algo mais?'*. O final da mensagem deve ser SEMPRE um CTA comercial de baixo atrito. Se o cliente fez uma pergunta/objeção, RESPONDA a ela primeiro. Ao final, se o modelo AINDA NÃO FOI ENVIADO, use: (*'Posso preparar o modelo para você ver no celular?'*). SE O MODELO JÁ FOI ENVIADO, conecte sua resposta com a página: (*'Dando uma olhada no modelo que te mandei, acha que essa estrutura passa mais confiança?'* ou ofereça ajustes).
- ❌ NUNCA invente que o contato veio de 'lista de inscritos', 'banco de dados' ou 'newsletter'. Sempre afirme com orgulho que foi no Google Maps público da cidade.
- ❌ NUNCA encerre a conversa pedindo desculpas desnecessárias se o cliente disser 'não' para uma pergunta de checagem.
- ❌ NUNCA escreva parágrafos gigantescos ou robóticos. Use o estilo natural, fluido e direto do WhatsApp (1 a 3 frases curtas).

## 6. FORMATO DE SAÍDA ESTRUTURADO (JSON OBRIGATÓRIO)
Responda EXCLUSIVAMENTE em JSON no seguinte formato:
{{
  "stage": "COLD" | "ENGAGED" | "DISCOVERY" | "INTEREST" | "SAMPLE_SENT" | "OBJECTION" | "NEGOTIATION" | "READY" | "CLOSED" | "LOST",
  "intent": "curiosidade" | "interesse" | "duvida" | "preco" | "prazo" | "confianca" | "falta_de_tempo" | "indecisao" | "rejeicao" | "compra_imediata" | "pedido_portfolio" | "ask_identity" | "yes" | "no" | "other",
  "emotion": "animado" | "desconfiado" | "ocupado" | "irritado" | "curioso" | "educado" | "seco" | "urgente" | "neutro",
  "thinking": "Raciocínio interno detalhado: análise do histórico, o que o lead quis dizer, qual a técnica aplicada e por que a resposta foi escolhida.",
  "strategy": "Técnica de venda aplicada (ex: 'Google Maps Origin Transparency + 24h Risk Reversal', 'Challenger Sale + Decode & Empathize')",
  "objective": "Objetivo imediato da resposta (ex: 'Transparência de contato e convite para ver modelo sem custo')",
  "clean_name": "{human_name}",
  "action": "advance_step" | "handle_objection" | "repeat_step" | "end_positive" | "end_negative" | "escalate_human" | "none",
  "suggested_next_step": 2 | "end_positive" | "end_negative" | null,
  "confidence": 0.98,
  "classification": "yes" | "no" | "doubt" | "ask_identity" | "objection_budget" | "objection_has_solution" | "objection_no_time" | "objection_already_uses_alternative" | "objection_portfolio" | "objection_trust" | "other",
  "generated_reply": "Sua resposta humanizada e persuasiva pronta para o WhatsApp (1 a 3 frases) conversando naturalmente com o lead."
}}"""

        user_prompt = f"""DADOS DO CONTATO:
- Nome: {human_name} ({raw_name})
- Cidade: {city}
- Serviço / Segmento: {service}
- Nicho / Especialidade: {specialty}
- Modelo de Site já enviado?: {'SIM' if has_sample_sent else 'NÃO'}
- Estágio Anterior: {previous_stage}
- Passo do Funil: {step_number}

HISTÓRICO COMPLETO DA CONVERSA (Ordem Cronológica):
"""
        if conversation_history:
            formatted_history = []
            for m in conversation_history[-10:]:
                speaker_label = f"Robô ({sender_name})" if m.get('role') in ['assistant', 'outbound'] else f"Cliente ({human_name})"
                formatted_history.append(f"- {speaker_label}: \"{m.get('content', '')}\"")
            user_prompt += "\n".join(formatted_history) + "\n"
        else:
            user_prompt += f"- Robô ({sender_name}): \"{bot_last_message}\"\n"

        user_prompt += f"""
ÚLTIMA MENSAGEM RECEBIDA DO CLIENTE PARA VOCÊ RESPONDER AGORA:
"{lead_message}"

Execute as 4 etapas mentais de raciocínio, preencha o campo 'thinking' com sua análise estratégica e gere a resposta final no formato JSON:"""

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
                stage = str(data.get("stage", "ENGAGED")).upper().strip()
                intent = str(data.get("intent") or data.get("classification") or "other").lower().strip()
                emotion = str(data.get("emotion", "neutro")).lower().strip()
                thinking = str(data.get("thinking", "")).strip()
                strategy = str(data.get("strategy", "")).strip()
                objective = str(data.get("objective", "")).strip()
                action = str(data.get("action", "")).lower().strip()
                suggested_step = data.get("suggested_next_step", data.get("next_step"))
                confidence = float(data.get("confidence", 0.95))
                parsed_clean_name = data.get("clean_name") or human_name
                generated_reply = data.get("generated_reply")
                classification = str(data.get("classification") or intent).lower().strip()

                # Normalização de ação se omitida
                if not action:
                    if stage in ["READY", "CLOSED"] or intent == "compra_imediata":
                        action = "end_positive"
                    elif stage == "LOST" or intent in ["rejeicao", "no", "opt_out"]:
                        action = "end_negative"
                    elif stage in ["OBJECTION", "NEGOTIATION", "SAMPLE_SENT"] or intent in ["duvida", "indecisao", "preco", "ask_identity"]:
                        action = "handle_objection"
                    elif intent == "yes" and step_number == 1:
                        action = "advance_step"
                    else:
                        action = "repeat_step"

                # Normalização de próximo passo
                if suggested_step is None:
                    if stage in ["READY", "CLOSED"]:
                        suggested_step = "end_positive"
                    elif stage == "LOST":
                        suggested_step = "end_negative"
                    elif intent == "yes" and step_number == 1:
                        suggested_step = 2
                    else:
                        suggested_step = step_number

                # Mapeia classificação legada para badges do dashboard
                if intent in ["yes", "compra_imediata"] or stage in ["READY", "CLOSED"]:
                    classification = "yes"
                elif intent in ["no", "rejeicao", "opt_out"] or stage == "LOST":
                    classification = "no"
                elif intent in ["duvida", "indecisao", "preco", "prazo", "curiosidade", "confianca", "objection_trust"]:
                    classification = "doubt"
                elif intent == "ask_identity":
                    classification = "ask_identity"
                elif intent == "pedido_portfolio":
                    classification = "objection_portfolio"

                return {
                    "stage": stage,
                    "intent": intent,
                    "emotion": emotion,
                    "thinking": thinking,
                    "strategy": strategy,
                    "objective": objective,
                    "classification": classification,
                    "action": action,
                    "next_step": suggested_step,
                    "suggested_next_step": suggested_step,
                    "confidence": confidence,
                    "clean_name": parsed_clean_name,
                    "reasoning": thinking or objective or f"Classificado no estágio {stage} com intenção {intent}",
                    "generated_reply": generated_reply
                }
        except Exception as e:
            error_str = str(e)
            logger.warning(f"Erro ao chamar CommercialAgent LLM ({self.provider}/{self.model}): {e}. Aplicando heurística avançada.")
            try:
                from src.core.alerts import add_alert
                if "429" in error_str or "quota" in error_str.lower():
                    add_alert("Cota de IA Atingida", "O limite de requisições da API Groq/OpenAI foi atingido (Rate Limit/Quota). O sistema ativou a heurística de contingência automaticamente para não perder leads.", "error")
                elif "Expecting value" in error_str or "JSON" in error_str:
                    add_alert("Alucinação de IA Detectada", "O provedor de LLM retornou um formato inválido. O sistema de proteção filtrou a resposta e acionou a contingência humana.", "warning")
                else:
                    add_alert("Falha de Comunicação com IA", f"Erro: {error_str[:100]}. Contingência ativada.", "warning")
            except Exception:
                pass

        # Heurística avançada com o mesmo framework mental
        return self._heuristic_fallback(
            message=lead_message,
            step_number=step_number,
            contact_name=raw_name,
            bot_last_message=bot_last_message,
            conversation_history=conversation_history,
            service=service,
            city=city,
            sender_name=sender_name,
            has_sample_sent=has_sample_sent
        )


    async def classify_response(self, user_message: str, expected_context: str = "") -> ClassificationResult:
        """Compatibilidade para classificação rápida de intenção."""
        decision = await self.decide_step_action(
            lead_message=user_message,
            bot_last_message=expected_context,
            step_number=1
        )
        return decision.get("classification", decision.get("intent", "other"))

    def _heuristic_fallback(
        self,
        message: str,
        step_number: int = 1,
        contact_name: str = "",
        bot_last_message: str = "",
        conversation_history: Optional[List[Dict[str, str]]] = None,
        service: str = "seus serviços",
        city: str = "São Paulo",
        sender_name: str = "Marco Antonio",
        has_sample_sent: bool = False
    ) -> Dict[str, Any]:
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

        # 1.1 Verificação de Fechamento Já Concluído (Anti-duplicação de Pitch / Fechamento de 24h)
        affirmative_closing_markers = [
            "já vou dar início", "já dei início", "vou estruturar a página", "já estou iniciando",
            "vou colocar a mão na massa", "vou criar uma versão ultra-rápida", "em até 24h te envio o link exclusivo",
            "em até 24 horas te envio o link exclusivo", "vou dar início à estrutura do seu site"
        ]
        last_bot_clean = (bot_last_message or "").lower()
        is_closing_statement = any(marker in last_bot_clean for marker in affirmative_closing_markers) and ("posso" not in last_bot_clean and not last_bot_clean.strip().endswith("?"))

        was_closing_sent = is_closing_statement
        if not was_closing_sent and conversation_history:
            for m in conversation_history:
                if m.get("role") == "assistant":
                    c_clean = m.get("content", "").lower()
                    if any(marker in c_clean for marker in affirmative_closing_markers) and ("posso" not in c_clean and not c_clean.strip().endswith("?")):
                        was_closing_sent = True
                        break

        if was_closing_sent:
            ack_phrases = [
                "perfeito", "obrigado", "obrigada", "show", "beleza", "ok", "otimo", "ótimo",
                "combinado", "valeu", "ate", "até", "boa tarde", "bom dia", "boa noite",
                "agradeco", "agradeço", "aguardo", "no aguardo", "top", "combinadissimo"
            ]
            words = msg_clean.split()
            if any(p in msg_clean for p in ack_phrases) or len(words) <= 3:
                return {
                    "classification": "other",
                    "intent": "other",
                    "action": "none",
                    "next_step": "end_positive",
                    "suggested_next_step": "end_positive",
                    "confidence": 0.98,
                    "clean_name": h_name,
                    "reasoning": "Lead enviou confirmação/agradecimento após o fechamento afirmativo já ter sido enviado."
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

        # 3.5 Dúvida sobre Resultados / Confiança (objection_trust)
        trust_phrases = [
            "traz cliente mesmo", "traz clientes mesmo", "traz resultado", "dar resultado",
            "funciona mesmo", "como vou saber", "da certo", "dá certo", "garante cliente",
            "garantia de cliente", "vai trazer", "compensa mesmo", "vale a pena"
        ]
        if any(p in msg for p in trust_phrases):
            return {
                "classification": "objection_trust",
                "intent": "objection_trust",
                "action": "handle_objection",
                "next_step": 2,
                "suggested_next_step": 2,
                "confidence": 0.95,
                "clean_name": h_name,
                "reasoning": "Heurística: lead com objeção sobre resultados/confiança na captação."
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
            "sim", "com certeza", "claro", "opa", "pode", "pode sim", "pode mandar", "quero", "quero ver",
            "quero sim", "pode ser", "topo", "pode fazer", "pode comecar", "pode começar", "pode montar",
            "pode preparar", "pode criar", "pode desenhar", "pode enviar", "manda", "manda ai", "manda aí",
            "manda sim", "bora", "vamos", "vamos sim", "fechado", "combinado", "perfeito", "otimo", "ótimo",
            "show", "beleza", "realizamos", "realizamos sim", "positivo", "manda ver", "faz sentido"
        ]
        for kw in yes_keywords:
            if re.search(rf"\b{re.escape(kw)}\b", msg_clean) or kw in msg:
                was_pitch_sent_heuristic = any(marker in (bot_last_message or "").lower() for marker in ["147", "protótipo", "prototipo", "esboço", "esboco", "google", "site", "modelo", "posso enviar", "posso te enviar"])
                if step_number > 1 or was_pitch_sent_heuristic:
                    return {
                        "stage": "READY",
                        "classification": "yes",
                        "intent": "yes",
                        "emotion": "animado",
                        "thinking": "Lead autorizou a criação/envio do modelo em 24h. Confirmo o início da personalização.",
                        "strategy": "Assumptive Close & Timeline Commitment",
                        "objective": "Confirmar produção do protótipo em 24h e encerrar positivamente",
                        "action": "end_positive",
                        "next_step": "end_positive",
                        "suggested_next_step": "end_positive",
                        "confidence": 0.98,
                        "clean_name": speaker or h_name,
                        "reasoning": "Heurística: aceite da proposta/esboço de 24h.",
                        "generated_reply": f"Perfeito, {speaker or h_name}! Já vou dar início à estrutura personalizada da página da sua clínica com foco em agendamentos de {service}. Em até 24h te envio o link exclusivo aqui no WhatsApp para você ver funcionando no celular!"
                    }
                else:
                    return {
                        "stage": "ENGAGED",
                        "classification": "yes",
                        "intent": "yes",
                        "emotion": "educado",
                        "thinking": "Lead confirmou atendimento no passo 1. Avanço para o pitch de demonstração em 24h.",
                        "strategy": "Value Pitch & Risk Reversal",
                        "objective": "Apresentar a oportunidade do Google e propor protótipo gratuito em 24h",
                        "action": "advance_step",
                        "next_step": 2,
                        "suggested_next_step": 2,
                        "confidence": 0.95,
                        "clean_name": speaker or h_name,
                        "reasoning": "Heurística: confirmação afirmativa de atendimento.",
                        "generated_reply": None
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

        # b) Desconfiança / Procedência do Contato (Google Maps)
        if any(w in msg_clean for w in ["e golpe", "é golpe", "quem indicou", "como conseguiu", "como pegou meu numero", "como pegaram meu contato", "como pegou meu contato", "quem passou meu contato", "onde pegou meu", "de onde e esse contato", "de onde pegou"]):
            return {
                "stage": "DISCOVERY",
                "intent": "objection_trust",
                "emotion": "desconfiado",
                "thinking": "Lead questionou como conseguimos o contato. Respondo com transparência (Google Maps público) e apresento o gancho comercial sem custo em 24h.",
                "strategy": "Google Maps Origin Transparency + 24h Risk Reversal",
                "objective": "Esclarecer procedência pelo Google Maps e convidar para ver o modelo",
                "classification": "objection_trust",
                "action": "repeat_step" if step_number == 1 else "handle_objection",
                "next_step": 2 if step_number == 1 else step_number,
                "suggested_next_step": 2 if step_number == 1 else step_number,
                "confidence": 0.95,
                "clean_name": h_name,
                "reasoning": "Heurística: procedência do contato via Google Maps público.",
                "generated_reply": f"Que ótimo, {h_name}! Encontrei seu contato no Google Maps e percebi que ainda não tem um site no topo da pesquisa quando alguém de {city} pesquisa por {service} / entra em contato, o que pode estar afastando potenciais clientes. Posso preparar um protótipo gratuito em 24h para você avaliar no celular?"
            }

        # c) Canais alternativos (Redes Sociais, WhatsApp apenas, etc.)
        if any(w in msg_clean for w in ["instagram", "insta", "facebook", "face", "redes sociais", "rede social", "so pelo whats", "boca a boca", "so por indicacao"]):
            return {
                "stage": "OBJECTION",
                "classification": "objection_already_uses_alternative",
                "intent": "objection_social_media",
                "action": "handle_objection",
                "next_step": 3,
                "suggested_next_step": 3,
                "confidence": 0.9,
                "clean_name": h_name,
                "reasoning": "Heurística: objeção por uso de canais alternativos de captação."
            }

        # d) Orçamento / Fluxo de Caixa / Pouco Dinheiro
        if any(w in msg_clean for w in ["sem orcamento", "sem orçamento", "sem grana", "sem dinheiro", "sem verba", "muito caro", "ta caro", "tá caro", "aperto financeiro", "nao posso gastar", "pouco caixa", "sem caixa", "baixo caixa", "fluxo de caixa"]):
            reply_text = f"Super compreendo o momento, {h_name}! Como você já está com o link do modelo aí, o que achou dele? A gente pode negociar o plano, o mais importante pra mim é ter a sua clínica aqui conosco." if has_sample_sent else f"Super compreendo o momento de caixa, {h_name}! Justamente por isso nós assumimos 100% do risco: você não paga 1 centavo para criar e ver a página pronta em 24h. Você só ativa por R$ 147/mês se realmente gostar do resultado — e 1 único novo cliente de {service} vindo do Google já paga o ano todo da ferramenta. Posso preparar a demonstração sem custo para você ver?"
            return {
                "stage": "OBJECTION",
                "intent": "objection_budget",
                "emotion": "desconfiado",
                "thinking": "Lead mencionou pouco caixa / orçamento apertado. Aplico Inversão de Risco total (24h grátis) e mostro o ROI de 1 único cliente.",
                "strategy": "Risk Reversal & ROI Framing",
                "objective": "Remover o risco financeiro e ancorar retorno rápido",
                "classification": "objection_budget",
                "action": "handle_objection",
                "next_step": 4,
                "suggested_next_step": 4,
                "confidence": 0.95,
                "clean_name": h_name,
                "reasoning": "Heurística: objeção de orçamento/caixa superada com inversão de risco.",
                "generated_reply": reply_text
            }

        # e) Já possui solução (Já tem site/fornecedor)
        if any(w in msg_clean for w in ["ja temos site", "já temos site", "ja possuimos site", "já possuímos site", "temos site", "nosso site", "meu site", "ja tenho fornecedor", "ja tenho equipe"]):
            return {
                "stage": "OBJECTION",
                "classification": "objection_has_solution",
                "intent": "objection_has_website",
                "action": "handle_objection",
                "next_step": 5,
                "suggested_next_step": 5,
                "confidence": 0.9,
                "clean_name": h_name,
                "reasoning": "Heurística: objeção de já possuir solução/site ativo."
            }

        # Verificação se o robô havia feito uma pergunta de dúvida anterior (ex: 'ficou alguma dúvida?', 'posso esclarecer mais algo?')
        last_bot_clean = (bot_last_message or "").lower()
        if msg_clean in ["nao", "não", "nenhuma", "nada", "nao tenho", "não tenho", "nao ficou", "não ficou", "tudo certo", "tudo ok"] and any(w in last_bot_clean for w in ["esclarecer", "duvida", "dúvida", "pergunta"]):
            return {
                "stage": "READY",
                "intent": "yes",
                "emotion": "educado",
                "thinking": "Lead respondeu 'não' para a pergunta de dúvidas, indicando que tudo está claro e está pronto para o modelo.",
                "strategy": "Assumptive Close",
                "objective": "Avançar para o início da montagem do protótipo gratuito em 24h",
                "classification": "yes",
                "action": "advance_step" if step_number == 1 else "end_positive",
                "next_step": 2 if step_number == 1 else "end_positive",
                "suggested_next_step": 2 if step_number == 1 else "end_positive",
                "confidence": 0.95,
                "clean_name": h_name,
                "reasoning": "Heurística: confirmação de ausência de dúvidas pós-esclarecimento.",
                "generated_reply": f"Maravilha, {h_name}! Já vou dar início à estrutura personalizada da sua página de {service}. Em até 24h te envio o link exclusivo aqui no WhatsApp para você ver funcionando no celular!"
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
        if any(w in msg_clean for w in ["qual o seu nome", "qual seu nome", "quem esta falando", "quem está falando", "quem fala", "com quem falo", "quem e voce", "quem é você", "quem e", "quem é", "de onde", "qual empresa"]):
            return {
                "stage": "DISCOVERY",
                "intent": "ask_identity",
                "emotion": "curioso",
                "thinking": "Lead perguntou a identidade do remetente. Apresento-me como consultor e faço o gancho comercial.",
                "strategy": "Direct Answer First + Value Hook",
                "objective": "Apresentar a Vetor Estratégico e propor a criação do modelo",
                "classification": "ask_identity",
                "action": "handle_objection",
                "next_step": 2 if step_number == 1 else step_number,
                "suggested_next_step": 2 if step_number == 1 else step_number,
                "confidence": 0.95,
                "clean_name": h_name,
                "reasoning": "Heurística: lead perguntou a identidade ou procedência do remetente.",
                "generated_reply": f"Olá, {h_name}! Me chamo {sender_name}, sou consultor da Vetor Estratégico. O motivo do contato é bem direto: notei que vocês são referência em {service} aqui em {city}, mas no Google vocês estão sem site no topo e perdem clientes para a concorrência. Posso personalizar um modelo sem custo em 24h para você avaliar?"
            }

        # 12. Saudações isoladas sem confirmação direta
        greetings = ["boa tarde", "bom dia", "boa noite", "ola", "olá", "oi", "oii", "oiii", "tudo bem", "tudo bom", "como vai"]
        if any(g in msg_clean for g in greetings) and len(msg_clean.split()) <= 6:
            return {
                "stage": "ENGAGED",
                "intent": "greeting",
                "emotion": "educado",
                "thinking": "Lead respondeu com saudação educada. Reitero o motivo do contato sobre o serviço.",
                "strategy": "Rapport + Service Verification",
                "objective": "Confirmar atuação no segmento para avançar",
                "classification": "other",
                "action": "repeat_step",
                "next_step": step_number,
                "suggested_next_step": step_number,
                "confidence": 0.85,
                "clean_name": h_name,
                "reasoning": "Heurística: saudação educada sem confirmação afirmativa do serviço.",
                "generated_reply": None
            }

        # 13. Dúvidas de Preço / Valores / Como Funciona
        if any(w in msg_clean for w in ["quanto custa", "qual o valor", "qual valor", "quanto fica", "qual o preco", "qual o preço", "valores", "tabela de preco", "como funciona"]):
            return {
                "stage": "NEGOTIATION" if step_number > 1 else "DISCOVERY",
                "intent": "preco" if ("quanto" in msg_clean or "valor" in msg_clean or "preco" in msg_clean or "preço" in msg_clean) else "doubt",
                "emotion": "curioso",
                "thinking": "Lead quer saber valores ou detalhes de funcionamento.",
                "strategy": "Price Value Anchor + Risk Reversal" if step_number > 1 else "Consultative Answer",
                "objective": "Ancorar valor de R$ 147/mês e propor demonstração",
                "classification": "doubt",
                "action": "repeat_step" if step_number == 1 else "handle_objection",
                "next_step": step_number,
                "suggested_next_step": step_number,
                "confidence": 0.95,
                "clean_name": h_name,
                "reasoning": "Heurística: dúvida de preço / investimento / funcionamento.",
                "generated_reply": f"Excelente pergunta, {h_name}! A manutenção fica apenas R$ 147/mês com hospedagem ultra-rápida, painel oficial e suporte inclusos, sem fidelidade. O que achou do modelo que te enviei?" if has_sample_sent else f"Excelente pergunta, {h_name}! A criação do modelo é 100% gratuita em 24h para você ver funcionando no celular. Se você gostar e colocar no ar, a manutenção fica apenas R$ 147/mês com hospedagem ultra-rápida, painel oficial e suporte inclusos, sem fidelidade. Posso preparar a demonstração?"
            }

        # 14. Dúvidas gerais sobre a proposta ou hesitações pós-modelo
        if any(w in msg_clean for w in ["to pensando", "tô pensando", "pensando", "nao sei bem", "não sei bem", "nao sei ainda", "não sei ainda", "legal mas", "vou ver", "vou analisar", "vou pensar", "quem e", "quem é", "como funciona", "sobre o que", "sei la", "sei lá", "nao sei", "não sei", "talvez", "estou em duvida", "estou em dúvida", "depende"]):
            return {
                "stage": "NEGOTIATION" if has_sample_sent else "DISCOVERY",
                "intent": "indecisao" if ("pensando" in msg_clean or "sei" in msg_clean) else "duvida",
                "emotion": "desconfiado" if ("pensando" in msg_clean or "sei" in msg_clean) else "curioso",
                "thinking": "Lead expressou hesitação ou dúvida. Aplico Decode & Empathize para destravar a conversa.",
                "strategy": "Challenger Sale + Decode & Empathize",
                "objective": "Diagnosticar o gargalo e oferecer personalizações gratuitas",
                "classification": "doubt",
                "action": "handle_objection",
                "next_step": step_number,
                "suggested_next_step": step_number,
                "confidence": 0.9,
                "clean_name": h_name,
                "reasoning": "Heurística: hesitação ou dúvida sobre a proposta.",
                "generated_reply": f"Super compreendo a sua cautela, {h_name}! É uma decisão importante para o negócio. O que você está pesando mais agora: algum detalhe no visual do site, a lista de tratamentos/serviços de {service} ou o investimento de R$ 147/mês? Posso ajustar qualquer parte agora mesmo para você!"
            }

        return {
            "stage": "ENGAGED",
            "intent": "other",
            "emotion": "neutro",
            "thinking": "Mensagem genérica do lead. Mantenho o foco no benefício do modelo em 24h.",
            "strategy": "Consultative Follow-up",
            "objective": "Reengajar o lead e conduzir para a demonstração",
            "classification": "other",
            "action": "repeat_step",
            "next_step": step_number,
            "suggested_next_step": step_number,
            "confidence": 0.85,
            "clean_name": h_name,
            "reasoning": "Heurística: mensagem neutra ou indefinida.",
            "generated_reply": f"Entendido, {h_name}! Como você já está com o link do modelo aí, conseguiu dar uma olhada? Se quiser, posso ajustar qualquer detalhe do visual, textos ou cores para ficar com a cara da sua empresa. O que achou?" if has_sample_sent else f"Entendido, {h_name}! A grande vantagem é que preparamos a estrutura focada em {service} sem você pagar nada adiantado. Você olha no celular e só decide depois de ver funcionando. Faz sentido eu te mandar a prévia amanhã?"
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
                "temperature": 0.4,
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
            "temperature": 0.4,
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
            "temperature": 0.4,
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


class LLMClassifier(CommercialAgent):
    """Alias retrocompatível para o CommercialAgent."""
    pass
