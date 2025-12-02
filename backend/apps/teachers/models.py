from django.db import models
from apps.users.models import User

# Create your models here.
class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher')
    tearher_id = models.CharField(max_length=50, unique=True)
    department = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100)
    joining_date = models.DateField(auto_now_add=True)
    subject_specialization = models.CharField(max_length=100)
    # years_of_experience = models.PositiveIntegerField()
    contact_no = models.CharField(max_length=15, blank=True, null=True)
    bio = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.subject_specialization}"
