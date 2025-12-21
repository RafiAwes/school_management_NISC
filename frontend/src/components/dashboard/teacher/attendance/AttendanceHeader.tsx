'use client';

import React from "react";
import { Calendar } from "lucide-react";

interface AttendanceHeaderProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
}

export const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
    selectedDate,
    onDateChange
}) => {
    const today = new Date().toISOString().split('T')[0];
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Take Attendance
                        </h1>
                        <p className="text-gray-600 mt-1 text-sm sm:text-base">
                            Mark student attendance for today
                        </p>
                    </div>

                    {/* Date Picker */}
                    <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => onDateChange(e.target.value)}
                            max={today}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
