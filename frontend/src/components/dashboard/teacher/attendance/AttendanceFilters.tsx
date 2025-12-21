'use client';

import React from 'react';
import { Filter, Search } from 'lucide-react';

interface ClassType {
    id: string;
    name: string;
}

interface AttendanceFiltersProps {
    selectedClass: string;
    onClassChange: (classId: string) => void;
    classes: ClassType[];
    searchQuery: string;
    onSearchChange: (query: string) => void;
    filterStatus: string;
    onFilterStatusChange: (status: string) => void;
}

export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
    selectedClass,
    onClassChange,
    classes,
    searchQuery,
    onSearchChange,
    filterStatus,
    onFilterStatusChange,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Class Selection */}
                <div className="flex-1">
                    <select
                        value={selectedClass}
                        onChange={(e) => onClassChange(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white text-sm"
                    >
                        <option value="">Select Class</option>
                        {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search student by name..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                    />
                </div>

                {/* Filter by Status */}
                <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                        value={filterStatus}
                        onChange={(e) => onFilterStatusChange(e.target.value)}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="late">Late</option>
                        <option value="unmarked">Not Marked</option>
                    </select>
                </div>
            </div>
        </div>
    );
};