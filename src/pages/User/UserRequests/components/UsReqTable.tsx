import toast from "react-hot-toast";
import { getMyRequests } from "../../../../services/employeeService";
import type { EmployeeRequest } from "../../../../types/employee.types";
import { getErrorMessage } from "../../../../Utils/errorHandler";
import CustomSelect from "./CustomSelect";
import { useEffect, useState } from "react";
import { formatStatus } from "../../../../Utils/formatStatus";

export default function UsReqTable() {
  // const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [requests, setRequests] = useState<EmployeeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const statusOptions = [
    { label: "همه وضعیت‌ها", value: "all" },
    { label: "ثبت شده", value: "sent" },
  ];
  useEffect(() => {
    setTimeout(() => {
      getMyRequests()
        .then(setRequests)
        .catch((error: unknown) => {
          toast.error(getErrorMessage(error));
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  const filteredReports = requests.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    return matchSearch && matchStatus;
  });

  return (
    <div className="w-full ">
      <div className=" bg-white flex flex-col gap-3 rounded-2xl px-3 py-6">
        {/* filters */}
        <div className=" flex  gap-2 ">
          <input
            className="border-2 p-2 border-[#DFE6E9] w-1/6 rounded-xl"
            value={search}
            placeholder="جستجوی عنوان"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />

          <CustomSelect
            options={statusOptions}
            selected={selectedStatus}
            onChange={setSelectedStatus}
          />
        </div>

        {/* table */}
        <div className=" w-full overflow-hidden  rounded-[15px] border-2 border-[#E5EBEE] ">
          <table className=" w-full h-full border-collapse text-right">
            <thead className=" ">
              <tr className=" text-[#6D7D89]  bg-[#F7F9FA]">
                <th className=" p-2">کد درخواست</th>
                <th className=" p-2">عنوان</th>
                <th className=" p-2">زمان درخواست</th>

                <th className=" p-2">وضعیت</th>
                <th className=" p-2">جزئیات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 bg-white text-gray-400"
                  >
                    در حال بارگذاری
                  </td>
                </tr>
              ) : filteredReports.length > 0 ? (
                filteredReports.map((item) => {
                  return (
                    <tr
                      key={item.request_id}
                      className="border-t-[#EDF1F3] bg-white border-t-2 text-[15px] py-2"
                    >
                      <td className="p-4">{item.request_id}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">
                        {new Date(item.created_at).toLocaleString("fa-IR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="p-2">
                        <span
                          className={`inline-block font-bold px-3 py-2 rounded-xl ${
                            item.status === "sent"
                              ? "bg-[#E9F7F0] text-[#16845B]"
                              : item.status === "pending"
                                ? "bg-[#F4EFFB] text-[#7956AA]"
                                : item.status === "approved"
                                  ? "text-[#3268A6] bg-[#EDF4FF]"
                                  : "bg-bg-error text-error-red"
                          }`}
                        >
                          {formatStatus(item.status)}
                        </span>
                      </td>
                      <td className="p-2 text-green-icon">
                        <span
                          className="cursor-pointer"
                          // onClick={() =>
                          //   navigate(`/manager/requests/${item.request_id}`)
                          // }
                        >
                          پیگیری ←
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 bg-white text-gray-400"
                  >
                    داده‌ای یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
