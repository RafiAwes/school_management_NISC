# 🔧 Backend Documentation

Complete documentation for the Django backend of the School Management System.

## Table of Contents

- [Architecture](#architecture)
- [Models](#models)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)

## Architecture

The backend follows Django's MVT (Model-View-Template) architecture with Django REST Framework for API endpoints.

### Project Structure

```
backend/
├── apps/                       # Django applications
│   ├── users/                  # User management & authentication
│   ├── students/               # Student profiles
│   ├── teachers/               # Teacher profiles
│   ├── subjects/               # Subject management
│   ├── grades/                 # Grade management
│   ├── attendance/             # Attendance tracking
│   ├── assignments/            # Assignment management
│   └── announcements/          # Announcements
├── schoolmanagement/           # Project settings
│   ├── settings.py             # Django settings
│   ├── urls.py                 # Root URL configuration
│   ├── wsgi.py                 # WSGI configuration
│   └── asgi.py                 # ASGI configuration
├── manage.py                   # Django CLI
├── requirements.txt            # Python dependencies
└── Dockerfile                  # Docker configuration
```

## Models

### User Model (`apps.users.models.User`)

Custom user model extending Django's AbstractUser.

**Fields:**
- `email` (EmailField, unique) - Primary login identifier
- `username` (CharField) - Username
- `full_name` (CharField) - User's full name
- `role` (CharField) - User role: 'admin', 'teacher', or 'student'
- `is_active` (BooleanField) - Account active status
- `is_staff` (BooleanField) - Staff status

**Manager:**
- `UserManager` - Custom manager with email-based authentication

**Authentication:**
- Username field: `email`
- Required fields: None (only email and password required)

**Usage:**
```python
from apps.users.models import User

# Create user
user = User.objects.create_user(
    email='student@school.com',
    password='password123',
    full_name='John Doe',
    role='student'
)

# Create superuser
admin = User.objects.create_superuser(
    email='admin@school.com',
    password='admin123',
    full_name='Admin User'
)
```

### StudentProfile Model (`apps.students.models.StudentProfile`)

Extended profile for student users.

**Fields:**
- `user` (OneToOneField → User) - Associated user account
- `roll_no` (CharField, unique) - Student roll number
- `grade_level` (CharField) - Current grade level
- `class_name` (CharField) - Class/section name
- `guardian_contact` (CharField, optional) - Guardian phone number

**Relations:**
- One-to-one with User model
- Related name: `student_profile`

**Usage:**
```python
from apps.students.models import StudentProfile

# Create student profile
profile = StudentProfile.objects.create(
    user=user,
    roll_no='STU001',
    grade_level='10th Grade',
    class_name='10-A',
    guardian_contact='+1234567890'
)

# Access from user
student_info = user.student_profile
```

### TeacherProfile Model (`apps.teachers.models.TeacherProfile`)

Extended profile for teacher users.

**Fields:**
- `user` (OneToOneField → User) - Associated user account
- `tearher_id` (CharField, unique) - Teacher ID (Note: typo in field name)
- `subject_specialization` (CharField) - Subject expertise
- `years_of_experience` (PositiveIntegerField) - Teaching experience
- `contact_no` (CharField, optional) - Contact number

**Relations:**
- One-to-one with User model
- Related name: `teacher_profile`

**Usage:**
```python
from apps.teachers.models import TeacherProfile

# Create teacher profile
profile = TeacherProfile.objects.create(
    user=user,
    tearher_id='TCH001',
    subject_specialization='Mathematics',
    years_of_experience=5,
    contact_no='+1234567890'
)

# Access from user
teacher_info = user.teacher_profile
```

### Other Models

The following models are defined but need to be implemented:

- **Subject** - Course/subject information
- **Grade** - Student grades and assessments
- **Attendance** - Student attendance records
- **Assignment** - Homework and assignments
- **Announcement** - School-wide announcements

## API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/users/register/
Content-Type: application/json

{
    "email": "user@school.com",
    "password": "password123",
    "full_name": "John Doe",
    "role": "student"
}

Response (201 Created):
{
    "id": 1,
    "email": "user@school.com",
    "full_name": "John Doe",
    "role": "student",
    "message": "User registered successfully"
}
```

#### Login User
```
POST /api/users/login/
Content-Type: application/json

{
    "email": "user@school.com",
    "password": "password123"
}

Response (200 OK):
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "user": {
        "id": 1,
        "email": "user@school.com",
        "full_name": "John Doe",
        "role": "student"
    }
}
```

### Future Endpoints (To be implemented)

#### Students
- `GET /api/students/` - List all students
- `GET /api/students/{id}/` - Get student details
- `POST /api/students/` - Create student
- `PUT /api/students/{id}/` - Update student
- `DELETE /api/students/{id}/` - Delete student

#### Teachers
- `GET /api/teachers/` - List all teachers
- `GET /api/teachers/{id}/` - Get teacher details
- `POST /api/teachers/` - Create teacher
- `PUT /api/teachers/{id}/` - Update teacher

#### Subjects
- `GET /api/subjects/` - List all subjects
- `GET /api/subjects/{id}/` - Get subject details
- `POST /api/subjects/` - Create subject

#### Grades
- `GET /api/grades/` - List all grades
- `GET /api/grades/student/{id}/` - Get student grades
- `POST /api/grades/` - Add grade

#### Attendance
- `GET /api/attendance/` - List attendance records
- `POST /api/attendance/` - Mark attendance
- `GET /api/attendance/student/{id}/` - Get student attendance

#### Assignments
- `GET /api/assignments/` - List assignments
- `GET /api/assignments/{id}/` - Get assignment details
- `POST /api/assignments/` - Create assignment

#### Announcements
- `GET /api/announcements/` - List announcements
- `POST /api/announcements/` - Create announcement

## Authentication

The system uses JWT (JSON Web Tokens) for authentication via `djangorestframework-simplejwt`.

### Token Authentication

1. **Login** - Obtain access and refresh tokens
2. **Access Token** - Use for authenticated requests (expires in 5 minutes by default)
3. **Refresh Token** - Use to get new access token (expires in 1 day)

### Using Tokens

Include the access token in the Authorization header:

```
GET /api/students/
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### Refresh Token

```
POST /api/token/refresh/
Content-Type: application/json

{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

Response:
{
    "access": "new_access_token_here..."
}
```

## Database Schema

### Entity Relationship

```
User (email, username, full_name, role)
  ├─→ StudentProfile (roll_no, grade_level, class_name)
  └─→ TeacherProfile (teacher_id, specialization, experience)

Subject (name, code, description)
  └─→ Grade (student, subject, marks, semester)

Student
  ├─→ Attendance (date, status)
  ├─→ Grade (subject, marks)
  └─→ Assignment (subject, title, submission)

Announcement (title, content, date, author)
```

### Database Migrations

```bash
# Create migrations
python manage.py makemigrations

# View SQL
python manage.py sqlmigrate users 0001

# Apply migrations
python manage.py migrate

# Show migrations
python manage.py showmigrations
```

## Settings Configuration

### Environment Variables

The following environment variables are used:

```python
# settings.py

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")
DEBUG = os.getenv("DEBUG", "False").lower() in ("true", "1", "t")

# Database
DATABASE_URL = os.getenv("DATABASE_URL")
# Example: postgres://user:pass@host:5432/dbname

# CORS
CORS_ALLOWED_ORIGINS = os.getenv("CROSS_ALLOW_ORIGINS", "").split(",")
```

### Installed Apps

```python
INSTALLED_APPS = [
    'corsheaders',              # CORS headers
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'apps.users',               # Custom user model
    'apps.students',            # Student management
    'apps.teachers',            # Teacher management
    'apps.subjects',            # Subject management
    'apps.grades',              # Grade management
    'apps.attendance',          # Attendance tracking
    'apps.assignments',         # Assignment management
    'apps.announcements',       # Announcements
    'rest_framework',           # DRF
    'rest_framework.authtoken', # Token auth
]
```

### CORS Configuration

```python
CORS_ALLOW_CREDENTIALS = True

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
```

## Testing

### Running Tests

```bash
# Run all tests
pytest

# Run specific app tests
pytest apps/users/tests.py

# Run with coverage
pytest --cov=apps

# Verbose output
pytest -v
```

### Writing Tests

```python
# apps/users/tests.py
import pytest
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
def test_create_user():
    user = User.objects.create_user(
        email='test@school.com',
        password='test123',
        full_name='Test User',
        role='student'
    )
    assert user.email == 'test@school.com'
    assert user.role == 'student'
    assert user.check_password('test123')

@pytest.mark.django_db
def test_create_superuser():
    admin = User.objects.create_superuser(
        email='admin@school.com',
        password='admin123',
        full_name='Admin User'
    )
    assert admin.is_staff is True
    assert admin.is_superuser is True
```

## Management Commands

### Create Demo Students

```bash
python manage.py create_demo_students
```

Located in: `apps/users/management/commands/create_demo_students.py`

### Custom Commands

Create custom commands in `apps/<app>/management/commands/`:

```python
# apps/students/management/commands/import_students.py
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Import students from CSV'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str)

    def handle(self, *args, **options):
        csv_file = options['csv_file']
        # Import logic here
        self.stdout.write(self.style.SUCCESS('Students imported!'))
```

Usage:
```bash
python manage.py import_students students.csv
```

## Deployment

### Production Checklist

- [ ] Set `DEBUG = False`
- [ ] Use strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set proper CORS origins
- [ ] Use production database
- [ ] Collect static files
- [ ] Set up HTTPS
- [ ] Configure logging
- [ ] Set up backups
- [ ] Use environment variables

### Collect Static Files

```bash
python manage.py collectstatic --noinput
```

### Run with Gunicorn

```bash
gunicorn schoolmanagement.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --timeout 120
```

### Security Headers

Add to `settings.py`:

```python
# Security settings for production
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
```

## API Documentation

### Using drf-spectacular

The project includes drf-spectacular for automatic API documentation.

Add to `urls.py`:

```python
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
```

Access documentation at: http://localhost:8000/api/docs/

## Best Practices

1. **Use serializers** for all API endpoints
2. **Implement permissions** for role-based access
3. **Add validation** in serializers and models
4. **Write tests** for all endpoints
5. **Use transactions** for related operations
6. **Log errors** appropriately
7. **Document complex logic**
8. **Follow Django conventions**

## Common Issues

### Migration Conflicts
```bash
# Delete migration files (except __init__.py)
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
python manage.py makemigrations
python manage.py migrate
```

### Database Reset
```bash
# Drop and recreate database
python manage.py flush
python manage.py migrate
python manage.py createsuperuser
```

## Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [DRF Documentation](https://www.django-rest-framework.org/)
- [SimpleJWT Documentation](https://django-rest-framework-simplejwt.readthedocs.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

For frontend documentation, see [FRONTEND.md](./FRONTEND.md)
