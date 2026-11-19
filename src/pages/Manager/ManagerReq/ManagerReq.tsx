import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getArchivedRequests,
  getManagerRequests,
} from "../../../services/managerService";
import type { ManagerRequest } from "../../../types/manager.types";
import { formatStatus } from "../../../utils/formatStatus";

export default function ManagerReq() {
  const [requests, setRequests] = useState<ManagerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    const fetchRequests = showArchived
      ? getArchivedRequests
      : getManagerRequests;

    fetchRequests()
      .then(setRequests)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [showArchived]);
  if (loading) return <p>در حال دیافت درخواست ها....</p>;

  return (
    <>
      <div dir="rtl" className=" flex flex-col gap-2 ">
        <div className=" flex gap-2">
          <button
            className={`${showArchived ? "" : "bg-button-iceberg"} w-fit flex justify-between p-3 border-2 border-[#DFE6E9] rounded-xl`}
            onClick={() => setShowArchived(false)}
          >
            درخواست‌های جدید
          </button>

          <button
            className={`${showArchived ? "bg-button-iceberg" : ""} w-fit flex justify-between p-3 border-2 border-[#DFE6E9] rounded-xl`}
            onClick={() => setShowArchived(true)}
          >
            آرشیو شده
          </button>
        </div>
        <div className=" w-full overflow-hidden  rounded-[15px] border-2 border-[#E5EBEE] ">
          <table className=" w-full h-full border-collapse text-right">
            <thead className=" ">
              <tr className=" text-[#6D7D89]  bg-[#F7F9FA]">
                <th className=" p-2">کد درخواست</th>
                <th className=" p-2">عنوان</th>
                <th className=" p-2">زمان درخواست</th>
                <th className=" p-2"> وضعیت ارشیو</th>
                <th className=" p-2">وضعیت</th>
                <th className=" p-2">جزئیات</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((item) => {
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
                          className={`px-3 py-2 rounded-xl font-bold ${
                            item.is_archived
                              ? "bg-blue-100 text-blue-400"
                              : "bg-[#E9F7F0] text-[#16845B]"
                          }`}
                        >
                          {item.is_archived ? "آرشیو شده" : "ارشیو نشده"}
                        </span>
                      </td>
                      <td className="p-2">
                        <span
                          className={`inline-block font-bold px-3 py-2 rounded-xl ${
                            item.status === "sent"
                              ? "bg-[#E9F7F0] text-[#16845B]"
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
                          onClick={() =>
                            navigate(`/manager/requests/${item.request_id}`)
                          }
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
    </>
  );
}

// {
//   requests.map((item) => {
//     return (
//       <tr
//         key={item.request_id}
//         className="border-t-[#EDF1F3] bg-white border-t-2 text-[15px] py-2"
//       >
//         <td className="p-4">{item.request_id}</td>
//         <td className="p-2">{item.title}</td>
//         <td className="p-2">
//           {new Date(item.created_at).toLocaleString("fa-IR", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//           })}
//         </td>
//         <td className="p-2">
//           <span
//             className={`px-3 py-2 rounded-xl font-bold ${
//               item.is_archived
//                 ? "bg-[#F4EFFB] text-[#7956AA]"
//                 : "bg-[#E9F7F0] text-[#16845B]"
//             }`}
//           >
//             {item.is_archived ? "آرشیو شده" : "ارشیو نشده"}
//           </span>
//         </td>
//         <td className="p-2">
//           <span
//             className={`inline-block font-bold px-3 py-2 rounded-xl ${
//               item.status === "sent"
//                 ? "bg-[#E9F7F0] text-[#16845B]"
//                 : item.status === "درحال بررسی"
//                   ? "bg-[#F4EFFB] text-[#7956AA]"
//                   : item.status === "ثبت شده"
//                     ? "text-[#3268A6] bg-[#EDF4FF]"
//                     : "bg-bg-error text-error-red"
//             }`}
//           >
//             {item.status}
//           </span>
//         </td>
//         <td className="p-2 text-green-icon">
//           <span
//             className="cursor-pointer"
//             onClick={() => navigate(`/manager/requests/${item.request_id}`)}
//           >
//             پیگیری ←
//           </span>
//         </td>
//       </tr>
//     );
//   });
// }
