import { NavLink, useParams } from "react-router";
import type { ManagerRequest } from "../../../types/manager.types";
import { useEffect, useState } from "react";
import {
  getArchivedRequests,
  getManagerRequests,
  updateRequestArchive,
  updateRequestStatus,
} from "../../../services/managerService";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils/errorHandler";

export default function ManagerReqDetail() {
  const { requestId } = useParams();
  const [actionLoading, setActionLoading] = useState(false);

  const [request, setRequest] = useState<ManagerRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getManagerRequests(), getArchivedRequests()])
      .then(([normalRequests, archivedRequests]) => {
        const allRequests = [...normalRequests, ...archivedRequests];

        const selectedRequest = allRequests.find(
          (item) => item.request_id === Number(requestId),
        );

        setRequest(selectedRequest ?? null);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [requestId]);

  const handleStatusChange = async (status: string) => {
    if (!request) return;

    setActionLoading(true);

    try {
      const updatedRequest = await updateRequestStatus(request.request_id, {
        status,
      });

      setRequest(updatedRequest);
      toast.success("وضعیت درخواست با موفقیت تغییر کرد.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };
  const handleArchive = async () => {
    if (!request) return;

    setActionLoading(true);

    try {
      const updatedRequest = await updateRequestArchive(request.request_id, {
        is_archived: !request.is_archived,
      });

      setRequest(updatedRequest);

      toast.success(
        updatedRequest.is_archived
          ? "درخواست آرشیو شد."
          : "درخواست از آرشیو خارج شد.",
      );
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p>در حال دریافت اطلاعات...</p>;

  if (!request) return <p>درخواستی پیدا نشد.</p>;

  return (
    <>
      <div className=" flex flex-col gap-2">
        <NavLink
          className="bg-button-iceberg text-[20px] w-fit rounded-[10px] p-2"
          to={"/manager/requests"}
        >
          بازگشت
        </NavLink>
        <div
          dir="rtl"
          className="flex flex-col justify-center rounded-[10px] bg-white border-2 border-[#E5EBEE] items-start p-3 gap-5 text-[20px] "
        >
          <h1 className="text-[25px] font-medium">جزئیات درخواست</h1>

          <div className="flex justify-between gap-20 text-black">
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <span className=" text-slate-gray">شناسه درخواست</span>
                <span className=" ">{request.request_id}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className=" text-slate-gray">تاریخ ثبت</span>
                <span className=" ">
                  {" "}
                  {new Date(request.created_at).toLocaleString("fa-IR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <span className=" text-slate-gray">وضعیت</span>
                <span className=" ">{request.status}</span>
              </div>
              <div className="flex flex-col gap-2"></div>
              <span className=" text-slate-gray">درخواست دهنده</span>
              <span className=" ">{request.employee_id}</span>
            </div>
          </div>
          <div className="w-full h-[2px] bg-[#E5EBEE]"></div>
          <div className="flex flex-col">
            <span className=" text-slate-gray">توضیحات</span>
            <span className=" ">{request.description}</span>
          </div>
        </div>
        <div
          dir="rtl"
          className="bg-white border-2 border-[#E5EBEE] rounded-xl p-5 mt-4 flex flex-col gap-5"
        >
          <h2 className="text-xl font-bold">مدیریت درخواست</h2>

          {/* تغییر وضعیت */}
          <div className="flex flex-col gap-3">
            <span className="text-slate-gray">تغییر وضعیت درخواست</span>

            <div className="flex gap-3 flex-wrap">
              <button
                disabled={actionLoading}
                onClick={() => handleStatusChange("sent")}
                className="bg-blue-100 text-blue-700 px-5 py-2 rounded-lg disabled:opacity-50"
              >
                ثبت شده
              </button>

              <button
                disabled={actionLoading}
                onClick={() => handleStatusChange("approved")}
                className="bg-green-100 text-green-700 px-5 py-2 rounded-lg disabled:opacity-50"
              >
                تأیید شده
              </button>

              <button
                disabled={actionLoading}
                onClick={() => handleStatusChange("rejected")}
                className="bg-red-100 text-red-700 px-5 py-2 rounded-lg disabled:opacity-50"
              >
                رد شده
              </button>
            </div>
          </div>

          <div className="w-full h-0.5 bg-[#E5EBEE]" />

          {/* آرشیو */}
          <button
            disabled={actionLoading}
            onClick={handleArchive}
            className="bg-button-iceberg rounded-lg p-3 w-fit disabled:opacity-50"
          >
            {request.is_archived ? "خروج از آرشیو" : "انتقال به آرشیو"}
          </button>
        </div>
      </div>
    </>
  );
}
