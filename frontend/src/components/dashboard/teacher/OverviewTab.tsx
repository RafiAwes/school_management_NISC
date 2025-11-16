'use client';

import React from 'react';
import {
  Users,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Clock,
  Plus,
  Calendar,
  MoreVertical,
} from 'lucide-react';
import { StatCard } from './StatCard';
import { mockUpcomingClasses, mockAssignments } from '@/data/mockData';

export const OverviewTab: React.FC = () => {
  return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                title="Total Students"
                value="90"
                icon={Users}
                trend="+5% from last month"
                color="bg-blue-500"
                />
                <StatCard
                title="Active Classes"
                value="3"
                icon={BookOpen}
                color="bg-green-500"
                />
                <StatCard
                title="Pending Assignments"
                value="12"
                icon={ClipboardCheck}
                color="bg-orange-500"
                />
                <StatCard
                title="Avg. Attendance"
                value="89%"
                icon={TrendingUp}
                trend="+2%"
                color="bg-purple-500"
                />
            </div>

            {/* Today's Schedule & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Today's Schedule */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                            Today&apos;s Schedule
                        </h2>
                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                            View Full Schedule
                        </button>
                    </div>
                    <div className="space-y-4">
                        {mockUpcomingClasses.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100" >
                            <div className="flex items-center space-x-4">
                                <div className="bg-indigo-600 text-white rounded-lg p-3">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {item.class}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {item.room} • {item.duration}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-indigo-600">{item.time}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Quick Actions
                    </h2>
                    <div className="space-y-3">
                        <button className="w-full flex items-center space-x-3 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            <Plus className="w-5 h-5" />
                            <span>Create Assignment</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-indigo-600 transition-colors">
                            <ClipboardCheck className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">Grade Submissions</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-indigo-600 transition-colors">
                            <Calendar className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">Schedule Class</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-indigo-600 transition-colors">
                            <Users className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">Take Attendance</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Assignments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Recent Assignments
                    </h2>
                    <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                        View All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                                    Assignment
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                                    Class
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                                    Due Date
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                                    Submissions
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                                    Status
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockAssignments.map((assignment) => (
                                <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50" >
                                    <td className="py-4 px-4 font-medium text-gray-800">
                                        {assignment.title}
                                    </td>
                                    <td className="py-4 px-4 text-gray-600">
                                        {assignment.class}
                                    </td>
                                    <td className="py-4 px-4 text-gray-600">
                                        {assignment.dueDate}
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-gray-800 font-medium">
                                            {assignment.submitted}/{assignment.total}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${ assignment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700' }`} >
                                            {assignment.status === 'completed'
                                                ? 'Completed'
                                                : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};