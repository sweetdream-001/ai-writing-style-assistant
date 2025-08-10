# AI Writing Style Assistant

A modern web application that transforms text into different writing styles using AI.

## Features

- **Multiple Writing Styles**: Professional, casual, polite, and social media styles
- **Real-time Streaming**: Get responses as they're generated
- **Modern UI**: Clean, responsive interface built with React
- **Enterprise Ready**: Security, rate limiting, and proper architecture
- **Docker Support**: Easy deployment with containerization
- **CI/CD Pipeline**: Automated testing and deployment

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- Docker & Docker Compose
- OpenAI API Key

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-writing-style-assistant
   ```

2. **Backend Setup**
   ```bash
   cd backend
   make setup
   # Edit .env and add your OPENAI_API_KEY
   make dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Docker Setup**
   ```bash
   docker compose up -d
   ```

## Architecture

### Backend (FastAPI)
- **Modular Design**: Separated models, config, and API endpoints
- **Security**: Rate limiting, input validation, security headers
- **Configuration**: Environment-based settings management
- **Testing**: Comprehensive test suite with unit and integration tests

### Frontend (React + Vite)
- **Modern Stack**: React 19, Vite, Tailwind CSS
- **Real-time**: Server-Sent Events for streaming responses
- **Responsive**: Mobile-first design
- **Type Safe**: Proper TypeScript integration

### Infrastructure
- **Containerization**: Docker for consistent environments
- **CI/CD**: GitHub Actions with automated testing
- **Security**: Vulnerability scanning with Trivy and Bandit
- **Monitoring**: Health checks and proper logging

## Testing

```bash
# Backend tests
cd backend
make test              # Unit tests
make test-integration  # Integration tests (requires API key)
make test-security     # Security tests

# Frontend tests
cd frontend
npm run lint          # Linting
npm run build         # Build test
```

## Deployment

### Docker
```bash
docker compose up -d
```

### Production
The application includes CI/CD pipelines for automated deployment to staging and production environments.

## Security Features

- Rate limiting (per IP)
- Input validation and sanitization
- Security headers (CSP, HSTS, etc.)
- CORS configuration
- API key validation
- Content filtering

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `make test`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
