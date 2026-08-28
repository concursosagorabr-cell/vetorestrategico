import uuid
from datetime import datetime, timezone

def utc_now():
    return datetime.now(timezone.utc)
from sqlalchemy import Column, String, DateTime, Text, Boolean, Integer, JSON, ForeignKey, Enum
from sqlalchemy.types import TypeDecorator, CHAR
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class GUID(TypeDecorator):
    """Platform-independent GUID type.
    Uses PostgreSQL's UUID type, otherwise uses CHAR(36), storing as stringified hex values.
    """
    impl = CHAR
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(PG_UUID(as_uuid=True))
        else:
            return dialect.type_descriptor(CHAR(36))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == "postgresql":
            return value
        else:
            return str(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        if isinstance(value, uuid.UUID):
            return value
        try:
            return uuid.UUID(str(value))
        except (ValueError, TypeError):
            return value

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    status = Column(String(50), default="draft")  # draft, running, paused, completed
    script_config = Column(JSON, default=list)
    settings = Column(JSON, default=dict)
    total_contacts = Column(Integer, default=0)
    started_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    contacts = relationship("Contact", back_populates="campaign", cascade="all, delete-orphan")

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    campaign_id = Column(GUID(), ForeignKey("campaigns.id"), nullable=False)
    name = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    custom_data = Column(JSON, default=dict)
    current_step = Column(Integer, default=0)
    status = Column(String(50), default="pending")  # pending, waiting_reply, completed, timeout, error
    result = Column(String(50), nullable=True)  # positive, negative, timeout, error
    last_message_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    campaign = relationship("Campaign", back_populates="contacts")
    messages = relationship("Message", back_populates="contact", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = "messages"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    contact_id = Column(GUID(), ForeignKey("contacts.id"), nullable=False)
    direction = Column(String(10), nullable=False)  # outbound, inbound
    content = Column(Text, nullable=False)
    step_number = Column(Integer, nullable=True)
    classification = Column(String(50), nullable=True)  # yes, no, doubt, objection_social_media, objection_budget, objection_has_website, other
    raw_response = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    contact = relationship("Contact", back_populates="messages")
