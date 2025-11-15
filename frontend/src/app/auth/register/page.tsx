import { AuthLayout } from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="School Management System"
      subtitle="Create your account to get started"
    >
      <RegisterForm />
    </AuthLayout>
  );
}