import { Assignment } from './assignment';

export interface Student {
    id: number;
    name: string;
    email?: string;
    class: string;
    attendance: number;
    grade: string;
    status: 'active' | 'warning' | 'inactive';
    image?: string;
    phone?: string;
    enrollmentDate?: string;
    dateOfBirth?: string;
    address?: string;
    parentName?: string;
    parentEmail?: string;
    parentPhone?: string;

}

export interface StudentDetail extends Student {
    phone?: string;
    parentName?: string;
    parentEmail?: string;
    enrollmentDate: string;
    assignments: Assignment[];
}

export interface StudentFilters {
    searchQuery: string;
    filterClass: string;
}

export interface PaginationInfo {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}