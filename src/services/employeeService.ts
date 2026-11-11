import api from "./api";

export type CreateRequestPayload = {
  title: string;
  description: string;
};

export const createRequest = async (data: CreateRequestPayload) => {
  const response = await api.post("/employee/requests", data);

  return response.data;
};
