from fastapi import APIRouter, Depends, HTTPException, Request, status, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.rate_limiter import limiter
from app.schemas.directory import ToolSubmissionCreate, ToolSubmissionResponse
from app.models.directory import ToolSubmission, DirectorySubmissionStatus
from app.services.email_service import send_lead_notification_email

router = APIRouter(prefix="/directory", tags=["Directory"])

@router.post(
    "/submit",
    response_model=ToolSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar nova ferramenta de IA no diretório"
)
@limiter.limit("5/minute")
async def submit_directory_tool(
    request: Request,
    payload: ToolSubmissionCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    ip = request.client.host if request.client else "unknown"

    submission = ToolSubmission(
        tool_name=payload.toolName.strip(),
        website_url=payload.websiteUrl.strip(),
        contact_name=payload.contactName.strip(),
        contact_email=str(payload.contactEmail).strip().lower(),
        contact_whatsapp=payload.contactWhatsapp.strip(),
        category=payload.category,
        niches=payload.niches,
        pricing_type=payload.pricingType,
        short_description=payload.shortDescription.strip(),
        full_description=payload.fullDescription.strip() if payload.fullDescription else None,
        plan_requested=payload.planRequested,
        has_affiliate_program=payload.hasAffiliateProgram or False,
        affiliate_commission_details=payload.affiliateCommissionDetails.strip() if payload.affiliateCommissionDetails else None,
        discount_coupon=payload.discountCouponForVetorUsers.strip() if payload.discountCouponForVetorUsers else None,
        notes=payload.notes.strip() if payload.notes else None,
        status=DirectorySubmissionStatus.PENDING,
        ip_address=ip
    )

    db.add(submission)
    db.commit()
    db.refresh(submission)

    # Disparo assíncrono de e-mail de notificação comercial
    background_tasks.add_task(
        send_lead_notification_email,
        lead_data={
            "name": payload.contactName,
            "email": str(payload.contactEmail),
            "phone": payload.contactWhatsapp,
            "company_name": f"{payload.toolName} ({payload.websiteUrl})",
            "company_size": "Parceiro SaaS / Criador de Software",
            "segment": f"Diretório IA - {payload.category}",
            "main_pain": f"Submissão de Ferramenta: Plano {payload.planRequested}. Pitch: {payload.shortDescription}",
            "estimated_budget": f"Plano: {payload.planRequested}",
            "message": f"Detalhes: Nichos: {payload.niches} | Cupom: {payload.discountCouponForVetorUsers} | Afiliados: {payload.affiliateCommissionDetails}"
        },
        subject_prefix="Submissão no Diretório de IA"
    )

    return ToolSubmissionResponse(
        success=True,
        message="Proposta de listagem recebida com sucesso! Retornaremos em até 24 horas úteis.",
        tool_name=submission.tool_name,
        plan_requested=submission.plan_requested
    )
