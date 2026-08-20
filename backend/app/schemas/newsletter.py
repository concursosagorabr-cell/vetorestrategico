from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

class NewsletterCreate(BaseModel):
    email: EmailStr = Field(..., description="E-mail para inscrição na newsletter")
    source: Optional[str] = Field("blog_footer", description="Origem da captura")

class NewsletterResponse(BaseModel):
    success: bool
    message: str
    email: str
