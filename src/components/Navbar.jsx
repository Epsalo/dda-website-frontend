import React from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from './Button'

const navItems = [
  ['About', '/about'], ['Programs', '/programs'], ['Projects', '/projects'],
  ['Impact', '/impact'], ['News', '/news'], ['Events', '/events'], ['Gallery', '/gallery'], ['Contact', '/contact']
]

export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const close = () => setOpen(false)
  return <header className="site-header">
    <div className="container nav-wrap">
      <Link to="/" className="brand" onClick={close}><img src="/images/dda-logo.png" alt="Dembel Development Alliance logo" /><span>Dembel Development Alliance</span></Link>
      <nav className={`nav-links${open ? ' open' : ''}`}>
        {navItems.map(([label, href]) => <Link key={href} to={href} onClick={close}>{label}</Link>)}
        <div className="mobile-actions"><Link className="btn btn-outline" to="/get-involved" onClick={close}>Volunteer</Link><Link className="btn btn-primary" to="/donate" onClick={close}>Donate</Link></div>
      </nav>
      <div className="nav-actions"><Link className="btn btn-outline" to="/get-involved">Volunteer</Link><Link className="btn btn-primary" to="/donate">Donate</Link></div>
      <button className="menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={25}/> : <Menu size={25}/>}</button>
    </div>
  </header>
}
