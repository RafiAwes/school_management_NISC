'use client';
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
    const router = useRouter()
    useEffect(() => {
        const userObj = localStorage.getItem("user")
        if (!userObj) {
            router.push("/auth/login")
            return;
        }
        const user = JSON.parse(userObj!)
        switch (user.role) {
            case "admin":
                router.push("/dashboard/admin")
                break;
            case "teacher":
                router.push("/dashboard/teacher")
                break;
            case "student":
                router.push("/dashboard/student")
                break;    
        }
    }, [router]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-600">Loading dashboard...</p>
            </div>
        </div>
    )
}