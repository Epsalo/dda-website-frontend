import { ArrowRight, HeartHandshake, Leaf, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { useSiteContent } from '../context/SiteContentContext'

const DEFAULT_ABOUT_PAGE_IMAGE = "https://images.unsplash.com/photo-1509099836639-18ba02c7f2b4?auto=format&fit=crop&w=1200&q=85"

const values = [
  { icon: Users, title: 'Community Focus', text: 'We listen to communities and design initiatives around local needs, strengths, and priorities.' },
  { icon: HeartHandshake, title: 'Collaboration', text: 'We bring volunteers, partners, institutions, and community members together for practical impact.' },
  { icon: ShieldCheck, title: 'Integrity & Accountability', text: 'We aim to work transparently, responsibly, and with respect for the people and resources entrusted to us.' },
  { icon: Leaf, title: 'Sustainability', text: 'We prioritize solutions that communities can strengthen, maintain, and carry forward over time.' },
]

export default function About() {
  const { content } = useSiteContent()
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">ABOUT DDA</span>
          <h1>Working together for stronger communities.</h1>
          <p>Learn about Dembel Development Alliance, our purpose, values, and commitment to community-led development.</p>
        </div>
      </section>

      <section className="section">
        <div className="container split-section">
          <div>
            <SectionHeader eyebrow="WHO WE ARE" title="A community-rooted alliance from Meki" align="left" />
            <p className="lead">Dembel Development Alliance is a non-governmental, non-profit and non-political organization established by volunteer professionals from Meki and surrounding communities.</p>
            <p>We bring together people who care about practical, sustainable development. Our work focuses on creating opportunities and improving community wellbeing through education, healthcare, clean water, women and youth empowerment, environmental protection, and community development.</p>
            <Link className="btn btn-primary" to="/programs">Explore our programs <ArrowRight size={17} /></Link>
          </div>
          <div className="about-photo about-photo-large">
            <img src={content?.aboutPageImageUrl || DEFAULT_ABOUT_PAGE_IMAGE} alt="Children learning together in a community setting" />
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeader eyebrow="OUR VALUES" title="How we work" text="Our approach is grounded in respect, collaboration, transparency, and long-term community benefit." />
          <div className="values-grid">
            {values.map(({ icon: Icon, title, text }) => (
              <article className="value-card" key={title}>
                <div className="icon-box"><Icon size={23} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container vision-panel">
          <div>
            <span className="eyebrow">OUR VISION</span>
            <h2>Leading community development through collective action.</h2>
            <p>Dembel Development Alliance aspires to become one of the leading national community development organizations in Ethiopia by 2035 G.C.</p>
          </div>
          <div>
            <span className="eyebrow">OUR MISSION</span>
            <p>We work to improve community life through education, healthcare, clean water, safe environments, women and youth opportunities, and community-led sustainable development.</p>
            <Link className="text-link" to="/get-involved">Get involved <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeader eyebrow="OUR PEOPLE" title="Meet the people behind DDA" text="Local professionals and community members volunteering their time, knowledge and skills for lasting change." />
          <Link className="btn btn-primary" to="/team">Meet our team <ArrowRight size={17} /></Link>
        </div>
      </section>
    </main>
  )
}
