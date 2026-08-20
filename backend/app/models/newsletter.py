import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.core.database import Base

def utc_now():
    return datetime.datetime.now(datetime.timezone.utc)

class NewsletterSubscriber(Base):
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    is_active = Column(Boolean, default=True, nullable=False)
    source = Column(String(100), default="blog_footer", nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now, nullable=False)

    def __repr__(self):
        return f"<NewsletterSubscriber email='{self.email}'>"
