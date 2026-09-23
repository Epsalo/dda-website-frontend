import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Icon from "./Icon";
import SectionHeader from "./SectionHeader";
import { getPrograms } from "../api/programs.api";
export default function Programs(){
 const [items,setItems]=React.useState([]);
 React.useEffect(()=>{getPrograms().then(setItems).catch(()=>setItems([]))},[]);
 return <section id="programs" className="section"><div className="container"><SectionHeader kicker="WHAT WE DO" title="Programs that respond to community needs" text="Working with communities to create opportunities, improve wellbeing and build a more sustainable future."/>
 <div className="program-grid">{items.map(p=><article className="program-card" key={p.id}><div className="icon-box"><Icon name={p.icon || "Building2"} size={26} strokeWidth={2.1}/></div><h3>{p.title}</h3><p>{p.shortDescription}</p><Link to={`/programs/${p.slug}`}>Learn More <ArrowRight size={16}/></Link></article>)}</div>
 {!items.length && <div className="api-empty">Programs will appear here when they are published by DDA.</div>}
 </div></section>
}
