# ⚡ Quick Start Guide

Get the School Management System up and running in 5 minutes!

## Prerequisites

- Docker Desktop installed and running
- Git installed
- Text editor (VS Code recommended)

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd School_management_system
```

## Step 2: Create Environment Files

### Backend (.env)

Create `backend/.env`:

```env
DJANGO_SECRET_KEY=django-insecure-change-this-in-production-xyz123
DEBUG=True
DATABASE_URL=postgres://admin:admin123@db:5432/school_db
ALLOWED_HOSTS=localhost,127.0.0.1,backend
CROSS_ALLOW_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Frontend (.env.local)

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Step 3: Start Application

```bash
docker-compose up -d
```

Wait for services to start (about 30-60 seconds).

## Step 4: Setup Database

```bash
# Run migrations
docker-compose exec backend python manage.py migrate

# Create admin user
docker-compose exec backend python manage.py createsuperuser
```

Follow the prompts to create your admin account.

## Step 5: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin

## Common Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

### Restart Services
```bash
docker-compose restart
```

### Stop Services
```bash
docker-compose down
```

### Create Demo Data
```bash
docker-compose exec backend python manage.py create_demo_students
```

## Troubleshooting

### Port Already in Use

If port 3000 or 8000 is in use, edit `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Changed frontend port
```

### Services Won't Start

```bash
# Stop everything
docker-compose down

# Remove volumes
docker-compose down -v

# Rebuild and restart
docker-compose up -d --build
```

### Database Issues

```bash
# Reset database
docker-compose down -v
docker-compose up -d
docker-compose exec backend python manage.py migrate
```

## Next Steps

1. **Read the docs**: Check out [Setup Guide](./SETUP.md) for detailed information
2. **Explore the API**: See [API Documentation](./API.md)
3. **Customize**: Modify components and add features
4. **Deploy**: Follow [Deployment Guide](./DEPLOYMENT.md) for production

## Development Workflow

### Backend Changes

```bash
# Access backend shell
docker-compose exec backend python manage.py shell

# Make migrations
docker-compose exec backend python manage.py makemigrations

# Apply migrations
docker-compose exec backend python manage.py migrate
```

### Frontend Changes

Just edit files - hot reload is enabled! Changes appear automatically.

### Database Access

```bash
# PostgreSQL shell
docker-compose exec db psql -U admin school_db

# Or use pgAdmin/DBeaver with:
# Host: localhost
# Port: 5432
# Database: school_db
# User: admin
# Password: admin123
```

## User Roles

The system supports three user roles:

1. **Admin**: Full system access
2. **Teacher**: Manage classes, students, grades
3. **Student**: View own information, grades, assignments

Create users via the admin panel or registration page.

## Sample Workflow

1. **Login as admin** at http://localhost:8000/admin
2. **Create teachers and students** using the admin interface
3. **Login as teacher** at http://localhost:3000/auth/login
4. **Manage classes** from the teacher dashboard
5. **Mark attendance** and add grades
6. **Create assignments** for students

## Getting Help

- **Documentation**: See `docs/` folder
- **Issues**: Check GitHub issues
- **Logs**: `docker-compose logs -f`

## Clean Slate

To start fresh:

```bash
# Stop and remove everything
docker-compose down -v

# Remove images (optional)
docker-compose down --rmi all -v

# Start fresh
docker-compose up -d
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

---

Happy coding! 🎉
