'use client';

import React from 'react';
import { User } from 'lucide-react';

export const NoStudentsFound: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <User className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        No students found
      </h3>
      <p className="text-gray-600">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
};