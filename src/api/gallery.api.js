import { getData, postData, putData, deleteData } from "./client";
export const getGallery = () => getData("/gallery");
export const createGallery = (data) => postData("/gallery", data);
export const updateGallery = (id, data) => putData(`/gallery/${id}`, data);
export const deleteGallery = (id) => deleteData(`/gallery/${id}`);
export const getGalleryAdmin = () => getData("/gallery/manage");
