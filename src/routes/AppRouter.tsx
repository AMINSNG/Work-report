import { createBrowserRouter, Navigate } from "react-router";

// Layouts
import UserLayout from "../layouts/UserLayout/UserLayout";
// import ManagerLayout from "../layouts/ManagerLayout";
// import AdminLayout from "../layouts/AdminLayout";

// Auth
import Login from "../pages/auth/Login";

//User Pages
import UserDashboard from "../pages/User/UserDashboard/UserDashboard";
import UserReports from "../pages/User/UserReports/UserReports";
import UserRequests from "../pages/User/UserRequests/UserRequests";
import NewRequest from "../pages/User/UserRequests/newRequest/NewRequest";

// // Manager Pages
// import ManagerDashboard from "../pages/Manager/Dashboard/Dashboard";

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
        element: <UserRequests />,
        children: [
          {
            path: "new-request",
            element: <NewRequest />,
          },
        ],
      },
    ],
  },

  //? Manager Routes

  //   {
  //     path: "/manager",
  //     element: <ManagerLayout />,
  //     children: [
  //       {
  //         index: true,
  //         element: <Navigate to="dashboard" replace />,
  //       },
  //       {
  //         path: "dashboard",
  //         element: <ManagerDashboard />,
  //       },
  //     ],
  //   },

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
