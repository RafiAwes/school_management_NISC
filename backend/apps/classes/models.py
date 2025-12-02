from django.db import models
from apps.teachers.models import Teacher
# Create your models here.
class Class(models.Model):
    name = models.CharField(max_length=100)
    grade_level = models.CharField(max_length=100)
    section = models.CharField(max_length=100)
    academic_year = models.CharField(max_length=100)
    class_teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True)
    room_number = models.CharField(max_length=10, blank=True)
    capacity = models.IntegerField(default=40)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ('grade_level', 'section', 'academic_year')
        verbose_name_plural = "Classes"
    def __str__(self):
        return self.name