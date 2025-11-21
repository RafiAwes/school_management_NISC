# 🔌 API Documentation

Complete API reference for the School Management System backend.

## Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)
  - [Authentication](#authentication-endpoints)
  - [Users](#users-endpoints)
  - [Students](#students-endpoints)
  - [Teachers](#teachers-endpoints)
  - [Subjects](#subjects-endpoints)
  - [Grades](#grades-endpoints)
  - [Attendance](#attendance-endpoints)
  - [Assignments](#assignments-endpoints)
  - [Announcements](#announcements-endpoints)

## Base URL

**Development:**
```
http://localhost:8000/api
```

**Production:**
```
https://your-domain.com/api
```

## Authentication

The API uses JWT (JSON Web Token) authentication.

### Getting Tokens

1. Register or login to receive tokens
2. Use the access token for authenticated requests
3. Refresh the access token when it expires

### Using Tokens

Include the access token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

### Token Expiration

- **Access Token**: 5 minutes (default)
- **Refresh Token**: 24 hours (default)

## Response Format

### Success Response

```json
{
  "status": "success",
  "data": {
    // Response data here
  },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Error description",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

## Error Handling

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 204 | No Content | Request successful, no content to return |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict (e.g., duplicate) |
| 500 | Internal Server Error | Server error |

### Common Error Responses

#### Validation Error (400)
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": {
    "email": ["This field is required."],
    "password": ["Password must be at least 8 characters."]
  }
}
```

#### Authentication Error (401)
```json
{
  "status": "error",
  "message": "Authentication credentials were not provided."
}
```

#### Permission Error (403)
```json
{
  "status": "error",
  "message": "You do not have permission to perform this action."
}
```

#### Not Found Error (404)
```json
{
  "status": "error",
  "message": "Resource not found."
}
```

## Endpoints

### Authentication Endpoints

#### Register User

Create a new user account.

**Endpoint:** `POST /api/users/register/`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "full_name": "John Doe",
  "role": "student"
}
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Valid email address |
| password | string | Yes | Minimum 8 characters |
| full_name | string | Yes | User's full name |
| role | string | Yes | One of: 'admin', 'teacher', 'student' |

**Success Response (201):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "student",
  "username": "user",
  "message": "User registered successfully"
}
```

**Error Response (400):**
```json
{
  "email": ["User with this email already exists."],
  "password": ["This password is too short."]
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@school.com",
    "password": "password123",
    "full_name": "Jane Smith",
    "role": "student"
  }'
```

#### Login User

Authenticate and receive access tokens.

**Endpoint:** `POST /api/users/login/`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User's email |
| password | string | Yes | User's password |

**Success Response (200):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "student"
  }
}
```

**Error Response (401):**
```json
{
  "detail": "Invalid credentials"
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@school.com",
    "password": "password123"
  }'
```

#### Refresh Token

Get a new access token using refresh token.

**Endpoint:** `POST /api/token/refresh/`

**Authentication:** Not required (uses refresh token)

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Success Response (200):**
```json
{
  "access": "new_access_token_here..."
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{
    "refresh": "your_refresh_token"
  }'
```

### Users Endpoints

#### Get Current User

Get the authenticated user's profile.

**Endpoint:** `GET /api/users/me/`

**Authentication:** Required

**Success Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "student",
  "username": "user"
}
```

**Example:**
```bash
curl -X GET http://localhost:8000/api/users/me/ \
  -H "Authorization: Bearer your_access_token"
```

#### Update User Profile

Update the authenticated user's profile.

**Endpoint:** `PATCH /api/users/me/`

**Authentication:** Required

**Request Body:**
```json
{
  "full_name": "John Updated Doe"
}
```

**Success Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Updated Doe",
  "role": "student"
}
```

### Students Endpoints

> **Note:** These endpoints are planned but not yet implemented.

#### List Students

Get a list of all students.

**Endpoint:** `GET /api/students/`

**Authentication:** Required (Teacher/Admin)

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| grade_level | string | Filter by grade level |
| class_name | string | Filter by class |
| search | string | Search by name or roll number |
| page | integer | Page number (default: 1) |
| page_size | integer | Items per page (default: 20) |

**Success Response (200):**
```json
{
  "count": 100,
  "next": "http://localhost:8000/api/students/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "user": {
        "id": 5,
        "email": "student@example.com",
        "full_name": "Jane Smith"
      },
      "roll_no": "STU001",
      "grade_level": "10th Grade",
      "class_name": "10-A",
      "guardian_contact": "+1234567890"
    }
  ]
}
```

**Example:**
```bash
curl -X GET "http://localhost:8000/api/students/?grade_level=10th%20Grade" \
  -H "Authorization: Bearer your_access_token"
```

#### Get Student Details

Get detailed information about a specific student.

**Endpoint:** `GET /api/students/{id}/`

**Authentication:** Required (Teacher/Admin or self)

**Success Response (200):**
```json
{
  "id": 1,
  "user": {
    "id": 5,
    "email": "student@example.com",
    "full_name": "Jane Smith"
  },
  "roll_no": "STU001",
  "grade_level": "10th Grade",
  "class_name": "10-A",
  "guardian_contact": "+1234567890",
  "attendance_percentage": 95.5,
  "average_grade": 85.3
}
```

#### Create Student

Create a new student profile.

**Endpoint:** `POST /api/students/`

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "user": {
    "email": "newstudent@example.com",
    "password": "password123",
    "full_name": "New Student"
  },
  "roll_no": "STU002",
  "grade_level": "9th Grade",
  "class_name": "9-B",
  "guardian_contact": "+1234567890"
}
```

**Success Response (201):**
```json
{
  "id": 2,
  "user": {
    "id": 6,
    "email": "newstudent@example.com",
    "full_name": "New Student"
  },
  "roll_no": "STU002",
  "grade_level": "9th Grade",
  "class_name": "9-B",
  "guardian_contact": "+1234567890"
}
```

#### Update Student

Update student information.

**Endpoint:** `PATCH /api/students/{id}/`

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "grade_level": "10th Grade",
  "class_name": "10-A"
}
```

**Success Response (200):**
```json
{
  "id": 1,
  "roll_no": "STU001",
  "grade_level": "10th Grade",
  "class_name": "10-A"
}
```

#### Delete Student

Delete a student profile.

**Endpoint:** `DELETE /api/students/{id}/`

**Authentication:** Required (Admin)

**Success Response (204):**
```
No content
```

### Teachers Endpoints

> **Note:** Similar structure to Students endpoints

#### List Teachers

**Endpoint:** `GET /api/teachers/`

**Authentication:** Required (Admin)

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| subject_specialization | string | Filter by subject |
| search | string | Search by name |

#### Get Teacher Details

**Endpoint:** `GET /api/teachers/{id}/`

#### Create Teacher

**Endpoint:** `POST /api/teachers/`

#### Update Teacher

**Endpoint:** `PATCH /api/teachers/{id}/`

### Grades Endpoints

#### List Grades

**Endpoint:** `GET /api/grades/`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| student_id | integer | Filter by student |
| subject_id | integer | Filter by subject |
| semester | string | Filter by semester |

#### Create Grade

**Endpoint:** `POST /api/grades/`

**Request Body:**
```json
{
  "student_id": 1,
  "subject_id": 2,
  "marks": 85,
  "semester": "Fall 2023"
}
```

### Attendance Endpoints

#### Mark Attendance

**Endpoint:** `POST /api/attendance/`

**Request Body:**
```json
{
  "student_id": 1,
  "date": "2023-12-01",
  "status": "present"
}
```

#### Get Student Attendance

**Endpoint:** `GET /api/attendance/student/{id}/`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| start_date | date | Start date (YYYY-MM-DD) |
| end_date | date | End date (YYYY-MM-DD) |

### Assignments Endpoints

#### List Assignments

**Endpoint:** `GET /api/assignments/`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| subject_id | integer | Filter by subject |
| status | string | Filter by status |

#### Create Assignment

**Endpoint:** `POST /api/assignments/`

**Request Body:**
```json
{
  "title": "Math Homework",
  "description": "Complete exercises 1-10",
  "subject_id": 1,
  "due_date": "2023-12-15",
  "class_name": "10-A"
}
```

### Announcements Endpoints

#### List Announcements

**Endpoint:** `GET /api/announcements/`

#### Create Announcement

**Endpoint:** `POST /api/announcements/`

**Authentication:** Required (Admin/Teacher)

**Request Body:**
```json
{
  "title": "School Holiday",
  "content": "School will be closed tomorrow",
  "target_audience": "all"
}
```

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Anonymous users**: 100 requests per hour
- **Authenticated users**: 1000 requests per hour

When rate limit is exceeded, you'll receive a `429 Too Many Requests` response.

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `page_size`: Items per page (default: 20, max: 100)

**Response includes:**
```json
{
  "count": 100,
  "next": "http://localhost:8000/api/students/?page=2",
  "previous": null,
  "results": []
}
```

## Filtering and Searching

Many list endpoints support filtering and searching:

**Filtering:**
```
GET /api/students/?grade_level=10th%20Grade&class_name=10-A
```

**Searching:**
```
GET /api/students/?search=John
```

## Ordering

Control the order of results:

```
GET /api/students/?ordering=full_name
GET /api/students/?ordering=-created_at  # Descending
```

## Testing with cURL

### Register a User
```bash
curl -X POST http://localhost:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Access Protected Endpoint
```bash
curl -X GET http://localhost:8000/api/users/me/ \
  -H "Authorization: Bearer your_access_token"
```

## SDKs and Client Libraries

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Login
const { data } = await api.post('/users/login/', {
  email: 'user@example.com',
  password: 'password123',
});

// Set token
api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

// Get students
const students = await api.get('/students/');
```

### Python

```python
import requests

BASE_URL = 'http://localhost:8000/api'

# Login
response = requests.post(f'{BASE_URL}/users/login/', json={
    'email': 'user@example.com',
    'password': 'password123'
})
data = response.json()

# Set token
headers = {'Authorization': f'Bearer {data["access"]}'}

# Get students
students = requests.get(f'{BASE_URL}/students/', headers=headers)
```

## Webhooks

> **Coming Soon:** Webhook support for real-time notifications

## Changelog

### Version 1.0.0 (Current)
- Initial API release
- User authentication
- Basic CRUD operations

---

For more information, see the [Backend Documentation](./BACKEND.md)
