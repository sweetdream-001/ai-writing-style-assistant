# Docker Setup & Deployment

This document explains how to build, run, and deploy the AI Writing Style Assistant using Docker.

## 🐳 Quick Start

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+
- OpenAI API Key

### 1. Environment Setup
```bash
# Copy environment template
cp backend/env.example .env

# Edit .env and add your OpenAI API key
nano .env
```

### 2. Build and Run
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f
```

### 3. Access the Application
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (development only)

## 🏗️ Architecture

### Services
1. **Backend** (`backend`): FastAPI application
   - Port: 8000
   - Health check: `/health`
   - Environment: Production

2. **Frontend** (`frontend`): React application served by Nginx
   - Port: 80
   - Proxy: `/api/*` → Backend
   - Static files with caching

3. **Backend Dev** (`backend-dev`): Development backend (optional)
   - Port: 8001
   - Hot reload enabled
   - Profile: `dev`

### Network
- **Network**: `ai-writing-network` (172.20.0.0/16)
- **Internal communication**: Services communicate via service names

### Volumes
- `backend_logs`: Backend application logs
- `frontend_logs`: Nginx access/error logs

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
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ORIGINS=http://localhost:3000,http://localhost:80
RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=1000
```

### Production vs Development
- **Production**: Optimized builds, security headers, no debug info
- **Development**: Hot reload, debug info, API documentation enabled

## 🚀 Deployment Commands

### Development
```bash
# Start development environment
docker-compose --profile dev up --build

# Start only backend in development mode
docker-compose --profile dev up backend-dev
```

### Production
```bash
# Start production environment
docker-compose up -d --build

# Scale backend (if needed)
docker-compose up -d --scale backend=3

# Update and restart
docker-compose pull && docker-compose up -d --build
```

### Maintenance
```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs backend
docker-compose logs frontend

# Execute commands in containers
docker-compose exec backend python -c "print('Hello from container')"

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 🔍 Monitoring

### Health Checks
- **Backend**: `curl http://localhost:8000/health`
- **Frontend**: `curl http://localhost:80/`

### Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Container Status
```bash
# Check container health
docker-compose ps

# Resource usage
docker stats
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   sudo lsof -i :8000
   sudo lsof -i :80
   
   # Stop conflicting services
   sudo systemctl stop nginx  # if using port 80
   ```

2. **Build failures**
   ```bash
   # Clean build
   docker-compose build --no-cache
   
   # Check Dockerfile syntax
   docker build -t test ./backend
   ```

3. **Environment variables not loaded**
   ```bash
   # Check if .env file exists
   ls -la .env
   
   # Verify environment in container
   docker-compose exec backend env | grep OPENAI
   ```

4. **Network connectivity issues**
   ```bash
   # Check network
   docker network ls
   docker network inspect ai-writing-network
   
   # Test inter-service communication
   docker-compose exec frontend wget -qO- http://backend:8000/health
   ```

### Debug Mode
```bash
# Run with debug output
docker-compose --verbose up

# Check container logs
docker-compose logs backend | tail -50
```

## 🔒 Security Features

### Container Security
- Non-root users in both containers
- Minimal base images (alpine/slim)
- Security headers in Nginx
- Health checks for monitoring

### Network Security
- Isolated Docker network
- No direct external access to backend
- API proxy through Nginx
- CORS configuration

## 📊 Performance

### Optimization
- Multi-stage builds for smaller images
- Gzip compression in Nginx
- Static file caching
- Optimized Python dependencies

### Scaling
```bash
# Scale backend service
docker-compose up -d --scale backend=3

# Load balancer configuration needed for multiple backends
```

## 🔄 Updates

### Application Updates
```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Dependency Updates
```bash
# Update Python dependencies
docker-compose exec backend pip install --upgrade -r requirements.txt

# Update Node dependencies
docker-compose exec frontend npm update
```

## 📚 Additional Resources

- [Docker Compose Reference](https://docs.docker.com/compose/)
- [FastAPI Docker Deployment](https://fastapi.tiangolo.com/deployment/docker/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [React Docker Deployment](https://create-react-app.dev/docs/deployment/)
