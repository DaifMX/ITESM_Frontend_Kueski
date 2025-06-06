import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../context/AuthContext";

const RequireAuth = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    console.log('RequiresAuth Called');
    console.log('RequiresAuth Called, user:', user);

    useEffect(()=>{
    })

    if (!allowedRoles?.includes(user.role)) return <Navigate to="/unauthorized" state={{ from: location }} replace />

    if (!user.role) return <Navigate to="/login" state={{ from: location }} replace /> 

    return (
        <Outlet/>
    );
}

export default RequireAuth;