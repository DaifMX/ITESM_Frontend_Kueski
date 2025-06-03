import { createContext, useMemo, useState, useContext } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext({
    authStatus: { status: undefined, name: undefined, role: 'PUBLIC' },
    setAuthStatus: () => { }
});

export const AuthContextProvider = ({ children, initial = {} }) => {
    const [authStatus, setAuthStatus] = useState(initial);
    const authContextValue = useMemo(() => ({ authStatus, setAuthStatus }), [authStatus, setAuthStatus]);
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.object,
    initial: PropTypes.object,
};

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;