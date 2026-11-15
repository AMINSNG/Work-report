import type { EmployeeRequest } from "../types/employee.types";
import api from "./api";

export type CreateRequestPayload = {
  title: string;
  description: string;
};

export const createRequest = async (data: CreateRequestPayload) => {
  const response = await api.post("/employee/requests", data);

  return response.data;
};

export const getMyRequests = async (): Promise<EmployeeRequest[]> => {
  const response = await api.get<EmployeeRequest[]>("/employee/requests");

  return response.data;
};
