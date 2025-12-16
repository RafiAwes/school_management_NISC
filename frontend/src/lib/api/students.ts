import axiosInstance from '../axios/axiosConfig';
import { Student } from '@/types/student';
import { ApiError } from 'next/dist/server/api-utils';

interface GradeData {
    [key: string]: unknown;
}           

interface AttendanceData {
    [key: string]: unknown;
}

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/';
// const studentsApiClient = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Add request interceptor for automatic auth token
// studentsApiClient.interceptors.request.use(config => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//        config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// },
// (error) => {
//     return Promise.reject(error);
// });

// // Add response interceptor for error handling
// studentsApiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401){
//             localStorage.removeItem('authToken');
//             window.location.href = '/auth/login';
//         }
//         return Promise.reject(error);
//     }
// );

export const studentsApi = {
    // Get all students
    getAllStudents: async (): Promise<Student[]> => {
        const response = await axiosInstance.get<Student[]>('api/students/');
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch students');
        }
        return response.data;
    },
 
    // Add student
    addStudent: async (newStudent: Partial<Student>): Promise<Student> => {
        const response = await axiosInstance.post<Student>('api/students/', newStudent);
        if (response.status !== 201) {
            throw new ApiError(response.status, 'Failed to add student');
        }
        return response.data;
    },

    getStudentById: async (id:number): Promise<Student> => {
        const response = await axiosInstance.get<Student>(`api/students/${id}/`);
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch student');
        }
        return response.data;
    },

    getStudentByClass: async (classId: number): Promise<Student[]> => {
        const response = await axiosInstance.get<Student[]>(`api/classes/${classId}/students/`);
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch students by class');
        }
        return response.data;
    },

    updateStudent: async (id: number, updatedStudent: Partial<Student>): Promise<Student> => {
        const response = await axiosInstance.put<Student>(`api/students/${id}/`, updatedStudent);
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to update student');
        }
        return response.data;
    },

    getStudentAssignments: async (id: number) => {
        const response = await axiosInstance.get(`api/students/${id}/assignments/`);
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch student assignments');
        }
        return response.data;
    },

    getStudentAttendance: async (id: number) => {
        const response = await axiosInstance.get(`api/students/${id}/attendance/`);
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch student attendance');
        }
        return response.data;
    },

    getStudentGrades: async (id: number) => {
        const response = await axiosInstance.get(`api/students/${id}/grades/`);
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch student grades');
        }
        return response.data;
    },

    getStudentActivities: async (id: number) => {
        const response = await axiosInstance.get(`api/students/${id}/activities/`);
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch student activities');
        }
        return response.data;
    },

    getStudentStats: async (id: number) => {
        const response = await axiosInstance.get(`api/students/${id}/stats/`);
        if (response.status !== 200) {
            throw new ApiError(response.status, 'Failed to fetch student stats');
        }
        return response.data;
    },

        // Add grade
    addGrade: async (studentId: number, gradeData: GradeData) => {
        const response = await axiosInstance.post(
        `/api/students/${studentId}/grades/`,
        gradeData
        );
        return response.data;
    },

    // Mark attendance
    markAttendance: async (studentId: number, attendanceData: AttendanceData) => {
        const response = await axiosInstance.post(
        `/api/students/${studentId}/attendance/`,
        attendanceData
        );
        return response.data;
    },
};