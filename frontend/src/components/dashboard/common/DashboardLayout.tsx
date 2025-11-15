'use client';

import React, { ReactNode } from 'react';
import { ProtectedRoute } from './ProtectedRoute';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebar,
  header,
}) => {
  return (
    <ProtectedRoute>
      <div className="flex bg-gray-50 min-h-screen">
        {/* Sidebar */}
        {sidebar && sidebar}

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header */}
          {header && header}

          {/* Main Content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};