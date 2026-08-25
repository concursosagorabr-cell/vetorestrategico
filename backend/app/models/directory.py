import datetime
import enum
from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, JSON, Boolean
from app.core.database import Base

class DirectorySubmissionStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    CONTACTED = "contacted"

def utc_now():
    return datetime.datetime.now(datetime.timezone.utc)

class ToolSubmission(Base):
    __tablename__ = "tool_submissions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    tool_name = Column(String(255), nullable=False, index=True)
    website_url = Column(String(500), nullable=False)
    contact_name = Column(String(255), nullable=False)
    contact_email = Column(String(255), nullable=False, index=True)
    contact_whatsapp = Column(String(50), nullable=False)
    
    category = Column(String(100), nullable=False)
    niches = Column(JSON, nullable=False, default=list)
    pricing_type = Column(String(100), nullable=False)
    
    short_description = Column(String(500), nullable=False)
    full_description = Column(Text, nullable=True)
    plan_requested = Column(String(100), nullable=False, default="verified_featured")
    
    has_affiliate_program = Column(Boolean, default=False)
    affiliate_commission_details = Column(String(255), nullable=True)
    discount_coupon = Column(String(100), nullable=True)
    notes = Column(Text, nullable=True)
    
    status = Column(Enum(DirectorySubmissionStatus), default=DirectorySubmissionStatus.PENDING, nullable=False)
    
    ip_address = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now, nullable=False)

    def __repr__(self):
        return f"<ToolSubmission id={self.id} tool='{self.tool_name}' plan='{self.plan_requested}'>"
