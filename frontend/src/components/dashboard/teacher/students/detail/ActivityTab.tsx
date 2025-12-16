'use client';

import React from 'react';
import {
    FileText,
    Award,
    Clock,
    Mail,
    CheckCircle,
} from 'lucide-react';
import { Activity } from '@/types/student';

interface ActivityTabProps {
    activities: Activity[];
}

export const ActivityTab: React.FC<ActivityTabProps> = ({ activities }) => {
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'assignment':
                return (
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                );
            case 'grade':
                return (
                    <div className="p-2 bg-green-100 rounded-lg">
                        <Award className="w-5 h-5 text-green-600" />
                    </div>
                );
            case 'attendance':
                return (
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                );
            case 'message':
                return (
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Mail className="w-5 h-5 text-orange-600" />
                    </div>
                );
            default:
                return (
                    <div className="p-2 bg-gray-100 rounded-lg">
                        <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                );
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1 min-w-0">
                            <p className="text-gray-800 font-medium">{activity.description}</p>
                            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{activity.date}</span>
                                <span>•</span>
                                <span>{activity.time}</span>
                            </div>
                        </div>
                        {index !== activities.length - 1 && (
                            <div className="absolute left-[22px] top-12 w-0.5 h-full bg-gray-200 -z-10"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};