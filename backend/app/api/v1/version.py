# app/api/v1/version.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any, Optional
from app.config import get_settings

router = APIRouter()

class VersionInfo(BaseModel):
    """API version information."""
    version: str
    api_version: str
    environment: str
    features: Dict[str, Any]
    deprecated: bool = False
    sunset_date: Optional[str] = None

@router.get("/version", response_model=VersionInfo)
def get_version_info():
    """Get API version information."""
    settings = get_settings()
    
    return VersionInfo(
        version=settings.version,
        api_version="v1",
        environment=settings.environment,
        features={
            "rephrase": {
                "endpoint": "/api/v1/rephrase",
                "methods": ["POST"],
                "streaming": False
            },
            "rephrase_stream": {
                "endpoint": "/api/v1/rephrase-stream",
                "methods": ["POST"],
                "streaming": True
            },
            "health": {
                "endpoint": "/api/v1/health",
                "methods": ["GET"]
            },
            "rate_limiting": True,
            "security_headers": True,
            "input_validation": True
        },
        deprecated=False,
        sunset_date=None
    )

@router.get("/status")
def get_api_status():
    """Get detailed API status."""
    settings = get_settings()
    
    return {
        "status": "operational",
        "version": settings.version,
        "api_version": "v1",
        "environment": settings.environment,
        "uptime": "running",
        "rate_limit": {
            "per_minute": settings.rate_limit_per_minute,
            "per_hour": settings.rate_limit_per_hour
        },
        "features": {
            "openai_model": settings.openai_model,
            "max_text_length": settings.max_text_length,
            "cors_enabled": True,
            "security_enabled": True
        }
    }
