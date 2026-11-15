import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/useAuth";

type ProtectedRouteProps = {
  allowedRoles: string[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>در حال بررسی اطلاعات کاربر...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.is_active) {
    return <div>حساب کاربری شما غیرفعال است.</div>;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
