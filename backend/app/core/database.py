import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

logger = logging.getLogger(__name__)

Base = declarative_base()

def get_engine_and_session():
    db_url = settings.DATABASE_URL
    engine_kwargs = {"pool_pre_ping": True}

    if db_url.startswith("sqlite"):
        engine_kwargs["connect_args"] = {"check_same_thread": False}
    else:
        # Optimized pool settings for Neon serverless PostgreSQL
        engine_kwargs["pool_size"] = 10
        engine_kwargs["max_overflow"] = 20
        engine_kwargs["pool_recycle"] = 300

    try:
        eng = create_engine(db_url, **engine_kwargs)
        # Test engine connectivity
        with eng.connect() as conn:
            pass
        return eng
    except Exception as e:
        logger.warning(
            f"Não foi possível conectar ao banco de dados principal ({db_url}): {e}. "
            f"Utilizando fallback local SQLite (sqlite:///./vetor_estrategico.db)."
        )
        fallback_url = "sqlite:///./vetor_estrategico.db"
        return create_engine(fallback_url, pool_pre_ping=True, connect_args={"check_same_thread": False})

engine = get_engine_and_session()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
