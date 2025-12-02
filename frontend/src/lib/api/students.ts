import axios from 'axios';
import { Student } from '@/types/student';
import { ApiError } from 'next/dist/server/api-utils';
import { error } from 'console';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/';
const studentsApiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for automatic auth token
studentsApiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
       config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
});

// Add response interceptor for error handling
studentsApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401){
            localStorage.removeItem('authToken');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export const studentApi = {
    // Get all students
    getAllStudents: async (): Promise<Student[]> => {
        const response = await studentsApiClient.get<Student[]>('api/students/');
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch students');
        }
        return response.data;
    },

    // Get students for specific class
    getStudentsByClass: async (classId: number): Promise<Student[]> => {
        const response = await studentsApiClient.get<Student[]>(`api/classes/${classId}/students/`);   
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch students by class');
        }
        return response.data;
    },

    // Add student
    addStudent: async (newStudent: Partial<Student>): Promise<Student> => {
        const response = await studentsApiClient.post<Student>('api/students/', newStudent);
        if (response.status !== 201) {
            throw new ApiError(response.status, 'Failed to add student');
        }
        return response.data;
    },

    getStudentById: async (id:number): Promise<Student> => {
        const response = await studentsApiClient.get<Student>(`api/students/${id}/`);
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch student');
        }
        return response.data;
    },

    getStudentByClass: async (classId: number): Promise<Student[]> => {
        const response = await studentsApiClient.get<Student[]>(`api/classes/${classId}/students/`);
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch students by class');
        }
        return response.data;
    },
};