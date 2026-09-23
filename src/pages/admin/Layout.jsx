import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderKanban, Newspaper, CalendarDays, Images, Users, Handshake, Mail, BarChart3, UserCog, LogOut, Menu, X, HeartHandshake, CircleUserRound, Image as ImageIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
const items=[
 ["Dashboard","/admin",LayoutDashboard],["Programs","/admin/programs",FolderKanban],["Projects","/admin/projects",FolderKanban],
 ["Impact","/admin/impact",BarChart3],["News","/admin/news",Newspaper],["Events","/admin/events",CalendarDays],["Gallery","/admin/gallery",Images],
 ["Team","/admin/team",CircleUserRound],["Volunteers","/admin/volunteers",Users],["Partners","/admin/partners",Handshake],["Donations","/admin/donations",HeartHandshake],["Messages","/admin/messages",Mail]
];
export default function Layout(){
 const {user,logout}=useAuth(); const nav=useNavigate(); const [open,setOpen]=React.useState(false);
 const visible=user?.role==="ADMIN"?[...items,["Donation settings","/admin/donations/settings",BarChart3],["Site images","/admin/site-content",ImageIcon],["Users","/admin/users",UserCog]]:items;
 return <div className="admin-shell"><aside className={`admin-sidebar ${open?"show":""}`}><div className="admin-brand"><img src="/images/dda-logo.png" alt="DDA"/><strong>DDA Admin</strong></div><nav>{visible.map(([label,to,Icon])=><NavLink key={to} to={to} end={to==="/admin"} onClick={()=>setOpen(false)}><Icon size={18}/>{label}</NavLink>)}</nav><button className="admin-logout" onClick={()=>{logout();nav("/admin/login")}}><LogOut size={18}/>Sign out</button></aside><div className="admin-main"><header className="admin-top"><button className="admin-menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><div><strong>{user?.name}</strong><small>{user?.role}</small></div><a href="/" target="_blank" rel="noreferrer" className="btn btn-outline-blue">View website</a></header><section className="admin-content"><Outlet/></section></div></div>
}
