# tests/test_versioned_routes.py
import pytest
from httpx import AsyncClient, ASGITransport

# Removed test_api_root - API root endpoint no longer exists after removing legacy endpoints

@pytest.mark.asyncio
async def test_v1_health():
    """Test v1 health endpoint."""
    from app.main import app
    transport = ASGITransport(app=app)
    
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/api/v1/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"
    assert "environment" in data
    assert "version" in data

@pytest.mark.asyncio
async def test_v1_hello():
    """Test v1 hello endpoint."""
    from app.main import app
    transport = ASGITransport(app=app)
    
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/api/v1/hello")
    assert res.status_code == 200
    data = res.json()
    assert data["message"] == "Hello from FastAPI v1"

@pytest.mark.asyncio
async def test_v1_version():
    """Test v1 version endpoint."""
    from app.main import app
    transport = ASGITransport(app=app)
    
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/api/v1/version")
    assert res.status_code == 200
    data = res.json()
    assert data["api_version"] == "v1"
    assert data["deprecated"] == False
    assert "features" in data
    assert "rephrase" in data["features"]

@pytest.mark.asyncio
async def test_v1_status():
    """Test v1 status endpoint."""
    from app.main import app
    transport = ASGITransport(app=app)
    
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/api/v1/status")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "operational"
    assert data["api_version"] == "v1"
    assert "rate_limit" in data
    assert "features" in data

# Removed test_legacy_endpoints_still_work - Legacy endpoints no longer exist after cleanup

@pytest.mark.asyncio
async def test_version_endpoints_structure():
    """Test that version endpoints have proper structure."""
    from app.main import app
    transport = ASGITransport(app=app)
    
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/api/v1/version")
        data = res.json()
        
        # Check required fields
        required_fields = ["version", "api_version", "environment", "features", "deprecated"]
        for field in required_fields:
            assert field in data
        
        # Check features structure
        features = data["features"]
        assert "rephrase" in features
        assert "rephrase_stream" in features
        assert "health" in features
        
        # Check endpoint information
        rephrase_feature = features["rephrase"]
        assert "endpoint" in rephrase_feature
        assert "methods" in rephrase_feature
        assert rephrase_feature["endpoint"] == "/api/v1/rephrase"
