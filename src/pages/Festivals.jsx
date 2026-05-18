import { useMemo, useState } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { festivals, formatDate, getMonasteryById } from '../data/monasteryData.js'

export default function Festivals() {
  const sortedFestivals = useMemo(
    () => [...festivals].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [],
  )
  const [selectedId, setSelectedId] = useState(sortedFestivals[0]?.id)
  const selected = sortedFestivals.find((festival) => festival.id === selectedId)
  const host = selected?.monasteryId ? getMonasteryById(selected.monasteryId) : null

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Festival Calendar</h1>
          <p>Plan cultural programming, visitor journeys, and interpretive content around Sikkim’s sacred calendar.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {sortedFestivals.map((festival) => (
              <button
                key={festival.id}
                className={`card festival-card ${festival.id === selectedId ? 'selected' : ''}`}
                onClick={() => setSelectedId(festival.id)}
              >
                <img src={festival.image} alt={festival.name} className="card-image" />
                <div className="card-body">
                  <div className="badge badge-accent">{festival.type}</div>
                  <h2 className="card-title">{festival.name}</h2>
                  <p className="card-text">{festival.description}</p>
                  <div className="card-meta"><Calendar /> {formatDate(festival.date)}</div>
                  <div className="card-meta"><MapPin /> {festival.location}</div>
                </div>
              </button>
            ))}
          </div>

          {selected && (
            <article className="festival-detail">
              <div className="festival-detail-grid">
                <img src={selected.image} alt={selected.name} />
                <div>
                  <span className="badge badge-primary">{selected.duration}</span>
                  <h2>{selected.name}</h2>
                  <p>{selected.description}</p>
                  <div className="detail-list">
                    <span><Calendar /> {formatDate(selected.date)}</span>
                    <span><Clock /> {selected.duration}</span>
                    <span><MapPin /> {selected.location}</span>
                  </div>
                  <p className="detail-note">
                    <strong>Why it matters:</strong> {selected.significance}
                    {host ? ` Host monastery: ${host.name}, ${host.location}.` : ' Hosted across multiple monastery communities.'}
                  </p>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>
    </>
  )
}
