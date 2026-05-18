import { useMemo, useState } from 'react'
import { Archive, MapPin, Search } from 'lucide-react'
import { archives } from '../data/monasteryData.js'

const categories = ['All', ...new Set(archives.map((item) => item.category))]

export default function Archives() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return archives.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const matchesQuery =
        !normalized ||
        [item.title, item.description, item.period, item.location, item.significance]
          .join(' ')
          .toLowerCase()
          .includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Digital Archives</h1>
          <p>Searchable records for art, manuscripts, ritual objects, photographs, and preservation planning.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="search-wrapper">
            <Search />
            <input
              className="archive-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search archives by title, period, category, or location"
            />
          </div>

          <div className="archive-tabs">
            {categories.map((item) => (
              <button
                key={item}
                className={`archive-tab ${category === item ? 'active' : ''}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map((item) => (
              <article key={item.id} className="card">
                <img src={item.image} alt={item.title} className="card-image" />
                <div className="card-body">
                  <span className="badge badge-primary">{item.category}</span>
                  <h2 className="card-title">{item.title}</h2>
                  <p className="card-text">{item.description}</p>
                  <div className="card-meta"><Archive /> {item.period}</div>
                  <div className="card-meta"><MapPin /> {item.location}</div>
                  <p className="archive-significance">{item.significance}</p>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <Archive />
              <h3>No archive records found</h3>
              <p>Clear the search or choose another category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
