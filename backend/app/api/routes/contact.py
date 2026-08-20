from fastapi import APIRouter, Depends, HTTPException, Request, BackgroundTasks, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.rate_limiter import limiter
from app.models.lead import Lead, LeadType, LeadStatus
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.email_service import send_lead_notification_email

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("10/minute")
async def submit_contact_form(
    request: Request,
    contact_in: ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Receives messages from the institutional contact form.
    """
    client_ip = request.client.host if request.client else None
    
    new_lead = Lead(
        name=contact_in.name,
        email=contact_in.email,
        phone=contact_in.phone,
        message=f"[Assunto: {contact_in.subject or 'Geral'}] {contact_in.message}",
        lead_type=LeadType.CONTACT,
        status=LeadStatus.NEW,
        source_url=contact_in.source_url,
        ip_address=client_ip
    )
    
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    
    # Notify commercial team
    lead_dict = {
        "name": new_lead.name,
        "email": new_lead.email,
        "phone": new_lead.phone,
        "main_pain": new_lead.message
    }
    background_tasks.add_task(send_lead_notification_email, lead_dict, "Mensagem de Contato")
    
    return ContactResponse(
        success=True,
        message="Mensagem recebida com sucesso! Nossa equipe retornará em até 2 horas úteis.",
        lead_id=new_lead.id
    )
