# tests/test_security.py
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

transport = ASGITransport(app=app)

@pytest.mark.asyncio
async def test_rate_limiting():
    """Test rate limiting functionality."""
    from app.security import rate_limiter
    
    # Test that rate limiting allows requests initially
    assert await rate_limiter.is_allowed("127.0.0.1") == True
    
    # Test that rate limiting blocks after exceeding limit
    # This is a basic test - in a real scenario, you'd need to simulate time passing
    # For now, we just test that the function exists and works

@pytest.mark.asyncio
async def test_api_key_validation():
    """Test API key validation."""
    from app.security import validate_api_key
    
    # Test valid API key
    assert validate_api_key("sk-1234567890abcdef1234567890abcdef1234567890abcdef") == True
    
    # Test invalid API keys
    assert validate_api_key("") == False
    assert validate_api_key("invalid-key") == False
    assert validate_api_key("sk-") == False
    assert validate_api_key("sk-123") == False  # Too short

@pytest.mark.asyncio
async def test_input_validation():
    """Test input validation in models."""
    from app.models import RephraseIn
    from pydantic import ValidationError
    
    # Test valid input
    valid_input = RephraseIn(text="Hello world")
    assert valid_input.text == "Hello world"
    
    # Test empty text
    with pytest.raises(ValidationError):
        RephraseIn(text="")
    
    # Test text too long
    with pytest.raises(ValidationError):
        RephraseIn(text="x" * 6000)  # Exceeds max_length=5000
    
    # Test inappropriate content
    with pytest.raises(ValidationError):
        RephraseIn(text="This contains spam content")

@pytest.mark.asyncio
async def test_client_ip_extraction():
    """Test client IP extraction."""
    from app.security import get_client_ip
    from fastapi import Request
    from unittest.mock import Mock
    
    # Mock request with X-Forwarded-For
    mock_request = Mock()
    mock_request.headers = {"X-Forwarded-For": "192.168.1.1, 10.0.0.1"}
    mock_request.client = None
    
    ip = get_client_ip(mock_request)
    assert ip == "192.168.1.1"
    
    # Mock request with X-Real-IP
    mock_request.headers = {"X-Real-IP": "192.168.1.2"}
    ip = get_client_ip(mock_request)
    assert ip == "192.168.1.2"
    
    # Mock request with direct client
    mock_request.headers = {}
    mock_request.client = Mock()
    mock_request.client.host = "192.168.1.3"
    ip = get_client_ip(mock_request)
    assert ip == "192.168.1.3"

@pytest.mark.asyncio
async def test_security_headers():
    """Test that security headers are present."""
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/health")
        assert response.status_code == 200
        
        # Check for security headers
        headers = response.headers
        assert "X-Content-Type-Options" in headers
        assert "X-Frame-Options" in headers
        assert "X-XSS-Protection" in headers
        assert "Referrer-Policy" in headers
        assert "Permissions-Policy" in headers
        assert "Content-Security-Policy" in headers
        assert "Strict-Transport-Security" in headers
        
        # Check specific values
        assert headers["X-Content-Type-Options"] == "nosniff"
        assert headers["X-Frame-Options"] == "DENY"
        assert headers["X-XSS-Protection"] == "1; mode=block"
        assert headers["Referrer-Policy"] == "strict-origin-when-cross-origin"

@pytest.mark.asyncio
async def test_cors_headers():
    """Test CORS headers are properly set."""
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.options("/api/v1/rephrase", headers={"Origin": "http://localhost:3000"})
        assert response.status_code == 200
        
        # Check CORS headers
        headers = response.headers
        assert "access-control-allow-origin" in headers
        assert "access-control-allow-credentials" in headers
        assert headers["access-control-allow-origin"] == "http://localhost:3000"
        assert headers["access-control-allow-credentials"] == "true"
