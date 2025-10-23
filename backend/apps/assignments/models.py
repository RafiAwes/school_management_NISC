from django.db import models
from apps.teachers.models import TeacherProfile
from apps.students.models import StudentProfile

# Create your models here.

class Assignment(models.Model):
    subject = models.ForeignKey('subjects.Subject', on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)
    description = models.TextField()
    due_date = models.DateTimeField()
    assigned_by = models.ForeignKey(TeacherProfile, on_delete=models.SET_NULL, null=True, related_name='assigned_assignments')

    def __str__(self):
        return f"{self.title} - {self.subject.name}"

class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='submissions')
    submitted_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='submissions/', null=True, blank=True)
    remarks = models.TextField(null=True, blank=True)
    grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"Submission by {self.student.user.username} for {self.assignment.title}" 