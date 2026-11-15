export type EmployeeRequest = {
  request_id: number;
  employee_id: number;
  manager_id: number;
  title: string;
  description: string;
  status: string;
  is_archived: boolean;
  created_at: string;
};
