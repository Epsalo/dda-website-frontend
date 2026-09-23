import { getData, postData, putData, deleteData } from "./client";
export const getNews = () => getData("/news");
export const createNews = (data) => postData("/news", data);
export const updateNews = (id, data) => putData(`/news/${id}`, data);
export const deleteNews = (id) => deleteData(`/news/${id}`);

export const getNewsAdmin = () => getData("/news/manage");
