from django.db import models
from apps.users.models import User
from apps.students.models import Student
from apps.subjects.models import Subject
from apps.teachers.models import Teacher

# Create your models here.
class MonthlyAttendance(models.Model):
    ATTENDANCE_CODES = (
        ('P', 'Present'),
        ('A', 'Absent'),
        ('L', 'Late'),
        ('H', 'Half Day'),
        ('E', 'Excused'),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    month = models.IntegerField()  # 1-12
    year = models.IntegerField()   # 2024
    grade_level = models.CharField(max_length=10)
    section = models.CharField(max_length=5)
    
    # Compact storage: {1: 'P', 2: 'A', 3: 'P', ... 31: 'L'}
    attendance_data = models.JSONField(default=dict)
    
    # Summary fields for fast queries
    total_present = models.IntegerField(default=0)
    total_absent = models.IntegerField(default=0)
    total_late = models.IntegerField(default=0)
    total_half_day = models.IntegerField(default=0)
    total_excused = models.IntegerField(default=0)
    working_days = models.IntegerField(default=0)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['student', 'month', 'year']
        indexes = [
            models.Index(fields=['student', 'month', 'year']),
            models.Index(fields=['grade_level', 'section', 'month', 'year']),
        ]
    def __str__(self):
        return f"{self.student.user.username} - {self.subject.name} on {self.date}: {self.status}"

class DailyAttendanceLog(models.Model):
    ATTENDANCE_STATUS = (
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('late', 'Late'),
        ('half_day', 'Half Day'),
        ('excused', 'Excused'),
    )
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=ATTENDANCE_STATUS)
    remarks = models.CharField(max_length=200, blank=True)  # Reason for absence
    marked_by = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    marked_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['student', 'date']
        indexes = [
            models.Index(fields=['student', 'date']),
            models.Index(fields=['date', 'status']),
        ]

class AttendanceSettings(models.Model):
    academic_year = models.CharField(max_length=9, unique=True)
    working_days_per_week = models.IntegerField(default=6)  # Mon-Sat
    minimum_attendance_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=75.0)
    late_marks_threshold = models.IntegerField(default=3)  # Max allowed late marks
    auto_calculate_totals = models.BooleanField(default=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Attendance Settings for {self.academic_year}"