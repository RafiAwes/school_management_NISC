import os
from pathlib import Path
from dotenv import load_dotenv
from urllib.parse import urlparse, parse_qsl
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv()

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", "False").lower() in ("true", "1", "t")

# ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "").split(",") if os.getenv("ALLOWED_HOSTS") else [
#     "localhost",
#     "127.0.0.1",
#     "[::1]",
#     "backend",
#     "host.docker.internal",
# ]

# CROSS_ALLOW_ORIGINS = os.getenv("CROSS_ALLOW_ORIGINS", "False").lower() in ("true", "1", "t")
CROSS_ALLOW_HEADERS = os.getenv("CROSS_ALLOW_HEADERS", "*").split(",") if os.getenv("CROSS_ALLOW_HEADERS") else ['*']
CROSS_ALLOW_METHODS = os.getenv("CROSS_ALLOW_METHODS").split(",") if os.getenv("CROSS_ALLOW_METHODS") else ['DELETE', 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT']

# Application definition

INSTALLED_APPS = [
    "corsheaders",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "apps.users",
    "apps.students",
    "apps.teachers",
    "apps.subjects",
    "apps.grades",
    "apps.attendance",
    "apps.assignments",
    "apps.announcements",
    "rest_framework",
    "rest_framework.authtoken",   
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# CORS configuration
# In development allow all origins for convenience. In production, set stricter origins.
CORS_ALLOW_CREDENTIALS = True
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    # Allow the frontend dev server and localhost by default in non-debug mode
    CORS_ALLOWED_ORIGINS = os.getenv("CROSS_ALLOW_ORIGINS", "").split(",") 
    # [
    #     "http://localhost:3000",
    #     "http://127.0.0.1:3000",
    # ]

ROOT_URLCONF = "schoolmanagement.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = os.getenv("WSGI_APPLICATION", "schoolmanagement.wsgi.application")


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

postgres_url = urlparse(os.getenv("DATABASE_URL"))
DATABASES = {
    "default": {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': postgres_url.path.replace('/', ''),
        'USER': postgres_url.username,
        'PASSWORD': postgres_url.password,
        'HOST': postgres_url.hostname,
        'PORT': 5432,
        'OPTIONS': dict(parse_qsl(postgres_url.query)),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

AUTH_USER_MODEL = 'users.User'

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

# Avoid redirect-on-POST errors when a trailing slash is missing (e.g., /api/users/register)
# This prevents Django's CommonMiddleware from attempting to 301/302 append a slash on POSTs, which drops payloads.
APPEND_SLASH = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
