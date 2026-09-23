import { getData, postData, putData, deleteData } from "./client";
export const getPartners = () => getData("/partners");
export const createPartners = (data) => postData("/partners", data);
export const updatePartners = (id, data) => putData(`/partners/${id}`, data);
export const deletePartners = (id) => deleteData(`/partners/${id}`);
export const getPartnersAdmin = () => getData("/partners/manage");
