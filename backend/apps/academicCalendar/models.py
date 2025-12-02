from django.db import models

# Create your models here.
class AcademicCalendar(models.Model):
    academic_year = models.CharField(max_length=9)  # "2024-2025"
    event_name = models.CharField(max_length=100)
    event_date = models.DateField()
    event_type = models.CharField(max_length=20)  # "holiday", "exam", "event"
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['event_date']