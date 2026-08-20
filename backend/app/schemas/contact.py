from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Nome do contato")
    email: EmailStr = Field(..., description="E-mail de contato")
    phone: Optional[str] = Field(None, max_length=50, description="WhatsApp ou telefone")
    subject: Optional[str] = Field(None, max_length=150, description="Assunto da mensagem")
    message: str = Field(..., min_length=5, max_length=2000, description="Mensagem")
    source_url: Optional[str] = Field(None, description="Origem")

class ContactResponse(BaseModel):
    success: bool
    message: str
    lead_id: Optional[int] = None
