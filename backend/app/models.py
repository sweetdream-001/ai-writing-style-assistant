# Data models and validation
from pydantic import BaseModel, Field, field_validator
from typing import Optional

class RephraseIn(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000, description="Text to rephrase")
    
    @field_validator('text')
    @classmethod
    def validate_text(cls, v):
        if not v or not v.strip():
            raise ValueError("Text cannot be empty")
        
        # Simple content filtering - can be expanded
        inappropriate_words = ['spam', 'malware', 'hack']  # Add more as needed
        if any(word in v.lower() for word in inappropriate_words):
            raise ValueError("Text contains inappropriate content")
        
        return v.strip()

class RephraseOut(BaseModel):
    professional: str
    casual: str
    polite: str
    social_media: str

class HealthResponse(BaseModel):
    status: str
    environment: str
    version: Optional[str] = None

class ErrorResponse(BaseModel):
    detail: str
    error_code: Optional[str] = None
