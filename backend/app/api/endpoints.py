# app/api/endpoints.py
from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.responses import StreamingResponse, RedirectResponse, HTMLResponse
from app.models import RephraseIn, RephraseOut, HealthResponse
from app.llm import rephrase, rephrase_stream, LLMError
from app.security import rate_limiter, get_client_ip

router = APIRouter()

# Legacy endpoints (redirect to v1)
@router.get("/health", response_model=HealthResponse)
def health():
    """Legacy health check endpoint - redirects to v1."""
    from app.config import get_settings
    settings = get_settings()
    return HealthResponse(
        status="ok", 
        environment=settings.environment,
        version=settings.version
    )

@router.get("/hello")
def hello():
    """Legacy hello endpoint - redirects to v1."""
    return {"message": "Hello from FastAPI (legacy endpoint - use /api/v1/hello)"}

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
    """Legacy rephrase endpoint - redirects to v1."""
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
    """Legacy streaming endpoint - redirects to v1."""
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

# Custom docs endpoint
@router.get("/docs", response_class=HTMLResponse)
async def legacy_docs():
    """Legacy docs endpoint - redirects to v1 docs."""
    return RedirectResponse(url="/api/v1/docs", status_code=302)

# API version info
@router.get("/")
def api_root():
    """API root endpoint with version information."""
    return {
        "message": "AI Writing Style Assistant API",
        "version": "1.0.0",
        "available_versions": ["v1"],
        "current_version": "v1",
        "endpoints": {
            "v1": "/api/v1",
            "health": "/api/health",
            "docs": "/api/v1/docs",
            "swagger": "/docs (development only)"
        },
        "deprecation_notice": "Legacy endpoints will be deprecated in v2.0.0. Please use /api/v1/ endpoints."
    }
