'use client';

import React from 'react';
import { Student } from '@/types/student';

interface StudentStatsCardsProps {
  students: Student[];
}

export const StudentStatsCards: React.FC<StudentStatsCardsProps> = ({
  students,
}) => {
  const activeCount = students.filter((s) => s.status === 'active').length;
  const warningCount = students.filter((s) => s.status === 'warning').length;
  const avgAttendance = Math.round(
    students.reduce((acc, s) => acc + s.attendance, 0) / students.length
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Students</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">
          {students.length}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">Active</p>
        <p className="text-xl sm:text-2xl font-bold text-green-600">
          {activeCount}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">Warning</p>
        <p className="text-xl sm:text-2xl font-bold text-orange-600">
          {warningCount}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">Avg. Attendance</p>
        <p className="text-xl sm:text-2xl font-bold text-indigo-600">
          {avgAttendance}%
        </p>
      </div>
    </div>
  );
};