// src/contexts/AuthContext.jsx
import React, { createContext, useMemo, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import getToken from "../utils/getToken";

export const AuthContext = createContext({
    ctx: { id: undefined, name: undefined, role: undefined },
    setCtx: () => { }
});

export const AuthContextProvider = ({ children, initial = {} }) => {
    const [ctx, setCtx] = useState(initial);
    const authContextValue = useMemo(
        () => ({ ctx, setCtx }), [ctx, setCtx]
    );

    useEffect(() => {
        const freshPayload = getToken();
        if (freshPayload && freshPayload.role) setCtx({ id: freshPayload.id, name: freshPayload.name, role: freshPayload.role });
    }, []);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// A convenience hook for consumers
export const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;
