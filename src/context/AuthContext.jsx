import { createContext, useMemo, useState, useContext } from "react";

export const AuthContext = createContext({
    user: { id: undefined, role: undefined, name: undefined, status: undefined },
    setUser: () => { }
});

export const AuthContextProvider = ({ children, initial = {} }) => {
    const [user, setUser] = useState(initial);
    const authContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;