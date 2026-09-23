import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import { getData } from "../api/client";
export default function Projects(){
 const [items,setItems]=React.useState([]);
 React.useEffect(()=>{getData("/projects/featured").then(setItems).catch(()=>setItems([]))},[]);
 return <section id="projects" className="section light-section"><div className="container"><SectionHeader kicker="OUR WORK IN ACTION" title="Featured projects" text="Discover the initiatives through which DDA works alongside communities."/>
 <div className="project-grid">{items.map(p=><article className="project-card" key={p.id}><div className="project-image">{p.imageUrl?<img src={p.imageUrl} alt={p.title}/>:<div className="image-placeholder">DDA Project</div>}<span>{p.program?.title || p.status}</span></div><div className="project-body"><div className="location"><MapPin size={15}/>{p.location || "Meki, Ethiopia"}</div><h3>{p.title}</h3><p>{p.shortDescription}</p><Link to={`/projects/${p.slug}`}>View Project <ArrowRight size={16}/></Link></div></article>)}</div>
 {!items.length && <div className="api-empty">Featured projects will appear here as DDA publishes them.</div>}
 <div className="center-action"><Button href="/projects" variant="outline-blue" arrow>View All Projects</Button></div></div></section>
}
