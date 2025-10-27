import { createBrowserRouter, redirect } from "react-router";

import Login from "../pages/login";
import Users from "../pages/users";

import AuthLayout from "../layouts/auth";
import AdminLayout from "../layouts/admin";

import AuthRedirect from "./auth-redirect";

const requireAuth = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw redirect("/auth/login");
  }

  return null;
};

const Router = createBrowserRouter([
  {
    path: "/",
    Component: AuthRedirect,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { index: true, Component: Login },
      { path: "login", Component: Login },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    middleware: [requireAuth],
    children: [{ index: true, Component: Users }],
  },
]);

export default Router;
