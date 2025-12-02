import axios from "axios";
import { LoginData, RegisterData, AuthResponse } from "@/types/auth";

 // Use a relative base URL so Next.js rewrites proxy to Django and avoid CORS
const API_BASE_URL = "http://127.0.0.1:8000/";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const authApi = {
    login: async (data: LoginData): Promise<AuthResponse> => {
        try {
            // log outgoing payload for debugging JSON issues
            try { console.debug('auth.login payload', JSON.stringify(data)); } catch { }
            // POST to Django backend URL (note trailing slash)
            const response = await apiClient.post<AuthResponse>('/api/users/login/', data);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || error.response?.data?.detail || 'Login failed';
                throw new Error(message);
            } else{
                throw new Error('Login failed');
            } 
        }
    },

    register: async (data: RegisterData): Promise<AuthResponse> => {
        try {
            const payload = {
                email: data.email,
                password: data.password,
                full_name: data.fullName,
                role: data.role,
            };

            // log outgoing payload to inspect the exact JSON being sent
            try { console.debug('auth.register payload', JSON.stringify(payload)); } catch { }

            // POST to Django backend URL (note trailing slash)
            const response = await apiClient.post<AuthResponse>('/api/users/register/', payload);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || error.response?.data?.detail || 'Registration failed';
                throw new Error(message);
            }else{
                throw new Error('Registration failed');
            }
        }
    },
};