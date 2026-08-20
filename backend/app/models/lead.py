import datetime
import enum
from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, JSON
from app.core.database import Base

class LeadType(str, enum.Enum):
    CONTACT = "contact"
    QUALIFIED = "qualified"
    QUIZ = "quiz"

class LeadStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    PROPOSAL = "proposal"
    WON = "won"
    LOST = "lost"

def utc_now():
    return datetime.datetime.now(datetime.timezone.utc)

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    company_name = Column(String(255), nullable=True)
    company_size = Column(String(100), nullable=True)
    segment = Column(String(100), nullable=True)
    main_pain = Column(Text, nullable=True)
    estimated_budget = Column(String(100), nullable=True)
    message = Column(Text, nullable=True)
    
    # Lead categorization
    lead_type = Column(Enum(LeadType), default=LeadType.QUALIFIED, nullable=False)
    status = Column(Enum(LeadStatus), default=LeadStatus.NEW, nullable=False)
    
    # Specific fields for AI Diagnostic Quiz
    quiz_answers = Column(JSON, nullable=True)
    quiz_score = Column(Integer, nullable=True)
    quiz_maturity_level = Column(String(100), nullable=True)
    quiz_recommendation = Column(Text, nullable=True)
    
    # Metadata
    source_url = Column(String(500), nullable=True)
    ip_address = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now, nullable=False)

    def __repr__(self):
        return f"<Lead id={self.id} name='{self.name}' email='{self.email}' type='{self.lead_type}'>"
