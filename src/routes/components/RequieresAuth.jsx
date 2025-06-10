import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../../context/AuthContext";
import {useCookies} from 'react-cookie';

const RequireAuth = ({ allowedRoles }) => {
    const { user, setUser } = useAuth();
    const location = useLocation();
    
    const [firstRender, setFirstRender] = useState(true);

    const [cookies] = useCookies(['refreshToken']);

    useEffect(()=>{
        if ( user.role && !cookies.refreshToken && !firstRender) setUser({});
        console.log('first render', firstRender)
        console.log('cookies', cookies)
    }, [cookies.refreshToken]);


    useEffect(()=>{
     if (firstRender) setFirstRender(false);
     console.log('penipenis')
    });

    if (!allowedRoles?.includes(user.role)) return <Navigate to="/unauthorized" state={{ from: location }} replace />
    if (!user.role) return <Navigate to="/login" state={{ from: location }} replace /> 
    return <Outlet/>;
}

export default RequireAuth;