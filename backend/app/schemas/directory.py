from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

class ToolSubmissionCreate(BaseModel):
    toolName: str = Field(..., min_length=2, max_length=255)
    websiteUrl: str = Field(..., min_length=5, max_length=500)
    contactName: str = Field(..., min_length=2, max_length=255)
    contactEmail: EmailStr
    contactWhatsapp: str = Field(..., min_length=8, max_length=50)
    category: str = Field(default="whatsapp-atendimento", max_length=100)
    niches: List[str] = Field(default=["geral"])
    pricingType: str = Field(default="pme-acessivel", max_length=100)
    shortDescription: str = Field(..., min_length=10, max_length=500)
    fullDescription: Optional[str] = None
    planRequested: str = Field(default="verified_featured", max_length=100)
    hasAffiliateProgram: Optional[bool] = False
    affiliateCommissionDetails: Optional[str] = None
    discountCouponForVetorUsers: Optional[str] = None
    notes: Optional[str] = None

class ToolSubmissionResponse(BaseModel):
    success: bool
    message: str
    tool_name: str
    plan_requested: str
