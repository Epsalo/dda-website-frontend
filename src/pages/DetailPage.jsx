import React from "react";
import { Link, useParams } from "react-router-dom";
import { getData, getImageUrl } from "../api/client";
export default function DetailPage({type}){
 const {slug}=useParams(); const [item,setItem]=React.useState(null); const [error,setError]=React.useState("");
 React.useEffect(()=>{getData(`/${type}/${slug}`).then(setItem).catch(e=>setError(e.message))},[type,slug]);
 if(error)return <main className="page-state"><div className="container"><h1>Not found</h1><p>{error}</p><Link to={`/${type}`}>← Back</Link></div></main>;
 if(!item)return <main className="page-state"><div className="container"><p>Loading...</p></div></main>;
 return <main className="detail-page"><div className="container"><Link className="back-link" to={`/${type}`}>← Back to {type}</Link>{item.imageUrl&&<img className="detail-image" src={getImageUrl(item.imageUrl)} alt={item.title}/>}<span className="eyebrow">{type === "events" ? "EVENT" : "DDA"}</span><h1>{item.title}</h1>{type === "events" && item.eventDate && <p className="detail-meta">{new Date(item.eventDate).toLocaleString()}{item.location ? ` · ${item.location}` : ""}</p>}<p className="detail-lead">{item.shortDescription||item.excerpt||item.description}</p>{type !== "events" && <div className="detail-content">{item.content||item.description}</div>}</div></main>
}
