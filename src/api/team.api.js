import { getData, postData, putData, deleteData } from "./client";
export const getTeam = () => getData("/team");
export const getTeamAdmin = () => getData("/team/manage");
export const createTeam = (data) => postData("/team", data);
export const updateTeam = (id, data) => putData(`/team/${id}`, data);
export const deleteTeam = (id) => deleteData(`/team/${id}`);
