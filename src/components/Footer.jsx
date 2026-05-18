import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="navbar-brand" style={{ marginBottom: 8 }}>
              <div className="navbar-logo">M</div>
              <span className="navbar-title" style={{ color: 'white' }}>Monastery360</span>
            </Link>
            <p>
              AI-powered digital heritage platform preserving Sikkim's sacred monastery
              ecosystem through immersive technology and intelligent discovery.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/tour">Virtual Tours</Link></li>
              <li><Link to="/planner">Visit Planner</Link></li>
              <li><Link to="/map">Interactive Map</Link></li>
              <li><Link to="/archives">Digital Archives</Link></li>
              <li><Link to="/festivals">Cultural Calendar</Link></li>
            </ul>
          </div>

          <div>
            <h4>Resources</h4>
            <ul>
              <li><Link to="/resources/travel-guide">Travel Guide</Link></li>
              <li><Link to="/resources/cultural-insights">Cultural Insights</Link></li>
              <li><Link to="/resources/photography-tips">Photography Tips</Link></li>
              <li><Link to="/resources/meditation-guide">Meditation Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4>Connect</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/demo">Government Demo</Link></li>
              <li><Link to="/enquiry">Partnership Enquiry</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Monastery360. Preserving sacred heritage through AI-powered digital innovation.</p>
        </div>
      </div>
    </footer>
  )
}
