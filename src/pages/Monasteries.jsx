import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, Clock, MapPin, Search, Star, Users } from 'lucide-react'
import { monasteries } from '../data/monasteryData.js'

const regions = ['All', ...new Set(monasteries.map((monastery) => monastery.region))]

export default function Monasteries() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return monasteries.filter((monastery) => {
      const matchesRegion = region === 'All' || monastery.region === region
      const matchesQuery =
        !normalized ||
        [monastery.name, monastery.location, monastery.sect, monastery.description, ...monastery.features]
          .join(' ')
          .toLowerCase()
          .includes(normalized)
      return matchesRegion && matchesQuery
    })
  }, [query, region])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Monastery Explorer</h1>
          <p>Curated destination profiles for digital heritage tours, cultural interpretation, and visitor planning.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="toolbar">
            <div className="search-wrapper toolbar-search">
              <Search />
              <input
                className="archive-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by monastery, region, feature, or lineage"
              />
            </div>
            <div className="segmented-control" aria-label="Filter by region">
              {regions.map((item) => (
                <button
                  key={item}
                  className={region === item ? 'active' : ''}
                  onClick={() => setRegion(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-2">
            {filtered.map((monastery) => (
              <article key={monastery.id} className="monastery-card">
                <img src={monastery.image} alt={monastery.name} />
                <div className="monastery-card-body">
                  <div className="card-topline">
                    <span className="badge badge-primary">{monastery.sect}</span>
                    <span className="rating">
                      <Star size={14} />
                      {monastery.rating}
                    </span>
                  </div>
                  <h2>{monastery.name}</h2>
                  <p>{monastery.description}</p>
                  <div className="info-grid">
                    <span><MapPin /> {monastery.location}</span>
                    <span><Clock /> {monastery.hours}</span>
                    <span><Camera /> {monastery.tourLength}</span>
                    <span><Users /> {monastery.visitors.toLocaleString('en-IN')} monthly visitors</span>
                  </div>
                  <div className="feature-list">
                    {monastery.features.map((feature) => (
                      <span key={feature}>{feature}</span>
                    ))}
                  </div>
                  <Link to={`/tour?site=${monastery.slug}`} className="btn btn-filled tour-card-button">
                    <Camera size={16} /> Launch Virtual Tour
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <Search />
              <h3>No monasteries found</h3>
              <p>Try a different region or search term.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
