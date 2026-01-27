import { useAuth } from "@/context/AuthContext"
import { Loader } from 'lucide-react';
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { isAuthenticated, loading} = useAuth();
    if (loading) return <Loader />
    if(!isAuthenticated) return <Navigate to="/login" replace/>
    return <Outlet/>
}
