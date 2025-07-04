import { useEffect, useState } from 'react';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

import useAuth from '../../context/AuthContext';
import useRefreshToken from '../use-refresh-tkn';
import { Outlet } from 'react-router';

const PersistLogin = () => {
    const { user, setUser } = useAuth();
    const refresh = useRefreshToken();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                setUser({});
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        user?.status === 200 ? setIsLoading(false) : verifyRefreshToken();

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)

    }, [isLoading])

    return (
        <>
            {isLoading
                ? <LoadingComponent />
                :
                <Outlet />
            }
        </>
    );
};

export default PersistLogin;
