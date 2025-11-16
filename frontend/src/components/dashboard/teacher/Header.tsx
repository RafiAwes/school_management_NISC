'use client';

import React, { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { mockNotifications } from '@/data/mockData';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome back, Prof. Anderson!
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Here&apos;s what&apos;s happening with your classes today
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                        type="text"
                        placeholder="Search students, classes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-64"
                        />
                    </div>

                    <div className="relative">
                        <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                        <Bell className="w-6 h-6 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                            <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-800">
                                Notifications
                            </h3>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {mockNotifications.map((notif) => (
                                    <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer" >
                                        <p className="text-sm text-gray-800">{notif.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {notif.time}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 text-center border-t border-gray-200">
                                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                                    View all notifications
                                </button>
                            </div>
                        </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            PA
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};