import CustomSelect from "../components/CustomSelect";
import { useState } from "react";
import { createRequest } from "../../../../services/employeeService";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../../Utils/errorHandler";
import { NavLink } from "react-router";

const categoryOptions = [
  { label: "تعمیرات", value: "تعمیرات" },
  { label: "مرخصی", value: "مرخصی" },
  { label: "پشتیبانی", value: "پشتیبانی" },
];
const priorityOptions = [
  { label: "فوری", value: "فوری" },
  { label: "عادی", value: "عادی" },
];

function NewRequest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectPriority, setSelelctPriority] = useState("عادی");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setServerError("");
    setSuccessMessage("");

    // if (!title.trim() || !description.trim()) {
    //   toast.error("عنوان و توضیحات الزامی هستند.");
    //   return;
    // }

    setLoading(true);

    try {
      const result = await createRequest({
        title,
        description,
      });

      console.log("Request created:", result);

      toast.success("درخواست با موفقیت ثبت شد.");

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log("Create request error:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div
        dir="rtl"
        className=" bg-white w-full min-h-screen rounded-[15px]
        shadow-2xl flex flex-col p-4  items-center"
      >
        <div className="flex  justify-between w-full">
          <span className="text-[20px] font-bold">اطلاعات درخواست</span>
        </div>
        <form
          dir="rtl"
          className="flex w-full flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <div className=" flex ">
            <div className="flex flex-col gap-2">
              <span>نوع درخواست *</span>
              <CustomSelect
                onChange={setSelectedCategory}
                options={categoryOptions}
                selected={selectedCategory}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>اولویت</span>
              <CustomSelect
                onChange={setSelelctPriority}
                options={priorityOptions}
                selected={selectPriority}
              />
            </div>
          </div>

          <label htmlFor="title">عنوان درخواست</label>
          <input
            className="border-2 p-2 border-[#DFE6E9]  rounded-xl"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description">توضیحات</label>
          <textarea
            className="border-2 p-2 border-[#DFE6E9]  rounded-xl"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="responsible">مسئول رسیدگی </label>
          <input
            className="border-2 p-2 border-[#DFE6E9] rounded-xl"
            id="responsible"
            type="text"
          />
          <label htmlFor="responsible">فرستنده</label>
          <input
            className="border-2 p-2 border-[#DFE6E9] rounded-xl"
            id="responsible"
            type="text"
            placeholder=""
          />
          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}

          <div className=" flex justify-end  gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-icon py-2 px-6 rounded-[10px] text-white "
            >
              {loading ? "در حال ثبت..." : "ثبت درخواست"}
            </button>
            <NavLink
              to={"/user/requests"}
              type="button"
              className="py-2 px-6 border-2 border-[#E5EBEE] rounded-[10px] "
            >
              انصراف
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewRequest;
