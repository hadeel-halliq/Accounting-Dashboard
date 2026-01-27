import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom";

export default function RoleRoute({ roles, children}) {
    const { role } = useAuth();
    if(!roles.includes(role)) {
        return <Navigate to="/" replace/>
    }
    return children
}
