# 📦 Detailed Setup Guide

This guide provides detailed instructions for setting up the School Management System for development.

## Table of Contents

- [System Requirements](#system-requirements)
- [Docker Setup (Recommended)](#docker-setup-recommended)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Initial Data](#initial-data)
- [Troubleshooting](#troubleshooting)

## System Requirements

### For Docker Setup
- **Docker Desktop**: 4.0 or higher
- **Docker Compose**: 2.0 or higher
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: Minimum 5GB free space

### For Local Development
- **Python**: 3.14 or higher
- **Node.js**: 24 or higher
- **npm**: 10 or higher
- **PostgreSQL**: 17 or higher
- **Redis**: 5.0 or higher (for Celery tasks)

## Docker Setup (Recommended)

This is the easiest way to get started with development.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd School_management_system
```

### Step 2: Create Environment Files

#### Backend Environment File

Create `backend/.env` with the following content:

```env
# Django Settings
DJANGO_SECRET_KEY=django-insecure-your-secret-key-change-this-in-production
DEBUG=True

# Database
DATABASE_URL=postgres://admin:admin123@db:5432/school_db

# CORS Settings
ALLOWED_HOSTS=localhost,127.0.0.1,backend,host.docker.internal
CROSS_ALLOW_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Optional: Celery & Redis
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0
```

#### Frontend Environment File

Create `frontend/.env.local` with the following content:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Optional: Other configurations
NODE_ENV=development
```

### Step 3: Start Docker Containers

```bash
# Start all services in detached mode
docker-compose up -d

# View logs (optional)
docker-compose logs -f
```

This will start:
- PostgreSQL database on port 5432
- Django backend on port 8000
- Next.js frontend on port 3000

### Step 4: Run Database Migrations

```bash
# Run migrations
docker-compose exec backend python manage.py migrate

# Create database schema
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```

### Step 5: Create a Superuser

```bash
docker-compose exec backend python manage.py createsuperuser
```

Follow the prompts to create an admin account.

### Step 6: Load Demo Data (Optional)

```bash
# Create demo students
docker-compose exec backend python manage.py create_demo_students
```

### Step 7: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Django Admin**: http://localhost:8000/admin

## Local Development Setup

If you prefer to run services locally without Docker.

### Step 1: Setup PostgreSQL

1. Install PostgreSQL 17
2. Create a database:

```sql
CREATE DATABASE school_db;
CREATE USER admin WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE school_db TO admin;
ALTER DATABASE school_db OWNER TO admin;
```

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (see Environment Variables section)
# Copy the backend .env content from above

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

The backend will be available at http://localhost:8000

### Step 3: Setup Frontend

```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install

# Create .env.local file (see Environment Variables section)
# Copy the frontend .env.local content from above

# Start development server
npm run dev
```

The frontend will be available at http://localhost:3000

### Step 4: Setup Redis (Optional - for Celery)

If you want to use Celery for async tasks:

**Windows:**
```bash
# Download Redis for Windows from GitHub releases
# Or use Docker:
docker run -d -p 6379:6379 redis:latest
```

**macOS:**
```bash
brew install redis
brew services start redis
```

**Linux:**
```bash
sudo apt-get install redis-server
sudo systemctl start redis
```

### Step 5: Start Celery Worker (Optional)

```bash
# In backend directory with activated virtual environment
celery -A schoolmanagement worker -l info
```

## Environment Variables

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DJANGO_SECRET_KEY` | Django secret key | - | Yes |
| `DEBUG` | Enable debug mode | False | No |
| `DATABASE_URL` | PostgreSQL connection string | - | Yes |
| `ALLOWED_HOSTS` | Comma-separated allowed hosts | localhost | No |
| `CROSS_ALLOW_ORIGINS` | Comma-separated CORS origins | - | No |
| `CELERY_BROKER_URL` | Celery broker URL | - | No |
| `CELERY_RESULT_BACKEND` | Celery result backend | - | No |

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:8000/api | Yes |
| `NODE_ENV` | Node environment | development | No |

## Database Setup

### Applying Migrations

Whenever you pull new code or create new models:

```bash
# With Docker
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate

# Local
python manage.py makemigrations
python manage.py migrate
```

### Database Backup

```bash
# With Docker
docker-compose exec db pg_dump -U admin school_db > backup.sql

# Local
pg_dump -U admin school_db > backup.sql
```

### Database Restore

```bash
# With Docker
docker-compose exec -T db psql -U admin school_db < backup.sql

# Local
psql -U admin school_db < backup.sql
```

## Initial Data

### Create Demo Data

The project includes a management command to create demo students:

```bash
# With Docker
docker-compose exec backend python manage.py create_demo_students

# Local
python manage.py create_demo_students
```

### Access Django Admin

1. Navigate to http://localhost:8000/admin
2. Login with superuser credentials
3. Create users, students, teachers, etc.

## Development Workflow

### Making Changes to Backend

1. Create or modify models in `backend/apps/<app_name>/models.py`
2. Create migrations: `python manage.py makemigrations`
3. Apply migrations: `python manage.py migrate`
4. Update serializers if needed
5. Update views and URLs
6. Test your changes

### Making Changes to Frontend

1. Create or modify components in `frontend/src/components/`
2. Update pages in `frontend/src/app/`
3. Add types in `frontend/src/types/`
4. The dev server will auto-reload your changes
5. Test in the browser

### Code Quality

#### Backend

```bash
# Format code (if using black)
black .

# Run linter (if using flake8)
flake8 .

# Run tests
pytest
```

#### Frontend

```bash
# Lint code
npm run lint

# Format code (if using prettier)
npm run format

# Type check
npx tsc --noEmit
```

## Troubleshooting

### Issue: Port Already in Use

**Solution**: Change the port mapping in `docker-compose.yml`

```yaml
ports:
  - "8001:8000"  # Changed from 8000:8000
```

### Issue: Database Connection Failed

**Solution**:
```bash
# Check if database is running
docker-compose ps

# Restart database
docker-compose restart db

# Check database logs
docker-compose logs db
```

### Issue: Frontend Can't Connect to Backend

**Solution**:
1. Check if backend is running: http://localhost:8000/admin
2. Verify `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
3. Check CORS settings in `backend/schoolmanagement/settings.py`
4. Restart both services

### Issue: Module Not Found

**Backend Solution**:
```bash
# With Docker
docker-compose exec backend pip install -r requirements.txt

# Local
pip install -r requirements.txt
```

**Frontend Solution**:
```bash
# With Docker
docker-compose exec frontend npm install

# Local
npm install
```

### Issue: Migration Conflicts

**Solution**:
```bash
# Delete migration files (except __init__.py)
# Then recreate migrations
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```

### Issue: Permission Denied (Windows)

**Solution**:
1. Run PowerShell/Command Prompt as Administrator
2. Or adjust Docker Desktop settings
3. Share the drive in Docker Desktop settings

### Issue: Container Keeps Restarting

**Solution**:
```bash
# Check logs for errors
docker-compose logs backend

# Common fixes:
# 1. Check environment variables
# 2. Ensure database is ready
# 3. Check for syntax errors in code
```

### Issue: Static Files Not Loading

**Solution**:
```bash
# Collect static files
docker-compose exec backend python manage.py collectstatic --noinput
```

### Issue: Next.js Build Errors

**Solution**:
```bash
# Clear Next.js cache
docker-compose exec frontend rm -rf .next

# Rebuild
docker-compose restart frontend
```

## Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Getting Help

If you encounter issues not covered here:

1. Check existing issues in the repository
2. Search Stack Overflow
3. Create a new issue with:
   - Your operating system
   - Error messages
   - Steps to reproduce
   - What you've tried

---

Happy coding! 🚀
