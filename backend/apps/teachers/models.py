from django.db import models
from apps.users.models import User

# Create your models here.
class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    teacher_id = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    joining_date = models.DateField()
    is_active = models.BooleanField(default=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.subject_specialization}"
