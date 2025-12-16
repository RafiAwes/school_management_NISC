'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { StudentDetail } from '@/types/student';

interface StudentDetailHeaderProps {
  student: StudentDetail;
  onEdit: () => void;
  onDelete: () => void;
}

export const StudentDetailHeader: React.FC<StudentDetailHeaderProps> = ({
    student,
    onEdit,
    onDelete,
}) => {
    const router = useRouter();

    const getInitials = (name: string) => {
        return name.split(' ').map((n) => n[0]).join('');
    };

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
                >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Students</span>
                </button>

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Student Info */}
                    <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0">
                            {getInitials(student.name)}
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {student.name}
                            </h1>
                            <p className="text-gray-500 mt-1">
                                ID: {student.id} • {student.class}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <a
                                        href={`mailto:${student.email}`}
                                        className="hover:text-indigo-600"
                                    >
                                        {student.email}
                                    </a>
                                </div>
                                {student.phone && (
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <a href={`tel:${student.phone}`} className="hover:text-indigo-600" >
                                        {student.phone}
                                    </a>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                        <button onClick={onEdit} className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors" >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                        <button onClick={onDelete} className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors" >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};