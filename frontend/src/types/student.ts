import { Assignment } from './assignment';

export interface Student {
    id: number;
    name: string;
    email?: string;
    class: string;
    attendance: number;
    grade: string;
    status: 'active' | 'warning' | 'inactive';
    avatar?: string;
}

export interface StudentDetail extends Student {
    phone?: string;
    parentName?: string;
    parentEmail?: string;
    enrollmentDate: string;
    assignments: Assignment[];
}