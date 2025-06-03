import { createContext, useMemo, useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';

import getToken  from "../utils/getToken";

export const AuthContext = createContext({
    name: null,
    role: null,
    isAuthenticated: false,
});

export const AuthContextProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const payload = getToken();
        if(payload && payload.role) {
            console.log(payload);
            setName(payload.name);
            setRole(payload.role);
        }
    }, []);
    
    const authContextValue = useMemo(() => ({ name, setName, role, setRole, isAuthenticated, setIsAuthenticated }), [name, setName, role, setRole, isAuthenticated, setIsAuthenticated]);
    
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.object,
};

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;