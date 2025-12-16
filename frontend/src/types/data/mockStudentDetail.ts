import { StudentAssignment, StudentDetail, StudentStats } from '@/types/student';

export const getMockStudentDetail = (id: number): StudentDetail => {
  return {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@school.edu',
    phone: '+1 (555) 123-4567',
    class: 'Mathematics 101',
    grade: 'A',
    attendance: 95,
    status: 'active',
    enrollmentDate: '2024-09-01',
    dateOfBirth: '2008-03-15',
    address: '123 Oak Street, Springfield, IL 62701',
    parentName: 'Robert Johnson',
    parentEmail: 'robert.j@email.com',
    parentPhone: '+1 (555) 123-4568',
    assignments: [
      {
        id: 1,
        title: 'Algebra Quiz Chapter 5',
        subject: 'Mathematics',
        dueDate: '2025-11-20',
        submittedDate: '2025-11-19',
        grade: 95,
        maxGrade: 100,
        status: 'graded',
        feedback: 'Excellent work! Great understanding of algebraic concepts.',
      },
      {
        id: 2,
        title: 'Geometry Problem Set',
        subject: 'Mathematics',
        dueDate: '2025-11-25',
        submittedDate: '2025-11-24',
        grade: 88,
        maxGrade: 100,
        status: 'graded',
        feedback: 'Good work, but review the theorems on triangles.',
      },
      {
        id: 3,
        title: 'Calculus Homework',
        subject: 'Mathematics',
        dueDate: '2025-11-30',
        status: 'pending',
        maxGrade: 100,
      },
      {
        id: 4,
        title: 'Trigonometry Assignment',
        subject: 'Mathematics',
        dueDate: '2025-11-28',
        status: 'pending',
        maxGrade: 50,
      },
    ],
    attendanceHistory: [
      { id: 1, date: '2025-11-29', status: 'present', subject: 'Mathematics' },
      { id: 2, date: '2025-11-28', status: 'present', subject: 'Mathematics' },
      { id: 3, date: '2025-11-27', status: 'present', subject: 'Mathematics' },
      { id: 4, date: '2025-11-26', status: 'late', subject: 'Mathematics', notes: 'Arrived 10 minutes late' },
      { id: 5, date: '2025-11-25', status: 'present', subject: 'Mathematics' },
      { id: 6, date: '2025-11-22', status: 'present', subject: 'Mathematics' },
      { id: 7, date: '2025-11-21', status: 'absent', subject: 'Mathematics', notes: 'Medical appointment' },
      { id: 8, date: '2025-11-20', status: 'present', subject: 'Mathematics' },
    ],
    gradeHistory: [
      {
        id: 1,
        subject: 'Mathematics',
        grade: 'A',
        percentage: 95,
        term: 'Fall 2025',
        date: '2025-11-20',
        score: 95,
        maxScore: 100,
      },
      {
        id: 2,
        subject: 'Physics',
        grade: 'A-',
        percentage: 92,
        term: 'Fall 2025',
        date: '2025-11-18',
        score: 92,
        maxScore: 100,
      },
      {
        id: 3,
        subject: 'Chemistry',
        grade: 'B+',
        percentage: 88,
        term: 'Fall 2025',
        date: '2025-11-15',
        score: 88,
        maxScore: 100,
      },
      {
        id: 4,
        subject: 'English',
        grade: 'A',
        percentage: 94,
        term: 'Fall 2025',
        date: '2025-11-12',
        score: 94,
        maxScore: 100,
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: 'assignment',
        description: 'Submitted Algebra Quiz Chapter 5',
        date: '2025-11-19',
        time: '2:30 PM',
      },
      {
        id: 2,
        type: 'grade',
        description: 'Received grade for Geometry Problem Set: 88/100',
        date: '2025-11-18',
        time: '10:15 AM',
      },
      {
        id: 3,
        type: 'attendance',
        description: 'Marked present for Mathematics class',
        date: '2025-11-18',
        time: '9:00 AM',
      },
      {
        id: 4,
        type: 'assignment',
        description: 'Submitted Geometry Problem Set',
        date: '2025-11-17',
        time: '4:45 PM',
      },
    ],
  };
};

export const getMockStudentStats = (student: StudentDetail): StudentStats => {
  const assignments = student.assignments ?? [];
  const attendanceHistory = student.attendanceHistory ?? [];

  const completedAssignments = assignments.filter(
    (a) => a.status === 'completed' || a.status === 'overdue' || a.status === 'graded'
  ).length;

  const gradedAssignments = assignments.filter(
    (a): a is StudentAssignment & { grade: number } => a.grade !== undefined
  );
  const averageGrade =
    gradedAssignments.length > 0
      ? gradedAssignments.reduce((sum, a) => sum + (a.grade || 0), 0) /
        gradedAssignments.length
      : 0;

  const presentDays = attendanceHistory.filter(
    (a) => a.status === 'present'
  ).length;
  const absentDays = attendanceHistory.filter(
    (a) => a.status === 'absent'
  ).length;
  const lateDays = attendanceHistory.filter(
    (a) => a.status === 'late'
  ).length;

  return {
    totalAssignments: student.assignments.length,
    completedAssignments,
    averageGrade: Math.round(averageGrade).toString(),
    attendanceRate: student.attendance,
    presentDays,
    absentDays,
    lateDays,
  };
};