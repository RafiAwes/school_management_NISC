# 🤝 Contributing to School Management System

Thank you for considering contributing to the School Management System! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for everyone, regardless of:
- Gender, gender identity, and expression
- Sexual orientation
- Disability
- Physical appearance
- Race and ethnicity
- Age
- Religion
- Technology choices

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Personal or political attacks
- Publishing others' private information
- Other conduct inappropriate in a professional setting

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- Read the [README.md](./README.md)
- Set up the development environment (see [SETUP.md](./docs/SETUP.md))
- Familiarized yourself with the codebase structure

### Finding Issues to Work On

1. Check the [Issues](../../issues) page
2. Look for issues labeled:
   - `good first issue` - Great for newcomers
   - `help wanted` - We need help with these
   - `bug` - Something isn't working
   - `enhancement` - New feature or request

### Claiming an Issue

1. Comment on the issue saying you'd like to work on it
2. Wait for maintainer approval
3. Fork the repository
4. Create your feature branch

## Development Workflow

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/School_management_system.git
cd School_management_system

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/School_management_system.git
```

### 2. Create a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch Naming Convention:**
- `feature/` - New features (e.g., `feature/add-student-search`)
- `fix/` - Bug fixes (e.g., `fix/login-validation`)
- `docs/` - Documentation (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/user-service`)
- `test/` - Adding tests (e.g., `test/student-model`)

### 3. Make Changes

#### Backend Changes

```bash
cd backend

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Make your changes
# Create/modify models, views, serializers, etc.

# Create migrations if needed
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Run tests
pytest

# Check code style
flake8 .
black .
```

#### Frontend Changes

```bash
cd frontend

# Make your changes
# Create/modify components, pages, etc.

# Run linter
npm run lint

# Test in browser
npm run dev
```

### 4. Commit Changes

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Add changes
git add .

# Commit with a descriptive message
git commit -m "feat: add student search functionality"
```

**Commit Message Format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(students): add search and filter functionality

- Add search bar component
- Implement filter by grade level
- Add pagination support

Closes #123

---

fix(auth): resolve login redirect issue

The login was redirecting to wrong page after successful authentication.
Now it correctly redirects based on user role.

Fixes #456

---

docs(readme): update installation instructions

- Add Docker setup steps
- Update environment variables section
- Fix typos
```

### 5. Push Changes

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template
5. Submit the pull request

## Coding Standards

### Backend (Python/Django)

#### Style Guide

Follow [PEP 8](https://pep8.org/) style guide:

```python
# Good
def calculate_grade(student_id, subject_id):
    """Calculate the grade for a student in a subject."""
    student = Student.objects.get(id=student_id)
    grades = Grade.objects.filter(student=student, subject_id=subject_id)
    return sum(g.marks for g in grades) / len(grades)

# Bad
def calc_grade(sid,subid):
    s=Student.objects.get(id=sid)
    g=Grade.objects.filter(student=s,subject_id=subid)
    return sum(x.marks for x in g)/len(g)
```

#### Django Best Practices

1. **Models**:
   ```python
   class Student(models.Model):
       """Student model with profile information."""
       name = models.CharField(max_length=100)
       email = models.EmailField(unique=True)
       
       class Meta:
           ordering = ['name']
           verbose_name_plural = 'Students'
       
       def __str__(self):
           return self.name
   ```

2. **Views**:
   ```python
   from rest_framework import viewsets
   from rest_framework.permissions import IsAuthenticated
   
   class StudentViewSet(viewsets.ModelViewSet):
       """ViewSet for managing students."""
       queryset = Student.objects.all()
       serializer_class = StudentSerializer
       permission_classes = [IsAuthenticated]
   ```

3. **Serializers**:
   ```python
   class StudentSerializer(serializers.ModelSerializer):
       """Serializer for Student model."""
       
       class Meta:
           model = Student
           fields = ['id', 'name', 'email', 'grade_level']
           read_only_fields = ['id']
   ```

#### Testing

Write tests for all new features:

```python
import pytest
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
class TestStudentModel:
    """Tests for Student model."""
    
    def test_create_student(self):
        """Test creating a student."""
        student = Student.objects.create(
            name='John Doe',
            email='john@example.com'
        )
        assert student.name == 'John Doe'
        assert str(student) == 'John Doe'
```

### Frontend (TypeScript/React)

#### Style Guide

Follow [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react):

```tsx
// Good
interface StudentCardProps {
  student: Student;
  onEdit: (id: number) => void;
}

export default function StudentCard({ student, onEdit }: StudentCardProps) {
  const handleEdit = () => {
    onEdit(student.id);
  };

  return (
    <div className="card">
      <h3>{student.name}</h3>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

// Bad
export default function StudentCard(props) {
  return (
    <div className="card">
      <h3>{props.student.name}</h3>
      <button onClick={() => props.onEdit(props.student.id)}>Edit</button>
    </div>
  );
}
```

#### React Best Practices

1. **Component Structure**:
   ```tsx
   // Imports
   import { useState, useEffect } from 'react';
   import { Student } from '@/types/student';
   
   // Interface
   interface Props {
     studentId: number;
   }
   
   // Component
   export default function StudentDetails({ studentId }: Props) {
     // State
     const [student, setStudent] = useState<Student | null>(null);
     const [loading, setLoading] = useState(false);
     
     // Effects
     useEffect(() => {
       fetchStudent();
     }, [studentId]);
     
     // Functions
     const fetchStudent = async () => {
       // Implementation
     };
     
     // Render
     if (loading) return <div>Loading...</div>;
     if (!student) return <div>Not found</div>;
     
     return <div>{student.name}</div>;
   }
   ```

2. **TypeScript Types**:
   ```tsx
   // Define types separately
   interface Student {
     id: number;
     name: string;
     email: string;
   }
   
   // Use in components
   const [students, setStudents] = useState<Student[]>([]);
   ```

3. **Event Handlers**:
   ```tsx
   // Good - typed event
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setValue(e.target.value);
   };
   
   // Good - separate function
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     // Submit logic
   };
   ```

## Pull Request Process

### PR Checklist

Before submitting, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] Commits follow conventional commits format
- [ ] No merge conflicts
- [ ] PR description is clear and complete

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added
- [ ] All tests passing
```

### Review Process

1. Maintainer reviews your PR
2. Address any requested changes
3. Push updates to your branch
4. PR automatically updates
5. Once approved, maintainer will merge

## Reporting Bugs

### Before Reporting

1. Check existing issues
2. Ensure you're using the latest version
3. Verify it's not a configuration issue

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Version: [e.g., 1.0.0]

## Additional Context
Any other relevant information
```

## Suggesting Features

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
Other solutions you've thought about

## Additional Context
Mockups, examples, etc.
```

## Development Tips

### Backend Development

1. **Use Django shell for testing**:
   ```bash
   python manage.py shell
   ```

2. **Use Django debug toolbar**:
   ```bash
   pip install django-debug-toolbar
   ```

3. **Database inspection**:
   ```bash
   python manage.py dbshell
   ```

### Frontend Development

1. **Use React DevTools** browser extension
2. **Check TypeScript errors**: `npx tsc --noEmit`
3. **Component testing**: Test in isolation first

### Docker Development

1. **Rebuild after dependency changes**:
   ```bash
   docker-compose up -d --build
   ```

2. **View logs**:
   ```bash
   docker-compose logs -f backend
   ```

3. **Clean rebuild**:
   ```bash
   docker-compose down -v
   docker-compose up -d --build
   ```

## Questions?

If you have questions:

1. Check existing documentation
2. Search closed issues
3. Ask in discussions
4. Contact maintainers

## Recognition

Contributors will be added to:
- README.md contributors section
- Release notes
- Project website (if applicable)

---

Thank you for contributing! 🎉
