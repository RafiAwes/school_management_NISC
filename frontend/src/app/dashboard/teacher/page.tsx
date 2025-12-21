'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/dashboard/common/ProtectedRoute';
import { Sidebar } from '@/components/dashboard/teacher/Sidebar';
import { Header } from '@/components/dashboard/teacher/Header';
import { OverviewTab } from '@/components/dashboard/teacher/OverviewTab';
import { ClassesTab } from '@/components/dashboard/teacher/ClassesTab';
import { StudentsTab } from '@/components/dashboard/teacher/StudentsTab';
import { ClipboardCheck, Calendar, Award } from 'lucide-react';

export default function TeacherDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Handle navigation for attendance
    const handleTabChange = (tab: string) => {
        if (tab === 'attendance') {
            router.push('/dashboard/teacher/attendance');
        } else if (tab === 'students') {
            router.push('/dashboard/teacher/students');
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <ProtectedRoute>
            <div className="flex bg-gray-50 min-h-screen">
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={handleTabChange}  // Updated to use handleTabChange
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <div
                    className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'
                        } transition-all duration-300`}
                >
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="p-6">
                        {activeTab === 'overview' && <OverviewTab />}
                        {activeTab === 'classes' && <ClassesTab />}
                        {activeTab === 'assignments' && (
                            <div className="text-center py-20">
                                <ClipboardCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Assignments View
                                </h2>
                                <p className="text-gray-600">
                                    This section will display all assignments
                                </p>
                            </div>
                        )}
                        {activeTab === 'schedule' && (
                            <div className="text-center py-20">
                                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Schedule View
                                </h2>
                                <p className="text-gray-600">
                                    This section will display your full schedule
                                </p>
                            </div>
                        )}
                        {activeTab === 'grades' && (
                            <div className="text-center py-20">
                                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Grades View
                                </h2>
                                <p className="text-gray-600">
                                    This section will display grades management
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}



// 'use client';

// import React, { useState } from 'react';
// import { ProtectedRoute } from '@/components/dashboard/common/ProtectedRoute';
// import { Sidebar } from '@/components/dashboard/teacher/Sidebar';
// import { Header } from '@/components/dashboard/teacher/Header';
// import { OverviewTab } from '@/components/dashboard/teacher/OverviewTab';
// import { StudentsTab } from '@/components/dashboard/teacher/StudentsTab';
// import { ClassesTab } from '@/components/dashboard/teacher/ClassesTab';
// import { ClipboardCheck, Calendar, Award } from 'lucide-react';

// export default function TeacherDashboard() {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//         <ProtectedRoute>
//             <div className="flex bg-gray-50 min-h-screen">
//                 <Sidebar
//                 activeTab={activeTab}
//                 setActiveTab={setActiveTab}
//                 sidebarOpen={sidebarOpen}
//                 setSidebarOpen={setSidebarOpen}
//                 />

//                 <div className={`flex-1 ${ sidebarOpen ? 'ml-64' : 'ml-20' } transition-all duration-300`} >
//                     <Header
//                         sidebarOpen={sidebarOpen}
//                         setSidebarOpen={setSidebarOpen}
//                     />

//                     <main className="p-6">
//                         {activeTab === 'overview' && <OverviewTab />}
//                         {activeTab === 'classes' && <ClassesTab />}
//                         {activeTab === 'students' && <StudentsTab />}
//                         {activeTab === 'assignments' && (
//                         <div className="text-center py-20">
//                             <ClipboardCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                                 Assignments View
//                             </h2>
//                             <p className="text-gray-600">
//                                 This section will display all assignments
//                             </p>
//                         </div>
//                         )}
//                         {activeTab === 'schedule' && (
//                         <div className="text-center py-20">
//                             <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                                 Schedule View
//                             </h2>
//                             <p className="text-gray-600">
//                                 This section will display your full schedule
//                             </p>
//                         </div>
//                         )}
//                         {activeTab === 'grades' && (
//                         <div className="text-center py-20">
//                             <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                                 Grades View
//                             </h2>
//                             <p className="text-gray-600">
//                                 This section will display grades management
//                             </p>
//                         </div>
//                         )}
//                     </main>
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// }