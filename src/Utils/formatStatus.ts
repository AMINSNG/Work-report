export function formatStatus(status: string) {
  const statuses: Record<string, string> = {
    sent: "ثبت شده",
    pending: "در حال بررسی",
    approved: "تأیید شده",
    rejected: "رد شده",
  };

  return statuses[status] ?? status;
}
