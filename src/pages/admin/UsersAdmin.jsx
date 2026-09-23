import React from "react";
import ResourceManager from "./ResourceManager";
import { getUsers, createUser, updateUser, deleteUser } from "../../api/users.api";
export default function UsersAdmin(){return <ResourceManager title="Users" description="Manage administrators and editors who can access the DDA admin panel." load={getUsers} create={createUser} update={updateUser} remove={deleteUser} fields={[
{name:"name",label:"Name",required:true},{name:"email",label:"Email",type:"email",required:true},{name:"password",label:"Password",type:"password",requiredOnCreate:true,placeholder:"Leave blank to keep current password"},{name:"role",label:"Role",type:"select",options:[{value:"EDITOR",label:"Editor"},{value:"ADMIN",label:"Administrator"}],required:true},{name:"isActive",label:"Account active",type:"checkbox",default:true}
]} transform={d=>{const out={name:d.name,email:d.email,role:d.role,isActive:d.isActive!==false}; if(d.password) out.password=d.password; return out;}}/> }
