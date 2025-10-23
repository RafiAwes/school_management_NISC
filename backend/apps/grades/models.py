from django.db import models
from apps.students.models import StudentProfile
from apps.subjects.models import Subject

# Create your models here.

class Grade(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='grades')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='grades')
    marks = models.DecimalField(max_digits=5, decimal_places=2)
    grade = models.CharField(max_length=2)
    date_recorded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.username} - {self.subject.name}: {self.grade}"