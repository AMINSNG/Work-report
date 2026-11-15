import type {
  ManagerRequest,
  UpdateRequestArchive,
  UpdateRequestStatus,
} from "../types/manager.types";
import api from "./api";

export const getManagerRequests = async (): Promise<ManagerRequest[]> => {
  const response = await api.get<ManagerRequest[]>("/manager/requests");
  return response.data;
};

export const getArchivedRequests = async (): Promise<ManagerRequest[]> => {
  const response = await api.get<ManagerRequest[]>(
    "/manager/requests/archived",
  );
  return response.data;
};

// تغییر وضعیت درخواست
export const updateRequestStatus = async (
  requestId: number,
  data: UpdateRequestStatus,
): Promise<ManagerRequest> => {
  const response = await api.patch<ManagerRequest>(
    `/manager/requests/${requestId}/status`,
    data,
  );

  return response.data;
};

// تغییر وضعیت آرشیو
export const updateRequestArchive = async (
  requestId: number,
  data: UpdateRequestArchive,
): Promise<ManagerRequest> => {
  const response = await api.patch<ManagerRequest>(
    `/manager/requests/${requestId}/is_archive`,
    data,
  );

  return response.data;
};
