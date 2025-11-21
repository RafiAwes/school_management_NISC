# 🏗️ Architecture Documentation

Technical architecture overview of the School Management System.

## Table of Contents

- [System Overview](#system-overview)
- [Architecture Diagram](#architecture-diagram)
- [Technology Stack](#technology-stack)
- [Data Flow](#data-flow)
- [Database Design](#database-design)
- [API Design](#api-design)
- [Security Architecture](#security-architecture)
- [Scalability](#scalability)

## System Overview

The School Management System is a full-stack web application built with a modern microservices-inspired architecture, featuring a Django REST API backend and Next.js frontend.

### Key Characteristics

- **Architecture Style**: Client-Server with RESTful API
- **Deployment**: Containerized with Docker
- **Database**: PostgreSQL (relational)
- **Authentication**: JWT-based token authentication
- **Frontend**: Server-side rendered React with Next.js
- **API**: RESTful JSON API with Django REST Framework

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Web Browser (React/Next.js)                     │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │  Auth UI   │  │ Dashboard  │  │  Student   │         │  │
│  │  │  Pages     │  │  Pages     │  │  Pages     │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTPS/JSON
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                      Nginx (Reverse Proxy)                      │
│              ┌──────────────────┬──────────────────┐            │
│              │  Static Files    │   API Routes     │            │
│              └────────┬─────────┴────────┬─────────┘            │
└───────────────────────┼──────────────────┼──────────────────────┘
                        │                  │
        ┌───────────────▼──────┐   ┌───────▼──────────┐
        │  Static/Media Files  │   │  Application     │
        │  (Nginx/S3)          │   │  Server Layer    │
        └──────────────────────┘   └───────┬──────────┘
                                           │
┌──────────────────────────────────────────▼──────────────────────┐
│                    Backend Services Layer                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Django Application (Gunicorn)               │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │   Auth     │  │  Students  │  │  Teachers  │         │  │
│  │  │  Service   │  │  Service   │  │  Service   │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │  Grades    │  │ Attendance │  │Assignments │         │  │
│  │  │  Service   │  │  Service   │  │  Service   │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                      Data Layer                                 │
│  ┌────────────────────┐  ┌────────────────────┐                │
│  │   PostgreSQL       │  │   Redis (Cache/    │                │
│  │   Database         │  │   Session Store)   │                │
│  └────────────────────┘  └────────────────────┘                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Background Services                          │
│  ┌────────────────────┐  ┌────────────────────┐                │
│  │   Celery Workers   │  │   Celery Beat      │                │
│  │   (Async Tasks)    │  │   (Scheduler)      │                │
│  └────────────────────┘  └────────────────────┘                │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend Stack

```
Next.js 16
├── React 19 (UI Library)
├── TypeScript 5 (Type Safety)
├── Tailwind CSS 4 (Styling)
├── Axios (HTTP Client)
├── Lucide React (Icons)
└── Turbopack (Build Tool)
```

### Backend Stack

```
Django 5.2
├── Django REST Framework 3.15 (API)
├── PostgreSQL 17 (Database)
├── psycopg 3.2 (PostgreSQL Driver)
├── djangorestframework-simplejwt 5.3 (Authentication)
├── Celery 5.4 (Task Queue)
├── Redis 5.0 (Cache/Broker)
├── Gunicorn 23.0 (WSGI Server)
└── drf-spectacular 0.27 (API Documentation)
```

### Infrastructure

```
Docker
├── Docker Compose (Orchestration)
├── PostgreSQL Container (Database)
├── Redis Container (Cache)
└── Application Containers (Backend/Frontend)
```

## Data Flow

### Authentication Flow

```
User Login Request
       │
       ▼
┌──────────────┐
│   Frontend   │
│  (Next.js)   │
└──────┬───────┘
       │ POST /api/users/login/
       │ {email, password}
       ▼
┌──────────────┐
│   Django     │
│    REST      │
│  Framework   │
└──────┬───────┘
       │ Validate Credentials
       ▼
┌──────────────┐
│  User Model  │
│  (Database)  │
└──────┬───────┘
       │ User Found
       ▼
┌──────────────┐
│  JWT Token   │
│  Generator   │
└──────┬───────┘
       │ {access, refresh}
       ▼
┌──────────────┐
│   Frontend   │
│  (Store in   │
│ localStorage)│
└──────────────┘
```

### API Request Flow

```
Authenticated Request
       │
       ▼
┌──────────────┐
│   Frontend   │
│  Component   │
└──────┬───────┘
       │ GET /api/students/
       │ Authorization: Bearer <token>
       ▼
┌──────────────┐
│  Axios HTTP  │
│   Client     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Nginx     │
│ (Reverse     │
│   Proxy)     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Django API  │
│   Endpoint   │
└──────┬───────┘
       │ Verify Token
       ▼
┌──────────────┐
│     JWT      │
│ Verification │
└──────┬───────┘
       │ Check Permissions
       ▼
┌──────────────┐
│  ViewSet/    │
│    View      │
└──────┬───────┘
       │ Query Database
       ▼
┌──────────────┐
│  PostgreSQL  │
│   Database   │
└──────┬───────┘
       │ Serialize Data
       ▼
┌──────────────┐
│  Serializer  │
└──────┬───────┘
       │ JSON Response
       ▼
┌──────────────┐
│   Frontend   │
│  (Update UI) │
└──────────────┘
```

## Database Design

### Entity Relationship Diagram

```
┌─────────────────┐
│      User       │
│─────────────────│
│ PK id           │
│    email        │◄───────────┐
│    username     │            │
│    full_name    │            │ OneToOne
│    role         │            │
│    password     │            │
│    is_active    │            │
└────────┬────────┘            │
         │                     │
         │ OneToOne            │
         │                     │
    ┌────▼────────┐    ┌───────┴──────────┐
    │StudentProfile│    │ TeacherProfile   │
    │──────────────│    │──────────────────│
    │ PK id        │    │ PK id            │
    │ FK user_id   │    │ FK user_id       │
    │    roll_no   │    │    teacher_id    │
    │ grade_level  │    │ specialization   │
    │  class_name  │    │  experience      │
    │guardian_contact│  │  contact_no      │
    └──────┬───────┘    └──────────────────┘
           │
           │
    ┌──────▼─────────┐
    │   Attendance   │
    │────────────────│
    │ PK id          │
    │ FK student_id  │
    │    date        │
    │    status      │
    └────────────────┘
           │
           │
    ┌──────▼─────────┐
    │     Grade      │
    │────────────────│
    │ PK id          │
    │ FK student_id  │
    │ FK subject_id  │
    │    marks       │
    │    semester    │
    └────────────────┘
```

### Database Tables

#### Users App

**users_user**
- Custom user model with role-based access
- Fields: id, email, username, full_name, role, password, is_active, is_staff, is_superuser

#### Students App

**students_studentprofile**
- Student-specific information
- Fields: id, user_id, roll_no, grade_level, class_name, guardian_contact
- Relations: OneToOne with User

#### Teachers App

**teachers_teacherprofile**
- Teacher-specific information
- Fields: id, user_id, teacher_id, subject_specialization, years_of_experience, contact_no
- Relations: OneToOne with User

#### Additional Tables (To be implemented)

- **subjects_subject**: Subject information
- **grades_grade**: Student grades
- **attendance_attendance**: Attendance records
- **assignments_assignment**: Homework/assignments
- **announcements_announcement**: School announcements

## API Design

### RESTful Principles

The API follows REST principles:

1. **Resource-based URLs**: `/api/students/`, `/api/teachers/`
2. **HTTP Methods**: GET, POST, PUT, PATCH, DELETE
3. **Status Codes**: Appropriate HTTP status codes
4. **JSON Format**: All data in JSON format
5. **Stateless**: Each request contains all necessary information

### URL Structure

```
/api/
├── users/
│   ├── register/          POST   - Register new user
│   ├── login/             POST   - Login user
│   └── me/                GET    - Get current user
│
├── students/
│   ├── /                  GET    - List students
│   ├── /                  POST   - Create student
│   ├── /{id}/             GET    - Get student details
│   ├── /{id}/             PUT    - Update student
│   └── /{id}/             DELETE - Delete student
│
├── teachers/
│   └── [Similar structure]
│
├── subjects/
│   └── [Similar structure]
│
├── grades/
│   └── [Similar structure]
│
├── attendance/
│   └── [Similar structure]
│
├── assignments/
│   └── [Similar structure]
│
└── announcements/
    └── [Similar structure]
```

### Request/Response Format

**Request:**
```json
POST /api/students/
Authorization: Bearer <token>
Content-Type: application/json

{
  "roll_no": "STU001",
  "grade_level": "10th Grade",
  "class_name": "10-A"
}
```

**Response:**
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 1,
  "user": {
    "id": 5,
    "email": "student@example.com",
    "full_name": "John Doe"
  },
  "roll_no": "STU001",
  "grade_level": "10th Grade",
  "class_name": "10-A"
}
```

## Security Architecture

### Authentication & Authorization

```
┌──────────────────────────────────────────┐
│          Security Layers                 │
├──────────────────────────────────────────┤
│                                          │
│  1. HTTPS/TLS Encryption                │
│     └─> All traffic encrypted            │
│                                          │
│  2. JWT Token Authentication            │
│     ├─> Access Token (short-lived)      │
│     └─> Refresh Token (long-lived)      │
│                                          │
│  3. Role-Based Access Control (RBAC)    │
│     ├─> Admin (full access)             │
│     ├─> Teacher (limited access)        │
│     └─> Student (view only)             │
│                                          │
│  4. CORS Protection                     │
│     └─> Allowed origins only            │
│                                          │
│  5. CSRF Protection                     │
│     └─> Django CSRF tokens              │
│                                          │
│  6. SQL Injection Prevention            │
│     └─> Django ORM parameterized queries│
│                                          │
│  7. XSS Protection                      │
│     └─> Content Security Policy         │
│                                          │
└──────────────────────────────────────────┘
```

### Security Measures

1. **Password Security**
   - Hashed with Django's PBKDF2 algorithm
   - Minimum 8 characters enforced
   - Password validation enabled

2. **Token Security**
   - JWT tokens with expiration
   - Refresh token rotation
   - Secure token storage (httpOnly cookies in production)

3. **API Security**
   - Rate limiting
   - Request throttling
   - Input validation
   - Output sanitization

4. **Database Security**
   - Parameterized queries
   - Connection pooling
   - Encrypted connections

## Scalability

### Horizontal Scaling

```
┌─────────────────────────────────────────────────┐
│            Load Balancer (Nginx)                │
└──────────┬──────────────┬───────────────────────┘
           │              │
     ┌─────▼────┐   ┌─────▼────┐   ┌──────────┐
     │ Backend  │   │ Backend  │   │ Backend  │
     │ Instance │   │ Instance │   │ Instance │
     │    1     │   │    2     │   │    N     │
     └─────┬────┘   └─────┬────┘   └─────┬────┘
           │              │              │
           └──────────────┴──────────────┘
                          │
                    ┌─────▼─────┐
                    │PostgreSQL │
                    │  Primary  │
                    └─────┬─────┘
                          │
                    ┌─────▼─────┐
                    │PostgreSQL │
                    │  Replicas │
                    └───────────┘
```

### Caching Strategy

```
Request Flow with Caching:

User Request
     │
     ▼
┌─────────┐
│  Redis  │ ◄─── Check Cache
│  Cache  │
└────┬────┘
     │
     │ Cache Miss
     ▼
┌─────────┐
│Database │ ◄─── Query Database
└────┬────┘
     │
     │ Store in Cache
     ▼
┌─────────┐
│  Redis  │
│  Cache  │
└─────────┘
```

### Performance Optimization

1. **Database Optimization**
   - Indexes on frequently queried fields
   - Query optimization with select_related/prefetch_related
   - Database connection pooling

2. **Caching**
   - Redis for session storage
   - API response caching
   - Static file caching

3. **Frontend Optimization**
   - Server-side rendering
   - Code splitting
   - Image optimization
   - Static file CDN

4. **API Optimization**
   - Pagination for list endpoints
   - Field filtering
   - Response compression

## Deployment Architecture

### Development Environment

```
Docker Compose
├── Backend Container (Django Dev Server)
├── Frontend Container (Next.js Dev Server)
├── Database Container (PostgreSQL)
└── Watch mode enabled (hot reload)
```

### Production Environment

```
Cloud Infrastructure
├── Load Balancer
├── Application Servers
│   ├── Nginx (Reverse Proxy)
│   ├── Gunicorn (WSGI Server)
│   └── Next.js (Node Server)
├── Database Server (PostgreSQL)
├── Cache Server (Redis)
├── Static Files (CDN/S3)
└── Monitoring & Logging
```

## Future Enhancements

1. **Microservices**: Split into independent services
2. **GraphQL**: Add GraphQL API alongside REST
3. **WebSocket**: Real-time notifications
4. **Message Queue**: RabbitMQ for async processing
5. **Search**: Elasticsearch for advanced search
6. **Analytics**: Data warehouse for reporting
7. **Mobile**: React Native mobile apps
8. **AI/ML**: Predictive analytics for student performance

---

For implementation details, see:
- [Backend Documentation](./BACKEND.md)
- [Frontend Documentation](./FRONTEND.md)
- [API Documentation](./API.md)
