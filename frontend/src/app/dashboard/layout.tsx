import { ProtectedRoute } from "@/components/dashboard/common/ProtectedRoute";

export default function DashboardLayout({children}: {children: React.ReactNode}){
    return(
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                {children}
            </div>
        </ProtectedRoute>
    )
}