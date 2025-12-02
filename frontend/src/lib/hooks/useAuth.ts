"use client";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

interface User{
    id: string;
    fullName: string;
    email: string;
    role: string;
}

export const useAuth = () =>{
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("user");
        if (!token){
            router.push("/auth/login");
            return;
        }
        if (userData){
            setUser(JSON.parse(userData));

        }
        setLoading(false);
    }, [router]);

    const logout = () =>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/auth/login");
    };

    return {user, loading, logout};
    
}