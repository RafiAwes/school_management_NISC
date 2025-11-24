'use client';

import React from 'react';

interface StudentListHeaderProps {
  totalStudents: number;
}

export const StudentListHeader: React.FC<StudentListHeaderProps> = ({
  totalStudents,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Student List
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            View and manage all {totalStudents} students
          </p>
        </div>
      </div>
    </div>
  );
};