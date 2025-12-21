'use client';

import React from 'react';
import { CheckCircle, XCircle, Clock, Users } from 'lucide-react';
import { AttendanceSummary as SummaryType } from '@/types/attendance';

interface AttendanceSummaryProps {
    summary: SummaryType;
}

export const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({
    summary,
}) => {
    const percentage = summary.totalStudents > 0
        ? Math.round((summary.present / summary.totalStudents) * 100)
        : 0;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="text-xl font-bold text-gray-800">
                            {summary.totalStudents}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Present</p>
                        <p className="text-xl font-bold text-green-600">{summary.present}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Absent</p>
                        <p className="text-xl font-bold text-red-600">{summary.absent}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Late</p>
                        <p className="text-xl font-bold text-orange-600">{summary.late}</p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-sm p-4 text-white">
                <div>
                    <p className="text-xs opacity-90">Attendance Rate</p>
                    <p className="text-2xl font-bold">{percentage}%</p>
                </div>
            </div>
        </div>
    );
};