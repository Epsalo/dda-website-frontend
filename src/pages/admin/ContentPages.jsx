import React from "react";
import ResourceManager from "./ResourceManager";
import { getProgramsAdmin,createPrograms,updatePrograms,deletePrograms } from "../../api/programs.api";
import { getProjects,createProjects,updateProjects,deleteProjects } from "../../api/projects.api";
import { getImpactStatisticsAdmin,createImpactStatistics,updateImpactStatistics,deleteImpactStatistics } from "../../api/impact.api";
import { getNewsAdmin,createNews,updateNews,deleteNews } from "../../api/news.api";
import { getEventsAdmin,createEvents,updateEvents,deleteEvents } from "../../api/events.api";
import { getGalleryAdmin,createGallery,updateGallery,deleteGallery } from "../../api/gallery.api";
import { getPartnersAdmin,createPartners,updatePartners,deletePartners } from "../../api/partners.api";
import { getVolunteers,updateVolunteers,deleteVolunteers } from "../../api/volunteers.api";
import { getContactMessages,updateContactMessages,deleteContactMessages } from "../../api/contact.api";
import { getAuthors } from "../../api/users.api";
import { getTeamAdmin,createTeam,updateTeam,deleteTeam } from "../../api/team.api";
import { getDonations,createDonationRecord,updateDonations,deleteDonations } from "../../api/donations.api";

const options=(values)=>values.map(x=>({value:x,label:x}));
const baseFields={
  program:[{name:"title",label:"Title",required:true},{name:"slug",label:"Slug",required:true,placeholder:"Auto-generated from title if left empty"},{name:"shortDescription",label:"Short description",type:"textarea",required:true},{name:"description",label:"Description",type:"textarea",required:true},{name:"imageUrl",label:"Image",type:"image",optional:true},{name:"sortOrder",label:"Sort order",type:"number",default:0},{name:"isActive",label:"Published / active",type:"checkbox",default:true}],
  impact:[{name:"label",label:"Label",required:true},{name:"value",label:"Value",required:true},{name:"icon",label:"Icon name",optional:true},{name:"sortOrder",label:"Sort order",type:"number",default:0},{name:"isActive",label:"Published / active",type:"checkbox",default:true}],
  event:[{name:"title",label:"Title",required:true},{name:"slug",label:"Slug",required:true,placeholder:"Auto-generated from title if left empty"},{name:"description",label:"Description",type:"textarea",required:true},{name:"location",label:"Location",optional:true},{name:"eventDate",label:"Event date",type:"datetime-local",required:true},{name:"imageUrl",label:"Image",type:"image",optional:true},{name:"status",label:"Status",type:"select",options:options(["UPCOMING","COMPLETED","CANCELLED"]),required:true}],
  gallery:[{name:"title",label:"Title",optional:true},{name:"imageUrl",label:"Image",type:"image",required:true},{name:"caption",label:"Caption",type:"textarea",optional:true},{name:"sortOrder",label:"Sort order",type:"number",default:0},{name:"isPublished",label:"Published",type:"checkbox",default:true}],
  partner:[{name:"name",label:"Name",required:true},{name:"description",label:"Description",type:"textarea",optional:true},{name:"logoUrl",label:"Logo",type:"image",optional:true},{name:"websiteUrl",label:"Website URL",optional:true},{name:"sortOrder",label:"Sort order",type:"number",default:0},{name:"isActive",label:"Active",type:"checkbox",default:true}],
};

export function ProgramsAdmin(){return <ResourceManager title="Programs" description="Manage DDA's program areas." load={getProgramsAdmin} create={createPrograms} update={updatePrograms} remove={deletePrograms} fields={baseFields.program}/>}

export function ProjectsAdmin(){
  const [programs,setPrograms]=React.useState([]);
  React.useEffect(()=>{getProgramsAdmin().then(setPrograms).catch(()=>setPrograms([]));},[]);
  const fields=[{name:"programId",label:"Program",type:"select",numeric:true,options:programs.map(p=>({value:String(p.id),label:p.title})),required:true},{name:"title",label:"Title",required:true},{name:"slug",label:"Slug",required:true,placeholder:"Auto-generated from title if left empty"},{name:"shortDescription",label:"Short description",type:"textarea",required:true},{name:"description",label:"Description",type:"textarea",required:true},{name:"location",label:"Location",optional:true},{name:"beneficiaries",label:"Beneficiaries",type:"number",optional:true},{name:"status",label:"Status",type:"select",options:options(["PLANNED","ONGOING","COMPLETED"]),required:true},{name:"startDate",label:"Start date",type:"date",optional:true},{name:"endDate",label:"End date",type:"date",optional:true},{name:"imageUrl",label:"Image",type:"image",optional:true},{name:"isFeatured",label:"Feature on homepage",type:"checkbox",default:false}];
  return <ResourceManager title="Projects" description="Manage projects and featured initiatives." load={getProjects} create={createProjects} update={updateProjects} remove={deleteProjects} fields={fields} />;
}

export function ImpactAdmin(){return <ResourceManager title="Impact" description="Maintain verified impact statistics shown on the website." load={getImpactStatisticsAdmin} create={createImpactStatistics} update={updateImpactStatistics} remove={deleteImpactStatistics} fields={baseFields.impact}/>}

export function NewsAdmin(){
  const [users,setUsers]=React.useState([]);
  React.useEffect(()=>{getAuthors().then(setUsers).catch(()=>setUsers([]));},[]);
  const fields=[{name:"title",label:"Title",required:true},{name:"slug",label:"Slug",required:true,placeholder:"Auto-generated from title if left empty"},{name:"excerpt",label:"Excerpt",type:"textarea",required:true},{name:"content",label:"Content",type:"textarea",required:true},{name:"imageUrl",label:"Image",type:"image",optional:true},{name:"status",label:"Status",type:"select",options:[{value:"DRAFT",label:"Draft"},{value:"PUBLISHED",label:"Published"}],required:true},{name:"publishedAt",label:"Published date",type:"datetime-local",optional:true},{name:"authorId",label:"Author",type:"select",numeric:true,options:users.map(u=>({value:String(u.id),label:u.name})),required:true}];
  return <ResourceManager title="News" description="Create and publish DDA news stories." load={getNewsAdmin} create={createNews} update={updateNews} remove={deleteNews} fields={fields}/>;
}
export function EventsAdmin(){return <ResourceManager title="Events" description="Manage upcoming and past DDA events." load={getEventsAdmin} create={createEvents} update={updateEvents} remove={deleteEvents} fields={baseFields.event}/>}
export function GalleryAdmin(){return <ResourceManager title="Gallery" description="Publish community photos and captions." load={getGalleryAdmin} create={createGallery} update={updateGallery} remove={deleteGallery} fields={baseFields.gallery}/>}
export function PartnersAdmin(){return <ResourceManager title="Partners" description="Manage DDA partners and supporters." load={getPartnersAdmin} create={createPartners} update={updatePartners} remove={deletePartners} fields={baseFields.partner}/>}
export function VolunteersAdmin(){return <ResourceManager title="Volunteers" description="Review volunteer applications submitted through the website." load={getVolunteers} create={async()=>{}} update={updateVolunteers} remove={deleteVolunteers} allowCreate={false} transform={d=>({status:d.status})} fields={[{name:"status",label:"Status",type:"select",options:options(["NEW","REVIEWED","CONTACTED","ACCEPTED","REJECTED"]),required:true}]}/>}
export function MessagesAdmin(){return <ResourceManager title="Messages" description="Review messages submitted through the contact form." load={getContactMessages} create={async()=>{}} update={updateContactMessages} remove={deleteContactMessages} allowCreate={false} transform={d=>({status:d.status})} fields={[{name:"status",label:"Status",type:"select",options:options(["NEW","READ","REPLIED"]),required:true}]}/>}
export function TeamAdmin(){return <ResourceManager title="Team" description="Introduce DDA's board and staff members." load={getTeamAdmin} create={createTeam} update={updateTeam} remove={deleteTeam} fields={[
{name:"name",label:"Full name",required:true},{name:"role",label:"Role / title",required:true},{name:"bio",label:"Short bio",type:"textarea",optional:true},{name:"photoUrl",label:"Photo",type:"image",optional:true},{name:"sortOrder",label:"Sort order",type:"number",default:0},{name:"isActive",label:"Published",type:"checkbox",default:true}
]}/>}
export function DonationsAdmin(){return <ResourceManager title="Donations" description="Track online donations and record confirmed bank transfers." load={getDonations} create={createDonationRecord} update={updateDonations} remove={deleteDonations} fields={[
{name:"donorName",label:"Donor name",required:true},{name:"email",label:"Email",type:"email",optional:true},{name:"phone",label:"Phone",optional:true},{name:"amount",label:"Amount (ETB)",type:"number",required:true},{name:"method",label:"Method",type:"select",options:options(["BANK_TRANSFER","CHAPA","OTHER"]),required:true},{name:"status",label:"Status",type:"select",options:options(["PENDING","SUCCESS","FAILED"]),required:true},{name:"txRef",label:"Transaction reference",optional:true},{name:"message",label:"Note / dedication",type:"textarea",optional:true}
]}/>}
