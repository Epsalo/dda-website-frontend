import { getData, postData, putData, deleteData } from "./client";
export const getVolunteers = () => getData("/volunteers");
export const createVolunteers = (data) => postData("/volunteers", data);
export const updateVolunteers = (id, data) => putData(`/volunteers/${id}`, data);
export const deleteVolunteers = (id) => deleteData(`/volunteers/${id}`);
