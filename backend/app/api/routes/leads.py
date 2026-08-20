from fastapi import APIRouter, Depends, HTTPException, Request, BackgroundTasks, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.rate_limiter import limiter
from app.models.lead import Lead, LeadType, LeadStatus
from app.schemas.lead import LeadCreate, LeadResponse
from app.services.email_service import send_lead_notification_email

router = APIRouter(prefix="/leads", tags=["Leads"])

@router.post("", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("15/minute")
async def create_qualified_lead(
    request: Request,
    lead_in: LeadCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Receives and registers a qualified commercial lead (proposals, budgeting, diagnosis).
    """
    client_ip = request.client.host if request.client else None
    
    new_lead = Lead(
        name=lead_in.name,
        email=lead_in.email,
        phone=lead_in.phone,
        company_name=lead_in.company_name,
        company_size=lead_in.company_size,
        segment=lead_in.segment,
        main_pain=lead_in.main_pain,
        estimated_budget=lead_in.estimated_budget,
        message=lead_in.message,
        lead_type=LeadType.QUALIFIED,
        status=LeadStatus.NEW,
        source_url=lead_in.source_url,
        ip_address=client_ip
    )
    
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    
    # Notify commercial team via background task
    lead_dict = {
        "name": new_lead.name,
        "email": new_lead.email,
        "phone": new_lead.phone,
        "company_name": new_lead.company_name,
        "company_size": new_lead.company_size,
        "segment": new_lead.segment,
        "main_pain": new_lead.main_pain,
        "estimated_budget": new_lead.estimated_budget
    }
    background_tasks.add_task(send_lead_notification_email, lead_dict, "Lead Qualificado Comercial")
    
    return new_lead
