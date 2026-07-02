from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "A-Share Fundamental Intelligence Agent"
    api_prefix: str = "/api/v1"
    sync_database_url: str = "postgresql+psycopg://ashare:ashare@postgres:5432/ashare_agent"
    database_url: str = "postgresql+asyncpg://ashare:ashare@postgres:5432/ashare_agent"
    redis_url: str = "redis://redis:6379/0"
    celery_broker_url: str = "redis://redis:6379/1"
    celery_result_backend: str = "redis://redis:6379/2"
    data_provider: str = "akshare"
    embedding_provider: str = "disabled"
    llm_provider: str = "openai_compat"
    openai_compat_base_url: str = "https://api.deepseek.com"
    openai_compat_api_key: str = ""
    openai_compat_default_model: str = "deepseek-chat"
    llm_timeout_seconds: float = 90.0
    reranker_provider: str = "lexical"
    cross_encoder_model: str = "cross-encoder/ms-marco-MiniLM-L-6-v2"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
