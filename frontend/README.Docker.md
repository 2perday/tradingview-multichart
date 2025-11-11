# Docker Deployment Guide

## Quick Start

### Using Docker Compose (Recommended)
```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

Access the application at: **http://localhost:8080**

### Using Docker CLI
```bash
# Build the image
docker build -t tradingview-multichart:latest .

# Run the container
docker run -d \
  --name tradingview-frontend \
  -p 8080:80 \
  --restart unless-stopped \
  tradingview-multichart:latest

# View logs
docker logs -f tradingview-frontend

# Stop and remove
docker stop tradingview-frontend
docker rm tradingview-frontend
```

## Configuration

### Change Port
Edit `docker-compose.yml`:
```yaml
ports:
  - "3000:80"  # Access at http://localhost:3000
```

Or with Docker CLI:
```bash
docker run -d -p 3000:80 tradingview-multichart:latest
```

### Custom nginx Configuration
Edit `nginx.conf` and rebuild:
```bash
docker-compose up -d --build
```

## Health Check
```bash
# Check container health
docker ps

# Manual health check
curl http://localhost:8080/health
```

## Production Deployment

### Build Production Image
```bash
docker build -t your-registry/tradingview-multichart:v1.0.0 .
```

### Push to Registry
```bash
docker push your-registry/tradingview-multichart:v1.0.0
```

### Deploy
```bash
docker pull your-registry/tradingview-multichart:v1.0.0
docker run -d -p 80:80 your-registry/tradingview-multichart:v1.0.0
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs tradingview-frontend

# Check nginx configuration
docker exec tradingview-frontend nginx -t
```

### Port already in use
```bash
# Find process using port 8080
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # Linux/Mac

# Change port in docker-compose.yml
```

## Image Size Optimization
- **Builder stage**: ~500MB (Node.js + dependencies + source)
- **Production stage**: ~25MB (nginx:alpine + built assets)
- **Final image**: ~25MB

## Features
- Multi-stage build for minimal image size
- nginx with optimized configuration
- Gzip compression enabled
- Security headers included
- Static asset caching (1 year)
- SPA routing support
- Health check endpoint
- Auto-restart on failure
