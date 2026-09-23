import { getData, postData, putData, deleteData } from "./client";
export const getImpactStatistics = () => getData("/impact-statistics");
export const createImpactStatistics = (data) => postData("/impact-statistics", data);
export const updateImpactStatistics = (id, data) => putData(`/impact-statistics/${id}`, data);
export const deleteImpactStatistics = (id) => deleteData(`/impact-statistics/${id}`);
export const getImpactStatisticsAdmin = () => getData("/impact-statistics/manage");
