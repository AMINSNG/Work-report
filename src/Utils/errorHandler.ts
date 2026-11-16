import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "ارتباط با سرور برقرار نشد.";
    }

    switch (error.response.status) {
      case 400:
        return "اطلاعات ارسالی نامعتبر است.";

      case 401:
        return "نام کاربری یا رمز عبور اشتباه است.";

      case 403:
        return "شما اجازه دسترسی ندارید.";

      case 404:
        return "اطلاعات موردنظر پیدا نشد.";

      case 422:
        return "لطفا فبلد های الزامی را بدرستی پر کیند";

      case 500:
        return "خطای داخلی سرور.";

      default:
        return "خطایی در ارتباط با سرور رخ داد.";
    }
  }

  if (error instanceof Error) {
    if (error.message === "ACCOUNT_INACTIVE") {
      return "حساب کاربری شما غیرفعال شده است.";
    }
  }

  return "خطای غیرمنتظره‌ای رخ داد.";
}
