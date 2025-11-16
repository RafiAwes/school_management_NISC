'use client';

import React, { useState } from 'react';
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { mockStudents } from '@/data/mockData';

export const StudentsTab: React.FC = () => {
    const [students] = useState(mockStudents);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterClass, setFilterClass] = useState('all');

    const filteredStudents = students.filter((student) => {
        const matchesSearch = student.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
        const matchesFilter =
        filterClass === 'all' || student.class === filterClass;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
        {/* Header with Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Students</h2>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-5 h-5" />
                        <span>Export</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        <Plus className="w-5 h-5" />
                        <span>Add Student</span>
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                        type="text"
                        placeholder="Search students by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Filter by Class */}
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        >
                        <option value="all">All Classes</option>
                        <option value="Mathematics 101">Mathematics 101</option>
                        <option value="Physics Advanced">Physics Advanced</option>
                        <option value="Chemistry Basics">Chemistry Basics</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Students Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Students</p>
                    <p className="text-2xl font-bold text-gray-800">{students.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <p className="text-sm text-gray-600 mb-1">Active</p>
                    <p className="text-2xl font-bold text-green-600">
                        {students.filter((s) => s.status === 'active').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <p className="text-sm text-gray-600 mb-1">Need Attention</p>
                    <p className="text-2xl font-bold text-orange-600">
                        {students.filter((s) => s.status === 'warning').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <p className="text-sm text-gray-600 mb-1">Avg. Attendance</p>
                    <p className="text-2xl font-bold text-indigo-600">
                        {Math.round(
                        students.reduce((acc, s) => acc + s.attendance, 0) /
                            students.length
                        )}
                        %
                    </p>
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                                    Student Name
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                                    Class
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                                    Attendance
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                                    Grade
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                                    Status
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-12 text-center text-gray-500"
                                    >
                                        No students found
                                    </td>
                                </tr>
                            ) : (
                                    filteredStudents.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                    >
                                        {/* Student Name with Avatar */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                {student.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                                </div>
                                                <span className="font-medium text-gray-800">
                                                {student.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Class */}
                                        <td className="py-4 px-6 text-gray-600">
                                            {student.class}
                                        </td>

                                        {/* Attendance with Progress Bar */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
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
                                        </td>

                                        {/* Grade */}
                                        <td className="py-4 px-6">
                                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                                {student.grade}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-6">
                                            {student.status === 'active' ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <AlertCircle className="w-5 h-5 text-orange-500" />
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View Details"
                                                >
                                                    <Eye className="w-4 h-4 text-blue-600" />
                                                </button>
                                                <button
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Edit Student"
                                                >
                                                    <Edit className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <button
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Remove Student"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-600">
                    Showing {filteredStudents.length} of {students.length} students
                </div>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white transition-colors">
                    Previous
                    </button>
                    <button className="px-3 py-1 bg-indigo-600 text-white rounded">
                    1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white transition-colors">
                    2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white transition-colors">
                    Next
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};