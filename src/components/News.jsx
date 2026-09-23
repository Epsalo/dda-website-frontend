import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { getNews } from "../api/news.api";
export default function News(){
 const [items,setItems]=React.useState([]);
 React.useEffect(()=>{getNews().then(setItems).catch(()=>setItems([]))},[]);
 return <section id="news-events" className="section"><div className="container"><SectionHeader kicker="LATEST FROM DDA" title="Stories, updates and events" text="Follow the people, activities and partnerships shaping DDA's work."/>
 <div className="news-grid">{items.slice(0,3).map(item=><article className="news-card" key={item.id}>{item.imageUrl?<img src={item.imageUrl} alt={item.title}/>:<div className="image-placeholder">DDA News</div>}<div className="news-body"><div className="news-meta"><span>News</span><small>{item.publishedAt?new Date(item.publishedAt).toLocaleDateString():"Published"}</small></div><h3>{item.title}</h3><Link to={`/news/${item.slug}`}>Read More <ArrowRight size={16}/></Link></div></article>)}</div>
 {!items.length && <div className="api-empty">Latest news will appear here when DDA publishes updates.</div>}
 </div></section>
}
