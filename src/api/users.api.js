import { getData,postData,putData,deleteData } from "./client";
export const getUsers=()=>getData("/users");
export const createUser=data=>postData("/users",data);
export const updateUser=(id,data)=>putData(`/users/${id}`,data);
export const deleteUser=id=>deleteData(`/users/${id}`);
export const getAuthors=()=>getData("/users/authors");
