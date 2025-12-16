export interface Student {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    class: string;
    attendance: number;
    grade: string;
    status: 'active' | 'warning' | 'inactive';
    image?: string;
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
    assignments: StudentAssignment[];
    attendanceHistory?: AttendanceRecord[];
    gradeHistory?: GradeRecord[];
    recentActivity?: Activity[];
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

export interface StudentAssignment {
    id: number;
    title: string;
    subject: string;
    dueDate: string;
    submittedDate?: string;
    grade?: number;
    maxGrade?: number;
    status: 'submitted' | 'graded' | 'pending' | 'late' | 'completed' | 'overdue';
    feedback?: string;
}

export interface AttendanceRecord {
    id: number;
    date: string;
    status: 'present' | 'absent' | 'late';
    subject?: string;
    notes?: string;
}

export interface GradeRecord {
    id: number;
    subject: string;
    grade: string;
    percentage: number;
    term: string;
    date: string;
    maxScore: number;
    score: number;
}

export interface Activity {
    id: number;
    type: 'assignment' | 'grade' | 'attendance' | 'message';
    description: string;
    date: string;
    time: string;
}

export interface StudentStats {
    totalAssignments: number;
    completedAssignments: number;
    averageGrade: string;
    attendanceRate: number;
    presentDays: number;
    absentDays: number;
    lateDays: number;
}