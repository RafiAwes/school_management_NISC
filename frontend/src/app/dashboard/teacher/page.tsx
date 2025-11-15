// 'use client';

// import React, { useState } from 'react';
// import { DashboardLayout } from '@/components/dashboard/common/DashboardLayout';
// import { Sidebar } from '@/components/dashboard/teacher/Sidebar';
// import { Header } from '@/components/dashboard/teacher/Header';
// import { OverviewTab } from '@/components/dashboard/teacher/OverviewTab';
// import { ClassesTab } from '@/components/dashboard/teacher/ClassesTab';
// import { StudentsTab } from '@/components/dashboard/teacher/StudentsTab';
// import { ClipboardCheck, Calendar, Award } from 'lucide-react';

// export default function TeacherDashboard() {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <DashboardLayout
//       sidebar={
//         <Sidebar
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//         />
//       }
//       header={
//         <Header
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//         />
//       }
//     >
//       {/* Tab Content */}
//       {activeTab === 'overview' && <OverviewTab />}
//       {activeTab === 'classes' && <ClassesTab />}
//       {activeTab === 'students' && <StudentsTab />}
//       {activeTab === 'assignments' && (
//         <div className="text-center py-20">
//           <ClipboardCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Assignments View
//           </h2>
//           <p className="text-gray-600">
//             This section will display all assignments
//           </p>
//         </div>
//       )}
//       {activeTab === 'schedule' && (
//         <div className="text-center py-20">
//           <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Schedule View
//           </h2>
//           <p className="text-gray-600">
//             This section will display your full schedule
//           </p>
//         </div>
//       )}
//       {activeTab === 'grades' && (
//         <div className="text-center py-20">
//           <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Grades View
//           </h2>
//           <p className="text-gray-600">
//             This section will display grades management
//           </p>
//         </div>
//       )}
//     </DashboardLayout>
//   );
// }