import { HandHeart, HeartPulse, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteContent } from '../context/SiteContentContext'
import { getImageUrl } from '../api/client'
const items=[
  ['Volunteer','Share your time, knowledge and skills.', 'Become a Volunteer', HandHeart, '/get-involved'],
  ['Partner','Work with DDA to create meaningful community impact.','Partner With Us',Users,'/contact'],
  ['Support DDA','Help support initiatives that improve community life.','Donate Now',HeartPulse,'/donate'],
]
export default function GetInvolved(){
  const { content } = useSiteContent()
  const bg = getImageUrl(content?.getInvolvedBgUrl)
  return <section id="get-involved" className="involve-section"><div className="involve-bg" style={bg ? { backgroundImage: `url("${bg}")` } : undefined}/><div className="involve-overlay"/><div className="container involve-content"><div className="section-kicker light-kicker">GET INVOLVED</div><h2>Be part of the change.</h2><p>Whether you volunteer your time, support a project, partner with DDA, or help spread our message, your contribution can help build stronger communities.</p><div className="involve-grid">{items.map(([title,text,action,Icon,to])=><div className="involve-card" key={title}><div className="involve-icon"><Icon size={23}/></div><h3>{title}</h3><p>{text}</p><Link to={to}>{action} <ArrowRight size={15}/></Link></div>)}</div></div></section>}

