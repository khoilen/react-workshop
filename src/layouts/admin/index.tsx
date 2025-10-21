import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/use-auth";

const AdminLayout = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div>
      Admin Layout
      <Outlet />
    </div>
  );
};

export default AdminLayout;
