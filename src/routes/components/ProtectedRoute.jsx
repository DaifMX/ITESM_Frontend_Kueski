import {Outlet, useLocation, Navigate} from 'react-router';
import useAuthContext from '../../context/AuthContext';

// ----------------------------------------------------------------------
const ProtectedRoute = () => {
    const { authStatus } = useAuthContext();
    const location = useLocation();
    
    return (
        authStatus.status ? (<Outlet/>) : (<Navigate to="/login" state={{ from: location }} replace />)
    );
};

export default ProtectedRoute;