import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../../context/useAuth";

function MngNavbar() {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");

    setUser(null);

    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav
        dir="rtl"
        className=" flex justify-between  px-3 py-4 rounded-2xl mt-2 mx-3
       bg-linear-to-r from-bg-primary via-bg-secondary to-bg-third  "
      >
        {/* logo */}
        <div className=" flex gap-2 border-l border-white/20 px-4">
          <div className="bg-onclick-navbar flex items-center px-3 py-0 rounded-xl text-2xl font-bold">
            W
          </div>
          <div className="flex flex-col  justify-center items-start ">
            <span className=" text-[20px] text-white"> WorkReport</span>
            <span className="text-[12px] text-gray-navbar">پنل سازمانی</span>
          </div>
        </div>

        {/* menu  */}
        <ul className=" flex items-center justify-center gap-2 text-gray-navbar">
          <li className="flex  items-center ">
            <NavLink
              to="/manager/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-onclick-navbar text-onclick-text"
                    : "text-gray-navbar hover:bg-white/10"
                }`
              }
            >
              <svg
                className="w-3"
                viewBox="0 0 9 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-4.29153e-05 10.164V4.088L4.36796 1.43051e-06L8.73596 4.088V10.164H-4.29153e-05ZM1.88996 8.288H6.85996V4.816L4.36796 2.492L1.88996 4.816V8.288Z"
                  fill="currentColor"
                />
              </svg>
              <span className="">میزکار</span>
            </NavLink>
          </li>
          {/* <li className="flex  items-center">
            <NavLink
              to="/user/reports"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-onclick-navbar text-onclick-text"
                    : "text-gray-navbar hover:bg-white/10"
                }`
              }
            >
              <svg
                className="w-3"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.000132859 10.248V-1.43051e-05H10.2481V10.248H0.000132859ZM0.630133 2.39399H9.61813V0.629986H0.630133V2.39399ZM0.630133 4.80199H9.61813V3.03799H0.630133V4.80199ZM0.630133 7.19599H9.61813V5.43199H0.630133V7.19599ZM0.630133 9.61799H9.61813V7.82599H0.630133V9.61799Z"
                  fill="currentColor"
                />
              </svg>
              <span className="">گزارش‌های من</span>
              <span className=" text-[10px] px-2 py-1 bg-white/10 rounded-2xl">
                12
              </span>
            </NavLink>
          </li> */}
          <li className="flex items-center">
            <NavLink
              to="/manager/requests"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-onclick-navbar text-onclick-text"
                    : "text-gray-navbar hover:bg-white/10"
                }`
              }
            >
              <svg
                className="w-3"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.54413 11.088C4.7788 11.088 4.06013 10.9433 3.38813 10.654C2.72547 10.374 2.13747 9.982 1.62413 9.478C1.12013 8.96467 0.723466 8.372 0.434133 7.7C0.144799 7.028 0.000132859 6.30933 0.000132859 5.544C0.000132859 4.77867 0.144799 4.06 0.434133 3.388C0.723466 2.716 1.12013 2.128 1.62413 1.624C2.13747 1.11067 2.72547 0.713999 3.38813 0.433999C4.06013 0.144666 4.7788 -9.53674e-07 5.54413 -9.53674e-07C6.30947 -9.53674e-07 7.02813 0.144666 7.70013 0.433999C8.37213 0.713999 8.96013 1.11067 9.46413 1.624C9.97747 2.128 10.3741 2.716 10.6541 3.388C10.9435 4.06 11.0881 4.77867 11.0881 5.544C11.0881 6.30933 10.9435 7.028 10.6541 7.7C10.3741 8.372 9.97747 8.96467 9.46413 9.478C8.96013 9.982 8.37213 10.374 7.70013 10.654C7.02813 10.9433 6.30947 11.088 5.54413 11.088ZM5.54413 10.122C6.1788 10.122 6.77147 10.0053 7.32213 9.772C7.8728 9.52933 8.35813 9.198 8.77813 8.778C9.19813 8.358 9.5248 7.87267 9.75813 7.322C10.0008 6.77133 10.1221 6.17867 10.1221 5.544C10.1221 4.90933 10.0008 4.31667 9.75813 3.766C9.5248 3.21533 9.19813 2.73 8.77813 2.31C8.35813 1.89 7.8728 1.56333 7.32213 1.33C6.77147 1.08733 6.1788 0.966 5.54413 0.966C4.90947 0.966 4.3168 1.08733 3.76613 1.33C3.21547 1.56333 2.73013 1.89 2.31013 2.31C1.89013 2.73 1.5588 3.21533 1.31613 3.766C1.0828 4.31667 0.966133 4.90933 0.966133 5.544C0.966133 6.17867 1.0828 6.77133 1.31613 7.322C1.5588 7.87267 1.89013 8.358 2.31013 8.778C2.73013 9.198 3.21547 9.52933 3.76613 9.772C4.3168 10.0053 4.90947 10.122 5.54413 10.122ZM5.54413 9.45C5.0028 9.45 4.49413 9.352 4.01813 9.156C3.55147 8.95067 3.13613 8.67067 2.77213 8.316C2.41747 7.952 2.13747 7.53667 1.93213 7.07C1.73613 6.594 1.63813 6.08533 1.63813 5.544C1.63813 5.00267 1.73613 4.49867 1.93213 4.032C2.13747 3.556 2.41747 3.14067 2.77213 2.786C3.13613 2.422 3.55147 2.142 4.01813 1.946C4.49413 1.74067 5.0028 1.638 5.54413 1.638C6.08547 1.638 6.59413 1.74067 7.07013 1.946C7.54613 2.142 7.96147 2.422 8.31613 2.786C8.68013 3.14067 8.96013 3.556 9.15613 4.032C9.36147 4.49867 9.46413 5.00267 9.46413 5.544C9.46413 6.08533 9.36147 6.594 9.15613 7.07C8.96013 7.53667 8.68013 7.952 8.31613 8.316C7.96147 8.67067 7.54613 8.95067 7.07013 9.156C6.59413 9.352 6.08547 9.45 5.54413 9.45ZM5.54413 8.484C6.0948 8.484 6.58947 8.35333 7.02813 8.092C7.47613 7.83067 7.8308 7.476 8.09213 7.028C8.3628 6.58 8.49813 6.08533 8.49813 5.544C8.49813 4.99333 8.3628 4.49867 8.09213 4.06C7.8308 3.612 7.47613 3.25733 7.02813 2.996C6.58947 2.73467 6.0948 2.604 5.54413 2.604C5.0028 2.604 4.50813 2.73467 4.06013 2.996C3.61213 3.25733 3.25747 3.612 2.99613 4.06C2.7348 4.49867 2.60413 4.99333 2.60413 5.544C2.60413 6.08533 2.7348 6.58 2.99613 7.028C3.25747 7.476 3.61213 7.83067 4.06013 8.092C4.50813 8.35333 5.0028 8.484 5.54413 8.484Z"
                  fill="currentColor"
                />
              </svg>
              <span className="">درخواست‌های من</span>
              <span className=" text-[10px] px-2 py-1 bg-white/20 rounded-2xl">
                4
              </span>
            </NavLink>
          </li>
        </ul>

        {/* user & notif */}
        <div className=" flex gap-3 items-center justify-between border-r border-white/20 px-4  ">
          <button
            onClick={handleLogout}
            className="text-white hover:text-red-300 transition-colors"
          >
            خروج
          </button>
          <div className=" w-fit h-fit p-3 rounded-[11px] bg-white/10 border border-white/25">
            <svg
              className="w-4"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.56038 14.0604H8.39372M11.2271 4.85208C11.2271 3.72491 10.7793 2.64391 9.98225 1.84688C9.18523 1.04985 8.10422 0.602081 6.97705 0.602081C5.84988 0.602081 4.76888 1.04985 3.97185 1.84688C3.17482 2.64391 2.72705 3.72491 2.72705 4.85208C2.72705 9.81041 0.602051 9.81041 0.602051 11.2271H13.3521C13.3521 9.81041 11.2271 9.81041 11.2271 4.85208Z"
                stroke-width="1.20417"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#E7F5F4"
              />
            </svg>
          </div>
          <div className="flex gap-2  justify-between items-center px-3 py-2 rounded-[11px]  bg-white/10 border border-white/25">
            <span className="bg-button-iceberg rounded-[11px] w-fit h-fit  px-2 py-1  ">
              {user?.name?.slice(0, 2) || "کاربر"}
            </span>
            <div className="flex flex-col">
              <span className="text-white text-[14px]">
                {" "}
                {user?.name || "کاربر"}
              </span>
              <span className="text-gray-navbar text-[12px]">
                {user?.role === "manager" ? "مدیر" : user?.role}
              </span>
            </div>
            <div className=" text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-down preview-icon"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default MngNavbar;
