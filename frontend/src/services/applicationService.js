import api from "./api";

export const applyJob = async (jobId) => {
  const response = await api.post(`/applications/apply/${jobId}`);
  return response.data;
};