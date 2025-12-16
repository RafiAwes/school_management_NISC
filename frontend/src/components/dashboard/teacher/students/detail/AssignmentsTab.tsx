'use client';

import React from 'react';
import { Calendar, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { StudentAssignment } from '@/types/student';

interface AssignmentsTabProps {
    assignments: StudentAssignment[];
}

export const AssignmentsTab: React.FC<AssignmentsTabProps> = ({
    assignments,
}) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'graded':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'submitted':
                return <Clock className="w-5 h-5 text-blue-500" />;
            case 'late':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Clock className="w-5 h-5 text-orange-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            graded: 'bg-green-100 text-green-700',
            submitted: 'bg-blue-100 text-blue-700',
            pending: 'bg-orange-100 text-orange-700',
            late: 'bg-red-100 text-red-700',
        };
        return styles[status as keyof typeof styles] || styles.pending;
    };

    return (
        <div className="space-y-4">
            {assignments.map((assignment) => (
                <div
                    key={assignment.id}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <FileText className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{assignment.title}</h3>
                                <p className="text-sm text-gray-500">{assignment.subject}</p>
                            </div>
                        </div>
                        {getStatusIcon(assignment.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Due Date</p>
                            <div className="flex items-center text-sm text-gray-800">
                                <Calendar className="w-4 h-4 mr-1" />
                                {assignment.dueDate}
                            </div>
                        </div>
                        {assignment.submittedDate && (
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Submitted</p>
                                <p className="text-sm text-gray-800">{assignment.submittedDate}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Status</p>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                    assignment.status
                                )}`}
                            >
                                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </span>
                        </div>
                        {assignment.grade !== undefined && (
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Grade</p>
                                <p className="text-lg font-bold text-indigo-600">
                                    {assignment.grade}/{assignment.maxGrade}
                                </p>
                            </div>
                        )}
                    </div>

                    {assignment.feedback && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs text-blue-600 font-medium mb-1">
                                Teacher Feedback
                            </p>
                            <p className="text-sm text-gray-700">{assignment.feedback}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};