<div align="center">

# 🏫 School Management System

### A Modern, Full-Stack School Administration Platform

[![Django](https://img.shields.io/badge/Django-5.2+-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

![School Management System](https://via.placeholder.com/800x400/4F46E5/ffffff?text=School+Management+System)

</div>

---

## 📋 Overview

The **School Management System** is a comprehensive, modern web application designed to streamline school administration. Built with cutting-edge technologies, it provides an intuitive interface for managing students, teachers, subjects, grades, attendance, and more.

Whether you're a small school or a large educational institution, this system offers scalable solutions to digitize your administrative workflows.

## ✨ Features

### 🔐 **Authentication & Authorization**
- Multi-role authentication (Admin, Teacher, Student)
- JWT-based secure authentication
- Role-based access control (RBAC)
- Email-based login system

### 👨‍🎓 **Student Management**
- Complete student profiles
- Grade level and class assignment
- Guardian contact information
- Academic performance tracking

### 👩‍🏫 **Teacher Management**
- Teacher profiles with specializations
- Subject assignment
- Experience tracking
- Contact management

### 📚 **Academic Features**
- Subject management
- Grade recording and calculation
- Assignment creation and tracking
- Attendance monitoring

### 📢 **Communication**
- School-wide announcements
- Role-based notifications
- Real-time updates (planned)

### 📊 **Dashboard & Analytics**
- Role-specific dashboards
- Performance metrics
- Attendance statistics
- Interactive charts (planned)

## 🚀 Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (Recommended)
- OR: Python 3.14+, Node.js 24+, PostgreSQL 17+

### ⚡ 5-Minute Setup with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/RafiAwes/School_management_system.git
   cd School_management_system
   ```

2. **Create environment files**
   
   Create `backend/.env`:
   ```env
   DJANGO_SECRET_KEY=your-secret-key-here
   DEBUG=True
   DATABASE_URL=postgres://admin:admin123@db:5432/school_db
   ALLOWED_HOSTS=localhost,127.0.0.1,backend
   CROSS_ALLOW_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

   Create `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Initialize the database**
   ```bash
   docker-compose exec backend python manage.py migrate
   docker-compose exec backend python manage.py createsuperuser
   ```

5. **Access the application** 🎉
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:8000/api](http://localhost:8000/api)
   - **Admin Panel**: [http://localhost:8000/admin](http://localhost:8000/admin)

> 📖 For detailed setup instructions, see [Setup Guide](./docs/SETUP.md) or [Quick Start](./docs/QUICK_START.md)

## 🛠 Tech Stack

<div align="center">

### Backend
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/DRF-ff1709?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Celery](https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### DevOps
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white)

</div>

### Detailed Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 16, React 19, TypeScript | Server-side rendering, type safety |
| **Styling** | Tailwind CSS v4 | Modern, utility-first CSS |
| **Backend** | Django 5.2, DRF 3.15 | RESTful API, ORM |
| **Database** | PostgreSQL 17 | Relational data storage |
| **Authentication** | JWT (SimpleJWT) | Secure token-based auth |
| **Task Queue** | Celery, Redis | Async task processing |
| **Containerization** | Docker, Docker Compose | Consistent dev environment |
| **Web Server** | Nginx, Gunicorn | Production serving |

## 📁 Project Structure

```
School_management_system/
├── 📂 backend/                 # Django backend application
│   ├── 📂 apps/               # Django apps (modular design)
│   │   ├── users/            # User authentication & management
│   │   ├── students/         # Student profiles & data
│   │   ├── teachers/         # Teacher profiles & data
│   │   ├── subjects/         # Subject management
│   │   ├── grades/           # Grade tracking
│   │   ├── attendance/       # Attendance records
│   │   ├── assignments/      # Assignment management
│   │   └── announcements/    # School announcements
│   ├── 📂 schoolmanagement/  # Django project settings
│   ├── manage.py             # Django CLI
│   ├── requirements.txt      # Python dependencies
│   └── Dockerfile            # Backend container config
│
├── 📂 frontend/               # Next.js frontend application
│   ├── 📂 src/
│   │   ├── app/              # Next.js app directory (routes)
│   │   ├── components/       # React components
│   │   ├── types/            # TypeScript definitions
│   │   └── data/             # Mock data & constants
│   ├── package.json          # Node dependencies
│   ├── tsconfig.json         # TypeScript config
│   └── Dockerfile            # Frontend container config
│
├── 📂 docs/                   # Comprehensive documentation
│   ├── QUICK_START.md        # 5-minute setup guide
│   ├── SETUP.md              # Detailed setup instructions
│   ├── ARCHITECTURE.md       # System architecture
│   ├── BACKEND.md            # Backend documentation
│   ├── FRONTEND.md           # Frontend documentation
│   ├── API.md                # API reference
│   └── DEPLOYMENT.md         # Production deployment
│
├── docker-compose.yml         # Docker orchestration
├── README.md                  # You are here!
├── CONTRIBUTING.md            # Contribution guidelines
└── CHANGELOG.md               # Version history
```

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) directory:

| Document | Description |
|----------|-------------|
| 📖 [Quick Start](./docs/QUICK_START.md) | Get running in 5 minutes |
| 🔧 [Setup Guide](./docs/SETUP.md) | Detailed installation & configuration |
| 🏗️ [Architecture](./docs/ARCHITECTURE.md) | System design & architecture |
| ⚙️ [Backend Docs](./docs/BACKEND.md) | Django backend guide |
| 🎨 [Frontend Docs](./docs/FRONTEND.md) | Next.js frontend guide |
| 🔌 [API Reference](./docs/API.md) | Complete API documentation |
| 🚀 [Deployment](./docs/DEPLOYMENT.md) | Production deployment guide |
| 🤝 [Contributing](./CONTRIBUTING.md) | How to contribute |

**Navigation**: Start with [Documentation Index](./docs/INDEX.md) for guided navigation.

## 🎯 Use Cases

- **Schools**: Manage student records, grades, and attendance
- **Colleges**: Track academic performance and schedules
- **Training Centers**: Organize courses and student progress
- **Educational Institutions**: Centralize administrative tasks

## 🖥️ Screenshots

<div align="center">

### Login Page
![Login](https://via.placeholder.com/600x400/4F46E5/ffffff?text=Login+Page)

### Teacher Dashboard
![Dashboard](https://via.placeholder.com/600x400/4F46E5/ffffff?text=Teacher+Dashboard)

### Student Management
![Students](https://via.placeholder.com/600x400/4F46E5/ffffff?text=Student+Management)

</div>

## 🔧 Development

### Common Commands

```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Run Django migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Access Django shell
docker-compose exec backend python manage.py shell

# Run tests
docker-compose exec backend pytest

# Stop all services
docker-compose down
```

### Development Workflow

1. **Backend Development**: Edit files in `backend/`, migrations auto-apply
2. **Frontend Development**: Edit files in `frontend/`, hot reload enabled
3. **Database Changes**: Create migrations, apply them
4. **Testing**: Write tests, run with pytest
5. **API Testing**: Use the admin panel or tools like Postman

For detailed development guides:
- [Backend Development](./docs/BACKEND.md)
- [Frontend Development](./docs/FRONTEND.md)

## 🧪 Testing

```bash
# Backend tests
docker-compose exec backend pytest
docker-compose exec backend pytest --cov=apps

# Frontend tests (when implemented)
docker-compose exec frontend npm test

# Linting
docker-compose exec backend flake8
docker-compose exec frontend npm run lint
```

## 🚀 Deployment

### Production Deployment

The system can be deployed on:

- **Docker** (Recommended) - See [Docker Deployment](./docs/DEPLOYMENT.md#docker-deployment)
- **Cloud Platforms** - AWS, Heroku, DigitalOcean
- **Traditional Servers** - Manual deployment with Nginx + Gunicorn

📖 Full deployment guide: [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

### Quick Production Start

```bash
# Build for production
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

# Collect static files
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please read our [Code of Conduct](./CONTRIBUTING.md#code-of-conduct).

## 🗺️ Roadmap

- [x] User authentication system
- [x] Student & teacher management
- [x] Basic dashboard
- [ ] Complete CRUD for all modules
- [ ] Advanced reporting & analytics
- [ ] Real-time notifications
- [ ] Email integration
- [ ] Parent portal
- [ ] Mobile app (React Native)
- [ ] AI-powered insights

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## 🐛 Known Issues & Limitations

- Some API endpoints are still under development
- Mobile responsiveness needs improvement
- Advanced reporting features are planned
- Email notifications not yet implemented

Check [Issues](../../issues) for full list and to report bugs.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors & Contributors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

See also the list of [contributors](../../contributors) who participated in this project.

## 🙏 Acknowledgments

- [Django Documentation](https://docs.djangoproject.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
- All open-source contributors

## 📞 Support & Contact

- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)
- **Email**: your-email@example.com
- **Documentation**: [Full Docs](./docs/INDEX.md)

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐!

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/School_management_system&type=Date)](https://star-history.com/#yourusername/School_management_system&Date)

---

<div align="center">

**[⬆ Back to Top](#-school-management-system)**

Made with ❤️ by [Your Name](https://github.com/yourusername)

[![GitHub followers](https://img.shields.io/github/followers/yourusername?style=social)](https://github.com/yourusername)
[![Twitter Follow](https://img.shields.io/twitter/follow/yourusername?style=social)](https://twitter.com/yourusername)

</div>
