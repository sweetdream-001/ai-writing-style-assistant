# AI Writing Style Assistant

A modern, enterprise-grade web application that transforms text into different writing styles using artificial intelligence. Built with FastAPI and React, this project demonstrates professional software development practices including API versioning, security, testing, and CI/CD.

## 🎯 Project Overview

### What This App Does
The AI Writing Style Assistant is a smart text transformation tool that takes your writing and rephrases it in different styles using OpenAI's GPT models. Whether you need to make your message more professional for work, casual for friends, polite for formal situations, or engaging for social media, this app has you covered.

### Key Features
- **📝 Text Transformation**: Input any text and get 4 different style variations
- **⚡ Real-time Streaming**: Watch your text transform in real-time with streaming mode
- **🎯 Multiple Writing Styles**:
  - **Professional**: Formal, business-appropriate language perfect for emails, reports, and professional communication
  - **Casual**: Relaxed, conversational tone great for social media, personal messages, and informal writing
  - **Polite**: Courteous and respectful communication ideal for customer service, formal requests, and diplomatic situations
  - **Social Media**: Engaging, platform-optimized content designed to capture attention and encourage interaction
- **🔄 Two Processing Modes**:
  - **Regular Mode**: Get all results at once (faster for short texts)
  - **Streaming Mode**: Watch results appear in real-time (more engaging for longer texts)
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🔒 Enterprise Security**: Rate limiting, input validation, and security headers
- **⚙️ API Access**: Full REST API for integration with other applications

### Use Cases
- **Business Communication**: Transform casual messages into professional emails
- **Content Creation**: Generate multiple versions of social media posts
- **Customer Service**: Rewrite responses to be more polite and helpful
- **Academic Writing**: Make text more formal for academic purposes
- **Marketing**: Create engaging social media content from formal announcements
- **Personal Communication**: Adjust tone for different audiences and platforms

## 🔧 How It Works

### The Magic Behind the Scenes
1. **User Input**: You type or paste your text into the input field
2. **Style Selection**: Choose between regular mode (all results at once) or streaming mode (real-time updates)
3. **AI Processing**: Your text gets sent to OpenAI's GPT model with specific prompts for each writing style
4. **Style Transformation**: The AI rephrases your text while maintaining the original meaning but adapting the tone and style
5. **Results Display**: You get back 4 different versions of your text, each optimized for a specific purpose

### Technical Process
- **Frontend**: React app handles user interface and real-time updates
- **Backend**: FastAPI processes requests and communicates with OpenAI
- **AI Integration**: Uses OpenAI's GPT-4o-mini model for intelligent text transformation
- **Streaming**: Server-Sent Events provide real-time updates during processing
- **Security**: Rate limiting and input validation protect against abuse

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
- **CI/CD**: GitHub Actions with automated testing and deployment
- **Security**: Vulnerability scanning with Trivy and Bandit
- **Deployment**: Docker containerization with docker-compose
- **Containerization**: Multi-stage Docker builds for optimized production images

## 🚀 Quick Start

### What You'll Need
- **Docker and Docker Compose** (Recommended - easiest way)
- **OR** Python 3.11+ and Node.js 20+ for direct installation
- OpenAI API key (get one at [platform.openai.com](https://platform.openai.com))

### 🐳 Option 1: Docker Setup (Recommended - Fastest & Easiest)

**This is the quickest way to get started!**

```bash
# Clone the repository
git clone git@github.com:sweetdream-001/ai-writing-style-assistant.git
git clone https://github.com/sweetdream-001/ai-writing-style-assistant.git
cd ai-writing-style-assistant

# Set up environment
cp backend/env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start the entire application
docker compose up --build
```

**Access the application:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

**Test with a sample text:**
- Type: "I need to cancel my appointment tomorrow"
- Choose "Streaming Mode" to see real-time transformation
- Watch as your text gets rephrased in 4 different styles!

**Try different modes:**
- **Regular Mode**: Get all results at once (faster)
- **Streaming Mode**: Watch results appear in real-time (more engaging)

📖 **For detailed Docker instructions, see [DOCKER.md](DOCKER.md)**

### Option 2: Direct Installation (For Development)
```bash
# Clone the repository
git clone <repository-url>
cd ai-writing-style-assistant

# Backend setup
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Create environment file
cp backend/env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start backend server
make dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 3: Development with Hot Reload
```bash
# Backend setup (same as above, but with auto-reload)
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Create environment file
cp backend/env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start backend server with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

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
- **Docker**: `http://localhost:8000/api/v1`

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

**Example Request:**
```bash
curl -X POST "http://localhost:8000/api/v1/rephrase" \
  -H "Content-Type: application/json" \
  -d '{"text": "I need to cancel my appointment tomorrow"}'
```

**Example Response:**
```json
{
  "professional": "I would like to request the cancellation of my scheduled appointment for tomorrow.",
  "casual": "Hey, I need to cancel my appointment for tomorrow.",
  "polite": "I kindly request to cancel my appointment scheduled for tomorrow.",
  "social_media": "Unfortunately, I have to cancel my appointment tomorrow 😔 #lifehappens"
}
```

**Features:**
- Supports text up to 5,000 characters
- Returns all 4 writing styles simultaneously
- Fast processing for short to medium texts
- Rate limited to 60 requests per minute

#### Streaming Rephrasing
```http
POST /api/v1/rephrase-stream
Content-Type: application/json

{
  "text": "Your text to rephrase"
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:8000/api/v1/rephrase-stream" \
  -H "Content-Type: application/json" \
  -d '{"text": "I need to cancel my appointment tomorrow"}' \
  -H "Accept: text/event-stream"
```

**Streaming Response:**
```
data: {"professional": "I would like to request the cancellation..."}
data: {"casual": "Hey, I need to cancel my appointment..."}
data: {"polite": "I kindly request to cancel my appointment..."}
data: {"social_media": "Unfortunately, I have to cancel..."}
```

**Features:**
- Real-time streaming using Server-Sent Events
- Results appear as they're generated
- Perfect for longer texts and engaging user experience
- Same rate limiting as regular endpoint

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

### Integration Tests
```bash
# Test backend API
curl -f http://localhost:8000/api/v1/health

# Test frontend (if running)
curl -f http://localhost:3000/
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
│   ├── requirements-dev.txt  # Development dependencies
│   └── Dockerfile           # Backend container
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Utility functions
│   ├── package.json
│   ├── Dockerfile           # Frontend container
│   └── nginx.conf           # Nginx configuration
├── docker-compose.yml       # Multi-container setup
├── DOCKER.md               # Docker documentation
├── CI-CD.md                # CI/CD documentation
└── .github/workflows/      # CI/CD pipelines
```

### Code Quality
- **Backend**: Black, isort, flake8, mypy
- **Frontend**: ESLint with React rules
- **Security**: Bandit for Python, Trivy for containers
- **Testing**: pytest with async support

### Environment Variables
```bash
# Root directory (.env) - used by both Docker and direct development
OPENAI_API_KEY=your_openai_api_key
ENVIRONMENT=development
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ORIGINS=http://localhost:3000
RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=1000
```

## ✨ Features & Capabilities

### Core Functionality
- **🎯 Smart Text Transformation**: Uses OpenAI's GPT-4o-mini to intelligently rephrase text while preserving meaning
- **🔄 Multiple Processing Modes**: Choose between instant results or real-time streaming
- **📊 Style Optimization**: Each writing style is specifically tuned for its intended use case
- **⚡ Performance**: Optimized for fast response times with intelligent caching

### User Experience
- **📱 Responsive Design**: Beautiful interface that works on all devices
- **🎨 Modern UI**: Clean, intuitive design with smooth animations
- **🔄 Real-time Updates**: Watch your text transform in real-time with streaming mode
- **📋 Copy to Clipboard**: One-click copying of any result
- **⚙️ Mode Switching**: Easy toggle between regular and streaming modes

### Technical Features
- **🔒 Security**: Rate limiting, input validation, and security headers
- **📈 Scalability**: Built to handle multiple concurrent users
- **🔍 Monitoring**: Health checks and status endpoints for monitoring
- **📚 API Documentation**: Auto-generated OpenAPI/Swagger documentation
- **🧪 Comprehensive Testing**: 20+ backend tests and 21 frontend tests

### Integration Capabilities
- **🔌 REST API**: Full API access for integration with other applications
- **📡 Webhooks**: Can be extended to support webhook notifications
- **🔐 Authentication**: Ready for API key authentication (can be added)
- **📊 Analytics**: Built-in logging for usage analytics

## 🚀 Deployment

### 🐳 Docker Deployment (Recommended)
```bash
# Production deployment with Docker
docker compose -f docker-compose.yml up -d --build

# Or with custom environment
docker compose --env-file .env.prod up -d --build
```

### Direct Deployment
```bash
# Backend deployment
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Frontend deployment
cd frontend
npm install
npm run build
# Serve the dist folder with your web server
```

### CI/CD Pipeline
The project includes GitHub Actions workflows:
- **Security scanning** with Trivy and Bandit
- **Automated testing** for backend and frontend
- **Integration testing** with OpenAI API
- **Docker image building** and testing
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
- **Caching**: Optimized dependency caching for faster builds
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
- Open source community for development tools

## 📞 Support

For questions or issues:
1. Check the [API documentation](http://localhost:8000/docs) when running locally
2. Review the test files for usage examples
3. Check [DOCKER.md](DOCKER.md) for Docker-specific issues
4. Open an issue on GitHub with detailed information

---

**Built with ❤️ using modern web technologies and best practices**
