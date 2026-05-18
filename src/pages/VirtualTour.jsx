import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Headphones, Info, MapPin, Maximize2, Route } from 'lucide-react'
import { monasteries } from '../data/monasteryData.js'

const tourStops = [
  {
    id: 'courtyard',
    title: 'Courtyard Arrival',
    focus: 'Architecture, prayer flags, and public gathering space',
    narration:
      'Begin at the open courtyard, where visitors first experience the scale, colours, and ritual rhythm of the monastery.',
  },
  {
    id: 'assembly',
    title: 'Main Assembly Hall',
    focus: 'Murals, ceremonial seating, and ritual layout',
    narration:
      'The assembly hall is the spiritual centre of the complex. Interpretive content can explain iconography, etiquette, and living monastic practice.',
  },
  {
    id: 'archive',
    title: 'Archive and Sacred Objects',
    focus: 'Manuscripts, ritual objects, and preservation needs',
    narration:
      'This stop connects the physical visit with digital preservation, showing how fragile cultural records can be catalogued and shared safely.',
  },
]

export default function VirtualTour() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialSlug = searchParams.get('site') || monasteries[0].slug
  const [selectedSlug, setSelectedSlug] = useState(initialSlug)
  const [stopIndex, setStopIndex] = useState(0)

  const selected = useMemo(
    () => monasteries.find((monastery) => monastery.slug === selectedSlug) || monasteries[0],
    [selectedSlug],
  )
  const currentStop = tourStops[stopIndex]

  const changeSite = (slug) => {
    setSelectedSlug(slug)
    setStopIndex(0)
    setSearchParams({ site: slug })
  }

  const goToStop = (nextIndex) => {
    const normalized = (nextIndex + tourStops.length) % tourStops.length
    setStopIndex(normalized)
  }

  return (
    <>
      <section className="tour-shell">
        <aside className="tour-sidebar">
          <div className="sidebar-kicker">Guided Virtual Tour</div>
          <h1>{selected.name}</h1>
          <p>{selected.description}</p>

          <div className="tour-site-picker">
            {monasteries.map((monastery) => (
              <button
                key={monastery.slug}
                className={selected.slug === monastery.slug ? 'active' : ''}
                onClick={() => changeSite(monastery.slug)}
              >
                <img src={monastery.image} alt="" />
                <span>
                  <strong>{monastery.name}</strong>
                  <small>{monastery.location}</small>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="tour-stage" aria-label={`${selected.name} virtual tour`}>
          <div className="tour-panorama" style={{ backgroundImage: `url(${selected.image})` }}>
            <div className="tour-overlay" />
            <div className="tour-hotspot hotspot-one">
              <span />
              <strong>{currentStop.title}</strong>
            </div>
            <div className="tour-hotspot hotspot-two">
              <span />
              <strong>{selected.sect}</strong>
            </div>

            <div className="tour-stage-content">
              <div className="tour-badge">
                <Maximize2 size={16} />
                Panoramic heritage preview
              </div>
              <h2>{currentStop.title}</h2>
              <p>{currentStop.focus}</p>
            </div>

            <div className="tour-controls">
              <button onClick={() => goToStop(stopIndex - 1)} aria-label="Previous tour stop">
                <ChevronLeft />
              </button>
              <div>
                <strong>Stop {stopIndex + 1} of {tourStops.length}</strong>
                <span>{currentStop.title}</span>
              </div>
              <button onClick={() => goToStop(stopIndex + 1)} aria-label="Next tour stop">
                <ChevronRight />
              </button>
            </div>
          </div>
        </section>
      </section>

      <section className="section">
        <div className="container tour-detail-grid">
          <article className="tour-narration">
            <div className="feature-icon primary">
              <Headphones />
            </div>
            <h2>Audio Guide Script</h2>
            <p>{currentStop.narration}</p>
          </article>

          <article className="tour-narration">
            <div className="feature-icon accent">
              <Info />
            </div>
            <h2>Visitor Context</h2>
            <p>
              {selected.name} is located in {selected.location}. Suggested visit length is {selected.tourLength},
              with best travel conditions during {selected.bestTime.toLowerCase()}.
            </p>
          </article>

          <article className="tour-narration">
            <div className="feature-icon primary">
              <Route />
            </div>
            <h2>Next Step</h2>
            <p>Use the live map to plan route context, then connect the visit with archives and festival programming.</p>
            <Link to="/map" className="btn btn-filled">
              <MapPin size={16} /> Open Map
            </Link>
          </article>
        </div>
      </section>
    </>
  )
}
