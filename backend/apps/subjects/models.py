from django.db import models
from apps.teachers.models import TeacherProfile

# Create your models here.
class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True, null=True, blank=True)
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.SET_NULL, null=True, related_name='subjects')

    def __str__(self):
        return f"{self.name} ({self.code})"
