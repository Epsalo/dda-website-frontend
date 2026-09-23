import { apiRequest } from "./client";

export const getDashboardSummary = async () => {
  const result = await apiRequest("/dashboard/summary");
  return result.data;
};
