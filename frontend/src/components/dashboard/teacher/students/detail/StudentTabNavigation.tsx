'use client';

import React from 'react';

interface StudentTabNavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const StudentTabNavigation: React.FC<StudentTabNavigationProps> = ({
    activeTab,
    setActiveTab,
}) => {
    const tabs = [
        { id: 'assignments', label: 'Assignments' },
        { id: 'attendance', label: 'Attendance' },
        { id: 'grades', label: 'Grades' },
        { id: 'activity', label: 'Activity' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-2">
            <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};