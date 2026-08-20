from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.rate_limiter import limiter
from app.models.newsletter import NewsletterSubscriber
from app.schemas.newsletter import NewsletterCreate, NewsletterResponse

router = APIRouter(prefix="/newsletter", tags=["Newsletter"])

@router.post("", response_model=NewsletterResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("10/minute")
async def subscribe_newsletter(
    request: Request,
    sub_in: NewsletterCreate,
    db: Session = Depends(get_db)
):
    """
    Subscribes an email to the Vetor Estratégico AI Insights newsletter.
    """
    existing = db.query(NewsletterSubscriber).filter(NewsletterSubscriber.email == sub_in.email).first()
    if existing:
        if not existing.is_active:
            existing.is_active = True
            db.commit()
        return NewsletterResponse(
            success=True,
            message="E-mail já cadastrado! Você continuará recebendo nossos insights de IA.",
            email=sub_in.email
        )
    
    new_subscriber = NewsletterSubscriber(
        email=sub_in.email,
        source=sub_in.source or "blog_footer",
        is_active=True
    )
    db.add(new_subscriber)
    db.commit()
    
    return NewsletterResponse(
        success=True,
        message="Inscrição confirmada com sucesso! Bem-vindo(a) aos insights de IA da Vetor Estratégico.",
        email=sub_in.email
    )
