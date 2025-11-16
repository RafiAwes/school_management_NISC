'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, MoreVertical, Eye, Edit } from 'lucide-react';
import { mockClasses } from '@/data/mockData';

export const ClassesTab: React.FC = () => {
    const [classes] = useState(mockClasses);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">My Classes</h2>
                <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>Add New Class</span>
                </button>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                <div key={classItem.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow" >
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Class Info */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {classItem.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{classItem.grade}</p>

                    {/* Stats */}
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Students</span>
                            <span className="font-semibold text-gray-800">
                            {classItem.students}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Schedule</span>
                            <span className="font-semibold text-gray-800 text-xs">
                            {classItem.schedule}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                        <button className="flex-1 flex items-center justify-center space-x-2 bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm font-medium">View</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-50 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <Edit className="w-4 h-4" />
                            <span className="text-sm font-medium">Edit</span>
                        </button>
                    </div>
                </div>
                ))}

                {/* Add New Class Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-dashed border-indigo-300 p-6 flex flex-col items-center justify-center hover:border-indigo-500 transition-colors cursor-pointer">
                    <div className="p-4 bg-white rounded-full mb-4">
                        <Plus className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Add New Class
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                        Create a new class and start managing students
                    </p>
                </div>
            </div>

            {/* Class Statistics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Class Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600 font-medium mb-1">
                            Total Students
                        </p>
                        <p className="text-3xl font-bold text-blue-700">90</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600 font-medium mb-1">
                        Active Classes
                        </p>
                        <p className="text-3xl font-bold text-green-700">3</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600 font-medium mb-1">
                        Avg. Class Size
                        </p>
                        <p className="text-3xl font-bold text-purple-700">30</p>
                    </div>
                </div>
            </div>
        </div>
    );
};