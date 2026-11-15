import { Outlet } from "react-router";
import MngNavbar from "../../pages/Manager/MngNavbar/MngNavbar";

function ManagerLayout() {
  return (
    <>
      <div className=" flex flex-col gap-5 bg-[#F7F9FA] min-h-screen">
        <MngNavbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default ManagerLayout;
