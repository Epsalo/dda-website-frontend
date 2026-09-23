import React from "react";
import { getImpactStatistics } from "../api/impact.api";
export default function ImpactStats() {
  const [items,setItems]=React.useState([]);
  React.useEffect(()=>{getImpactStatistics().then(setItems).catch(()=>setItems([]))},[]);
  return <section id="impact" className="impact-section"><div className="container"><div className="section-kicker">OUR IMPACT</div>
    <div className="impact-grid">{items.length ? items.map(i=><div className="impact-item" key={i.id}><strong>{i.value}</strong><span>{i.label}</span></div>) :
      <div className="api-empty">Impact information will appear here as DDA publishes verified figures.</div>}</div>
  </div></section>
}
