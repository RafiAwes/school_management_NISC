from django.db import models
from apps.teachers.models import Teacher

# Create your models here.

class Announcement(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher_announcements')
    title = models.CharField(max_length=200)
    message = models.TextField()
    posted_at = models.DateTimeField(auto_now_add=True)
    posted_by = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, related_name='posted_announcements')

    def __str__(self):
        return self.title
