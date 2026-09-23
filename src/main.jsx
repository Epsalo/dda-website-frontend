import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./styles.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Impact from "./pages/Impact";
import Team from "./pages/Team";
import { Donate, DonateReturn } from "./pages/Donate";
import { AuthProvider } from "./context/AuthContext";
import { SiteContentProvider } from "./context/SiteContentContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import { ProgramsAdmin,ProjectsAdmin,ImpactAdmin,NewsAdmin,EventsAdmin,GalleryAdmin,PartnersAdmin,VolunteersAdmin,MessagesAdmin,TeamAdmin,DonationsAdmin } from "./pages/admin/ContentPages";
import UsersAdmin from "./pages/admin/UsersAdmin";
import DonationSettings from "./pages/admin/DonationSettings";
import SiteContentAdmin from "./pages/admin/SiteContent";
import { ProgramsPage,ProjectsPage,NewsPage,EventsPage,GalleryPage } from "./pages/PublicList";
import DetailPage from "./pages/DetailPage";
import { ContactPage, GetInvolvedPage } from "./pages/EngagementPages";

function SimplePage({title,text}){return <main className="page-hero"><div className="container page-hero-inner"><span className="eyebrow">DDA</span><h1>{title}</h1><p>{text}</p></div></main>}

function App(){const location=useLocation(); const isAdmin=location.pathname.startsWith("/admin"); return <AuthProvider><SiteContentProvider>{!isAdmin&&<Navbar/>}<Routes>
<Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/team" element={<Team/>}/>
<Route path="/programs" element={<ProgramsPage/>}/><Route path="/programs/:slug" element={<DetailPage type="programs"/>}/>
<Route path="/projects" element={<ProjectsPage/>}/><Route path="/projects/:slug" element={<DetailPage type="projects"/>}/>
<Route path="/impact" element={<Impact/>}/>
<Route path="/news" element={<NewsPage/>}/><Route path="/news/:slug" element={<DetailPage type="news"/>}/>
<Route path="/events" element={<EventsPage/>}/><Route path="/events/:slug" element={<DetailPage type="events"/>}/><Route path="/gallery" element={<GalleryPage/>}/>
<Route path="/get-involved" element={<GetInvolvedPage/>}/>
<Route path="/donate" element={<Donate/>}/><Route path="/donate/return" element={<DonateReturn/>}/>
<Route path="/contact" element={<ContactPage/>}/>
<Route path="/admin/login" element={<Login/>}/>
<Route element={<ProtectedRoute roles={["ADMIN","EDITOR"]}/>}><Route path="/admin" element={<AdminLayout/>}><Route index element={<Dashboard/>}/><Route path="programs" element={<ProgramsAdmin/>}/><Route path="projects" element={<ProjectsAdmin/>}/><Route path="impact" element={<ImpactAdmin/>}/><Route path="news" element={<NewsAdmin/>}/><Route path="events" element={<EventsAdmin/>}/><Route path="gallery" element={<GalleryAdmin/>}/><Route path="volunteers" element={<VolunteersAdmin/>}/><Route path="partners" element={<PartnersAdmin/>}/><Route path="messages" element={<MessagesAdmin/>}/><Route path="team" element={<TeamAdmin/>}/><Route path="donations" element={<DonationsAdmin/>}/><Route element={<ProtectedRoute roles={["ADMIN"]}/>}><Route path="users" element={<UsersAdmin/>}/><Route path="donations/settings" element={<DonationSettings/>}/><Route path="site-content" element={<SiteContentAdmin/>}/></Route></Route></Route>
</Routes>{!isAdmin&&<Footer/>}</SiteContentProvider></AuthProvider>}
ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);
