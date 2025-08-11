# app/api/v1/endpoints.py
from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.responses import StreamingResponse
from app.models import RephraseIn, RephraseOut, HealthResponse
from app.llm import rephrase, rephrase_stream, LLMError
from app.security import rate_limiter, get_client_ip

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
def health():
    """Health check endpoint."""
    from app.config import get_settings
    settings = get_settings()
    return HealthResponse(
        status="ok", 
        environment=settings.environment,
        version=settings.version
    )

@router.get("/hello")
def hello():
    """Simple hello endpoint for testing."""
    return {"message": "Hello from FastAPI v1"}

@router.options("/rephrase")
async def rephrase_options():
    """Handle CORS preflight requests for the rephrase endpoint."""
    return {"message": "OK"}

@router.options("/rephrase-stream")
async def rephrase_stream_options():
    """Handle CORS preflight requests for the streaming endpoint."""
    return {"message": "OK"}

@router.post("/rephrase", response_model=RephraseOut)
async def rephrase_endpoint(
    body: RephraseIn, 
    request: Request,
    client_ip: str = Depends(get_client_ip)
):
    """Rephrase text in different styles."""
    # Rate limiting
    if not await rate_limiter.is_allowed(client_ip):
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please try again later.")
    
    try:
        result = await rephrase(body.text)
        return RephraseOut(**result)
    except LLMError:
        # Don't leak internal details
        raise HTTPException(status_code=500, detail="LLM call failed")

@router.post("/rephrase-stream")
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
    except LLMError:
        raise HTTPException(status_code=500, detail="LLM call failed")
