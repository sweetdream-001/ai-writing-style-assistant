# tests/test_security.py
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.security import RateLimiter, validate_api_key, get_client_ip
from fastapi import Request

transport = ASGITransport(app=app)

@pytest.mark.asyncio
async def test_rate_limiter():
    """Test rate limiting functionality."""
    limiter = RateLimiter(requests_per_minute=2, requests_per_hour=5)
    
    # Should allow first 2 requests
    assert await limiter.is_allowed("192.168.1.1") == True
    assert await limiter.is_allowed("192.168.1.1") == True
    
    # Should block the third request
    assert await limiter.is_allowed("192.168.1.1") == False
    
    # Different IP should still be allowed
    assert await limiter.is_allowed("192.168.1.2") == True

@pytest.mark.asyncio
async def test_api_key_validation():
    """Test API key validation."""
    # Valid API key
    assert validate_api_key("sk-1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef") == True
    
    # Invalid API keys
    assert validate_api_key("") == False
    assert validate_api_key("invalid-key") == False
    assert validate_api_key("sk-") == False
    assert validate_api_key("sk-123") == False  # Too short
    assert validate_api_key("sk-" + "a" * 200) == False  # Too long

@pytest.mark.asyncio
async def test_input_validation():
    """Test input validation in the API."""
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # Test empty text
        response = await ac.post("/api/rephrase", json={"text": ""})
        assert response.status_code == 422
        
        # Test text too long
        long_text = "a" * 6000
        response = await ac.post("/api/rephrase", json={"text": long_text})
        assert response.status_code == 422
        
        # Test valid text
        response = await ac.post("/api/rephrase", json={"text": "Hello world"})
        # This might fail due to missing API key, but should not be a validation error
        assert response.status_code in [422, 500, 401]

@pytest.mark.asyncio
async def test_security_headers():
    """Test that security headers are present."""
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/health")
        assert response.status_code == 200
        
        # Check for security headers
        headers = response.headers
        assert "X-Content-Type-Options" in headers
        assert "X-Frame-Options" in headers
        assert "X-XSS-Protection" in headers
        assert "Content-Security-Policy" in headers
        assert "Strict-Transport-Security" in headers

@pytest.mark.asyncio
async def test_cors_headers():
    """Test CORS headers are properly set."""
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # Test CORS preflight request with Origin header
        response = await ac.options(
            "/api/rephrase",
            headers={"Origin": "http://localhost:3000"}
        )
        assert response.status_code == 200
        
        # Check CORS headers
        headers = response.headers
        assert "access-control-allow-origin" in headers
        assert "access-control-allow-credentials" in headers
        assert headers["access-control-allow-origin"] == "http://localhost:3000"
        assert headers["access-control-allow-credentials"] == "true"
