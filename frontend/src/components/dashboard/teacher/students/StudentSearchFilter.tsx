'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';

interface StudentSearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterClass: string;
  setFilterClass: (classFilter: string) => void;
}

export const StudentSearchFilter: React.FC<StudentSearchFilterProps> = ({
  searchQuery,
  setSearchQuery,
  filterClass,
  setFilterClass,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
        />
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white text-sm"
        >
          <option value="all">All Classes</option>
          <option value="Mathematics 101">Mathematics 101</option>
          <option value="Physics Advanced">Physics Advanced</option>
          <option value="Chemistry Basics">Chemistry Basics</option>
        </select>
      </div>
    </div>
  );
};