# 🚀 Deployment Guide

Complete guide for deploying the School Management System to production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Database Setup](#database-setup)
- [Docker Deployment](#docker-deployment)
- [Cloud Platforms](#cloud-platforms)
- [Security](#security)
- [Monitoring](#monitoring)
- [Backup and Recovery](#backup-and-recovery)

## Prerequisites

### Required Tools

- **Docker & Docker Compose** (if using containers)
- **PostgreSQL 17+** (database)
- **Python 3.14+** (backend)
- **Node.js 24+** (frontend)
- **Git** (version control)
- **SSL Certificate** (for HTTPS)

### Server Requirements

**Minimum:**
- 2 CPU cores
- 4 GB RAM
- 20 GB storage
- Ubuntu 22.04 LTS or similar

**Recommended:**
- 4 CPU cores
- 8 GB RAM
- 50 GB SSD storage
- Ubuntu 22.04 LTS

## Environment Setup

### 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y git curl wget vim nginx postgresql postgresql-contrib

# Install Docker (optional)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin
```

### 2. Create Application User

```bash
# Create user
sudo adduser schooladmin
sudo usermod -aG sudo schooladmin
sudo usermod -aG docker schooladmin

# Switch to user
su - schooladmin
```

### 3. Clone Repository

```bash
# Navigate to home directory
cd ~

# Clone repository
git clone https://github.com/yourusername/School_management_system.git
cd School_management_system
```

## Backend Deployment

### Option 1: Manual Deployment

#### 1. Install Python Dependencies

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn
```

#### 2. Configure Environment

Create `backend/.env`:

```env
# Django Settings
DJANGO_SECRET_KEY=your-very-long-and-random-secret-key-change-this
DEBUG=False

# Database
DATABASE_URL=postgres://dbuser:dbpassword@localhost:5432/school_db

# Security
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CROSS_ALLOW_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# CSRF
CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

#### 3. Collect Static Files

```bash
# Collect static files
python manage.py collectstatic --noinput

# Create static directory if needed
mkdir -p /var/www/school/static
sudo cp -r staticfiles/* /var/www/school/static/
```

#### 4. Run Migrations

```bash
python manage.py migrate
```

#### 5. Create Superuser

```bash
python manage.py createsuperuser
```

#### 6. Setup Gunicorn

Create `/etc/systemd/system/school-backend.service`:

```ini
[Unit]
Description=School Management System Backend
After=network.target

[Service]
Type=notify
User=schooladmin
Group=www-data
WorkingDirectory=/home/schooladmin/School_management_system/backend
Environment="PATH=/home/schooladmin/School_management_system/backend/venv/bin"
ExecStart=/home/schooladmin/School_management_system/backend/venv/bin/gunicorn \
          --workers 4 \
          --bind unix:/run/gunicorn.sock \
          --timeout 120 \
          --access-logfile /var/log/school/access.log \
          --error-logfile /var/log/school/error.log \
          schoolmanagement.wsgi:application

[Install]
WantedBy=multi-user.target
```

Create log directory:
```bash
sudo mkdir -p /var/log/school
sudo chown schooladmin:www-data /var/log/school
```

Start service:
```bash
sudo systemctl daemon-reload
sudo systemctl start school-backend
sudo systemctl enable school-backend
sudo systemctl status school-backend
```

### Option 2: Docker Deployment

See [Docker Deployment](#docker-deployment) section below.

## Frontend Deployment

### Option 1: Next.js Standalone Build

#### 1. Install Dependencies

```bash
cd frontend
npm ci --production=false
```

#### 2. Configure Environment

Create `frontend/.env.production`:

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NODE_ENV=production
```

#### 3. Build Application

```bash
npm run build
```

#### 4. Setup PM2

```bash
# Install PM2
sudo npm install -g pm2

# Start Next.js
pm2 start npm --name "school-frontend" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd
```

### Option 2: Static Export

If you don't need server-side features:

```bash
# Add export script to package.json
# "export": "next build && next export"

# Export static files
npm run export

# Files will be in 'out' directory
# Serve with nginx
```

## Database Setup

### PostgreSQL Configuration

#### 1. Create Database

```bash
sudo -u postgres psql

CREATE DATABASE school_db;
CREATE USER dbuser WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE school_db TO dbuser;
ALTER DATABASE school_db OWNER TO dbuser;
\q
```

#### 2. Configure PostgreSQL

Edit `/etc/postgresql/17/main/postgresql.conf`:

```conf
# Connection settings
listen_addresses = 'localhost'
max_connections = 100

# Memory settings
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
```

Edit `/etc/postgresql/17/main/pg_hba.conf`:

```conf
# Database administrative login
local   all             postgres                                peer

# "local" is for Unix domain socket connections only
local   all             all                                     peer

# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
```

Restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

#### 3. Setup Backups

Create backup script `/home/schooladmin/backup-db.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/home/schooladmin/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

pg_dump -U dbuser school_db | gzip > $BACKUP_DIR/school_db_$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "school_db_*.sql.gz" -mtime +7 -delete
```

Make executable and add to crontab:
```bash
chmod +x /home/schooladmin/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /home/schooladmin/backup-db.sh
```

## Docker Deployment

### 1. Prepare Environment Files

**backend/.env:**
```env
DJANGO_SECRET_KEY=your-secret-key
DEBUG=False
DATABASE_URL=postgres://dbuser:dbpassword@db:5432/school_db
ALLOWED_HOSTS=yourdomain.com
CROSS_ALLOW_ORIGINS=https://yourdomain.com
```

**frontend/.env.production:**
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

### 2. Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  db:
    image: postgres:17
    container_name: school_db_prod
    environment:
      POSTGRES_USER: dbuser
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: school_db
    volumes:
      - pgdata_prod:/var/lib/postgresql/data
    restart: always

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    container_name: school_backend_prod
    env_file:
      - ./backend/.env
    volumes:
      - static_volume:/app/staticfiles
    depends_on:
      - db
    restart: always

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    container_name: school_frontend_prod
    env_file:
      - ./frontend/.env.production
    depends_on:
      - backend
    restart: always

  nginx:
    image: nginx:alpine
    container_name: school_nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
      - static_volume:/var/www/static
    depends_on:
      - backend
      - frontend
    restart: always

volumes:
  pgdata_prod:
  static_volume:
```

### 3. Production Dockerfiles

**backend/Dockerfile.prod:**
```dockerfile
FROM python:3.14-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY . /app/

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:8000", "schoolmanagement.wsgi:application"]
```

**frontend/Dockerfile.prod:**
```dockerfile
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
```

### 4. Deploy with Docker

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

# Create superuser
docker-compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser
```

## Nginx Configuration

### 1. Install Nginx

```bash
sudo apt install nginx
```

### 2. Create Configuration

Create `/etc/nginx/sites-available/school`:

```nginx
# Upstream servers
upstream backend {
    server 127.0.0.1:8000;
}

upstream frontend {
    server 127.0.0.1:3000;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL configuration
    ssl_certificate /etc/ssl/certs/yourdomain.crt;
    ssl_certificate_key /etc/ssl/private/yourdomain.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Logging
    access_log /var/log/nginx/school_access.log;
    error_log /var/log/nginx/school_error.log;

    # Static files
    location /static/ {
        alias /var/www/school/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Media files
    location /media/ {
        alias /var/www/school/media/;
        expires 30d;
    }

    # API requests
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }

    # Admin panel
    location /admin/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Client max body size
    client_max_body_size 10M;
}
```

### 3. Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/school /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

## SSL Certificate

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

The certificate will auto-renew via cron.

## Cloud Platforms

### AWS Deployment

#### 1. EC2 Instance

- Launch Ubuntu 22.04 instance (t2.medium or larger)
- Configure security groups (ports 80, 443, 22)
- Elastic IP for static IP address
- Follow manual deployment steps above

#### 2. RDS for PostgreSQL

- Create PostgreSQL RDS instance
- Update `DATABASE_URL` in `.env`
- Configure security group to allow EC2 access

#### 3. S3 for Static Files

- Create S3 bucket for static files
- Configure Django to use S3 (django-storages)
- Update `STATIC_URL` and `MEDIA_URL`

### Heroku Deployment

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create school-management

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set DJANGO_SECRET_KEY=your-secret-key
heroku config:set DEBUG=False

# Deploy
git push heroku main

# Run migrations
heroku run python manage.py migrate

# Create superuser
heroku run python manage.py createsuperuser
```

### DigitalOcean App Platform

1. Connect GitHub repository
2. Configure environment variables
3. Set build commands
4. Deploy automatically

## Security

### Django Security Settings

Add to `settings.py`:

```python
# Production security settings
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    X_FRAME_OPTIONS = 'DENY'
```

### Firewall Configuration

```bash
# Install UFW
sudo apt install ufw

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
```

### Security Checklist

- [ ] Change default passwords
- [ ] Use strong SECRET_KEY
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set DEBUG=False
- [ ] Limit ALLOWED_HOSTS
- [ ] Use environment variables
- [ ] Regular security updates
- [ ] Configure firewall
- [ ] Setup rate limiting
- [ ] Enable logging
- [ ] Regular backups

## Monitoring

### Setup Logging

```python
# settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': '/var/log/school/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

### Monitor Services

```bash
# Check backend status
sudo systemctl status school-backend

# Check nginx
sudo systemctl status nginx

# Check PostgreSQL
sudo systemctl status postgresql

# View logs
sudo journalctl -u school-backend -f
sudo tail -f /var/log/nginx/error.log
```

## Backup and Recovery

### Database Backup

Automated script (already created above):
```bash
/home/schooladmin/backup-db.sh
```

### Manual Backup

```bash
# Backup database
pg_dump -U dbuser school_db > backup.sql

# Restore database
psql -U dbuser school_db < backup.sql
```

### Full System Backup

```bash
# Backup application files
tar -czf school-backup-$(date +%Y%m%d).tar.gz \
    /home/schooladmin/School_management_system \
    /var/www/school \
    /etc/nginx/sites-available/school

# Backup to remote server
rsync -avz backup.tar.gz user@remote:/backups/
```

## Performance Optimization

### Django Optimization

1. Enable caching (Redis)
2. Use database connection pooling
3. Optimize queries (select_related, prefetch_related)
4. Use CDN for static files

### PostgreSQL Optimization

```sql
-- Create indexes
CREATE INDEX idx_student_email ON students_studentprofile(user_id);
CREATE INDEX idx_grade_student ON grades_grade(student_id);

-- Analyze tables
ANALYZE;
```

### Nginx Caching

Add to nginx config:
```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m;

location /api/ {
    proxy_cache my_cache;
    proxy_cache_valid 200 5m;
}
```

## Troubleshooting

### Common Issues

**Issue: 502 Bad Gateway**
```bash
# Check if backend is running
sudo systemctl status school-backend

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
```

**Issue: Database connection failed**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test connection
psql -U dbuser -d school_db
```

**Issue: Static files not loading**
```bash
# Recollect static files
python manage.py collectstatic --noinput

# Check nginx permissions
sudo chown -R www-data:www-data /var/www/school/static
```

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Review logs weekly
- Check disk space weekly
- Test backups monthly
- Security patches immediately

### Update Procedure

```bash
# Backup first
./backup-db.sh

# Pull latest code
git pull origin main

# Update backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput

# Restart services
sudo systemctl restart school-backend

# Update frontend
cd ../frontend
npm install
npm run build
pm2 restart school-frontend
```

---

For more information, see:
- [Setup Guide](./SETUP.md)
- [Backend Documentation](./BACKEND.md)
- [Frontend Documentation](./FRONTEND.md)
