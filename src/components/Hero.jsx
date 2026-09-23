import Button from './Button'
import { useSiteContent } from '../context/SiteContentContext'
export default function Hero() {
  const { content } = useSiteContent()
  const bg = content?.homeHeroImageUrl
  return <section id="home" className="hero"><div className="hero-image" style={bg ? { backgroundImage: `url("${bg}")` } : undefined}/><div className="hero-overlay"/><div className="container hero-content">
    <span className="eyebrow">COMMUNITY • IMPACT • HOPE • ACTION</span>
    <h1>Building Stronger<br/><span>Communities in Meki</span></h1>
    <p>Empowering communities through education, healthcare, clean water, opportunity and sustainable development.</p>
    <div className="hero-actions"><Button href="#programs" large arrow>Explore Our Programs</Button><Button href="/donate" variant="light-outline" large>Support DDA</Button></div>
  </div></section>
}
