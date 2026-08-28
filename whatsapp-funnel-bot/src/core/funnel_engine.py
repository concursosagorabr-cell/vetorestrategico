import os
import json
import logging
import asyncio
import re
from datetime import datetime, timedelta, timezone
from typing import Dict, List, Optional, Any, Tuple
from uuid import UUID
import httpx

from src.database.models import Campaign, Contact, Message
from src.database.repository import CampaignRepository, ContactRepository, MessageRepository
from src.core.evolution_client import EvolutionClient
from src.core.llm_classifier import LLMClassifier, ClassificationResult
from src.core.niche_presets import get_niche_preset, normalize_niche_key

from src.core.name_cleaner import clean_human_name, detect_auto_reply, extract_speaker_name, extract_location_update

logger = logging.getLogger(__name__)

DEFAULT_SALES_FUNNEL_STEPS = [
    {
        "step": 1,
        "name": "A Isca - Topo de Funil",
        "message": "Oi, bom dia! Sou aqui de {city}. Vocês ainda trabalham com {service}?",
        "wait_for_reply": True,
        "timeout_hours": 24,
        "expected_response": "Confirmação de que a empresa atende o serviço solicitado.",
        "on_yes": {
            "next_step": 2,
            "message": "Maravilha, {name}! O motivo da pergunta é que notei que vocês estão sem site no Google e estão perdendo clientes por isso aqui em {city}. Eu crio sites de alta performance para o segmento de {service} e topo desenhar a página da sua empresa de graça. Em 24 horas te mando o link do site funcionando. Se você gostar do resultado, fechamos apenas a manutenção de R$ 147/mês. Sem contrato de fidelidade e risco zero. Se não quiser ficar com o site, não me paga nada. Posso começar o seu esboço para te mostrar amanhã?"
        },
        "on_no": {
            "next_step": "end_negative",
            "message": "Entendido! Muito obrigado pela atenção e sucesso nos negócios."
        },
        "on_greeting": {
            "next_step": 1,
            "message": "Olá, tudo bem? Sou aqui de {city} e gostaria de confirmar: vocês ainda realizam atendimento de {service}?"
        },
        "on_doubt": {
            "next_step": 1,
            "message": "Sou de {city} e estava pesquisando sobre {service} na região. Vocês ainda realizam esse atendimento?"
        },
        "on_other": {
            "next_step": 1,
            "message": "Olá! Gostaria apenas de verificar se vocês ainda atendem clientes na área de {service} aqui em {city}."
        }
    },
    {
        "step": 2,
        "name": "Pitch de 24h - Meio de Funil",
        "message": "Maravilha, {name}! O motivo da pergunta é que notei que vocês estão sem site no Google e estão perdendo clientes por isso aqui em {city}. Eu crio sites de alta performance para o segmento de {service} e topo desenhar a página da sua empresa de graça. Em 24 horas te mando o link do site funcionando. Se você gostar do resultado, fechamos apenas a manutenção de R$ 147/mês. Sem contrato de fidelidade e risco zero. Se não quiser ficar com o site, não me paga nada. Posso começar o seu esboço para te mostrar amanhã?",
        "wait_for_reply": True,
        "timeout_hours": 24,
        "expected_response": "Resposta do lead: aceitar o esboço sem custo, recusar ou apresentar objeções de rede social, orçamento ou já ter site.",
        "on_yes": {
            "next_step": "end_positive",
            "message": "Excelente decisão, {name}! Já estou iniciando o layout da sua empresa. Amanhã no mesmo horário te envio o link exclusivo com o site pronto para você testar!"
        },
        "on_no": {
            "next_step": "end_negative",
            "message": "Sem problemas, {name}! Agradeço pelo seu tempo. Se no futuro quiser posicionar sua empresa no Google, estarei à disposição!"
        },
        "on_objection_social_media": {
            "next_step": 3,
            "message": "O Instagram é ótimo como vitrine, mas quem pesquisa {service} em {city} no Google está com o problema na mão, querendo fechar na hora. O site não concorre com sua rede social, ele pesca o cliente que tem urgência. Topa dar uma olhada no esboço sem custo amanhã?"
        },
        "on_objection_budget": {
            "next_step": 4,
            "message": "Exatamente por isso eu assumo 100% do risco. Crio o design inicial sem te cobrar um centavo. Você só paga a taxa de R$ 147/mês se realmente gostar e colocar no ar. Um único cliente novo que o Google te trouxer no mês já paga isso com folga. Posso montar o layout?"
        },
        "on_objection_has_website": {
            "next_step": 5,
            "message": "Eu dei uma olhada e notei que a página demora alguns segundos para carregar no 3G/4G. O Google pune sites lentos não recomendando a página. Eu crio uma versão muito mais rápida. A gente joga os dois no PageSpeed Insights (ferramenta oficial do Google). Se o meu não for visivelmente mais rápido e com nota maior, não fechamos negócio. Posso fazer o teste?"
        },
        "on_doubt": {
            "next_step": 2,
            "message": "É sem pegadinhas: eu crio o esboço em 24h sem cobrar nada. Se aprovar, a manutenção é R$ 147/mês sem fidelidade. Se não quiser, risco zero. Posso começar o esboço da sua empresa?"
        },
        "on_greeting": {
            "next_step": 2,
            "message": "Olá! Posso preparar o esboço gratuito do seu site para você avaliar amanhã sem nenhum compromisso?"
        },
        "on_objection_portfolio": {
            "next_step": 2,
            "message": "Claro, {name}! www.concursosagora.com.br é uma das páginas que desenvolvemos.\n\nEm menos de um mês conseguimos mais de 2mil acessos para esse site, o seu site terá painel com login e senha administrativa para você poder acessar e conferir os acessos no seu site quando quiser. Utilizamos ferramentas oficiais do Google Analytics também. Não tem fidelidade, você pode cancelar o serviço quando quiser.\n\nNão criamos sites genéricos em HTML ou WordPress, como a maioria das empresas. Desenvolvemos sites modernos e de alta performance utilizando a tecnologia Next.js, proporcionando mais velocidade, segurança, excelente experiência para o usuário e uma estrutura otimizada para SEO.\n\nSeu site é desenvolvido com tecnologia de ponta para facilitar a indexação e melhorar seu potencial de posicionamento nos mecanismos de busca, como Google e Bing.\n\nPosso personalizar o modelo para a {name} sem custo nenhum para vocês verem funcionando em 24h?"
        },
        "on_ask_whats_included": {
            "next_step": 2,
            "message": "Excelente pergunta, {name}! No valor de R$ 147/mês está tudo incluso:\n\n• Desenvolvimento do site moderno e ultra-rápido em tecnologia Next.js\n• Hospedagem de alta velocidade e certificado de segurança SSL inclusos\n• Painel administrativo com login e senha para acompanhar métricas com Google Analytics oficial\n• Botão direto para WhatsApp e formulário de conversão\n• Suporte contínuo e atualizações\n• Zero contrato de fidelidade (cancele quando quiser)\n\nE você não paga nada adiantado: eu monto a página para você ver funcionando antes de tomar qualquer decisão. Posso gerar o esboço?"
        },
        "on_ask_hosting": {
            "next_step": 2,
            "message": "Sim, {name}, exatamente! O valor de R$ 147/mês já é com toda a hospedagem ultra-rápida, certificado de segurança SSL e suporte inclusos.\n\nVocê não precisa pagar nada a mais e nem contratar servidores por fora. E você só paga a mensalidade se aprovar o site funcionando em 24h. Posso preparar a demonstração sem custo?"
        },
        "on_objection_bot": {
            "next_step": 2,
            "message": "Totalmente compreensível a cautela, {name}! Me chamo {sender_name} e estou aqui acompanhando o atendimento. Usamos tecnologia para agilizar o contato inicial, mas todo o desenvolvimento, estratégia e suporte do site são feitos por nós de forma 100% personalizada para sua empresa aqui em {city}.\n\nVocê poderá ver e testar o protótipo real funcionando no seu celular antes de qualquer decisão. Posso gerar a prévia gratuita em 24h?"
        },
        "on_ask_identity": {
            "next_step": 2,
            "message": "Me chamo {sender_name}! O motivo da pergunta é bem direto: notei que vocês são referência em {service} aqui em {city}, mas quando alguém pesquisa no Google, vocês estão sem site no topo. Como o Google é onde as pessoas buscam prontas para agendar, vocês perdem clientes todo dia para a concorrência.\n\nEu criei um modelo de site profissional de alta conversão para o segmento de vocês. Posso personalizar esse esboço para a {name} sem custo nenhum para vocês verem funcionando em 24h? Se não gostarem, vida que segue. Se gostarem, custa apenas R$ 147/mês tudo incluso. Faz sentido eu te mandar o link amanhã?"
        }
    },
    {
        "step": 3,
        "name": "Tratativa Objeção - Redes Sociais",
        "message": "O Instagram é ótimo como vitrine, mas quem pesquisa {service} em {city} no Google está com o problema na mão, querendo fechar na hora. O site não concorre com sua rede social, ele pesca o cliente que tem urgência. Topa dar uma olhada no esboço sem custo amanhã?",
        "wait_for_reply": True,
        "timeout_hours": 24,
        "expected_response": "Resposta do lead à tratativa de Redes Sociais.",
        "on_yes": {
            "next_step": "end_positive",
            "message": "Perfeito, {name}! Vou montar a página focada em conversão para {service} e te envio o link amanhã. Obrigado!"
        },
        "on_no": {
            "next_step": "end_negative",
            "message": "Combinado, {name}! Fico à disposição se precisar de algo no futuro. Grande abraço!"
        }
    },
    {
        "step": 4,
        "name": "Tratativa Objeção - Orçamento",
        "message": "Exatamente por isso eu assumo 100% do risco. Crio o design inicial sem te cobrar um centavo. Você só paga a taxa de R$ 147/mês se realmente gostar e colocar no ar. Um único cliente novo que o Google te trouxer no mês já paga isso com folga. Posso montar o layout?",
        "wait_for_reply": True,
        "timeout_hours": 24,
        "expected_response": "Resposta do lead à tratativa de Orçamento.",
        "on_yes": {
            "next_step": "end_positive",
            "message": "Show de bola, {name}! Vou preparar o projeto com carinho e amanhã te apresento o resultado sem nenhum custo!"
        },
        "on_no": {
            "next_step": "end_negative",
            "message": "Tranquilo, {name}! Entendo seu posicionamento. Se mudar de ideia, estamos por aqui!"
        }
    },
    {
        "step": 5,
        "name": "Tratativa Objeção - Já Tem Site",
        "message": "Eu dei uma olhada e notei que a página demora alguns segundos para carregar no 3G/4G. O Google pune sites lentos não recomendando a página. Eu crio uma versão muito mais rápida. A gente joga os dois no PageSpeed Insights (ferramenta oficial do Google). Se o meu não for visivelmente mais rápido e com nota maior, não fechamos negócio. Posso fazer o teste?",
        "wait_for_reply": True,
        "timeout_hours": 24,
        "expected_response": "Resposta do lead ao teste de velocidade do Google.",
        "on_yes": {
            "next_step": "end_positive",
            "message": "Fechado, {name}! Vou criar uma versão ultra-rápida e em 24h te envio com o teste comparativo do Google. Até amanhã!"
        },
        "on_no": {
            "next_step": "end_negative",
            "message": "Combinado, {name}! Muito obrigado e parabéns pelo site atual."
        }
    }
]

class FunnelEngine:
    def __init__(self, db_session, evolution_client: EvolutionClient, classifier: LLMClassifier):
        self.db = db_session
        self.evolution = evolution_client
        self.classifier = classifier
        self.campaign_repo = CampaignRepository(db_session)
        self.contact_repo = ContactRepository(db_session)
        self.message_repo = MessageRepository(db_session)

    async def create_campaign(self, campaign_data: Any) -> Campaign:
        """Cria uma nova campanha a partir de um JSON ou lista direta de contatos."""
        # Se recebeu uma lista direta de contatos [ {...}, {...} ]
        if isinstance(campaign_data, list):
            campaign_data = {"contacts": campaign_data}
        elif not isinstance(campaign_data, dict):
            campaign_data = {}

        name = campaign_data.get("name") or campaign_data.get("campaign_name") or f"Prospecção - {datetime.now(timezone.utc).strftime('%d/%m/%Y %H:%M')}"
        
        # Identifica nicho e especialidade configurados
        niche_raw = (
            campaign_data.get("niche") or
            campaign_data.get("nicho") or
            campaign_data.get("specialty") or
            campaign_data.get("especialidade") or
            campaign_data.get("segmento") or
            campaign_data.get("settings", {}).get("niche") or
            campaign_data.get("settings", {}).get("specialty") or
            campaign_data.get("settings", {}).get("segmento") or
            "estetica"
        )
        niche_preset = get_niche_preset(niche_raw)

        script_config = campaign_data.get("steps") or campaign_data.get("script")
        if not script_config:
            script_config = niche_preset.get("steps", DEFAULT_SALES_FUNNEL_STEPS)

        settings = campaign_data.get("settings") or {}
        settings.setdefault("delay_between_contacts_seconds", 30)
        settings.setdefault("delay_between_messages_seconds", 5)
        settings.setdefault("default_city", niche_preset.get("default_city", "São Paulo"))
        settings.setdefault("default_service", niche_preset.get("default_service", "seus serviços"))
        settings.setdefault("niche", niche_preset.get("key", "estetica"))
        settings.setdefault("specialty", niche_preset.get("name", "Empresas e Serviços Locais"))
        settings.setdefault("niche_persona", niche_preset.get("ai_persona", ""))
        settings.setdefault("llm_provider", "groq")
        settings.setdefault("llm_model", "openai/gpt-oss-120b")

        # Suporta contatos em várias chaves comuns
        contacts_raw = (
            campaign_data.get("contacts") or
            campaign_data.get("contatos") or
            campaign_data.get("leads") or
            campaign_data.get("clinicas_estetica_sem_site") or
            campaign_data.get("clientes") or
            []
        )

        # Filtra contatos válidos e sanitiza telefone
        valid_contacts = []
        for contact_data in contacts_raw:
            if not isinstance(contact_data, dict):
                continue

            phone_raw = str(
                contact_data.get("phone") or
                contact_data.get("telefone") or
                contact_data.get("whatsapp") or
                contact_data.get("celular") or
                contact_data.get("tel") or
                ""
            ).strip()

            # Remove caracteres não numéricos e adiciona DDI 55 se necessário
            phone_clean = re.sub(r"[^\d]", "", phone_raw)
            if not phone_clean or phone_raw.lower() == "null" or phone_clean == "0":
                continue
            if len(phone_clean) in [10, 11] and not phone_clean.startswith("55"):
                phone_clean = "55" + phone_clean

            c_name = (
                contact_data.get("name") or
                contact_data.get("nome") or
                contact_data.get("estabelecimento") or
                contact_data.get("clinica") or
                contact_data.get("consultorio") or
                contact_data.get("empresa") or
                "Cliente"
            )

            service_val = (
                contact_data.get("service") or
                contact_data.get("servico") or
                contact_data.get("serviço") or
                contact_data.get("area_de_atuacao") or
                contact_data.get("area") or
                contact_data.get("ramo") or
                contact_data.get("nicho") or
                contact_data.get("especialidade") or
                contact_data.get("custom_data", {}).get("service")
            )

            city_val = (
                contact_data.get("city") or
                contact_data.get("cidade") or
                contact_data.get("municipio") or
                contact_data.get("custom_data", {}).get("city")
            )

            custom_data = dict(contact_data.get("custom_data", {}))
            if service_val:
                custom_data["service"] = service_val
            if city_val:
                custom_data["city"] = city_val

            for k, v in contact_data.items():
                if k not in ["name", "nome", "phone", "telefone", "whatsapp", "celular", "custom_data"]:
                    custom_data[k] = v

            valid_contacts.append({
                "name": c_name,
                "phone": phone_clean,
                "custom_data": custom_data
            })

        campaign = await self.campaign_repo.create(
            name=name,
            script_config=script_config,
            settings=settings,
            status="draft",
            total_contacts=len(valid_contacts)
        )

        for c in valid_contacts:
            await self.contact_repo.create(
                campaign_id=campaign.id,
                name=c["name"],
                phone=c["phone"],
                custom_data=c["custom_data"],
                current_step=0,
                status="pending"
            )

        logger.info(f"Campanha '{campaign.name}' criada com {campaign.total_contacts} contatos válidos.")
        return campaign

    async def start_campaign(self, campaign_id: UUID):
        """Inicia o disparo da campanha."""
        campaign = await self.campaign_repo.get(campaign_id)
        if not campaign:
            logger.error(f"Campanha {campaign_id} não encontrada.")
            return

        await self.campaign_repo.update_status(campaign_id, "running")
        contacts = await self.contact_repo.list_by_campaign(campaign_id)
        settings = campaign.settings or {}
        delay_between = settings.get("delay_between_contacts_seconds", 30)

        logger.info(f"Iniciando campanha '{campaign.name}' com {len(contacts)} contatos.")

        for contact in contacts:
            if contact.status != "pending":
                continue

            success = await self._send_step_message(contact, campaign)
            if success:
                await self.contact_repo.update(
                    contact.id,
                    status="waiting_reply",
                    last_message_at=datetime.now(timezone.utc)
                )
            else:
                await self.contact_repo.update(contact.id, status="error")

            # Delay entre contatos para evitar ban
            if delay_between > 0:
                await asyncio.sleep(delay_between)

    def _format_message(self, template: str, contact: Contact, campaign: Campaign, incoming_message: str = "") -> str:
        """Formata a mensagem substituindo variáveis {name}, {{name}}, {city}, {service} com higienização humana de nomes."""
        if not template:
            return ""

        settings = campaign.settings or {}
        custom_data = contact.custom_data or {}
        niche_key = custom_data.get("niche") or settings.get("niche") or "estetica"
        niche_preset = get_niche_preset(niche_key)

        human_name = clean_human_name(contact.name or "", incoming_message)

        vars_map = {
            "name": human_name,
            "nome": human_name,
            "clean_name": human_name,
            "phone": contact.phone or "",
            "telefone": contact.phone or "",
            "city": custom_data.get("city") or custom_data.get("cidade") or settings.get("default_city") or "São Paulo",
            "cidade": custom_data.get("city") or custom_data.get("cidade") or settings.get("default_city") or "São Paulo",
            "service": custom_data.get("service") or custom_data.get("servico") or custom_data.get("serviço") or custom_data.get("product") or settings.get("default_service") or "seus serviços",
            "servico": custom_data.get("service") or custom_data.get("servico") or custom_data.get("serviço") or custom_data.get("product") or settings.get("default_service") or "seus serviços",
            "serviço": custom_data.get("service") or custom_data.get("servico") or custom_data.get("serviço") or custom_data.get("product") or settings.get("default_service") or "seus serviços",
            "product": custom_data.get("product") or custom_data.get("service") or settings.get("default_service") or "seus produtos",
            "produto": custom_data.get("product") or custom_data.get("service") or settings.get("default_service") or "seus produtos",
            "niche": niche_preset.get("key", "estetica"),
            "nicho": niche_preset.get("key", "estetica"),
            "specialty": settings.get("specialty") or niche_preset.get("name", "Empresas Locais"),
            "especialidade": settings.get("specialty") or niche_preset.get("name", "Empresas Locais"),
            "sender_name": custom_data.get("sender_name") or settings.get("sender_name") or "Marco Antonio",
            "remetente": custom_data.get("sender_name") or settings.get("sender_name") or "Marco Antonio",
            "sender_company": custom_data.get("sender_company") or settings.get("sender_company") or "Vetor Estratégico",
            "sender_website": custom_data.get("sender_website") or settings.get("sender_website") or "www.vetorestrategico.com",
            "company_name": custom_data.get("company_name") or settings.get("company_name") or "Vetor Estratégico",
            "company_website": custom_data.get("company_website") or settings.get("company_website") or "www.vetorestrategico.com",
            "offer": custom_data.get("offer") or settings.get("offer") or niche_preset.get("offer_default") or "esboço gratuito de site em 24h",
            "oferta": custom_data.get("offer") or settings.get("offer") or niche_preset.get("offer_default") or "esboço gratuito de site em 24h",
            "price": custom_data.get("price") or settings.get("price") or niche_preset.get("price_default") or "R$ 147/mês",
            "preco": custom_data.get("price") or settings.get("price") or niche_preset.get("price_default") or "R$ 147/mês",
            "preço": custom_data.get("price") or settings.get("price") or niche_preset.get("price_default") or "R$ 147/mês",
            "alternative_channel": "Instagram e redes sociais"
        }

        # Extrai chaves adicionais de custom_data e settings
        for k, v in custom_data.items():
            if k not in vars_map:
                vars_map[k] = str(v)

        for k, v in settings.items():
            if k not in vars_map:
                vars_map[k] = str(v)

        formatted = template
        for k, v in vars_map.items():
            formatted = formatted.replace(f"{{{{{k}}}}}", str(v))
            formatted = formatted.replace(f"{{{k}}}", str(v))

        # Limpeza de pontuação caso o nome esteja vazio (ex: "Maravilha, !" -> "Maravilha!")
        formatted = re.sub(r",\s*!", "!", formatted)
        formatted = re.sub(r",\s*\?", "?", formatted)
        formatted = re.sub(r",\s*\.", ".", formatted)
        formatted = re.sub(r"\s+", " ", formatted).strip()

        return formatted

    def _find_step(self, script: list, step_ref: Any) -> Tuple[Optional[int], Optional[Dict[str, Any]]]:
        """Encontra o índice e a configuração do step no script por número do step ou índice."""
        if not script:
            return None, None

        # 1. Procura por correspondência exata do campo 'step'
        for idx, s in enumerate(script):
            if str(s.get("step")) == str(step_ref):
                return idx, s

        # 2. Tenta por índice numérico (0-based ou 1-based)
        try:
            num = int(step_ref)
            if 0 <= num < len(script):
                return num, script[num]
            if 0 <= num - 1 < len(script):
                return num - 1, script[num - 1]
        except (ValueError, TypeError):
            pass

        return None, None

    async def _send_step_message(self, contact: Contact, campaign: Campaign) -> bool:
        """Envia a mensagem do step atual para um contato."""
        script = campaign.script_config or []
        step_index = contact.current_step

        if step_index >= len(script):
            logger.info(f"Contato {contact.name} já completou todos os steps.")
            return True

        step = script[step_index]
        message_template = step.get("message")
        if not message_template:
            logger.info(f"Step {step_index} não possui mensagem inicial configurada.")
            return True

        # Substitui variáveis
        message = self._format_message(message_template, contact, campaign)

        # Envia via Evolution API
        success = await self.evolution.send_text_message(contact.phone, message)

        if success:
            await self.message_repo.create(
                contact_id=contact.id,
                direction="outbound",
                content=message,
                step_number=step_index
            )
            logger.info(f"Step {step_index} enviado para {contact.name} ({contact.phone})")

        return success

    async def handle_incoming_message(self, phone: str, text: str, campaign_id: UUID = None):
        """Processa uma mensagem recebida (via webhook)."""
        # Encontra o contato
        if campaign_id:
            contact = await self.contact_repo.get_by_phone(phone, campaign_id)
        else:
            # Tenta encontrar em contatos aguardando resposta (mais recente)
            from sqlalchemy import select, desc
            result = await self.db.execute(
                select(Contact).where(
                    Contact.phone == phone,
                    Contact.status == "waiting_reply"
                ).order_by(desc(Contact.created_at)).limit(1)
            )
            contact = result.scalar_one_or_none()

        if not contact:
            logger.warning(f"Mensagem de {phone} não associada a nenhum contato ativo.")
            return

        campaign = await self.campaign_repo.get(contact.campaign_id)
        if not campaign:
            return

        script = campaign.script_config or []
        current_step = script[contact.current_step] if contact.current_step < len(script) else None

        if not current_step or not current_step.get("wait_for_reply", False):
            return

        # Recupera histórico recente de mensagens do contato
        history_msgs = await self.message_repo.list_by_contact(contact.id)

        # Anti-Spam / Anti-Debounce: apenas se o contato enviou auto-respostas repetidas de ausência em lote
        if len(history_msgs) >= 2 and history_msgs[-1].direction == "outbound" and history_msgs[-2].direction == "inbound":
            is_auto, auto_type = detect_auto_reply(text)
            if is_auto and auto_type == "away":
                last_out_at = history_msgs[-1].created_at
                if last_out_at:
                    now_utc = datetime.now(timezone.utc)
                    last_dt = last_out_at.replace(tzinfo=timezone.utc) if last_out_at.tzinfo is None else last_out_at
                    diff = (now_utc - last_dt).total_seconds()
                    if 0 <= diff < 2:
                        logger.info(f"Anti-spam: Ignorando auto-resposta de ausência em lote ({diff:.1f}s) para {contact.name} ({phone})")
                        return

        bot_last_message = ""
        conv_history = []
        for m in history_msgs:
            role = "assistant" if m.direction == "outbound" else "user"
            conv_history.append({"role": role, "content": m.content})
            if m.direction == "outbound":
                bot_last_message = m.content

        # Salva a mensagem recebida no banco
        inbound_msg = await self.message_repo.create(
            contact_id=contact.id,
            direction="inbound",
            content=text,
            step_number=contact.current_step,
            raw_response=text
        )

        # Atualização dinâmica de localização (ex: "Nós estamos localizadas na Penha")
        new_loc = extract_location_update(text)
        if new_loc:
            if not contact.custom_data:
                contact.custom_data = {}
            contact.custom_data["city"] = new_loc
            contact.custom_data["cidade"] = new_loc

        # Atualização dinâmica de nome do interlocutor (ex: "Sou a Giovanna da DS Clinic")
        speaker = extract_speaker_name(text)
        if speaker:
            contact.name = speaker

        # Informações contextuais do contato
        settings = campaign.settings or {}
        custom_data = contact.custom_data or {}
        city = custom_data.get("city") or custom_data.get("cidade") or settings.get("default_city") or "São Paulo"
        service = custom_data.get("service") or custom_data.get("servico") or custom_data.get("serviço") or custom_data.get("product") or settings.get("default_service") or "seus serviços"
        
        niche_key = custom_data.get("niche") or custom_data.get("nicho") or custom_data.get("specialty") or settings.get("niche") or settings.get("specialty") or "estetica"
        niche_preset = get_niche_preset(niche_key)
        specialty = custom_data.get("specialty") or settings.get("specialty") or niche_preset.get("name")
        niche_persona = custom_data.get("niche_persona") or settings.get("niche_persona") or niche_preset.get("ai_persona")

        contact_info = {
            "name": contact.name,
            "phone": contact.phone,
            "city": city,
            "service": service,
            "niche": niche_preset.get("key", "estetica"),
            "specialty": specialty,
            "niche_persona": niche_persona,
            "custom_data": custom_data
        }

        # Decisão inteligente com IA e contexto do funil
        decision = await self.classifier.decide_step_action(
            lead_message=text,
            bot_last_message=bot_last_message,
            step_number=contact.current_step + 1,
            contact_info=contact_info,
            step_config=current_step,
            conversation_history=conv_history
        )
        if isinstance(decision, dict):
            decision["raw_message"] = text

        intent = decision.get("intent", "other")
        logger.info(f"Decisão IA para {contact.name} ({phone}): Intent={intent}, Action={decision.get('action')}, Reasoning={decision.get('reasoning')}")

        # Atualiza a mensagem inbound com a classificação
        inbound_msg.classification = intent
        await self.db.commit()

        # Executa a ação do funil baseada na decisão da IA
        await self._process_classification(contact, campaign, current_step, decision, bot_last_message=bot_last_message)

    async def _process_classification(self, contact: Contact, campaign: Campaign, step: Dict[str, Any], decision: Any, bot_last_message: str = ""):
        """Processa a classificação/decisão e executa o próximo passo na árvore do funil."""
        script = campaign.script_config or []

        # Suporta dict ou string para compatibilidade
        if isinstance(decision, dict):
            intent = decision.get("intent") or decision.get("classification", "other")
            action = decision.get("action", "")
            next_step_hint = decision.get("suggested_next_step", decision.get("next_step"))
            raw_msg = decision.get("raw_message", "")
        else:
            intent = str(decision)
            action = ""
            next_step_hint = None
            raw_msg = ""

        # Compliance: se o lead solicitou opt-out, encerra imediatamente sem nova mensagem
        if intent == "opt_out":
            logger.info(f"Compliance: Lead {contact.name} ({contact.phone}) solicitou opt-out. Encerrando sem nova mensagem.")
            await self.contact_repo.update(
                contact.id,
                status="completed",
                result="negative",
                current_step=contact.current_step
            )
            return

        branch_key = f"on_{intent}"
        branch = step.get(branch_key)

        # Fallbacks inteligentes por tipo de intenção
        if not branch:
            if intent in ["objection_already_uses_alternative", "objection_social_media"]:
                branch = step.get("on_objection_already_uses_alternative") or step.get("on_objection_social_media") or step.get("on_doubt")
            elif intent in ["objection_has_solution", "objection_has_website"]:
                branch = step.get("on_objection_has_solution") or step.get("on_objection_has_website") or step.get("on_doubt")
            elif intent == "objection_portfolio":
                branch = step.get("on_objection_portfolio") or step.get("on_objection_trust") or step.get("on_doubt")
            elif intent == "ask_whats_included":
                branch = step.get("on_ask_whats_included") or step.get("on_doubt")
            elif intent == "ask_hosting":
                branch = step.get("on_ask_hosting") or step.get("on_doubt")
            elif intent == "objection_bot":
                branch = step.get("on_objection_bot") or step.get("on_objection_trust")
            elif intent == "ask_identity":
                branch = step.get("on_ask_identity") or step.get("on_greeting")
            elif intent == "objection_no_time" and step.get("on_objection_no_time"):
                branch = step.get("on_objection_no_time")
            elif intent == "objection_trust" and step.get("on_objection_trust"):
                branch = step.get("on_objection_trust")
            elif intent.startswith("objection_") and step.get("on_doubt"):
                branch = step.get("on_doubt")
            elif intent in ["greeting", "other"] and step.get("on_greeting"):
                branch = step.get("on_greeting")
            elif intent in ["greeting", "other"] and step.get("on_doubt"):
                branch = step.get("on_doubt")
            elif intent in ["greeting", "doubt", "other"] and step.get("on_other"):
                branch = step.get("on_other")
            elif step.get("on_any"):
                branch = step.get("on_any")
            else:
                branch = {}

        next_step = None
        response_message = None
        if isinstance(branch, dict):
            next_step = branch.get("next_step") if "next_step" in branch else branch.get("step")
            response_message = branch.get("message") or branch.get("mensagem") or branch.get("text")
        elif isinstance(branch, (int, str)):
            next_step = branch

        # Tratamento especial para mensagens automáticas de ausência (away)
        if intent == "away":
            clean_nm = clean_human_name(contact.name, raw_msg)
            nm_str = f", {clean_nm}" if clean_nm else ""
            response_message = f"Perfeito{nm_str}! Fico no aguardo quando tiver um tempinho disponível. Um abraço!"
            next_step = contact.current_step + 1

        # Tratamento especial para saudações e dúvidas sem ramificação configurada:
        elif intent in ["greeting", "doubt", "other"] and not response_message and (next_step is None or next_step == contact.current_step + 1 or next_step == 1):
            if contact.current_step == 0:  # Passo 1 (A Isca)
                response_message = "Olá, tudo bem? Sou aqui de {city} e gostaria de confirmar: vocês ainda realizam atendimento de {service}?"
                next_step = 1
            else:
                response_message = "Olá! Caso tenha alguma dúvida sobre o esboço sem custo da página de {service}, estou à disposição!"
                next_step = contact.current_step + 1

        # Se for SIM no Passo 1 e o próximo step for o Passo 2:
        if intent == "yes" and not response_message and (next_step == 2 or contact.current_step == 0):
            target_idx, target_step = self._find_step(script, 2)
            if target_step and target_step.get("message"):
                response_message = target_step.get("message")
                next_step = 2

        # Se a ramificação tiver uma mensagem de resposta configurada, envia para o WhatsApp
        if response_message:
            formatted_msg = self._format_message(response_message, contact, campaign, incoming_message=raw_msg)
            
            # Anti-loop / Anti-repetição exata: se a mensagem for idêntica à última enviada pelo bot, varia a resposta
            if bot_last_message and formatted_msg.strip() == bot_last_message.strip():
                if intent == "ask_hosting":
                    formatted_msg = self._format_message(
                        "Sim, {name}, exatamente! O valor de {price} já inclui hospedagem de alta velocidade, certificado SSL e suporte técnico contínuo. Posso te enviar a demonstração sem custo para você avaliar?",
                        contact, campaign, incoming_message=raw_msg
                    )
                elif intent == "ask_whats_included":
                    formatted_msg = self._format_message(
                        "No valor de {price} está tudo incluso: desenvolvimento moderno do site em Next.js, hospedagem, painel administrativo com Google Analytics oficial e suporte contínuo sem contrato de fidelidade. Posso preparar o protótipo?",
                        contact, campaign, incoming_message=raw_msg
                    )
                elif intent == "objection_portfolio":
                    formatted_msg = self._format_message(
                        "Você pode conferir www.concursosagora.com.br, que atingiu mais de 2 mil acessos no primeiro mês com tecnologia Next.js e SEO. Posso personalizar o modelo para a {name} sem custo?",
                        contact, campaign, incoming_message=raw_msg
                    )

            await self.evolution.send_text_message(contact.phone, formatted_msg)
            await self.message_repo.create(
                contact_id=contact.id,
                direction="outbound",
                content=formatted_msg,
                step_number=contact.current_step,
                classification=intent
            )

        # Decide a transição de estado do contato
        if next_step == "end_positive" or (intent == "yes" and contact.current_step > 0 and next_step is None):
            await self.contact_repo.update(
                contact.id,
                status="completed",
                result="positive",
                current_step=contact.current_step + 1,
                last_message_at=datetime.now(timezone.utc)
            )
            logger.info(f"Contato {contact.name} ({contact.phone}) finalizado como POSITIVO.")
        elif next_step == "end_negative" or (intent == "no" and next_step is None):
            await self.contact_repo.update(
                contact.id,
                status="completed",
                result="negative",
                current_step=contact.current_step + 1,
                last_message_at=datetime.now(timezone.utc)
            )
            logger.info(f"Contato {contact.name} ({contact.phone}) finalizado como NEGATIVO.")
        elif next_step == "end_timeout":
            await self.contact_repo.update(
                contact.id,
                status="completed",
                result="timeout",
                current_step=contact.current_step + 1,
                last_message_at=datetime.now(timezone.utc)
            )
        elif next_step is not None:
            # Encontra o próximo step na árvore do funil
            target_idx, target_step = self._find_step(script, next_step)
            if target_idx is not None and target_step is not None:
                await self.contact_repo.update(
                    contact.id,
                    current_step=target_idx,
                    status="waiting_reply" if target_step.get("wait_for_reply", True) else "completed",
                    last_message_at=datetime.now(timezone.utc)
                )

                # Se não enviamos uma mensagem na ramificação e o próximo step possui mensagem inicial diferente, envia
                if not response_message and target_step.get("message") and target_idx != contact.current_step:
                    contact.current_step = target_idx
                    await self._send_step_message(contact, campaign)
                    await self.contact_repo.update(
                        contact.id,
                        status="waiting_reply" if target_step.get("wait_for_reply", True) else "completed",
                        last_message_at=datetime.now(timezone.utc)
                    )
            else:
                logger.warning(f"Próximo step '{next_step}' não encontrado no roteiro.")
                result = "positive" if intent == "yes" else "negative" if intent == "no" else None
                if result:
                    await self.contact_repo.update(
                        contact.id,
                        status="completed",
                        result=result,
                        last_message_at=datetime.now(timezone.utc)
                    )
                else:
                    await self.contact_repo.update(
                        contact.id,
                        status="waiting_reply",
                        last_message_at=datetime.now(timezone.utc)
                    )
        else:
            # Sem próximo step configurado
            if intent in ["greeting", "doubt", "other"]:
                # Permanece aguardando o lead
                await self.contact_repo.update(
                    contact.id,
                    status="waiting_reply",
                    last_message_at=datetime.now(timezone.utc)
                )
            else:
                result = "positive" if intent == "yes" else "negative"
                await self.contact_repo.update(
                    contact.id,
                    status="completed",
                    result=result,
                    current_step=contact.current_step + 1,
                    last_message_at=datetime.now(timezone.utc)
                )

    async def check_timeouts(self):
        """Verifica contatos que passaram do tempo de resposta."""
        from sqlalchemy import select

        timeout_hours = 24
        cutoff = datetime.now(timezone.utc) - timedelta(hours=timeout_hours)

        result = await self.db.execute(
            select(Contact).where(
                Contact.status == "waiting_reply",
                Contact.last_message_at < cutoff
            )
        )
        timed_out = result.scalars().all()

        for contact in timed_out:
            campaign = await self.campaign_repo.get(contact.campaign_id)
            if not campaign:
                continue

            script = campaign.script_config or []
            if contact.current_step < len(script):
                step = script[contact.current_step]
                on_timeout = step.get("on_timeout", {})
                timeout_msg = on_timeout.get("message")
                next_step = on_timeout.get("next_step", "end_timeout")

                if timeout_msg:
                    formatted_msg = self._format_message(timeout_msg, contact, campaign)
                    await self.evolution.send_text_message(contact.phone, formatted_msg)
                    await self.message_repo.create(
                        contact_id=contact.id,
                        direction="outbound",
                        content=formatted_msg,
                        step_number=contact.current_step
                    )

                await self.contact_repo.update(
                    contact.id,
                    status="completed",
                    result="timeout",
                    current_step=contact.current_step + 1
                )
                logger.info(f"Contato {contact.name} marcado como TIMEOUT.")

    async def get_report(self, campaign_id: UUID) -> Dict[str, Any]:
        """Gera relatório da campanha."""
        campaign = await self.campaign_repo.get(campaign_id)
        if not campaign:
            return {}

        contacts = await self.contact_repo.list_by_campaign(campaign_id)
        results = await self.contact_repo.get_results(campaign_id)

        positive = [c for c in contacts if c.result == "positive"]
        negative = [c for c in contacts if c.result == "negative"]
        timeout = [c for c in contacts if c.result == "timeout"]
        pending = [c for c in contacts if c.status in ["pending", "waiting_reply"]]

        return {
            "campaign_name": campaign.name,
            "status": campaign.status,
            "total_contacts": len(contacts),
            "positive": len(positive),
            "negative": len(negative),
            "timeout": len(timeout),
            "pending": len(pending),
            "conversion_rate": round(len(positive) / len(contacts) * 100, 1) if contacts else 0,
            "positive_list": [{"name": c.name, "phone": c.phone} for c in positive],
            "negative_list": [{"name": c.name, "phone": c.phone} for c in negative],
            "results_breakdown": {r: count for r, count in results}
        }

