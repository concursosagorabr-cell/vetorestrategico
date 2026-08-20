from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, ConfigDict

class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Nome do responsável")
    email: EmailStr = Field(..., description="E-mail corporativo ou pessoal")
    phone: Optional[str] = Field(None, max_length=50, description="WhatsApp ou telefone para contato")
    company_name: Optional[str] = Field(None, max_length=150, description="Nome da empresa")
    company_size: Optional[str] = Field(None, description="Número de colaboradores")
    segment: Optional[str] = Field(None, description="Segmento de atuação da empresa")
    main_pain: Optional[str] = Field(None, description="Principal dor ou objetivo com IA")
    estimated_budget: Optional[str] = Field(None, description="Faixa de orçamento estimada")
    message: Optional[str] = Field(None, description="Mensagem adicional ou contexto")
    source_url: Optional[str] = Field(None, description="Página de origem do formulário")

class LeadResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    company_name: Optional[str]
    segment: Optional[str]
    lead_type: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
