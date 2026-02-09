import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
