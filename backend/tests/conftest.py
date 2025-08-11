# tests/conftest.py
import pytest
import os

# Set environment to development at module import time
# This ensures the FastAPI app is created with development settings
os.environ["ENVIRONMENT"] = "development"

@pytest.fixture(autouse=True)
def set_test_environment():
    """Ensure environment is set to development for all tests."""
    # The environment is already set at module import time
    # This fixture is kept for cleanup purposes
    original_env = os.environ.get("ENVIRONMENT")
    yield
    # Restore original environment after tests
    if original_env and original_env != "development":
        os.environ["ENVIRONMENT"] = original_env
    elif original_env != "development":
        os.environ.pop("ENVIRONMENT", None)
