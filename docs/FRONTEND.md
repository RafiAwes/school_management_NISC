# 🎨 Frontend Documentation

Complete documentation for the Next.js frontend of the School Management System.

## Table of Contents

- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Components](#components)
- [Pages](#pages)
- [Types](#types)
- [Styling](#styling)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Development](#development)

## Architecture

The frontend is built with Next.js 16 using the App Router architecture with React 19 and TypeScript.

### Tech Stack

- **Framework**: Next.js 16 with Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Turbopack

### Key Features

- Server-side rendering (SSR)
- Static site generation (SSG)
- File-based routing
- API routes
- Image optimization
- TypeScript support
- Hot reload with Turbopack

## Project Structure

```
frontend/
├── src/
│   ├── app/                        # Next.js app directory (routes)
│   │   ├── _debug/                 # Debug components
│   │   │   └── HydrationProbe.tsx  # Hydration debugging
│   │   ├── auth/                   # Authentication pages
│   │   │   ├── login/              # Login page
│   │   │   │   └── page.tsx
│   │   │   └── register/           # Registration page
│   │   │       └── page.tsx
│   │   ├── dashboard/              # Dashboard pages
│   │   │   ├── teacher/            # Teacher dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx          # Dashboard layout
│   │   │   └── page.tsx            # Main dashboard
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Home page
│   ├── components/                 # React components
│   │   ├── auth/                   # Authentication components
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── dashboard/              # Dashboard components
│   │   │   ├── common/             # Shared dashboard components
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   └── teacher/            # Teacher-specific components
│   │   │       ├── ClassesTab.tsx
│   │   │       ├── Header.tsx
│   │   │       ├── OverviewTab.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       ├── StatCard.tsx
│   │   │       └── StudentsTab.tsx
│   │   └── ui/                     # Reusable UI components
│   │       ├── Button.tsx
│   │       └── Input.tsx
│   ├── data/                       # Mock data and constants
│   │   └── mockData.ts
│   └── types/                      # TypeScript type definitions
│       ├── assignment.ts
│       ├── auth.ts
│       ├── class.ts
│       └── student.ts
├── public/                         # Static assets
├── Dockerfile                      # Docker configuration
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.ts              # Tailwind configuration
├── postcss.config.mjs              # PostCSS configuration
├── eslint.config.mjs               # ESLint configuration
└── package.json                    # Dependencies
```

## Components

### Authentication Components

#### AuthLayout (`components/auth/AuthLayout.tsx`)

Wrapper component for authentication pages with consistent styling.

**Props:**
- `children`: React nodes
- `title?`: Optional title

**Usage:**
```tsx
<AuthLayout title="Welcome Back">
  <LoginForm />
</AuthLayout>
```

#### LoginForm (`components/auth/LoginForm.tsx`)

Form component for user login.

**Features:**
- Email/password validation
- Error handling
- Loading states
- Redirect after login

**Usage:**
```tsx
import LoginForm from '@/components/auth/LoginForm';

<LoginForm />
```

#### RegisterForm (`components/auth/RegisterForm.tsx`)

Form component for user registration.

**Features:**
- Form validation
- Role selection
- Password confirmation
- Error handling

**Usage:**
```tsx
import RegisterForm from '@/components/auth/RegisterForm';

<RegisterForm />
```

### Dashboard Components

#### DashboardLayout (`components/dashboard/common/DashboardLayout.tsx`)

Main layout wrapper for dashboard pages.

**Features:**
- Responsive sidebar
- Header with user info
- Navigation menu
- Role-based content

**Usage:**
```tsx
import DashboardLayout from '@/components/dashboard/common/DashboardLayout';

<DashboardLayout>
  <YourContent />
</DashboardLayout>
```

#### ProtectedRoute (`components/dashboard/common/ProtectedRoute.tsx`)

Higher-order component for route protection.

**Features:**
- Authentication check
- Role-based access
- Redirect to login
- Loading states

**Usage:**
```tsx
import ProtectedRoute from '@/components/dashboard/common/ProtectedRoute';

<ProtectedRoute allowedRoles={['teacher', 'admin']}>
  <TeacherDashboard />
</ProtectedRoute>
```

#### Teacher Components

**Header** (`components/dashboard/teacher/Header.tsx`)
- User profile
- Notifications
- Quick actions

**Sidebar** (`components/dashboard/teacher/Sidebar.tsx`)
- Navigation menu
- Role-specific links
- Active state

**StatCard** (`components/dashboard/teacher/StatCard.tsx`)
- Display statistics
- Icons
- Trend indicators

**OverviewTab** (`components/dashboard/teacher/OverviewTab.tsx`)
- Dashboard overview
- Quick stats
- Recent activities

**ClassesTab** (`components/dashboard/teacher/ClassesTab.tsx`)
- Class list
- Class details
- Management actions

**StudentsTab** (`components/dashboard/teacher/StudentsTab.tsx`)
- Student list
- Search and filter
- Student details

### UI Components

#### Button (`components/ui/Button.tsx`)

Reusable button component with variants.

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `children`: React nodes

**Usage:**
```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

#### Input (`components/ui/Input.tsx`)

Reusable input component with validation.

**Props:**
- `type`: 'text' | 'email' | 'password' | etc.
- `label`: string
- `error`: string
- `required`: boolean
- `placeholder`: string

**Usage:**
```tsx
import Input from '@/components/ui/Input';

<Input
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  error={errors.email}
  required
/>
```

## Pages

### Authentication Pages

#### Login Page (`app/auth/login/page.tsx`)

User login page.

**Route**: `/auth/login`

**Features:**
- Email/password login
- Remember me option
- Forgot password link
- Registration link

#### Register Page (`app/auth/register/page.tsx`)

User registration page.

**Route**: `/auth/register`

**Features:**
- User registration form
- Role selection
- Email verification
- Terms acceptance

### Dashboard Pages

#### Main Dashboard (`app/dashboard/page.tsx`)

Role-based dashboard landing page.

**Route**: `/dashboard`

**Features:**
- Redirect based on role
- Overview statistics
- Recent activities
- Quick actions

#### Teacher Dashboard (`app/dashboard/teacher/page.tsx`)

Teacher-specific dashboard.

**Route**: `/dashboard/teacher`

**Features:**
- Class overview
- Student management
- Assignment tracking
- Attendance marking

## Types

### Auth Types (`types/auth.ts`)

```typescript
export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'admin' | 'teacher' | 'student';
  username: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  role: 'admin' | 'teacher' | 'student';
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}
```

### Student Types (`types/student.ts`)

```typescript
export interface Student {
  id: number;
  name: string;
  email: string;
  rollNo: string;
  gradeLevel: string;
  className: string;
  attendance?: number;
  performance?: number;
}
```

### Class Types (`types/class.ts`)

```typescript
export interface Class {
  id: number;
  name: string;
  subject: string;
  students: number;
  schedule: string;
}
```

### Assignment Types (`types/assignment.ts`)

```typescript
export interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  class: string;
}
```

## Styling

### Tailwind CSS v4

The project uses Tailwind CSS v4 with PostCSS.

#### Configuration (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
};

export default config;
```

#### Global Styles (`app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply antialiased;
  }
  
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
```

### Custom Components

Use `@apply` directive for reusable styles:

```tsx
<div className="card">
  <h2 className="text-xl font-bold mb-4">Card Title</h2>
  <button className="btn-primary">Action</button>
</div>
```

## State Management

Currently using React hooks for state management.

### Local State (useState)

```tsx
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Side Effects (useEffect)

```tsx
useEffect(() => {
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/me');
      setUser(response.data);
    } catch (err) {
      setError('Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);
```

### Context API (Future)

For global state, consider using Context API:

```tsx
// contexts/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

## API Integration

### Axios Setup

Create an API client with interceptors:

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or redirect to login
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### API Service Example

```typescript
// services/authService.ts
import api from '@/lib/api';
import { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/users/login/', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/users/register/', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};
```

### Using Services

```tsx
import { authService } from '@/services/authService';

const handleLogin = async (credentials: LoginCredentials) => {
  try {
    const response = await authService.login(credentials);
    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## Development

### Running Development Server

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Access in code:
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### Hot Reload

Next.js with Turbopack provides instant hot reload:
- Component changes
- Style updates
- Route changes
- No manual refresh needed

### TypeScript Configuration

The project uses strict TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Code Organization

1. **Components**: Reusable UI pieces
2. **Pages**: Route-based pages
3. **Types**: TypeScript definitions
4. **Services**: API integration
5. **Utils**: Helper functions
6. **Hooks**: Custom React hooks

### Best Practices

1. **Component Structure**:
   ```tsx
   // Imports
   import { useState } from 'react';
   
   // Types
   interface Props {
     title: string;
   }
   
   // Component
   export default function Component({ title }: Props) {
     // Hooks
     const [state, setState] = useState();
     
     // Functions
     const handleClick = () => {};
     
     // Render
     return <div>{title}</div>;
   }
   ```

2. **File Naming**:
   - Components: PascalCase (`Button.tsx`)
   - Pages: lowercase (`page.tsx`)
   - Utils: camelCase (`formatDate.ts`)

3. **Import Order**:
   ```tsx
   // React
   import { useState } from 'react';
   
   // Next.js
   import Link from 'next/link';
   
   // Third-party
   import axios from 'axios';
   
   // Local
   import Button from '@/components/ui/Button';
   import { User } from '@/types/auth';
   ```

## Building for Production

### Build Command

```bash
npm run build
```

### Optimization

Next.js automatically:
- Minifies JavaScript
- Optimizes images
- Code splits routes
- Tree shakes unused code
- Generates static pages

### Environment-specific Builds

```bash
# Development
NODE_ENV=development npm run build

# Production
NODE_ENV=production npm run build
```

## Testing (Future)

### Unit Tests with Jest

```typescript
import { render, screen } from '@testing-library/react';
import Button from '@/components/ui/Button';

describe('Button', () => {
  it('renders button text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### E2E Tests with Playwright

```typescript
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/auth/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Docker

```bash
docker build -t school-frontend .
docker run -p 3000:3000 school-frontend
```

### Static Export

```bash
npm run build
npm run export
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/docs)

---

For backend documentation, see [BACKEND.md](./BACKEND.md)
