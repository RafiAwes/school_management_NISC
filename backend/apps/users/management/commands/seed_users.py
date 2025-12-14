from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import date
import random

from users.models import User
from students.models import Student
from teachers.models import Teacher
from academics.models import (
    Subject, Class, ClassSubject, StudentEnrollment,
    MonthlyAttendance, DailyAttendanceLog,
    Holiday, AttendanceSettings, AcademicCalendar
)

class Command(BaseCommand):
    help = "Seeds all demo data for the School Management System"

    def handle(self, *args, **kwargs):

        self.stdout.write("🔥 Seeding System…")

        # --------------------------
        # 1. USERS
        # --------------------------
        admin = User.objects.create_user(
            username="admin",
            email="admin@school.com",
            password="admin123",
            user_type="admin",
            phone="01700000000"
        )

        teacher_users = []
        for i in range(1, 4):
            u = User.objects.create_user(
                username=f"teacher{i}",
                email=f"teacher{i}@school.com",
                password="teacher123",
                user_type="teacher",
                phone=f"0171100000{i}"
            )
            teacher_users.append(u)

        student_users = []
        for i in range(1, 6):
            u = User.objects.create_user(
                username=f"student{i}",
                email=f"student{i}@school.com",
                password="student123",
                user_type="student",
                phone=f"0182200000{i}"
            )
            student_users.append(u)

        self.stdout.write("✔ Users seeded")

        # --------------------------
        # 2. TEACHERS
        # --------------------------
        teachers = []
        departments = ["Math", "Science", "English"]

        for i, u in enumerate(teacher_users, start=1):
            t = Teacher.objects.create(
                user=u,
                teacher_id=f"TCH-00{i}",
                department=departments[i-1],
                qualification="MSc",
                specialization="General",
                joining_date=date(2023, 1, 10),
                is_active=True
            )
            teachers.append(t)

        self.stdout.write("✔ Teachers seeded")

        # --------------------------
        # 3. STUDENTS
        # --------------------------
        students = []
        for i, u in enumerate(student_users, start=1):
            s = Student.objects.create(
                user=u,
                student_id=f"STD-00{i}",
                grade_level="10",
                section="A",
                roll_number=i,
                parent_name=f"Parent {i}",
                parent_phone=f"0193300000{i}",
                emergency_contact=f"0194400000{i}",
                enrollment_date=date(2023, 6, 1),
                is_active=True
            )
            students.append(s)

        self.stdout.write("✔ Students seeded")

        # --------------------------
        # 4. SUBJECTS
        # --------------------------
        subject_names = ["Math", "Science", "English", "Bangla", "ICT"]
        subjects = []

        for i, name in enumerate(subject_names, start=1):
            s = Subject.objects.create(
                name=name,
                code=f"SUB-{i}",
                description=f"{name} Subject",
                credits=3,
                is_active=True,
                created_at=timezone.now()
            )
            subjects.append(s)

        self.stdout.write("✔ Subjects seeded")

        # --------------------------
        # 5. CLASS
        # --------------------------
        class10A = Class.objects.create(
            name="Class 10 A",
            grade_level="10",
            section="A",
            academic_year="2024-2025",
            class_teacher=teachers[0],
            room_number="101",
            capacity=40,
            is_active=True
        )

        self.stdout.write("✔ Class seeded")

        # --------------------------
        # 6. ClassSubject
        # --------------------------
        for s in subjects[:3]:  # assign only first 3 subjects to 10A
            ClassSubject.objects.create(
                class_obj=class10A,
                subject=s,
                teacher=random.choice(teachers)
            )

        self.stdout.write("✔ ClassSubject seeded")

        # --------------------------
        # 7. StudentEnrollment
        # --------------------------
        for s in students:
            StudentEnrollment.objects.create(
                student=s,
                class_obj=class10A,
                enrollment_date=date(2024, 1, 10),
                is_active=True
            )

        self.stdout.write("✔ StudentEnrollment seeded")

        # --------------------------
        # 8. AttendanceSettings
        # --------------------------
        AttendanceSettings.objects.create(
            academic_year="2024-2025",
            working_days_per_week=5,
            minimum_attendance_percentage=75.0,
            late_marks_threshold=3,
            auto_calculate_totals=True,
            updated_by=admin
        )

        self.stdout.write("✔ Attendance settings seeded")

        # --------------------------
        # 9. Holidays
        # --------------------------
        Holiday.objects.create(
            name="Victory Day",
            date=date(2024, 12, 16),
            holiday_type="national",
            academic_year="2024-2025",
            description="National holiday"
        )

        self.stdout.write("✔ Holidays seeded")

        # --------------------------
        # 10. Academic Calendar
        # --------------------------
        AcademicCalendar.objects.create(
            academic_year="2024-2025",
            event_name="Annual Sports Day",
            event_date=date(2025, 2, 12),
            event_type="event",
            description="Sports program",
            is_active=True
        )

        self.stdout.write("✔ Academic Calendar seeded")

        # --------------------------
        # 11. Monthly Attendance Demo
        # --------------------------
        for stu in students:
            MonthlyAttendance.objects.create(
                student=stu,
                month=1,
                year=2025,
                grade_level="10",
                section="A",
                attendance_data={"1": "present", "2": "absent"},
                total_present=1,
                total_absent=1,
                total_late=0,
                total_half_day=0,
                total_excused=0,
                working_days=2,
                created_at=timezone.now(),
                updated_at=timezone.now()
            )

        self.stdout.write("✔ MonthlyAttendance seeded")

        # --------------------------
        # 12. Daily Attendance Logs
        # --------------------------
        for stu in students:
            DailyAttendanceLog.objects.create(
                student=stu,
                date=date(2025, 1, 1),
                status="present",
                remarks="On time",
                marked_by=teachers[0],
                marked_at=timezone.now()
            )

        self.stdout.write("✔ DailyAttendanceLog seeded")
        self.stdout.write("🎉 ALL SEED DATA GENERATED SUCCESSFULLY!")
