import UsReqTable from "./components/UsReqTable";
import { NavLink } from "react-router";

function UserRequests() {
  return (
    <div
      dir="rtl"
      className=" flex w-full p-7  justify-center items-center flex-col gap-10"
    >
      <div className=" w-full flex justify-between items-center">
        <div className=" flex flex-col">
          <span className=" text-[25px] font-bold">درخواست های داخلی من </span>
          <span className=" text-slate-gray">
            درخواست‌های ثبت‌شده و آخرین وضعیت رسیدگی آن‌ها
          </span>
        </div>
        <NavLink
          to={"/user/requests/new-request"}
          className="text-white w-fit h-fit text-[15px] py-4 px-6 bg-green-icon rounded-[10px]"
        >
          ＋ ثبت درخواست جدید
        </NavLink>
        
      </div>

      <div className=" w-full  flex justify-center items-center ">
        <UsReqTable />
      </div>
    </div>
  );
}

export default UserRequests;
