import os
from typing import List, Literal
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgentPulse Autonomous AI"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    LLM_PROVIDER: Literal["anthropic", "openai", "ollama", "mock"] = "ollama"
    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_MODEL: str = "claude-3-5-sonnet-20241022"
    
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o"
    
    OLLAMA_BASE_URL: str = "http://127.0.0.1:11434"
    OLLAMA_MODEL: str = "qwen2.5:3b"
    OLLAMA_TIMEOUT: float = 45.0
    OLLAMA_NUM_CTX: int = 2048
    OLLAMA_MAX_TOKENS_PLAN: int = 150
    OLLAMA_MAX_TOKENS_SYNTHESIS: int = 500
    
    SEARCH_PROVIDER: Literal["duckduckgo", "tavily"] = "duckduckgo"
    TAVILY_API_KEY: str = ""
    
    MAX_CONCURRENT_TASKS: int = 5
    TOKEN_BUDGET_PER_RUN: int = 40000

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()

