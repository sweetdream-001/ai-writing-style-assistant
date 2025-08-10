# app/config.py
import os
from typing import List
from functools import lru_cache

class Settings:
    """Application settings with environment-based configuration."""
    
    def __init__(self):
        # Load environment variables
        self._load_env()
        
        # Environment
        self.environment: str = os.getenv("ENVIRONMENT", "development")
        
        # API Configuration
        self.title: str = "AI Writing Style Assistant"
        self.description: str = "Transform your text into different writing styles using AI"
        self.version: str = "1.0.0"
        
        # Security
        allowed_hosts_str = os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1")
        self.allowed_hosts: List[str] = [host.strip() for host in allowed_hosts_str.split(",")]
        
        cors_origins_str = os.getenv("CORS_ORIGINS", "http://localhost:3000")
        self.cors_origins: List[str] = [origin.strip() for origin in cors_origins_str.split(",")]
        
        # Rate Limiting
        self.rate_limit_per_minute: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
        self.rate_limit_per_hour: int = int(os.getenv("RATE_LIMIT_PER_HOUR", "1000"))
        
        # OpenAI Configuration
        self.openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
        self.openai_model: str = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        self.openai_timeout: float = float(os.getenv("OPENAI_TIMEOUT", "20"))
        self.openai_max_retries: int = int(os.getenv("OPENAI_MAX_RETRIES", "2"))
        
        # Application Settings
        self.max_text_length: int = 5000
        self.max_tokens: int = 1000
    
    def _load_env(self):
        """Load environment variables from .env file if it exists."""
        try:
            from dotenv import load_dotenv
            load_dotenv()
        except ImportError:
            pass  # dotenv not available, use system env vars
        except Exception:
            pass  # .env file not found or other issues
    
    @property
    def is_production(self) -> bool:
        return self.environment == "production"
    
    @property
    def is_development(self) -> bool:
        return self.environment == "development"
    
    @property
    def docs_url(self) -> str:
        return "/docs" if self.is_development else None
    
    @property
    def redoc_url(self) -> str:
        return "/redoc" if self.is_development else None

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
