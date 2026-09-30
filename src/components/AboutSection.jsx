import { ArrowRight } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { getImageUrl } from '../api/client'
const DEFAULT_ABOUT_IMAGE = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85"
export default function AboutSection(){
  const { content } = useSiteContent()
  const resolvedImg = getImageUrl(content?.aboutImageUrl) || DEFAULT_ABOUT_IMAGE
  return <section id="about" className="section light-section"><div className="container split-section"><div className="image-frame"><img src={resolvedImg} alt="Children learning in a community setting"/><div className="image-badge"><span>MEKI</span><small>Our community roots</small></div></div><div className="section-copy"><div className="section-kicker">WHO WE ARE</div><h2>Local roots. Community action. <span>Sustainable impact.</span></h2><p>Dembel Development Alliance (DDA) is a community-focused organization established by volunteer professionals from Meki and surrounding areas who are committed to improving community life.</p><p>We work alongside communities and partners to create opportunities, strengthen wellbeing and support sustainable development.</p><a href="#contact" className="text-link">Learn About DDA <ArrowRight size={17}/></a></div></div></section>}

