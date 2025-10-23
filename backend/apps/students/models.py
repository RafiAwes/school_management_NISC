from django.db import models
from apps.users.models import User
# Create your models here.

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    roll_no = models.CharField(max_length=50, unique=True)
    grade_level = models.CharField(max_length=20)
    class_name = models.CharField(max_length=50)
    guardian_contact = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.grade_level}"
