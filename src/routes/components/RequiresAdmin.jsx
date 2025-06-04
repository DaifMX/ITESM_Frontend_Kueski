
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import AdminLayout from '../../layout/Admin/AdminLayout'
import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAdmin() {
  const { ctx } = useContext(AuthContext);
  if (ctx.role !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }

  return <AdminLayout><Outlet /></AdminLayout>;
}
