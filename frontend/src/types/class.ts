export interface Class {
    id: number;
    name: string;
    students: number;
    grade: string;
    schedule: string;
    room?: string;
    description?: string;
}

export interface ClassStats {
    totalClasses: number;
    activeStudents: number;
    avgAttendance: number; // percentage
}