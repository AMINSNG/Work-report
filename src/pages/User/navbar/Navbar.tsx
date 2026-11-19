import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../../context/useAuth";
type Role = "employee" | "manager" | "admin";
type MenuItem = {
  title: string;
  path: string;
  count?: number;
};
const menuItems: Record<Role, MenuItem[]> = {
  employee: [
    {
      title: "میزکار",
      path: "/user/dashboard",
    },
    {
      title: "گزارش‌های من",
      path: "/user/reports",
      count: 12,
    },
    {
      title: "درخواست‌های من",
      path: "/user/requests",
      count: 4,
    },
  ],

  manager: [
    {
      title: "میزکار",
      path: "/manager/dashboard",
    },
    {
      title: "درخواست‌ها",
      path: "/manager/requests",
      count: 4,
    },
  ],

  admin: [
    {
      title: "میزکار",
      path: "/admin/dashboard",
    },
    {
      title: "مدیریت کاربران",
      path: "/admin/users",
    },
  ],
};

function Navbar() {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");

    setUser(null);
    navigate("/login", { replace: true });
  };

  const currentMenu = menuItems[user?.role as keyof typeof menuItems] ?? [];

  return (
    <nav
      dir="rtl"
      className="flex justify-between px-3 py-4 rounded-2xl mt-2 mx-3
      bg-linear-to-r from-bg-primary via-bg-secondary to-bg-third"
    >
      {/* Logo */}
      <div className="flex gap-2 border-l border-white/20 px-4">
        <div className="bg-onclick-navbar flex items-center px-3 rounded-xl text-2xl font-bold">
          W
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-[20px] text-white">WorkReport</span>
          <span className="text-[12px] text-gray-navbar">پنل سازمانی</span>
        </div>
      </div>

      {/* Dynamic Menu */}
      <ul className="flex items-center justify-center gap-2 text-gray-navbar">
        {currentMenu.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-onclick-navbar text-onclick-text"
                    : "text-gray-navbar hover:bg-white/10"
                }`
              }
            >
              <span>{item.title}</span>

              {item.count !== undefined && (
                <span className="text-[10px] px-2 py-1 bg-white/10 rounded-2xl">
                  {item.count}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User & Logout */}
      <div className="flex gap-3 items-center border-r border-white/20 px-4">
        <button
          onClick={handleLogout}
          className="text-white hover:text-red-300 transition-colors"
        >
          خروج
        </button>

        <div className="flex gap-2 items-center px-3 py-2 rounded-[11px] bg-white/10 border border-white/25">
          <span className="bg-button-iceberg rounded-[11px] px-2 py-1">
            {user?.name?.slice(0, 2) || "کاربر"}
          </span>

          <div className="flex flex-col">
            <span className="text-white text-[14px]">
              {user?.name || "کاربر"}
            </span>

            <span className="text-gray-navbar text-[12px]">
              {user?.role === "employee"
                ? "کارمند"
                : user?.role === "manager"
                  ? "مدیر"
                  : "ادمین"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
