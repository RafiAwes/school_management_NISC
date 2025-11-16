"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function ProtectedRoute({children}: {children: React.ReactNode}){
    const router = useRouter()
    useEffect(() => {
        // The login flow stores the JWT in localStorage under 'authToken'
        const token = localStorage.getItem("authToken")
        if (!token) {
            router.push("/auth/login")
        }
    }, [router])

    return <>{children}</>
}