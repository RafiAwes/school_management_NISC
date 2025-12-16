'use client';

import React from 'react';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { AttendanceRecord } from '@/types/student';

interface AttendanceTabProps {
    attendance: AttendanceRecord[];
}

export const AttendanceTab: React.FC<AttendanceTabProps> = ({ attendance }) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'present':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'absent':
                return <XCircle className="w-5 h-5 text-red-500" />;
            case 'late':
                return <Clock className="w-5 h-5 text-orange-500" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            present: 'bg-green-100 text-green-700',
            absent: 'bg-red-100 text-red-700',
            late: 'bg-orange-100 text-orange-700',
        };
        return styles[status as keyof typeof styles] || '';
    };

    return (
        <div className="space-y-3">
            {attendance.map((record) => (
                <div
                    key={record.id}
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                            {getStatusIcon(record.status)}
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-1">
                                    <div className="flex items-center text-gray-800 font-medium">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {record.date}
                                    </div>
                                    {record.subject && (
                                        <span className="text-sm text-gray-500">
                                            {record.subject}
                                        </span>
                                    )}
                                </div>
                                {record.notes && (
                                    <p className="text-sm text-gray-600 mt-1">{record.notes}</p>
                                )}
                            </div>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                record.status
                            )}`}
                        >
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};