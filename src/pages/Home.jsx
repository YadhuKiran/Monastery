import { Link } from 'react-router-dom'
import { Play, MapPin, Camera, BookOpen, Calendar, Star, Users, ArrowRight, Sparkles, Route } from 'lucide-react'
import { monasteries, festivals } from '../data/monasteryData.js'

const features = [
  { icon: Camera, title: 'Virtual Tours', desc: 'Immersive monastery experiences with panoramic views and audio guides', color: 'primary' },
  { icon: MapPin, title: 'Interactive Map', desc: 'Real geographic mapping of all monastery locations with Leaflet', color: 'accent' },
  { icon: Route, title: 'Visit Planner', desc: 'Generate practical one, two, and three-day monastery circuits for visitors', color: 'primary' },
  { icon: BookOpen, title: 'Digital Archives', desc: 'Searchable collection of manuscripts, murals, and sacred artifacts', color: 'primary' },
  { icon: Calendar, title: 'Festival Calendar', desc: 'Complete guide to Buddhist festivals with dates and significance', color: 'accent' },
]

export default function Home() {
  const upcomingFestivals = festivals
    .filter(f => new Date(f.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              AI-Powered Digital Heritage Platform
            </div>
            <h1>
              Discover Sikkim's<br />Sacred <span>Monasteries</span>
            </h1>
            <p className="hero-desc">
              Explore centuries of Buddhist heritage through interactive maps, digital archives,
              and an AI-powered guide, preserving the spiritual legacy of the Himalayas.
            </p>
            <div className="hero-buttons">
              <Link to="/tour" className="btn-primary">
                <Play size={18} /> Start Virtual Tour
              </Link>
              <Link to="/map" className="btn-outline-white">
                <MapPin size={18} /> Explore Map
              </Link>
              <Link to="/planner" className="btn-outline-white">
                <Route size={18} /> Plan Visit
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">200+</div>
                <div className="hero-stat-label">Monasteries</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">4</div>
                <div className="hero-stat-label">Regions</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">500+</div>
                <div className="hero-stat-label">Years of Heritage</div>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src="/rumtek-monastery-golden-roof-traditional-architect.jpg" alt="Rumtek Monastery" />
            <div className="hero-floating-card top-left">
              <Camera size={16} style={{ color: 'var(--primary)' }} /> 360 Views
            </div>
            <div className="hero-floating-card bottom-right">
              <Sparkles size={16} style={{ color: 'var(--accent)' }} /> AI Guide
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Explore Sacred Heritage</h2>
            <p>Discover Sikkim's spiritual and cultural legacy through our comprehensive digital platform</p>
          </div>
          <div className="grid-4">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className={`feature-icon ${f.color}`}>
                  <f.icon size={24} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED MONASTERIES */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Featured Monasteries</h2>
            <p>Explore the most significant spiritual centers of Sikkim</p>
          </div>
          <div className="grid-3">
            {monasteries.slice(0, 3).map(m => (
              <div key={m.id} className="card">
                <img src={m.image} alt={m.name} className="card-image" />
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div className="card-title">{m.name}</div>
                    <div className="rating">
                      <Star size={14} />
                      <span>{m.rating}</span>
                    </div>
                  </div>
                  <div className="card-meta">
                    <MapPin size={14} /> {m.location}
                  </div>
                  <p className="card-text" style={{ marginTop: 8 }}>{m.description.slice(0, 100)}...</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                    <div className="card-meta"><Users size={14} /> {m.visitors.toLocaleString()} visitors</div>
                    <Link to={`/tour?site=${m.slug}`} className="btn btn-sm btn-ghost">
                      Start Tour <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING FESTIVALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Upcoming Festivals</h2>
            <p>Sacred celebrations and cultural events at Sikkim's monasteries</p>
          </div>
          <div className="grid-3">
            {upcomingFestivals.map(f => (
              <div key={f.id} className="card">
                <img src={f.image} alt={f.name} className="card-image" />
                <div className="card-body">
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <span className="badge badge-accent">{f.type}</span>
                    <span className="badge badge-primary">{f.duration}</span>
                  </div>
                  <div className="card-title">{f.name}</div>
                  <p className="card-text">{f.description.slice(0, 90)}...</p>
                  <div className="card-meta" style={{ marginTop: 10 }}>
                    <Calendar size={14} /> {new Date(f.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="card-meta">
                    <MapPin size={14} /> {f.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/festivals" className="btn btn-outline">
              View All Festivals <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'white', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Begin Your Spiritual Journey</h2>
          <p style={{ fontSize: 16, opacity: 0.8, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Join thousands exploring Sikkim's sacred heritage through our AI-powered digital platform
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/tour" className="btn-primary">
              <Play size={18} /> Start Free Tour
            </Link>
            <Link to="/map" className="btn-outline-white">
              <MapPin size={18} /> Explore Map
            </Link>
            <Link to="/planner" className="btn-outline-white">
              <Route size={18} /> Plan Visit
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
