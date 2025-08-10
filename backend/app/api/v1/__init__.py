# API v1 package
from fastapi import APIRouter
from .endpoints import router as endpoints_router
from .version import router as version_router
from .docs import router as docs_router

# Create v1 router
router = APIRouter(prefix="/v1")

# Include all v1 endpoints
router.include_router(endpoints_router)
router.include_router(version_router)
router.include_router(docs_router)
