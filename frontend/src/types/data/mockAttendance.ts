import { AttendanceRecord } from '@/types/attendance';

export const getMockStudentsForAttendance = (classId: string): AttendanceRecord[] => {
    return [
        { studentId: 1001, studentName: 'Alice Johnson', status: null },
        { studentId: 1002, studentName: 'Bob Smith', status: null },
        { studentId: 1003, studentName: 'Carol White', status: null },
        { studentId: 1004, studentName: 'David Brown', status: null },
        { studentId: 1005, studentName: 'Eva Green', status: null },
        { studentId: 1006, studentName: 'Frank Miller', status: null },
        { studentId: 1007, studentName: 'Grace Lee', status: null },
        { studentId: 1008, studentName: 'Henry Davis', status: null },
        { studentId: 1009, studentName: 'Ivy Wilson', status: null },
        { studentId: 1010, studentName: 'Jack Thompson', status: null },
    ];
};