import { getData, postData, putData, deleteData } from "./client";
export const getDonationConfig = () => getData("/donations/config");
export const getDonationSettings = () => getData("/donations/settings");
export const updateDonationSettings = (data) => putData("/donations/settings", data);
export const getDonations = () => getData("/donations");
export const initializeDonation = (data) => postData("/donations", data);
export const updateDonations = (id, data) => putData(`/donations/${id}`, data);
export const deleteDonations = (id) => deleteData(`/donations/${id}`);
export const createDonationRecord = (data) => postData("/donations", data);
