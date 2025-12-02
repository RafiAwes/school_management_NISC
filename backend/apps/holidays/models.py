from django.db import models

# Create your models here.
class Holiday(models.Model):
    HOLIDAY_TYPES = (
        ('national', 'National Holiday'),
        ('regional', 'Regional Holiday'),
        ('school', 'School Holiday'),
        ('exam', 'Exam Holiday'),
    )
    
    name = models.CharField(max_length=100)
    date = models.DateField()
    holiday_type = models.CharField(max_length=10, choices=HOLIDAY_TYPES)
    academic_year = models.CharField(max_length=9)
    description = models.TextField(blank=True)
    
    class Meta:
        unique_together = ['date', 'academic_year']
        ordering = ['date']