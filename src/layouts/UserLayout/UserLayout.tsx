import { Outlet } from "react-router";
import Navbar from "../../pages/User/navbar/Navbar";

export default function UserLayout() {
  return (
    <>
      <div className=" flex flex-col gap-5 bg-[#F7F9FA] min-h-screen">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}
