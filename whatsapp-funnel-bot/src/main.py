import os
import json
import logging
from contextlib import asynccontextmanager
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, HTTPException, Request, Depends, BackgroundTasks
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from src.database.models import Base
from src.core.evolution_client import EvolutionClient
from src.core.llm_classifier import LLMClassifier
from src.core.funnel_engine import FunnelEngine
from src.database.repository import CampaignRepository, ContactRepository, MessageRepository

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Configurações
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://agent:agentpass@app-db:5432/funnel_bot")
engine = create_async_engine(DATABASE_URL, echo=False)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

ADMIN_USER = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASS = os.getenv("ADMIN_PASSWORD", "admin")
security = HTTPBasic()

def verify_credentials(credentials: HTTPBasicCredentials = Depends(security)):
    if credentials.username != ADMIN_USER or credentials.password != ADMIN_PASS:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    return credentials.username

async def get_db():
    async with async_session() as session:
        yield session

# Scheduler para verificar timeouts
scheduler = AsyncIOScheduler()

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Inicializando banco de dados...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        try:
            from sqlalchemy import text
            await conn.execute(text("ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ;"))
        except Exception as e:
            logger.debug(f"Migração de coluna started_at: {e}")

    # Inicializa Evolution API
    evo = EvolutionClient()
    await evo.create_instance()

    # Inicia scheduler de timeouts
    scheduler.start()

    logger.info("Aplicação pronta.")
    yield

    scheduler.shutdown()
    logger.info("Aplicação encerrada.")

app = FastAPI(title="WhatsApp Funnel Bot", lifespan=lifespan)
app.mount("/static", StaticFiles(directory="src/dashboard/static"), name="static")

# ============ ENDPOINTS DA API ============

@app.get("/", response_class=HTMLResponse)
async def dashboard():
    with open("src/dashboard/static/index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.post("/api/campaigns")
async def create_campaign(request: Request, db: AsyncSession = Depends(get_db), user: str = Depends(verify_credentials)):
    """Cria uma nova campanha a partir de um JSON."""
    data = await request.json()

    evo = EvolutionClient()
    classifier = LLMClassifier()
    engine = FunnelEngine(db, evo, classifier)

    campaign = await engine.create_campaign(data)
    return {"id": str(campaign.id), "name": campaign.name, "status": campaign.status}

@app.post("/api/campaigns/{campaign_id}/start")
async def start_campaign(campaign_id: str, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db), user: str = Depends(verify_credentials)):
    """Inicia o disparo de uma campanha."""
    from uuid import UUID
    cid = UUID(campaign_id)

    evo = EvolutionClient()
    classifier = LLMClassifier()
    engine = FunnelEngine(db, evo, classifier)

    # Executa em background para não bloquear a resposta
    background_tasks.add_task(engine.start_campaign, cid)

    return {"message": "Campanha iniciada", "campaign_id": campaign_id}

@app.get("/api/campaigns")
async def list_campaigns(db: AsyncSession = Depends(get_db), user: str = Depends(verify_credentials)):
    """Lista todas as campanhas com contagem de leads contactados e data de início."""
    repo = CampaignRepository(db)
    campaigns = await repo.list_all()
    contacted_map = await repo.get_contacted_counts()

    return [
        {
            "id": str(c.id),
            "name": c.name,
            "status": c.status,
            "total_contacts": c.total_contacts,
            "contacted_count": contacted_map.get(c.id, 0),
            "created_at": c.created_at.isoformat() if c.created_at else None,
            "started_at": c.started_at.isoformat() if c.started_at else None
        }
        for c in campaigns
    ]

@app.get("/api/campaigns/{campaign_id}")
async def get_campaign(campaign_id: str, db: AsyncSession = Depends(get_db), user: str = Depends(verify_credentials)):
    """Obtém detalhes de uma campanha."""
    from uuid import UUID
    repo = CampaignRepository(db)
    campaign = await repo.get(UUID(campaign_id))
    if not campaign:
        raise HTTPException(status_code=404, detail="Campanha não encontrada")

    contact_repo = ContactRepository(db)
    contacts = await contact_repo.list_by_campaign(UUID(campaign_id))

    return {
        "id": str(campaign.id),
        "name": campaign.name,
        "status": campaign.status,
        "total_contacts": len(contacts),
        "contacts": [
            {
                "id": str(c.id),
                "name": c.name,
                "phone": c.phone,
                "status": c.status,
                "result": c.result,
                "current_step": c.current_step
            }
            for c in contacts
        ]
    }

@app.get("/api/campaigns/{campaign_id}/report")
async def get_report(campaign_id: str, db: AsyncSession = Depends(get_db), user: str = Depends(verify_credentials)):
    """Gera relatório de resultados da campanha."""
    from uuid import UUID
    evo = EvolutionClient()
    classifier = LLMClassifier()
    engine = FunnelEngine(db, evo, classifier)

    report = await engine.get_report(UUID(campaign_id))
    if not report:
        raise HTTPException(status_code=404, detail="Campanha não encontrada")

    return report

@app.post("/api/campaigns/{campaign_id}/export")
async def export_results(campaign_id: str, db: AsyncSession = Depends(get_db), user: str = Depends(verify_credentials)):
    """Exporta resultados em JSON."""
    from uuid import UUID
    evo = EvolutionClient()
    classifier = LLMClassifier()
    engine = FunnelEngine(db, evo, classifier)

    report = await engine.get_report(UUID(campaign_id))

    # Salva em arquivo
    filename = f"campaign_{campaign_id}_report.json"
    filepath = f"campaigns/{filename}"
    os.makedirs("campaigns", exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

@app.delete("/api/campaigns/{campaign_id}")
async def delete_campaign(campaign_id: str, db: AsyncSession = Depends(get_db), user: str = Depends(verify_credentials)):
    """Exclui uma campanha e todas as suas mensagens e contatos associados."""
    from uuid import UUID
    camp_repo = CampaignRepository(db)
    try:
        cid = UUID(str(campaign_id))
    except Exception:
        raise HTTPException(status_code=400, detail="ID de campanha inválido")

    campaign = await camp_repo.get(cid)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campanha não encontrada")

    await camp_repo.delete(cid)
    return {"status": "deleted", "id": str(cid), "message": f"Campanha '{campaign.name}' excluída com sucesso."}

# ============ CONVERSAS EM TEMPO REAL ============

@app.get("/api/conversations")
async def get_conversations(db: AsyncSession = Depends(get_db), user: str = Depends(verify_credentials)):
    """Retorna lista de conversas com contatos e suas últimas mensagens para monitoramento ao vivo."""
    from uuid import UUID
    c_repo = ContactRepository(db)
    m_repo = MessageRepository(db)
    camp_repo = CampaignRepository(db)

    try:
        contacts = await c_repo.list_all(limit=100)
        campaigns_cache = {}
        result = []

        for c in contacts:
            c_camp_id = None
            if c.campaign_id:
                try:
                    c_camp_id = UUID(str(c.campaign_id))
                except Exception:
                    pass

            if c_camp_id and c_camp_id not in campaigns_cache:
                camp = await camp_repo.get(c_camp_id)
                campaigns_cache[c_camp_id] = camp.name if camp else "Desconhecida"

            c_id = None
            try:
                c_id = UUID(str(c.id))
            except Exception:
                pass

            messages = await m_repo.list_by_contact(c_id) if c_id else []
            last_msg = messages[-1] if messages else None

            result.append({
                "id": str(c.id),
                "campaign_id": str(c.campaign_id) if c.campaign_id else None,
                "campaign_name": campaigns_cache.get(c_camp_id, "Desconhecida"),
                "name": c.name,
                "phone": c.phone,
                "status": c.status,
                "result": c.result,
                "current_step": c.current_step,
                "custom_data": c.custom_data or {},
                "total_messages": len(messages),
                "last_message": {
                    "text": last_msg.content if last_msg else None,
                    "direction": last_msg.direction if last_msg else None,
                    "classification": last_msg.classification if last_msg else None,
                    "created_at": last_msg.created_at.isoformat() if (last_msg and last_msg.created_at) else None
                } if last_msg else None,
                "last_message_at": c.last_message_at.isoformat() if c.last_message_at else (c.created_at.isoformat() if c.created_at else None)
            })

        return result
    except Exception as e:
        logger.error(f"Erro em get_conversations: {e}", exc_info=True)
        return []

@app.get("/api/contacts/{contact_id}/messages")
async def get_contact_messages(contact_id: str, db: AsyncSession = Depends(get_db), user: str = Depends(verify_credentials)):
    """Retorna o histórico completo de mensagens de um contato para o chat ao vivo."""
    from uuid import UUID
    c_repo = ContactRepository(db)
    m_repo = MessageRepository(db)
    camp_repo = CampaignRepository(db)

    try:
        cid = UUID(str(contact_id))
    except Exception:
        raise HTTPException(status_code=400, detail="ID de contato inválido")

    contact = await c_repo.get(cid)
    if not contact:
        raise HTTPException(status_code=404, detail="Contato não encontrado")

    camp_id = None
    if contact.campaign_id:
        try:
            camp_id = UUID(str(contact.campaign_id))
        except Exception:
            pass

    camp = await camp_repo.get(camp_id) if camp_id else None
    messages = await m_repo.list_by_contact(cid)

    return {
        "contact": {
            "id": str(contact.id),
            "campaign_id": str(contact.campaign_id) if contact.campaign_id else None,
            "campaign_name": camp.name if camp else "Desconhecida",
            "name": contact.name,
            "phone": contact.phone,
            "status": contact.status,
            "result": contact.result,
            "current_step": contact.current_step,
            "custom_data": contact.custom_data or {}
        },
        "messages": [
            {
                "id": str(m.id),
                "direction": m.direction,
                "text": m.content,
                "step": m.step_number,
                "classification": m.classification,
                "created_at": m.created_at.isoformat() if m.created_at else None
            }
            for m in messages
        ]
    }

@app.get("/api/niches")
async def list_niches():
    """Retorna os nichos e especialidades de mercado disponíveis."""
    from src.core.niche_presets import get_available_niches, NICHE_PRESETS
    return {
        "niches": get_available_niches(),
        "presets": NICHE_PRESETS
    }

# ============ WEBHOOK ============

# Cache de deduplicação de webhooks (ID da mensagem -> timestamp) para evitar reprocessamento concorrente
_processed_webhook_messages: dict = {}

def _is_duplicate_webhook_msg(msg_id: str) -> bool:
    """Verifica e registra o ID da mensagem no cache com expiração de 10 minutos."""
    if not msg_id:
        return False
    now = datetime.now().timestamp()
    # Limpeza de chaves antigas (> 600 segundos)
    expired = [k for k, ts in _processed_webhook_messages.items() if now - ts > 600]
    for k in expired:
        _processed_webhook_messages.pop(k, None)

    if msg_id in _processed_webhook_messages:
        return True
    _processed_webhook_messages[msg_id] = now
    return False

@app.post("/webhook/evolution")
async def evolution_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    """Recebe webhooks do Evolution API quando chegam mensagens."""
    data = await request.json()

    # Log para debug
    logger.debug(f"Webhook recebido: {json.dumps(data, indent=2)}")

    # Extrai dados da mensagem
    event = data.get("event")
    if event != "messages.upsert":
        return {"status": "ignored"}

    message_data = data.get("data", {})
    if not message_data:
        return {"status": "ignored"}

    # Verifica se é mensagem recebida (não enviada pelo bot)
    key = message_data.get("key", {})
    if key.get("fromMe", True):
        return {"status": "ignored"}

    msg_id = key.get("id", "")
    if msg_id and _is_duplicate_webhook_msg(msg_id):
        logger.info(f"Webhook duplicado ignorado para message_id: {msg_id}")
        return {"status": "ignored", "reason": "duplicate_message_id"}

    phone = key.get("remoteJid", "").replace("@s.whatsapp.net", "").replace("@g.us", "")
    message_content = message_data.get("message", {})

    # Extrai texto da mensagem
    text = ""
    if "conversation" in message_content:
        text = message_content["conversation"]
    elif "extendedTextMessage" in message_content:
        text = message_content["extendedTextMessage"].get("text", "")
    elif "buttonsResponseMessage" in message_content:
        text = message_content["buttonsResponseMessage"].get("selectedDisplayText", "")

    if not text:
        return {"status": "ignored"}

    logger.info(f"Mensagem recebida de {phone}: {text}")

    # Processa a mensagem
    evo = EvolutionClient()
    classifier = LLMClassifier()
    engine = FunnelEngine(db, evo, classifier)

    try:
        await engine.handle_incoming_message(phone, text)
    except Exception as e:
        logger.error(f"Erro inesperado no processamento de mensagem de {phone}: {e}", exc_info=True)
        try:
            from src.core.alerts import add_alert
            add_alert("Erro no Processamento", f"Falha crítica ao processar mensagem do número {phone}. O webhook foi reiniciado. Erro: {str(e)[:100]}", "error")
        except Exception:
            pass
        if msg_id:
            _processed_webhook_messages.pop(msg_id, None)
        return {"status": "error", "reason": "internal_error"}

    return {"status": "processed"}

# ============ ACTIONS ============

@app.post("/api/contacts/{contact_id}/send-link")
async def send_model_link(contact_id: str, request: Request, db: AsyncSession = Depends(get_db), user: str = Depends(verify_credentials)):
    """Envia um link de modelo de site para o cliente via atendente manual."""
    from uuid import UUID
    data = await request.json()
    link = data.get("link")
    if not link:
        raise HTTPException(status_code=400, detail="Link não fornecido")

    c_repo = ContactRepository(db)
    m_repo = MessageRepository(db)

    try:
        cid = UUID(str(contact_id))
    except Exception:
        raise HTTPException(status_code=400, detail="ID de contato inválido")

    contact = await c_repo.get(cid)
    if not contact:
        raise HTTPException(status_code=404, detail="Contato não encontrado")

    evo = EvolutionClient()

    from src.core.name_cleaner import clean_human_name
    human_name = clean_human_name(contact.name or "Cliente")
    message_text = (
        f"Perfeito, {human_name}! Acabei de separar o link do modelo de site personalizado "
        f"focado no seu negócio para você dar uma olhada. Acesse aqui: {link}\n\n"
        f"O que achou da estrutura? Faz sentido para começarmos a captar mais clientes?"
    )

    # Envia a mensagem via Evolution API
    success = await evo.send_text_message(contact.phone, message_text)

    if success:
        # Salva a mensagem no histórico
        await m_repo.create(
            contact_id=contact.id,
            direction="outbound",
            content=message_text,
            step_number=contact.current_step,
            classification="manual_link"
        )
        
        from datetime import timezone
        
        # Atualiza o status do contato para negociação pós-link
        c_data = dict(contact.custom_data or {})
        c_data["model_link_sent"] = True
        c_data["model_link_url"] = link
        c_data["stage"] = "post_link_negotiation"

        await c_repo.update(
            contact.id,
            status="waiting_reply",
            result=None,
            custom_data=c_data,
            last_message_at=datetime.now(timezone.utc)
        )
        await db.commit()
        return {"status": "sent", "link": link}
    else:
        raise HTTPException(status_code=500, detail="Falha ao enviar a mensagem no WhatsApp")

# ============ STATUS ============

@app.get("/api/status")
async def get_status():
    """Verifica status da conexão com WhatsApp."""
    evo = EvolutionClient()
    status = await evo.get_connection_status()
    return status

@app.get("/api/alerts")
async def get_system_alerts():
    """Retorna os alertas de sistema em tempo real."""
    try:
        from src.core.alerts import get_alerts
        return get_alerts()
    except Exception:
        return []

@app.get("/api/qrcode")
async def get_qrcode():
    """Obtém QR Code para conectar o WhatsApp."""
    evo = EvolutionClient()
    qrcode = await evo.get_qrcode()
    return {"qrcode_base64": qrcode}

# ============ JOB DE TIMEOUT ============

async def check_timeouts_job():
    async with async_session() as db:
        evo = EvolutionClient()
        classifier = LLMClassifier()
        engine = FunnelEngine(db, evo, classifier)
        await engine.check_timeouts()

# Agenda verificação de timeouts a cada 1 hora
scheduler.add_job(check_timeouts_job, "interval", hours=1, id="timeout_checker")
