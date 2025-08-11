# tests/conftest.py
import pytest
import os

@pytest.fixture(autouse=True)
def set_test_environment():
    """Set environment to development for all tests to avoid production middleware."""
    original_env = os.environ.get("ENVIRONMENT")
    os.environ["ENVIRONMENT"] = "development"
    yield
    if original_env:
        os.environ["ENVIRONMENT"] = original_env
    else:
        os.environ.pop("ENVIRONMENT", None)
