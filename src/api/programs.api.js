import { getData, postData, putData, deleteData } from "./client";
export const getPrograms = () => getData("/programs");
export const createPrograms = (data) => postData("/programs", data);
export const updatePrograms = (id, data) => putData(`/programs/${id}`, data);
export const deletePrograms = (id) => deleteData(`/programs/${id}`);
export const getProgramsAdmin = () => getData("/programs/manage");
