import { MapPin, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Footer(){
  return <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <img src="/images/dda-logo.png" alt="DDA"/>
        <h3>Dembel Development Alliance</h3>
        <p>Empowering communities through education, health, clean water, opportunity and sustainable development.</p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <Link to="/about">About</Link>
        <Link to="/team">Team</Link>
        <Link to="/programs">Programs</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/impact">Impact</Link>
        <Link to="/news">News</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
      <div>
        <h4>Get Involved</h4>
        <Link to="/get-involved">Volunteer</Link>
        <Link to="/donate">Donate</Link>
        <Link to="/get-involved">Partner With Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div>
        <h4>Contact</h4>
        <p className="contact-line"><MapPin size={17}/> Meki, East Shoa, Oromia, Ethiopia</p>
        <p className="contact-line"><Phone size={17}/> <a href="tel:+251911073981">+251 91 107 3981</a></p>
        <p className="contact-line"><Mail size={17}/> <a href="mailto:info@dembeldevelopment.org">info@dembeldevelopment.org</a></p>
        <div className="socials"><span>f</span><span>in</span><span>𝕏</span><span>▶</span></div>
      </div>
    </div>
    <div className="container footer-bottom">
      <span>© {new Date().getFullYear()} Dembel Development Alliance. All rights reserved.</span>
      <span>Privacy Policy · Terms of Use</span>
    </div>
  </footer>
}
