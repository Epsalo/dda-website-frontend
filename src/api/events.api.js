import { getData, postData, putData, deleteData } from "./client";
export const getEvents = () => getData("/events");
export const createEvents = (data) => postData("/events", data);
export const updateEvents = (id, data) => putData(`/events/${id}`, data);
export const deleteEvents = (id) => deleteData(`/events/${id}`);
export const getEventsAdmin = () => getData("/events/manage");
