from typing import Optional, List, Dict, Any
from pydantic import BaseModel, EmailStr, Field

class QuizSubmission(BaseModel):
    segment: str = Field(..., description="Segmento de atuação da empresa")
    company_size: str = Field(..., description="Tamanho da equipe")
    main_bottleneck: str = Field(..., description="Principal gargalo operacional")
    digital_maturity: str = Field(..., description="Maturidade digital atual da empresa")
    
    # Lead Contact Information
    name: str = Field(..., min_length=2, max_length=100, description="Nome completo")
    email: EmailStr = Field(..., description="E-mail profissional")
    phone: str = Field(..., min_length=8, max_length=50, description="WhatsApp com DDD")
    company_name: str = Field(..., min_length=2, max_length=150, description="Nome da empresa")
    accepts_lgpd: bool = Field(True, description="Aceite dos termos e política de privacidade")

class QuizRecommendationResult(BaseModel):
    opportunity_score: int = Field(..., description="Pontuação de oportunidade de IA (0 a 100)")
    maturity_level: str = Field(..., description="Classificação do estágio da empresa")
    estimated_hours_saved_month: str = Field(..., description="Estimativa de horas economizadas por mês")
    priority_action: str = Field(..., description="Primeiro projeto recomendado de alto impacto")
    recommendation_title: str = Field(..., description="Título do plano estratégico sugerido")
    recommendation_summary: str = Field(..., description="Resumo do diagnóstico para a diretoria")
    key_deliverables: List[str] = Field(..., description="Principais entregas recomendadas")
    lead_id: Optional[int] = Field(None, description="ID do lead gerado no sistema")
