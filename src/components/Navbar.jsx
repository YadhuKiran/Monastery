import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Camera, MapPin, BookOpen, Calendar, Compass, Route } from 'lucide-react'

const links = [
  { to: '/', label: 'Home', icon: Compass },
  { to: '/monasteries', label: 'Monasteries', icon: Camera },
  { to: '/tour', label: 'Virtual Tour', icon: Camera },
  { to: '/planner', label: 'Planner', icon: Route },
  { to: '/map', label: 'Map', icon: MapPin },
  { to: '/festivals', label: 'Festivals', icon: Calendar },
  { to: '/archives', label: 'Archives', icon: BookOpen },
  { to: '/demo', label: 'Demo Pack', icon: Compass },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">M</div>
          <span className="navbar-title">Monastery360</span>
        </Link>

        <div className="navbar-links">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/enquiry" className="navbar-cta">Enquire</Link>

        <button className="navbar-mobile-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
