import axiosInstance from "../api/axios";

import useAuth from "../context/AuthContext";

import getToken from "../utils/getToken";

const useRefreshToken = () => {
  const { setUser, user } = useAuth();

  const refresh = async () => {
    try {
      return await axiosInstance.get('auth/isLoggedIn');
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  const useRefresh = async () => {
    const response = await refresh();
    const refTkn = getToken('refreshToken');
    const propsTkn = getToken('propsToken')

    if (!user.role) {
      if (refTkn && refTkn.role) setUser({ id: refTkn.id, name: propsTkn.fullName, role: refTkn.role, status: response.status });
    } else {
      setUser(prev => ({ ...prev, status: response.status, name: getToken('propsToken')?.fullName }));
    }
    return response.status;
  };

  return useRefresh;
}

export default useRefreshToken;