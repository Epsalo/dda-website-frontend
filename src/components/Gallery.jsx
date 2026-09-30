import React from "react";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import { getGallery } from "../api/gallery.api";
import { getImageUrl } from "../api/client";
export default function Gallery(){
 const [items,setItems]=React.useState([]);
 React.useEffect(()=>{getGallery().then(setItems).catch(()=>setItems([]))},[]);
 return <section id="gallery" className="section light-section"><div className="container"><SectionHeader kicker="STORIES FROM OUR COMMUNITY" title="See the people behind the work" text="Real community stories will become the visual heart of the new DDA website."/>
 <div className="gallery-grid">{items.slice(0,6).map(i=><img key={i.id} src={getImageUrl(i.imageUrl)} alt={i.title || i.caption || "DDA community story"}/>)}</div>
 {!items.length && <div className="api-empty">Community photos will appear here when the gallery is published.</div>}
 <div className="center-action"><Button href="/gallery" variant="outline-blue" arrow>View Full Gallery</Button></div></div></section>
}
