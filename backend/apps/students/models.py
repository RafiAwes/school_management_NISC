from django.db import models
from apps.users.models import User
from apps.classes.models import Class
# Create your models here.

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=20, unique=True)
    grade_level = models.CharField(max_length=20)
    section = models.CharField(max_length=10)
    roll_number = models.IntegerField()
    parent_name = models.CharField(max_length=100)
    parent_phone = models.CharField(max_length=20)
    emergency_contact = models.CharField(max_length=20)
    enrollment_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} - {self.grade_level}"

class StudentEnrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ['student', 'class_obj']