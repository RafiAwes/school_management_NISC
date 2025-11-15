import {AuthLayout} from "@/components/auth/AuthLayout";
import {LoginForm} from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <AuthLayout title="Login" subtitle="Welcome back! Please login to your account.">
            <LoginForm />
        </AuthLayout>
    )
}

