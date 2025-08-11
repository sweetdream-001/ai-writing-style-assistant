# Docker Setup for AI Writing Style Assistant

This document explains how to use Docker to run the AI Writing Style Assistant.

## 🐳 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- OpenAI API key

### 1. Set Environment Variables
```bash
# Create .env file in the root directory
cp backend/env.example .env

# Edit .env and add your OpenAI API key
echo "OPENAI_API_KEY=your_openai_api_key_here" >> .env
```

### 2. Run with Docker Compose
```bash
# Start the application
docker compose up --build
```

### 3. Access the Application
- **Frontend**: http://localhost:3000 (dev) or http://localhost:80 (prod)
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📁 Docker Files Overview

### Core Files
- `backend/Dockerfile` - Backend image
- `frontend/Dockerfile` - Frontend image
- `docker-compose.yml` - Application setup

### Configuration
- `.dockerignore` files - Exclude unnecessary files from builds
- `nginx.conf` - Nginx configuration for frontend

## 🚀 Deployment

```bash
# Build and run the application
docker compose up --build
```

## 🔧 Configuration

### Environment Variables
```bash
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional (with defaults)
ENVIRONMENT=production
OPENAI_MODEL=gpt-4o-mini
OPENAI_TIMEOUT=20
OPENAI_MAX_RETRIES=2
ALLOWED_HOSTS=localhost,127.0.0.1,backend
CORS_ORIGINS=http://localhost:3000,https://your-domain.com
RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=1000
```

### Environment Configuration
```bash
# Use custom environment file
docker compose --env-file .env.prod up --build
```

## 🛠️ Development

### Running Tests
```bash
# Backend tests
docker compose exec backend make test

# Frontend tests
docker compose exec frontend npm run test:run
```

### Debugging
```bash
# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Access container shell
docker compose exec backend bash
docker compose exec frontend sh
```

## 🔒 Security Features

### Production Security
- Non-root user execution
- Minimal base images
- Security headers
- Rate limiting
- Input validation
- CORS configuration

### Development Security
- Same security features as production
- Additional debugging capabilities
- Hot reloading for faster development

## 📊 Monitoring & Health Checks

### Health Check Endpoints
- Backend: `http://localhost:8000/api/v1/health`
- Frontend: `http://localhost:80/` (or `http://localhost:3000/` in dev)

### Docker Health Checks
```bash
# Check container health
docker ps

# View health check logs
docker inspect <container_name> | grep -A 10 Health
```

## 🚀 Production Deployment

### 1. Build Images
```bash
# Build all services
docker compose build

# Or build individually
docker build -f backend/Dockerfile -t ai-writing-backend ./backend
docker build -f frontend/Dockerfile -t ai-writing-frontend ./frontend
```

### 2. Deploy with Environment Variables
```bash
# Create production environment file
cat > .env.prod << EOF
ENVIRONMENT=production
OPENAI_API_KEY=your_production_api_key
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
CORS_ORIGINS=https://your-domain.com
EOF

# Deploy
docker compose --env-file .env.prod up -d
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
lsof -i :8000
lsof -i :3000

# Stop conflicting services or change ports in docker-compose.yml
```

#### 2. Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Or run with sudo (not recommended for production)
sudo docker-compose up --build
```

#### 3. Build Failures
```bash
# Clean up and rebuild
docker-compose down
docker system prune -f
docker-compose up --build --force-recreate
```

#### 4. API Key Issues
```bash
# Verify environment variable is set
docker-compose exec backend env | grep OPENAI_API_KEY

# Check backend logs
docker-compose logs backend
```

### Debug Commands
```bash
# View all containers
docker ps -a

# View container logs
docker compose logs -f

# Access container shell
docker compose exec backend bash
docker compose exec frontend sh

# Check container health
docker compose ps
```

## 📈 Performance Optimization

### Multi-stage Builds
- Reduces final image size
- Separates build and runtime dependencies
- Improves security

### Caching
```bash
# Use build cache
docker compose build --no-cache

# Clear cache if needed
docker system prune -a
```

## 🔄 CI/CD Integration

### GitHub Actions
The project includes GitHub Actions workflows that can be extended to:
- Build Docker images
- Push to container registry
- Deploy to cloud platforms

### Example CI/CD Pipeline
```yaml
# .github/workflows/docker-deploy.yml
name: Docker Deploy
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build and push Docker images
        run: |
          docker compose build
          # Add registry push commands here
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [FastAPI Docker Guide](https://fastapi.tiangolo.com/deployment/docker/)
- [React Docker Guide](https://create-react-app.dev/docs/deployment/#docker)

---

**Note**: Always use environment variables for sensitive information like API keys. Never commit `.env` files to version control.
