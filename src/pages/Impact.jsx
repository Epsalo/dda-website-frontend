import React from "react";
import SectionHeader from "../components/SectionHeader";
import { getImpactStatistics } from "../api/impact.api";
import Icon from "../components/Icon";

export default function Impact() {
  const [items,setItems] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  React.useEffect(()=>{getImpactStatistics().then(setItems).catch(()=>{}).finally(()=>setLoading(false));},[]);
  return <main className="public-page"><div className="container">
    <SectionHeader kicker="OUR IMPACT" title="Turning community action into measurable progress" text="Explore the impact indicators DDA uses to communicate its work with communities and partners." />
    {loading ? <div className="api-empty">Loading impact statistics...</div> : <div className="impact-detail-grid">{items.map(item=><article className="impact-detail-card" key={item.id}><div className="icon-box"><Icon name={item.icon || "activity"}/></div><strong>{item.value}</strong><h3>{item.label}</h3></article>)}</div>}
    <section className="impact-story"><span className="eyebrow">MEASUREMENT MATTERS</span><h2>Impact is more than a number.</h2><p>DDA's work is rooted in practical community needs. As projects grow, this page will bring together verified outcomes, beneficiaries and stories so supporters can understand where resources are making a difference.</p></section>
  </div></main>;
}
