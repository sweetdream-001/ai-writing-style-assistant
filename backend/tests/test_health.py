from httpx import AsyncClient, ASGITransport
import pytest
from app.main import app

transport = ASGITransport(app=app)

@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}
