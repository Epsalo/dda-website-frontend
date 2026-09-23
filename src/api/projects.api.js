import { getData, postData, putData, deleteData } from "./client";
export const getProjects = () => getData("/projects");
export const createProjects = (data) => postData("/projects", data);
export const updateProjects = (id, data) => putData(`/projects/${id}`, data);
export const deleteProjects = (id) => deleteData(`/projects/${id}`);
