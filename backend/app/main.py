from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.database import engine
from app.core.logging import configure_logging
from app.models import agent, eval, financial, memory, report, stock, wiki  # noqa: F401
from app.models.base import Base
from app.services.llm import llm_enabled

DISCLAIMER = "仅供研究参考，不构成投资建议。"


@asynccontextmanager
async def lifespan(app: FastAPI):
    configure_logging()
    with engine.begin() as connection:
        connection.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        Base.metadata.create_all(connection)
    yield


app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description=f"A 股基本面研究 Agent 平台。{DISCLAIMER}",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router, prefix=settings.api_prefix)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "database": "connected",
        "provider": settings.data_provider,
        "llm_provider": settings.llm_provider,
        "llm_model": settings.openai_compat_default_model,
        "llm_configured": llm_enabled(),
        "disclaimer": DISCLAIMER,
    }


@app.get("/")
def root():
    return {"name": settings.app_name, "docs": "/docs", "health": "/health"}
