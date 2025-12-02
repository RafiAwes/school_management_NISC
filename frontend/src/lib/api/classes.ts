import axios from "axios"
import { Class } from "@/types/class" 
import { ApiError } from "next/dist/server/api-utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/"
const classesApiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        // 'Authorization: Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
});

classesApiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

classesApiClient.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error (e.g., redirect to login)
            localStorage.removeItem('authToken');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export const classesApi = {
    getClasses : async (): Promise<Class> => {
        const response = await classesApiClient.get<Class>('api/classes/');
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch classes');
        }
        return response.data;
    },

    getClassesById : async (id:number): Promise<Class> => {
        const renponse = await classesApiClient.get<Class>(`api/classes/${id}/`);
        if (renponse.status !== 200) {
            throw new ApiError(renponse.status, 'Failed to fetch class by ID');
        }
        return renponse.data;
    },
    createClass : async (newClass: Partial<Class>): Promise<Class> => {
        const response = await classesApiClient.post<Class>('api/classes/', newClass);
        if (response.status !== 201) {
            throw new ApiError(response.status, 'Failed to create class');
        }
        return response.data;
    },

    updateClass : async (id:number, updatedClass: Partial<Class>): Promise<Class> => {
        const response = await classesApiClient.put<Class>(`api/classes/${id}/`, updatedClass);
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to update class');
        }
        return response.data;
    },
    deleteClass : async (id:number): Promise<void> => {
        const response = await classesApiClient.delete<void>(`api/classes/${id}/`);
        if (response.status !== 204) {
            throw new ApiError(response.status, 'Failed to delete class');
        }
    },

}

