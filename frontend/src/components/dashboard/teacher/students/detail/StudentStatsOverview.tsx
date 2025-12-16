"use client";

import React from "react";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";
import { StudentStats } from "@/types/student";

interface StudentStatsOverviewProps {
    stats: StudentStats;
}

export const StudentStatsOverview: React.FC<StudentStatsOverviewProps> = ({
    stats,
}) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Assignments</p>
                        <p className="text-xl font-bold text-gray-800">
                            {stats.completedAssignments}/{stats.totalAssignments}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                        <Award className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Avg. Grade</p>
                        <p className="text-xl font-bold text-gray-800">
                            {stats.averageGrade}%
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Attendance</p>
                        <p className="text-xl font-bold text-gray-800">
                            {stats.attendanceRate}%
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Present Days</p>
                        <p className="text-xl font-bold text-gray-800">
                            {stats.presentDays}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
