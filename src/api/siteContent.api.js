import { getData, putData } from "./client";
export const getSiteContent = () => getData("/site-content");
export const updateSiteContent = (data) => putData("/site-content", data);
