from fastapi import APIRouter, Depends, HTTPException, Request, BackgroundTasks, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.rate_limiter import limiter
from app.models.lead import Lead, LeadType, LeadStatus
from app.schemas.quiz import QuizSubmission, QuizRecommendationResult
from app.services.quiz_engine import calculate_quiz_result
from app.services.email_service import send_lead_notification_email

router = APIRouter(prefix="/quiz", tags=["AI Diagnostic Quiz"])

@router.post("", response_model=QuizRecommendationResult, status_code=status.HTTP_201_CREATED)
@limiter.limit("10/minute")
async def process_quiz_diagnostic(
    request: Request,
    quiz_in: QuizSubmission,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Evaluates business answers, computes AI Opportunity Score, returns strategic recommendations,
    and stores a qualified lead in the database.
    """
    client_ip = request.client.host if request.client else None
    
    # 1. Compute AI Opportunity Score & Tailored Deliverables
    result = calculate_quiz_result(quiz_in)
    
    # 2. Persist Lead in Database
    answers_payload = {
        "segment": quiz_in.segment,
        "company_size": quiz_in.company_size,
        "main_bottleneck": quiz_in.main_bottleneck,
        "digital_maturity": quiz_in.digital_maturity,
        "accepts_lgpd": quiz_in.accepts_lgpd
    }
    
    new_lead = Lead(
        name=quiz_in.name,
        email=quiz_in.email,
        phone=quiz_in.phone,
        company_name=quiz_in.company_name,
        company_size=quiz_in.company_size,
        segment=quiz_in.segment,
        main_pain=f"Gargalo: {quiz_in.main_bottleneck} | Maturidade: {quiz_in.digital_maturity}",
        lead_type=LeadType.QUIZ,
        status=LeadStatus.NEW,
        quiz_answers=answers_payload,
        quiz_score=result.opportunity_score,
        quiz_maturity_level=result.maturity_level,
        quiz_recommendation=f"{result.recommendation_title} - {result.priority_action}",
        source_url="/diagnostico",
        ip_address=client_ip
    )
    
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    
    result.lead_id = new_lead.id
    
    # 3. Notify commercial team with full quiz diagnosis
    lead_dict = {
        "name": new_lead.name,
        "email": new_lead.email,
        "phone": new_lead.phone,
        "company_name": new_lead.company_name,
        "company_size": new_lead.company_size,
        "segment": new_lead.segment,
        "main_pain": new_lead.main_pain,
        "quiz_score": result.opportunity_score,
        "quiz_maturity_level": result.maturity_level,
        "quiz_recommendation": f"{result.recommendation_title}: {result.recommendation_summary}"
    }
    background_tasks.add_task(send_lead_notification_email, lead_dict, "Diagnóstico de IA Concluído")
    
    return result
