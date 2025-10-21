import { createBrowserRouter } from "react-router";

import Login from "../pages/login";
import Users from "../pages/users";

import AuthLayout from "../layouts/auth";
import AdminLayout from "../layouts/admin";

import AuthRedirect from "./auth-redirect";

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
    children: [{ index: true, Component: Users }],
  },
]);

export default Router;
