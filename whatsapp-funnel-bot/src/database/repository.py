from typing import Optional, List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, update, func
from .models import Campaign, Contact, Message

class CampaignRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, **kwargs) -> Campaign:
        campaign = Campaign(**kwargs)
        self.session.add(campaign)
        await self.session.commit()
        await self.session.refresh(campaign)
        return campaign

    async def get(self, campaign_id: UUID) -> Optional[Campaign]:
        result = await self.session.execute(
            select(Campaign).where(Campaign.id == campaign_id)
        )
        return result.scalar_one_or_none()

    async def list_all(self, limit: int = 50) -> List[Campaign]:
        result = await self.session.execute(
            select(Campaign).order_by(desc(Campaign.created_at)).limit(limit)
        )
        return result.scalars().all()

    async def update_status(self, campaign_id: UUID, status: str):
        values = {"status": status}
        if status == "running":
            # Atualiza started_at se ainda não foi preenchido
            values["started_at"] = func.coalesce(Campaign.started_at, func.now())
        await self.session.execute(
            update(Campaign).where(Campaign.id == campaign_id).values(**values)
        )
        await self.session.commit()

    async def get_contacted_counts(self) -> dict:
        """Retorna mapa de campaign_id -> quantidade de contatos contactados (status != 'pending')."""
        result = await self.session.execute(
            select(Contact.campaign_id, func.count().label("contacted"))
            .where(Contact.status != "pending")
            .group_by(Contact.campaign_id)
        )
        return {row[0]: row[1] for row in result.all()}

    async def delete(self, campaign_id: UUID) -> bool:
        from sqlalchemy import delete
        contacts = await self.session.execute(
            select(Contact.id).where(Contact.campaign_id == campaign_id)
        )
        contact_ids = contacts.scalars().all()
        if contact_ids:
            await self.session.execute(
                delete(Message).where(Message.contact_id.in_(contact_ids))
            )
            await self.session.execute(
                delete(Contact).where(Contact.campaign_id == campaign_id)
            )
        
        await self.session.execute(
            delete(Campaign).where(Campaign.id == campaign_id)
        )
        await self.session.commit()
        return True

class ContactRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, **kwargs) -> Contact:
        contact = Contact(**kwargs)
        self.session.add(contact)
        await self.session.commit()
        await self.session.refresh(contact)
        return contact

    async def get(self, contact_id: UUID) -> Optional[Contact]:
        result = await self.session.execute(
            select(Contact).where(Contact.id == contact_id)
        )
        return result.scalar_one_or_none()

    async def get_by_phone(self, phone: str, campaign_id: UUID) -> Optional[Contact]:
        result = await self.session.execute(
            select(Contact).where(
                Contact.phone == phone,
                Contact.campaign_id == campaign_id
            )
        )
        return result.scalar_one_or_none()

    async def list_by_campaign(self, campaign_id: UUID) -> List[Contact]:
        result = await self.session.execute(
            select(Contact).where(Contact.campaign_id == campaign_id).order_by(Contact.created_at)
        )
        return result.scalars().all()

    async def list_by_status(self, campaign_id: UUID, status: str) -> List[Contact]:
        result = await self.session.execute(
            select(Contact).where(
                Contact.campaign_id == campaign_id,
                Contact.status == status
            )
        )
        return result.scalars().all()

    async def update(self, contact_id: UUID, **kwargs):
        await self.session.execute(
            update(Contact).where(Contact.id == contact_id).values(**kwargs)
        )
        await self.session.commit()

    async def list_all(self, limit: int = 100) -> List[Contact]:
        result = await self.session.execute(
            select(Contact).order_by(desc(Contact.created_at)).limit(limit)
        )
        return result.scalars().all()

    async def get_results(self, campaign_id: UUID):
        result = await self.session.execute(
            select(Contact.result, func.count().label("count"))
            .where(Contact.campaign_id == campaign_id)
            .group_by(Contact.result)
        )
        return result.all()

class MessageRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, **kwargs) -> Message:
        msg = Message(**kwargs)
        self.session.add(msg)
        await self.session.commit()
        await self.session.refresh(msg)
        return msg

    async def list_by_contact(self, contact_id: UUID) -> List[Message]:
        result = await self.session.execute(
            select(Message).where(Message.contact_id == contact_id).order_by(Message.created_at)
        )
        return result.scalars().all()
