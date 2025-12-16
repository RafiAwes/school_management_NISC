import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    timeout: 10000,
    
    headers: {
        'Content-Type': 'application/json',
    },
});

//request interceptor- add auth token
axiosInstance.interceptors.request.use(
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

//response interceptor- handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401){
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            if (typeof window !== 'undefined'){
                 window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
