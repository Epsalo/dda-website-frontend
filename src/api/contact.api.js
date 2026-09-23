import { getData, postData, putData, deleteData } from "./client";
export const getContactMessages = () => getData("/contact-messages");
export const createContactMessages = (data) => postData("/contact-messages", data);
export const updateContactMessages = (id, data) => putData(`/contact-messages/${id}`, data);
export const deleteContactMessages = (id) => deleteData(`/contact-messages/${id}`);
