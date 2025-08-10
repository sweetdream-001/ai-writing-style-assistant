# app/main.py
import os, json
from fastapi import FastAPI, HTTPException, Request, Query, Depends
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from pydantic import BaseModel, Field, field_validator
from dotenv import load_dotenv
from app.llm import rephrase, rephrase_stream, LLMError
from app.security import rate_limiter, get_client_ip
from app.middleware import SecurityHeadersMiddleware

load_dotenv()

# Environment-based configuration
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app = FastAPI(
    title="AI Writing Style Assistant",
    description="Transform your text into different writing styles using AI",
    version="1.0.0",
    docs_url="/docs" if ENVIRONMENT == "development" else None,
    redoc_url="/redoc" if ENVIRONMENT == "development" else None,
)

# Security middleware
if ENVIRONMENT == "production":
    app.add_middleware(HTTPSRedirectMiddleware)
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=ALLOWED_HOSTS)

app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

class RephraseIn(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000, description="Text to rephrase")
    
    @field_validator('text')
    @classmethod
    def validate_text(cls, v):
        if not v or not v.strip():
            raise ValueError("Text cannot be empty")
        
        # Basic content filtering
        inappropriate_words = ['spam', 'malware', 'hack']  # Add more as needed
        if any(word in v.lower() for word in inappropriate_words):
            raise ValueError("Text contains inappropriate content")
        
        return v.strip()

class RephraseOut(BaseModel):
    professional: str
    casual: str
    polite: str
    social_media: str

@app.get("/health")
def health():
    return {"status": "ok", "environment": ENVIRONMENT}

@app.get("/hello")
def hello():
    return {"message": "Hello from FastAPI"}

@app.options("/api/rephrase")
async def rephrase_options():
    """Handle CORS preflight requests for the rephrase endpoint."""
    return {"message": "OK"}

@app.options("/api/rephrase-stream")
async def rephrase_stream_options():
    """Handle CORS preflight requests for the streaming endpoint."""
    return {"message": "OK"}
    
@app.post("/api/rephrase", response_model=RephraseOut)
async def rephrase_endpoint(
    body: RephraseIn, 
    request: Request,
    client_ip: str = Depends(get_client_ip)
):
    # Rate limiting
    if not await rate_limiter.is_allowed(client_ip):
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")
    
    try:
        result = await rephrase(body.text)
        return RephraseOut(**result)
    except LLMError:
        # Don't leak internal details
        raise HTTPException(status_code=500, detail="LLM call failed")

@app.post("/api/rephrase-stream")
async def rephrase_stream_endpoint(
    body: RephraseIn,
    request: Request,
    client_ip: str = Depends(get_client_ip)
):
    """Stream rephrase response in real-time using Server-Sent Events."""
    # Rate limiting
    if not await rate_limiter.is_allowed(client_ip):
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")
    
    try:
        async def generate():
            async for chunk in rephrase_stream(body.text):
                # Format as Server-Sent Events
                yield f"data: {chunk}\n\n"
        
        return StreamingResponse(
            generate(),
            media_type="text/plain",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        )
    except LLMError as e:
        raise HTTPException(status_code=500, detail="LLM call failed")


