export type UserProfile = {
  user_id: number;
  username: string;
  name: string;
  phonenumber: string;
  role: "employee" | "manager" | "admin";
  manager_id: number | null;
  created_at: string;
  is_active: boolean;
};
