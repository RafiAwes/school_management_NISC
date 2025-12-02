from django.db import models
from apps.classes.models import Class
from apps.subjects.models import Subject
from apps.teachers.models import Teacher
# Create your models here.
class ClassSubject(models.Model):
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='class_subjects')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='class_subjects')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='class_subjects')

    class Meta: 
        unique_together = ('class_obj', 'subject')