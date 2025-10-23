from django.db import models
from apps.students.models import StudentProfile
from apps.subjects.models import Subject

# Create your models here.
class Attendance(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='attendance_records')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField()
    status = models.CharField(max_length=10, choices=[('present', 'Present'), ('absent', 'Absent')])
    
    class meta: 
        unique_together = ('student', 'subject', 'date')

    def __str__(self):
        return f"{self.student.user.username} - {self.subject.name} on {self.date}: {self.status}"
