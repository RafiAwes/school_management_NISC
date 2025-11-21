from django.core.management.base import BaseCommand
from apps.users.models import User

class Command(BaseCommand):
    help = 'create demo students'
    def handle(self, *args, **kwargs):
        for i in range(1,11):
            email = f'student{i}@example.com'
            # DELETE if already exists (ensure clean creation)
            User.objects.filter(email=email).delete()
            User.objects.create_user(
                full_name=f'Student {i}',
                username=email,
                email=email,
                role='student',
                password='11111111'
            )
            self.stdout.write(self.style.SUCCESS(f'Created demo student: {email}'))