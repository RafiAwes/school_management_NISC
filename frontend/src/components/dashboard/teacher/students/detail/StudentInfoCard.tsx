'use client';

import React from 'react';
import { Calendar, MapPin, User, Mail, Phone } from 'lucide-react';
import { StudentDetail } from '@/types/student';

interface StudentInfoCardProps {
    student: StudentDetail;
}

export const StudentInfoCard: React.FC<StudentInfoCardProps> = ({ student }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Personal Information
            </h2>
            <div className="space-y-4">
                <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="text-gray-800 font-medium">{student.dateOfBirth || 'N/A'}</p>
                    </div>
                </div>
                <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="text-gray-800 font-medium">{student.address || 'N/A'}</p>
                    </div>
                </div>
                <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-sm text-gray-500">Enrollment Date</p>
                        <p className="text-gray-800 font-medium">
                        {student.enrollmentDate || 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Parent Information */}
                {student.parentName && (
                <>
                    <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3">
                        Parent/Guardian Information
                    </h3>
                    </div>
                    <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="text-gray-800 font-medium">{student.parentName}</p>
                    </div>
                    </div>
                    {student.parentEmail && (
                    <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a
                            href={`mailto:${student.parentEmail}`}
                            className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            {student.parentEmail}
                        </a>
                        </div>
                    </div>
                    )}
                    {student.parentPhone && (
                    <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <a
                            href={`tel:${student.parentPhone}`}
                            className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            {student.parentPhone}
                        </a>
                        </div>
                    </div>
                    )}
                </>
                )}
            </div>
        </div>
    );
};