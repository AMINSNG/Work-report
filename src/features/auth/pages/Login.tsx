import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { LoginFormData } from "../types/auth.types";
import { LoginUser } from "../services/authService";

type LoginErrors = {
  username?: string;
  password?: string;
};

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // فانکشن برای اینپوت ها تا چیزی که کاربر مینوسه رو بررسی کنه
  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "نام کاربری الزامی است.";
    }

    if (!formData.password) {
      newErrors.password = "رمز عبور الزامی است.";
    } else if (formData.password.length < 8) {
      newErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // فانکشن برای لاگین کردن
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    setLoading(true);

    try {
      const result = await LoginUser(formData);

      console.log("Login successful:", result);
    } catch {
      setServerError("نام کاربری یا رمز عبور اشتباه است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" min-h-screen flex justify-center items-center lg:p-10 ">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-6   justify-between  rounded-2xl 
         shadow-2xl p-5 lg:px-10 lg:py-10 w-5/6 lg:w-3/6 lg:max-w-140 "
        >
          <header className="flex flex-col gap-3 text-end font-bold mb-6 ">
            <span className=" text-[15px] lg:text-[20px] text-[#087F80]">
              خوش آمدید
            </span>
            <span className=" text-[20px] lg:text-[30px] font-bold">
              ورود به حساب کاربری
            </span>
            <span className=" text-[#778692] text-[10px] lg:text-[15px] ">
              برای ادامه، اطلاعات حساب سازمانی خود را وارد کنید.
            </span>
          </header>

          {/* input user */}
          <div className="flex flex-col gap-1">
            <input
              className={`border text-end p-3 rounded-[9px] outline-none
              ${errors.username ? "border-red-500" : "border-[#DFE6E9]"}`}
              placeholder="نام کاربری"
              type="text"
              value={formData.username}
              onChange={(e) => {
                setServerError("");
                setFormData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
                setErrors((prev) => ({
                  ...prev,
                  username: "",
                }));
              }}
            />

            {errors.username && (
              <span className="text-red-500 text-xs text-end">
                {errors.username}
              </span>
            )}
          </div>
          {/* input pass */}
          <div className="flex flex-col gap-1">
            <div className="relative">
              <input
                className={`text-end w-full p-3 rounded-[9px] border outline-none
                ${errors.password ? "border-red-500" : "border-[#DFE6E9]"}`}
                placeholder="رمز عبور"
                value={formData.password}
                onChange={(e) => {
                  setServerError("");
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    password: "",
                  }));
                }}
                type={showPassword ? "text" : "password"}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-4 left-3 text-[#778692]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <span className="text-red-500 text-xs text-end">
                {errors.password}
              </span>
            )}
          </div>

          {/* فراموشی به خاطر سپردن */}
          <div className=" flex justify-between px-2">
            <button type="button" className="text-[#087F80]">
              فراموشی رمز عبور
            </button>
            <div className="flex  gap-1 items-center p-1">
              <span className=""> مرا یه خاطر بسپار</span>
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rememberMe: e.target.checked,
                  }))
                }
              />
            </div>
          </div>
          {/* buttouns */}
          <div className=" flex flex-col gap-2">
            {serverError && (
              <p className="text-red-500 text-sm text-end">{serverError}</p>
            )}
            <button
              disabled={loading}
              className=" flex gap-2 justify-center items-center
             text-white bg-[#087F80] p-3 rounded-[9px]"
            >
              <svg
                className="w-3.5 "
                viewBox="0 0 8 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.37002 2.82C1.16335 2.58 0.946686 2.36667 0.72002 2.18C0.493353 1.99333 0.253353 1.83667 1.95503e-05 1.71V1.12C0.513353 0.853335 0.97002 0.480002 1.37002 1.90735e-06H2.41002C2.35669 0.166668 2.28335 0.336668 2.19002 0.510002C2.10335 0.683335 2.00002 0.856668 1.88002 1.03V1.8C2.00002 1.96667 2.10335 2.13667 2.19002 2.31C2.27669 2.47667 2.35002 2.64667 2.41002 2.82H1.37002ZM1.82002 1.95L1.83002 0.870002H7.04002V1.95H1.82002Z"
                  fill="white"
                />
              </svg>
              <span> ورود به سامانه</span>
            </button>
            <button
              type="button"
              className="bg-[#E5EBEE] p-3 rounded-[9px] text-[#657682]"
            >
              حساب کاربری توسط مدیر سامانه ایجاد می‌شود.
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
