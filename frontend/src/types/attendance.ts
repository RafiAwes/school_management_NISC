export interface AttendanceRecord {
    studentId: number;
    studentName: string;
    status: 'present' | 'absent' | 'late' | null;
    notes?: string;
}

export interface AttendanceSession {
    id?: number;
    date: string; // ISO date string
    class: string;
    teacherId: string;
    records: AttendanceRecord[];
    submittedAt?: string; // ISO date string
}

export interface AttendanceSummary {
    totalStudents: number;
    present: number;
    absent: number;
    late: number;
    notMarked: number;
}
