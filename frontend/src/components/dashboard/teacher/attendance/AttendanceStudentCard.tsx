'use client';

import React from 'react';
import { CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';
import { AttendanceRecord } from '@/types/attendance';

interface AttendanceStudentCardProps {
    record: AttendanceRecord;
    onStatusChange: (studentId: number, status: 'present' | 'absent' | 'late') => void;
    onNotesChange: (studentId: number, notes: string) => void;
}

export const AttendanceStudentCard: React.FC<AttendanceStudentCardProps> = ({
    record,
    onStatusChange,
    onNotesChange,
}) => {
    const getInitials = (name: string) => {
        return name.split(' ').map((n) => n[0]).join('');
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                {/* Student Info */}
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {getInitials(record.studentName)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">{record.studentName}</h3>
                        <p className="text-sm text-gray-500">ID: {record.studentId}</p>
                    </div>
                </div>

                {/* Status Indicator */}
                {record.status && (
                    <div>
                        {record.status === 'present' && (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        )}
                        {record.status === 'absent' && (
                            <XCircle className="w-6 h-6 text-red-500" />
                        )}
                        {record.status === 'late' && (
                            <Clock className="w-6 h-6 text-orange-500" />
                        )}
                    </div>
                )}
            </div>

            {/* Attendance Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                    onClick={() => onStatusChange(record.studentId, 'present')}
                    className={`py-2 rounded-lg font-medium text-sm transition-all ${record.status === 'present'
                            ? 'bg-green-500 text-white shadow-md'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                >
                    Present
                </button>
                <button
                    onClick={() => onStatusChange(record.studentId, 'absent')}
                    className={`py-2 rounded-lg font-medium text-sm transition-all ${record.status === 'absent'
                            ? 'bg-red-500 text-white shadow-md'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                >
                    Absent
                </button>
                <button
                    onClick={() => onStatusChange(record.studentId, 'late')}
                    className={`py-2 rounded-lg font-medium text-sm transition-all ${record.status === 'late'
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                        }`}
                >
                    Late
                </button>
            </div>

            {/* Notes */}
            {record.status && (
                <div className="relative">
                    <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Add notes (optional)"
                        value={record.notes || ''}
                        onChange={(e) => onNotesChange(record.studentId, e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                </div>
            )}
        </div>
    );
};