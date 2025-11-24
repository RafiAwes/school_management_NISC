'use client';

import React from 'react';
import {
  Mail,
  Phone,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Student } from '@/types/student';

interface StudentListCardProps {
  student: Student;
  onViewDetails: (id: number) => void;
}

export const StudentListCard: React.FC<StudentListCardProps> = ({
  student,
  onViewDetails,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Section - Student Info */}
        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
              {getInitials(student.name)}
            </div>
          </div>

          {/* Student Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-800 text-base sm:text-lg truncate">
                {student.name}
              </h3>
              {student.status === 'active' ? (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mb-2">
              ID: {student.id}
            </p>

            {/* Contact Info - Hidden on mobile, shown on tablet+ */}
            <div className="hidden sm:flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
              <div className="flex items-center">
                <Mail className="w-3 h-3 mr-1" />
                <span className="truncate max-w-[200px]">{student.email}</span>
              </div>
              {student.phone && (
                <div className="flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  <span>{student.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section - Stats (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-6 px-6">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Class</p>
            <p className="font-semibold text-gray-800 text-sm">
              {student.class}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Grade</p>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              {student.grade}
            </span>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Attendance</p>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    student.attendance >= 90
                      ? 'bg-green-500'
                      : student.attendance >= 75
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${student.attendance}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {student.attendance}%
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="flex md:hidden items-center justify-between gap-4 pt-3 border-t border-gray-100">
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-500 mb-1">Grade</p>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              {student.grade}
            </span>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-500 mb-1">Attendance</p>
            <p className="text-sm font-semibold text-gray-800">
              {student.attendance}%
            </p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-500 mb-1">Class</p>
            <p className="text-xs font-medium text-gray-800 truncate">
              {student.class}
            </p>
          </div>
        </div>

        {/* Right Section - Action Button */}
        <div className="flex-shrink-0 mt-4 sm:mt-0">
          <button
            onClick={() => onViewDetails(student.id)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 sm:px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            <span>Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};