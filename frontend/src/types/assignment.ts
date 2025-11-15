export interface Assignment {
  id: number;
  title: string;
  class: string;
  description?: string;
  dueDate: string;
  submitted: number;
  total: number;
  status: 'pending' | 'completed' | 'overdue';
  points?: number;
}

export interface AssignmentSubmission {
  id: number;
  studentId: number;
  studentName: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}