import CustomSelect from "./CustomSelect";
import { useState } from "react";

const reports = [
  {
    id: 1,
    code: "wr-356",
    type: "تعمیرات",
    title: "خرابی مانیتور میز شماره 12",
    priority: "فوری",
    responsible: "امین نظری",
    timeleft: "16ایان",
    status: "تأیید شده",
  },
  {
    id: 2,
    code: "wr-356",
    type: "تعمیرات",
    title: "درخواست مرخصی روزانه",
    priority: "عادی",
    responsible: "امین نظری",
    timeleft: "",
    status: "ثبت شده",
  },
  {
    id: 3,
    code: "wr-356",
    type: "مرخصی",
    title: "تعمیرات",
    priority: "فوری",
    responsible: "امین نظری",
    timeleft: "16ایان",
    status: "درحال بررسی",
  },
  {
    id: 4,
    code: "wr-356",
    type: "تعمیرات",
    title: "تعمیرات",
    priority: "فوری",
    responsible: "امین نظری",
    timeleft: "16ایان",
    status: "ردشده",
  },
];

export default function UsReqTable() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const categoryOptions = [
    { label: "همه دسته‌بندی‌ها", value: "all" },
    { label: "تعمیرات", value: "تعمیرات" },
    { label: "مرخصی", value: "مرخصی" },
    { label: "پشتیبانی", value: "پشتیبانی" },
  ];
  const statusOptions = [
    { label: "همه وضعیت‌ها", value: "all" },
    { label: "تأیید شده", value: "تأیید شده" },
    { label: "ثبت شده", value: "ثبت شده" },
    { label: "درحال بررسی", value: "درحال بررسی" },
    { label: "ردشده", value: "ردشده" },
  ];

  const filteredReports = reports.filter((item) => {
    const matchCategory =
      selectedCategory === "all" || item.type === selectedCategory;

    const matchStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    return matchCategory && matchStatus;
  });

  return (
    <div className="w-full ">
      <div className=" bg-white flex flex-col gap-3 rounded-2xl px-3 py-6">
        {/* filters */}
        <div className=" flex  gap-2 ">
          <input
            className="border-2 p-2 border-[#DFE6E9] w-1/6 rounded-xl"
            type="text"
          />
          <CustomSelect
            options={categoryOptions}
            selected={selectedCategory}
            onChange={setSelectedCategory}
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
                <th className=" p-2">کد‌پیگیری</th>
                <th className=" p-2">نوع درخواست</th>
                <th className=" p-2">عنوان</th>
                <th className=" p-2">اولویت</th>
                <th className=" p-2">مسئول رسیدگی</th>
                <th className=" p-2">مهلت</th>
                <th className=" p-2">وضعیت</th>
                <th className=" p-2">جزئیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className="border-t-[#EDF1F3] bg-white border-t-2 text-[15px] py-2"
                  >
                    <td className="p-4">{item.code}</td>
                    <td className="p-2">{item.type}</td>
                    <td className="p-2">{item.title}</td>
                    <td className="p-2">
                      <span
                        className={`p-2 font-bold ${
                          item.priority === "فوری"
                            ? "text-error-red bg-bg-error w-fit rounded-2xl"
                            : "text-[#667784] bg-[#EFF2F4] w-fit rounded-2xl"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="p-2">{item.responsible}</td>
                    <td className="p-2">{item.timeleft}</td>
                    <td className="p-2">
                      <span
                        className={`inline-block font-bold px-3 py-2 rounded-xl ${
                          item.status === "تأیید شده"
                            ? "bg-[#E9F7F0] text-[#16845B]"
                            : item.status === "درحال بررسی"
                              ? "bg-[#F4EFFB] text-[#7956AA]"
                              : item.status === "ثبت شده"
                                ? "text-[#3268A6] bg-[#EDF4FF]"
                                : "bg-bg-error text-error-red"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2 text-green-icon">
                      <span>پیگیری ←</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
