'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  School,
  TrendingUp,
  BookOpen,
  Users,
  ClipboardCheck,
  Calendar,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, }) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        router.push('/auth/login');
    };

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'classes', label: 'My Classes', icon: BookOpen },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'assignments', label: 'Assignments', icon: ClipboardCheck },
        { id: 'schedule', label: 'Schedule', icon: Calendar },
        { id: 'grades', label: 'Grades', icon: Award },
    ];

    return (
        <div className={`${ sidebarOpen ? 'w-64' : 'w-20' } bg-gradient-to-b from-indigo-600 to-purple-600 text-white transition-all duration-300 fixed h-screen overflow-y-auto z-50`} >
            <div className="p-4">
                <div className="flex items-center justify-between mb-8">
                {sidebarOpen ? (
                    <>
                    <div className="flex items-center space-x-2">
                        <School className="w-8 h-8" />
                        <span className="font-bold text-xl">EduPortal</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    </>
                ) : (
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                )}
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${ activeTab === item.id ? 'bg-white text-indigo-600 shadow-lg' : 'hover:bg-white/10' }`}>
                    <item.icon className="w-5 h-5" />
                    {sidebarOpen && (
                        <span className="font-medium">{item.label}</span>
                    )}
                    </button>
                ))}
            </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/20">
            <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-all">
                <Settings className="w-5 h-5" />
                {sidebarOpen && <span>Settings</span>}
            </button>
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-all" >
                <LogOut className="w-5 h-5" />
                {sidebarOpen && <span>Logout</span>}
            </button>
        </div>
    </div>
  );
};