from fastapi import APIRouter
from app.api.routes import health, leads, contact, quiz, newsletter

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(leads.router)
api_router.include_router(contact.router)
api_router.include_router(quiz.router)
api_router.include_router(newsletter.router)
