export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    role: 'student' | 'teacher' | 'admin';
}

export interface AuthResponse {
    token: string;
    user:{
        id: string
        email: string;
        fullName: string;
        role: string;
    };
}

export interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    fullName?: string;
    general?: string;
}
