'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StudentListHeader } from '@/components/dashboard/teacher/students/StudentListHeader';
import { StudentSearchFilter } from '@/components/dashboard/teacher/students/StudentSearchFilter';
import { StudentStatsCards } from '@/components/dashboard/teacher/students/StudentStatsCards';
import { StudentListCard } from '@/components/dashboard/teacher/students/StudentListCard';
import { StudentPagination } from '@/components/dashboard/teacher/students/StudentPagination';
import { NoStudentsFound } from '@/components/dashboard/teacher/students/NoStudentsFound';
import { mockStudents } from '@/data/mockStudents';
import { Student, PaginationInfo } from '@/types/student';

export default function StudentListPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toString().includes(searchQuery);
    const matchesClass =
      filterClass === 'all' || student.class === filterClass;
    return matchesSearch && matchesClass;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const paginationInfo: PaginationInfo = {
    currentPage,
    itemsPerPage,
    totalItems: filteredStudents.length,
    totalPages,
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterClass]);

  const handleViewDetails = (id: number) => {
    router.push(`/dashboard/teacher/students/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <StudentListHeader totalStudents={students.length} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search and Filter */}
        <div className="mb-6">
          <StudentSearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterClass={filterClass}
            setFilterClass={setFilterClass}
          />
        </div>

        {/* Summary Stats */}
        <StudentStatsCards students={students} />

        {/* Student Cards */}
        {currentStudents.length > 0 ? (
          <>
            <div className="space-y-3 sm:space-y-4">
              {currentStudents.map((student) => (
                <StudentListCard
                  key={student.id}
                  student={student}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Pagination */}
            <StudentPagination
              pagination={paginationInfo}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <NoStudentsFound />
        )}
      </div>
    </div>
  );
}