import axios from 'axios';
import { Assignment } from '@/types/assignment';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for automatic auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      localStorage.removeItem('authToken');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export const assignmentsApi = {
    // Get all assignments
    getAssignments: async (): Promise<Assignment[]> => {
        const response = await apiClient.get<Assignment[]>('/api/assignments/');
        return response.data;
    },

    // Create assignment
    createAssignment: async (assignmentData: Omit<Assignment, 'id'>): Promise<Assignment> => {
        const response = await apiClient.post<Assignment>('/api/assignments/', assignmentData);
        return response.data;
    },

    // Get assignment by ID
    getAssignment: async (id: number): Promise<Assignment> => {
        const response = await apiClient.get<Assignment>(`/api/assignments/${id}/`);
        return response.data;
    },

    // Update assignment
    updateAssignment: async (id: number, assignmentData: Partial<Assignment>): Promise<Assignment> => {
        const response = await apiClient.patch<Assignment>(`/api/assignments/${id}/`, assignmentData);
        return response.data;
    },

    // Delete assignment
    deleteAssignment: async (id: number): Promise<void> => {
        await apiClient.delete(`/api/assignments/${id}/`);
    },
};