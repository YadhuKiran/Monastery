import { useMemo, useState } from 'react'
import { CalendarDays, CheckCircle2, Clock, MapPin, Route, ShieldAlert } from 'lucide-react'
import { monasteries } from '../data/monasteryData.js'

const interests = [
  { id: 'first-time', label: 'First-time visitors' },
  { id: 'photography', label: 'Photography' },
  { id: 'pilgrimage', label: 'Pilgrimage' },
  { id: 'archives', label: 'Archives' },
]

const dayPlans = {
  1: ['rumtek', 'enchey'],
  2: ['rumtek', 'enchey', 'pemayangtse', 'tashiding'],
  3: ['rumtek', 'enchey', 'pemayangtse', 'tashiding'],
}

function getSite(slug) {
  return monasteries.find((monastery) => monastery.slug === slug)
}

export default function Planner() {
  const [days, setDays] = useState(2)
  const [interest, setInterest] = useState('first-time')

  const selectedSites = useMemo(() => dayPlans[days].map(getSite).filter(Boolean), [days])
  const groupedSites = useMemo(() => {
    if (days === 1) return [['Gangtok circuit', selectedSites]]
    if (days === 2) {
      return [
        ['Day 1: Gangtok circuit', selectedSites.slice(0, 2)],
        ['Day 2: West Sikkim circuit', selectedSites.slice(2)],
      ]
    }
    return [
      ['Day 1: Gangtok arrival circuit', selectedSites.slice(0, 2)],
      ['Day 2: Pelling and Pemayangtse', selectedSites.slice(2, 3)],
      ['Day 3: Tashiding pilgrimage route', selectedSites.slice(3)],
    ]
  }, [days, selectedSites])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Visit Planner</h1>
          <p>Turn the monastery database into a simple visitor itinerary with route priorities and field-ready notes.</p>
        </div>
      </section>

      <section className="section">
        <div className="container planner-layout">
          <aside className="planner-controls">
            <h2>Build Itinerary</h2>
            <label>
              Trip length
              <select value={days} onChange={(event) => setDays(Number(event.target.value))}>
                <option value={1}>1 day</option>
                <option value={2}>2 days</option>
                <option value={3}>3 days</option>
              </select>
            </label>

            <div>
              <span className="planner-label">Visitor focus</span>
              <div className="planner-interest-list">
                {interests.map((item) => (
                  <button
                    key={item.id}
                    className={interest === item.id ? 'active' : ''}
                    onClick={() => setInterest(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="planner-note">
              <ShieldAlert />
              <p>For official rollout, connect this planner to verified road status, weather, permits, guide availability, and festival advisories.</p>
            </div>
          </aside>

          <div className="planner-results">
            <div className="planner-summary">
              <div>
                <CalendarDays />
                <strong>{days} day plan</strong>
                <span>{interests.find((item) => item.id === interest)?.label}</span>
              </div>
              <div>
                <Route />
                <strong>{selectedSites.length} sites</strong>
                <span>Suggested route order</span>
              </div>
              <div>
                <Clock />
                <strong>Flexible</strong>
                <span>Add buffers for hill travel</span>
              </div>
            </div>

            {groupedSites.map(([title, sites]) => (
              <article key={title} className="planner-day">
                <h2>{title}</h2>
                <div className="planner-stop-list">
                  {sites.map((site, index) => (
                    <div key={site.slug} className="planner-stop">
                      <img src={site.image} alt={site.name} />
                      <div>
                        <span>Stop {index + 1}</span>
                        <h3>{site.name}</h3>
                        <p>{site.location}</p>
                        <small><MapPin /> {site.hours} · {site.tourLength}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}

            <article className="planner-checklist">
              <h2>Visitor Checklist</h2>
              {[
                'Confirm opening hours before departure.',
                'Carry cash for local transport, entry fees, and donations.',
                'Ask permission before photographing interiors, monks, or rituals.',
                'Keep weather and road-condition buffers in the schedule.',
              ].map((item) => (
                <p key={item}><CheckCircle2 /> {item}</p>
              ))}
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
