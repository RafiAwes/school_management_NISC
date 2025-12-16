'use client';

import React from 'react';
import { Award, TrendingUp, Calendar } from 'lucide-react';
import { GradeRecord } from '@/types/student';

interface GradesTabProps {
    grades: GradeRecord[];
}

export const GradesTab: React.FC<GradesTabProps> = ({ grades }) => {
    const getGradeColor = (percentage: number) => {
        if (percentage >= 90) return 'text-green-600 bg-green-100';
        if (percentage >= 80) return 'text-blue-600 bg-blue-100';
        if (percentage >= 70) return 'text-orange-600 bg-orange-100';
        return 'text-red-600 bg-red-100';
    };

    return (
        <div className="space-y-4">
            {grades.map((grade) => (
                <div
                    key={grade.id}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4 flex-1">
                            <div className="p-3 bg-indigo-100 rounded-lg">
                                <Award className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 text-lg mb-1">
                                    {grade.subject}
                                </h3>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {grade.date}
                                    </div>
                                    <span>•</span>
                                    <span>{grade.term}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">Score</p>
                                <p className="text-lg font-bold text-gray-800">
                                    {grade.score}/{grade.maxScore}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">Grade</p>
                                <span
                                    className={`px-4 py-2 rounded-lg text-xl font-bold ${getGradeColor(
                                        grade.percentage
                                    )}`}
                                >
                                    {grade.grade}
                                </span>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">Percentage</p>
                                <div className="flex items-center space-x-1">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    <span className="text-lg font-bold text-gray-800">
                                        {grade.percentage}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Summary */}
            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
                <h3 className="font-bold text-gray-800 mb-4">Grade Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Total Subjects</p>
                        <p className="text-2xl font-bold text-indigo-600">{grades.length}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Average</p>
                        <p className="text-2xl font-bold text-indigo-600">
                            {Math.round(
                                grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length
                            )}
                            %
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Highest</p>
                        <p className="text-2xl font-bold text-green-600">
                            {Math.max(...grades.map((g) => g.percentage))}%
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Lowest</p>
                        <p className="text-2xl font-bold text-orange-600">
                            {Math.min(...grades.map((g) => g.percentage))}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};