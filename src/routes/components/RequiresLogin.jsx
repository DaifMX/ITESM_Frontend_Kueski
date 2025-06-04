
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function RequireLogin() {
  const { ctx } = useContext(AuthContext);
  console.log(ctx.role);
  if (!ctx.role) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
