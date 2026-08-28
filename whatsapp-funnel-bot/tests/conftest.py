import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from src.database.models import Base


from unittest.mock import AsyncMock, MagicMock
from src.core.evolution_client import EvolutionClient
from src.core.llm_classifier import LLMClassifier


@pytest_asyncio.fixture
async def db_session():
    engine = create_async_engine('sqlite+aiosqlite:///:memory:', echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with session_factory() as session:
        yield session
    
    await engine.dispose()


@pytest.fixture
def mock_evolution():
    evo = MagicMock(spec=EvolutionClient)
    evo.send_text_message = AsyncMock(return_value=True)
    evo.send_media_message = AsyncMock(return_value=True)
    return evo


@pytest.fixture
def mock_classifier():
    classifier = MagicMock(spec=LLMClassifier)
    classifier.classify_response = AsyncMock(return_value='yes')

    async def fake_decide(lead_message="", bot_last_message="", step_number=1, contact_info=None, step_config=None, conversation_history=None):
        h = LLMClassifier._heuristic_fallback(None, lead_message, step_number)
        
        if classifier.classify_response.return_value != 'yes':
            intent = classifier.classify_response.return_value
        else:
            intent = h.get('intent', 'yes')

        action = "advance_step" if intent == "yes" else "end_negative" if intent == "no" else "handle_objection" if (intent.startswith("objection_") or intent.startswith("ask_")) else "repeat_step"
        next_step = 2 if (intent == "yes" and step_number == 1) else "end_positive" if intent == "yes" else "end_negative" if intent == "no" else 3 if intent == "objection_social_media" else 4 if intent == "objection_budget" else 5 if intent == "objection_has_website" else step_number
        return {
            "intent": intent,
            "action": action,
            "next_step": next_step,
            "reasoning": "Mock/Heuristic Decision"
        }

    classifier.decide_step_action = AsyncMock(side_effect=fake_decide)
    return classifier
