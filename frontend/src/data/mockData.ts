import { Class } from '@/types/class';
import { Student } from '@/types/student';
import { Assignment } from '@/types/assignment';

export const mockClasses: Class[] = [
    {
        id: 1,
        name: 'Mathematics 101',
        students: 32,
        grade: 'Grade 10',
        schedule: 'Mon, Wed, Fri 9:00 AM',
        room: 'Room 301',
    },
    {
        id: 2,
        name: 'Physics Advanced',
        students: 28,
        grade: 'Grade 11',
        schedule: 'Tue, Thu 10:30 AM',
        room: 'Lab 1',
    },
    {
        id: 3,
        name: 'Chemistry Basics',
        students: 30,
        grade: 'Grade 9',
        schedule: 'Mon, Wed 2:00 PM',
        room: 'Lab 2',
    },
];

export const mockStudents: Student[] = [
    {
        id: 1,
        name: 'Alice Johnson',
        class: 'Mathematics 101',
        attendance: 95,
        grade: 'A',
        status: 'active',
    },
    {
        id: 2,
        name: 'Bob Smith',
        class: 'Physics Advanced',
        attendance: 88,
        grade: 'B+',
        status: 'active',
    },
    {
        id: 3,
        name: 'Carol White',
        class: 'Mathematics 101',
        attendance: 92,
        grade: 'A-',
        status: 'active',
    },
    {
        id: 4,
        name: 'David Brown',
        class: 'Chemistry Basics',
        attendance: 78,
        grade: 'C+',
        status: 'warning',
    },
    {
        id: 5,
        name: 'Eva Green',
        class: 'Physics Advanced',
        attendance: 96,
        grade: 'A+',
        status: 'active',
    },
];

export const mockAssignments: Assignment[] = [
    {
        id: 1,
        title: 'Algebra Quiz',
        class: 'Mathematics 101',
        dueDate: '2025-11-15',
        submitted: 28,
        total: 32,
        status: 'pending',
        points: 100,
    },
    {
        id: 2,
        title: 'Lab Report',
        class: 'Physics Advanced',
        dueDate: '2025-11-12',
        submitted: 28,
        total: 28,
        status: 'completed',
        points: 50,
    },
    {
        id: 3,
        title: 'Chemical Bonds Essay',
        class: 'Chemistry Basics',
        dueDate: '2025-11-20',
        submitted: 15,
        total: 30,
        status: 'pending',
        points: 75,
    },
];

export const mockUpcomingClasses = [
    {
        class: 'Mathematics 101',
        time: '9:00 AM',
        room: 'Room 301',
        duration: '1h 30m',
    },
    {
        class: 'Chemistry Basics',
        time: '2:00 PM',
        room: 'Lab 2',
        duration: '2h',
    },
];

export const mockNotifications = [
    {
        id: 1,
        message: 'New assignment submission from Alice Johnson',
        time: '5 min ago',
        type: 'info',
    },
    {
        id: 2,
        message: 'Parent meeting scheduled for tomorrow',
        time: '1 hour ago',
        type: 'warning',
    },
    {
        id: 3,
        message: 'Grade review deadline approaching',
        time: '3 hours ago',
        type: 'alert',
    },
];