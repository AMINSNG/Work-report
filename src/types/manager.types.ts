export type ManagerRequest = {
  request_id: number;
  employee_id: number;
  manager_id: number;
  title: string;
  description: string;
  status: "sent" | "rejected" | "approved";
  is_archived: boolean;
  created_at: string;
};

export type UpdateRequestStatus = {
  status: string;
};

export type UpdateRequestArchive = {
  is_archived: boolean;
};
