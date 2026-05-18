import { Link } from 'react-router-dom'
import { Archive, BarChart3, Brain, CheckCircle2, Map, ShieldCheck, Users } from 'lucide-react'

const capabilities = [
  { icon: Map, title: 'Monastery GIS Discovery', text: 'Interactive map for public exploration, route context, and future official GIS layers.' },
  { icon: Archive, title: 'Digital Heritage Archive', text: 'Structured archive cards for manuscripts, art, ritual objects, photography, and conservation planning.' },
  { icon: Brain, title: 'Heritage Assistant', text: 'Local knowledge assistant for visitor questions, festival context, and demo narration.' },
  { icon: Users, title: 'Tourism Enablement', text: 'Visitor-ready profiles with hours, access notes, seasonal guidance, and guided tour flows.' },
]

const roadmap = [
  'Official monastery dataset validation with department and monastery representatives.',
  'CMS dashboard for updating festivals, closures, archive metadata, and visitor advisories.',
  'Multilingual rollout covering English, Nepali, Bhutia, Lepcha, and Hindi content where approved.',
  'Analytics dashboard for visitor interest, route planning, archive engagement, and campaign reporting.',
  'Secure media storage, rights metadata, and content approval workflows for sensitive heritage assets.',
]

export default function GovernmentDemo() {
  return (
    <>
      <section className="demo-hero">
        <div className="container demo-hero-inner">
          <div>
            <span className="hero-badge"><span className="hero-badge-dot" /> Government Demo Pack</span>
            <h1>Monastery360 for Sikkim Heritage Tourism</h1>
            <p>
              A deployable digital heritage prototype for discovery, interpretation, archive access, and responsible tourism planning.
            </p>
            <div className="hero-buttons">
              <Link to="/tour" className="btn-primary">Start Guided Tour</Link>
              <Link to="/map" className="btn-outline-white">Open Heritage Map</Link>
              <Link to="/enquiry" className="btn-outline-white">Request Partnership Demo</Link>
            </div>
          </div>
          <div className="demo-scorecard">
            <div><strong>4</strong><span>featured monastery profiles</span></div>
            <div><strong>6</strong><span>festival records</span></div>
            <div><strong>6</strong><span>archive categories</span></div>
            <div><strong>0</strong><span>paid API keys required</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>What Can Be Demonstrated</h2>
            <p>These are working product surfaces, not placeholder promises.</p>
          </div>
          <div className="grid-4">
            {capabilities.map((item) => (
              <article className="feature-card" key={item.title}>
                <div className="feature-icon primary"><item.icon /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container demo-readiness">
          <article>
            <BarChart3 />
            <h2>Procurement-Ready Positioning</h2>
            <p>
              Present this as a phase-one prototype: static deployment today, official data integration next, then CMS,
              analytics, multilingual content, and secure archive operations.
            </p>
          </article>
          <article>
            <ShieldCheck />
            <h2>Production Roadmap</h2>
            <div className="info-check-list">
              {roadmap.map((item) => (
                <p key={item}><CheckCircle2 /> {item}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
