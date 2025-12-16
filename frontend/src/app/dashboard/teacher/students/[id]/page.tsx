'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { StudentDetailHeader } from '@/components/dashboard/teacher/students/detail/StudentDetailHeader';
import { StudentInfoCard } from '@/components/dashboard/teacher/students/detail/StudentInfoCard';
import { StudentStatsOverview } from '@/components/dashboard/teacher/students/detail/StudentStatsOverview';
import { StudentTabNavigation } from '@/components/dashboard/teacher/students/detail/StudentTabNavigation';
import { AssignmentsTab } from '@/components/dashboard/teacher/students/detail/AssignmentsTab';
import { AttendanceTab } from '@/components/dashboard/teacher/students/detail/AttendanceTab';
import { GradesTab } from '@/components/dashboard/teacher/students/detail/GradesTab';
import { ActivityTab } from '@/components/dashboard/teacher/students/detail/ActivityTab';
import { studentsApi } from '@/lib/api/students';
import { StudentDetail, StudentStats } from '@/types/student';
import { getMockStudentDetail, getMockStudentStats } from '@/types/data/mockStudentDetail';

export default function StudentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [student, setStudent] = useState<StudentDetail | null>(null);
    const [stats, setStats] = useState<StudentStats | null>(null);
    const [activeTab, setActiveTab] = useState('assignments');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadStudentData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const id = parseInt(params.id as string);

            // Try to fetch from API
            try {
                const studentData = await studentsApi.getStudentById(id);
                // Convert Student to StudentDetail by adding default empty arrays
                const studentDetail: StudentDetail = {
                    ...studentData,
                    enrollmentDate: studentData.enrollmentDate || '2024-09-01',
                    assignments: [],
                    attendanceHistory: [],
                    gradeHistory: [],
                    recentActivity: [],
                };
                setStudent(studentDetail);

                // Calculate stats
                const calculatedStats = calculateStats(studentDetail);
                setStats(calculatedStats);
            } catch {
                // Fallback to mock data if API fails
                console.log('API failed, using mock data');
                const mockStudent = getMockStudentDetail(id);
                const mockStats = getMockStudentStats(mockStudent);
                setStudent(mockStudent);
                setStats(mockStats);
            }
        } catch (err) {
            setError('Failed to load student data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        loadStudentData();
    }, [params.id, loadStudentData]);

    const calculateStats = (studentData: StudentDetail): StudentStats => {
        const assignments = studentData.assignments ?? [];
        const attendanceHistory = studentData.attendanceHistory ?? [];
        
        const completedAssignments = assignments.filter(
            (a) => a.status === 'graded' || a.status === 'submitted'
        ).length;

        const gradedAssignments = assignments.filter((a) => a.grade !== undefined);
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
            totalAssignments: assignments.length,
            completedAssignments,
            averageGrade: Math.round(averageGrade).toString(),
            attendanceRate: studentData.attendance,
            presentDays,
            absentDays,
            lateDays,
        };
    };

    const handleEdit = () => {
        router.push(`/dashboard/teacher/students/${params.id}/edit`);
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this student?')) {
            return;
        }

        try {
            // deleteStudent is not available in API, use updateStudent instead or add the method
            // For now, just navigate back
            alert('Delete functionality not yet implemented');
        } catch (err) {
            alert('Failed to delete student');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-gray-600">Loading student details...</p>
                </div>
            </div>
        );
    }

    if (error || !student || !stats) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">❌</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Error Loading Student
                    </h3>
                    <p className="text-gray-600 mb-4">{error || 'Student not found'}</p>
                    <button
                        onClick={() => router.back()}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <StudentDetailHeader
                student={student}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="mb-6">
                    <StudentStatsOverview stats={stats} />
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Student Info */}
                    <div className="lg:col-span-1">
                        <StudentInfoCard student={student} />
                    </div>

                    {/* Right Column - Tabs Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tab Navigation */}
                        <StudentTabNavigation
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        {/* Tab Content */}
                        <div>
                            {activeTab === 'assignments' && (
                                <AssignmentsTab assignments={student.assignments} />
                            )}
                            {activeTab === 'attendance' && (
                                <AttendanceTab attendance={student.attendanceHistory ?? []} />
                            )}
                            {activeTab === 'grades' && (
                                <GradesTab grades={student.gradeHistory ?? []} />
                            )}
                            {activeTab === 'activity' && (
                                <ActivityTab activities={student.recentActivity ?? []} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}