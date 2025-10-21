import { Navigate } from "react-router";
import { useAuth } from "../hooks/use-auth";

export default function AuthRedirect() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <Navigate to="/admin/user" replace />;

  return <Navigate to="/auth/login" replace />;
}
