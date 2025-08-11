from httpx import AsyncClient, ASGITransport
import pytest

@pytest.mark.asyncio
async def test_health():
    # Import app inside test to ensure environment is set first
    from app.main import app
    transport = ASGITransport(app=app)
    
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/api/v1/health")
    assert res.status_code == 200
    
    data = res.json()
    assert data["status"] == "ok"
    assert "environment" in data
    assert "version" in data
    # Environment can be "development", "production", etc. - don't hardcode it
    assert isinstance(data["environment"], str)
    assert isinstance(data["version"], str)
