import { createBrowserRouter, Navigate } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute ";

// Layouts
import UserLayout from "../layouts/UserLayout/UserLayout";
import ManagerLayout from "../layouts/ManagerLayout/ManagerLayout";
// import AdminLayout from "../layouts/AdminLayout";

// Auth
import Login from "../pages/auth/Login";

//User Pages
import UserDashboard from "../pages/User/UserDashboard/UserDashboard";
import UserReports from "../pages/User/UserReports/UserReports";
import UserRequests from "../pages/User/UserRequests/UserRequests";
import NewRequest from "../pages/User/UserRequests/newRequest/NewRequest";

// Manager Pages
import ManagerDashboard from "../pages/Manager/ManagerDashboard/ManagerDashboard";
import ManagerReq from "../pages/Manager/ManagerReq/ManagerReq";
import ManagerReqDetail from "../pages/Manager/ManagerReqDetail/ManagerReqDetail";

// // Admin Pages
// import AdminDashboard from "../pages/Admin/Dashboard/Dashboard";

const router = createBrowserRouter([
  //? Login
  {
    path: "/login",
    element: <Login />,
  },

  //? User Routes
  {
    element: <ProtectedRoute allowedRoles={["employee", "user"]} />,
    children: [
      {
        path: "/user",
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <UserDashboard />,
          },
          {
            path: "reports",
            element: <UserReports />,
          },
          {
            path: "requests",
            children: [
              {
                index: true,
                element: <UserRequests />,
              },
              {
                path: "new-request",
                element: <NewRequest />,
              },
            ],
          },
        ],
      },
    ],
  },

  //? Manager Routes

  {
    element: <ProtectedRoute allowedRoles={["manager"]} />,
    children: [
      {
        path: "/manager",
        element: <ManagerLayout />,
        children: [
          {
            path: "dashboard",
            element: <ManagerDashboard />,
          },
          {
            path: "requests",
            children: [
              {
                index: true,
                element: <ManagerReq />,
              },
              {
                path: ":requestId",
                element: <ManagerReqDetail />,
              },
            ],
          },
        ],
      },
    ],
  },

  //? Admin Routes

  //   {
  //     path: "/admin",
  //     element: <AdminLayout />,
  //     children: [
  //       {
  //         index: true,
  //         element: <Navigate to="dashboard" replace />,
  //       },
  //       {
  //         path: "dashboard",
  //         element: <AdminDashboard />,
  //       },
  //     ],
  //   },

  //? Default Route
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
