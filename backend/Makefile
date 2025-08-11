# AI Writing Style Assistant - Backend Makefile
.PHONY: help install install-dev run dev test test-verbose test-integration test-integration-simple test-streaming test-unit test-all test-security clean lint format check setup env health

# Default target
help:
	@echo "AI Writing Style Assistant - Available Commands:"
	@echo ""
	@echo "Setup & Installation:"
	@echo "  setup          - Complete setup (install deps, create .env)"
	@echo "  install        - Install production dependencies"
	@echo "  install-dev    - Install all dependencies including dev tools"
	@echo "  env            - Create .env file from template"
	@echo ""
	@echo "Development:"
	@echo "  run            - Run the FastAPI server"
	@echo "  dev            - Run server with auto-reload on port 8000"
	@echo "  health         - Check if the server is running"
	@echo "  test           - Run unit tests (no API calls)"
	@echo "  test-verbose   - Run unit tests with verbose output"
	@echo "  test-unit      - Run unit tests only (excluding integration)"
	@echo "  test-security  - Run security tests"
	@echo "  test-integration - Run integration tests (requires API key)"
	@echo "  test-streaming - Test streaming functionality (requires API key)"
	@echo "  test-all       - Run all tests including integration"
	@echo ""
	@echo "Code Quality:"
	@echo "  lint           - Run linting checks"
	@echo "  format         - Format code with black and isort"
	@echo "  check          - Run all quality checks (lint + test)"
	@echo ""
	@echo "Cleanup:"
	@echo "  clean          - Remove cache files and build artifacts"

# Setup and Installation
setup: install-dev env
	@echo "✅ Setup complete! Don't forget to add your OPENAI_API_KEY to ../.env"

install:
	pip install -r requirements.txt

install-dev: install
	pip install -r requirements-dev.txt

env:
	@if [ ! -f ../.env ]; then \
		cp env.example ../.env; \
		echo "📝 Created .env file in root directory from template"; \
		echo "⚠️  Please edit ../.env and add your OPENAI_API_KEY"; \
	else \
		echo "📝 .env file already exists in root directory"; \
	fi

# Development
run:
	uvicorn app.main:app --reload

dev:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

health:
	@echo "🔍 Checking server health..."
	@curl -s http://localhost:8000/api/v1/health | grep -q "ok" && \
		echo "✅ Server is running!" || \
		echo "❌ Server is not responding (make sure it's running with 'make dev')"

# Testing
test:
	pytest -m "not integration" --tb=short

test-verbose:
	pytest -m "not integration" -v -s

test-unit:
	pytest -m "not integration" --tb=short

test-security:
	@echo "🔒 Running security tests..."
	pytest tests/test_security.py -v -s

test-integration:
	@if [ -f ../.env ]; then \
		echo "🧪 Running integration tests (requires OPENAI_API_KEY)..."; \
		pytest -m integration -v -s; \
	else \
		echo "❌ .env file not found in root directory. Run 'make env' first and add your API key"; \
	fi

test-integration-simple:
	@if [ -f ../.env ]; then \
		cd tests && python run_integration_test.py; \
	else \
		echo "❌ .env file not found in root directory. Run 'make env' first and add your API key"; \
	fi

test-streaming:
	@if [ -f ../.env ]; then \
		echo "🌊 Testing streaming functionality..."; \
		cd tests && python test_streaming.py; \
	else \
		echo "❌ .env file not found in root directory. Run 'make env' first and add your API key"; \
	fi

test-all:
	@if [ -f ../.env ]; then \
		echo "🧪 Running all tests..."; \
		pytest -v; \
	else \
		echo "⚠️  Running unit tests only (.env file not found in root directory for integration tests)"; \
		pytest -m "not integration" -v; \
	fi

# Code Quality
lint:
	@echo "🔍 Running flake8..."
	-flake8 app/ tests/ --max-line-length=88 --ignore=E203,W503
	@echo "🔍 Running mypy..."
	-mypy app/ --ignore-missing-imports

format:
	@echo "🎨 Formatting with black..."
	black app/ tests/ --line-length=88
	@echo "🎨 Sorting imports with isort..."
	isort app/ tests/

check: lint test test-security
	@echo "✅ All checks passed!"

# Cleanup
clean:
	@echo "🧹 Cleaning up..."
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true
	find . -type f -name "*.pyo" -delete 2>/dev/null || true
	find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
	@echo "✅ Cleanup complete!"