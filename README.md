# AI Writing Style Assistant

A modern, enterprise-grade web application that transforms text into different writing styles using artificial intelligence. Built with FastAPI, React, and Docker, this project demonstrates professional software development practices including API versioning, security, testing, and CI/CD.

## 🎯 Project Overview

This application allows users to input text and receive AI-generated versions in multiple writing styles:
- **Professional**: Formal, business-appropriate language
- **Casual**: Relaxed, conversational tone
- **Polite**: Courteous and respectful communication
- **Social Media**: Engaging, platform-optimized content

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Python 3.11+
- **API Versioning**: RESTful API with v1 endpoints and backward compatibility
- **Security**: Rate limiting, input validation, security headers, CORS
- **Testing**: Comprehensive test suite with 22+ unit tests
- **Documentation**: Auto-generated OpenAPI/Swagger docs

### Frontend (React)
- **Framework**: React 19 with Vite build system
- **Styling**: Tailwind CSS for responsive design
- **Real-time**: Server-Sent Events for streaming responses
- **State Management**: Custom hooks for clean component logic

### Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Docker Compose for local development
- **CI/CD**: GitHub Actions with automated testing and deployment
- **Security**: Vulnerability scanning with Trivy and Bandit

## 🚀 Quick Start

### Prerequisites
- Python 3.11 or higher (Recommended 3.12)
- Node.js 20 or higher (Reconmended v23.11.1)
- Docker and Docker Compose
- OpenAI API key

### Option 1: Docker (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd ai-writing-style-assistant

# Start the application
docker compose up -d

# Access the application
# Frontend: http://localhost:80
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 2: Local Development
```bash
# Backend setup
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Create environment file
cp env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start backend server
make dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## 📚 API Documentation

### Base URL
- **Production**: `https://your-domain.com/api/v1`
- **Development**: `http://localhost:8000/api/v1`

### Endpoints

#### Health Check
```http
GET /api/v1/health
```
Returns application status and environment information.

#### Text Rephrasing
```http
POST /api/v1/rephrase
Content-Type: application/json

{
  "text": "Your text to rephrase"
}
```
Returns rephrased text in four different styles.

#### Streaming Rephrasing
```http
POST /api/v1/rephrase-stream
Content-Type: application/json

{
  "text": "Your text to rephrase"
}
```
Streams rephrased text in real-time using Server-Sent Events.

#### Version Information
```http
GET /api/v1/version
```
Returns detailed API version information and available features.

#### API Status
```http
GET /api/v1/status
```
Returns comprehensive operational status and configuration details.

### Rate Limiting
- **Per minute**: 60 requests
- **Per hour**: 1000 requests
- **Headers**: Rate limit information included in response headers

## 🧪 Testing

### Backend Tests
```bash
cd backend
source .venv/bin/activate

# Run all tests
make test

# Run specific test categories
make test-unit          # Unit tests only
make test-security      # Security tests
make test-integration   # Integration tests (requires API key)

# Run with coverage
pytest --cov=app tests/
```

### Frontend Tests
```bash
cd frontend

# Linting
npm run lint

# Run tests
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm test

# Build test
npm run build
```

### Docker Tests
```bash
# Test containers
docker compose up -d
sleep 30
curl -f http://localhost:8000/api/v1/health
curl -f http://localhost:80/
docker compose down
```

## 🔧 Development

### Project Structure
```
ai-writing-style-assistant/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/           # Versioned API endpoints
│   │   │   └── endpoints.py  # Legacy endpoints
│   │   ├── config.py         # Configuration management
│   │   ├── models.py         # Pydantic models
│   │   ├── security.py       # Security utilities
│   │   └── middleware.py     # Custom middleware
│   ├── tests/                # Test suite
│   ├── requirements.txt      # Production dependencies
│   └── requirements-dev.txt  # Development dependencies
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Utility functions
│   └── package.json
├── docker-compose.yml       # Container orchestration
└── .github/workflows/       # CI/CD pipelines
```

### Code Quality
- **Backend**: Black, isort, flake8, mypy
- **Frontend**: ESLint with React rules
- **Security**: Bandit for Python, Trivy for containers
- **Testing**: pytest with async support

### Environment Variables
```bash
# Backend (.env)
OPENAI_API_KEY=your_openai_api_key
ENVIRONMENT=development
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ORIGINS=http://localhost:3000
RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=1000
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run
docker compose up -d

# Production build
docker compose -f docker-compose.prod.yml up -d
```

### CI/CD Pipeline
The project includes GitHub Actions workflows:
- **Security scanning** with Trivy and Bandit
- **Automated testing** for backend and frontend
- **Docker image building** and testing
- **Integration testing** with OpenAI API
- **Deployment** to staging and production

## 🔒 Security Features

- **Rate Limiting**: IP-based request throttling
- **Input Validation**: Comprehensive text validation and sanitization
- **Security Headers**: CSP, HSTS, X-Frame-Options, etc.
- **CORS Configuration**: Proper cross-origin resource sharing
- **API Key Validation**: OpenAI API key format validation
- **Content Filtering**: Basic inappropriate content detection

## 📊 Performance

- **Response Time**: < 2 seconds for typical requests
- **Streaming**: Real-time text generation
- **Caching**: Docker layer caching for faster builds
- **Optimization**: Gzip compression, minified assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`make test` in backend, `npm run lint` in frontend)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- FastAPI community for the excellent framework
- React team for the powerful frontend library
- Docker community for containerization tools

## 📞 Support

For questions or issues:
1. Check the [API documentation](http://localhost:8000/docs) when running locally
2. Review the test files for usage examples
3. Open an issue on GitHub with detailed information

---

**Built with ❤️ using modern web technologies and best practices**
