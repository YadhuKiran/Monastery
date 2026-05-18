import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Navigation, Star } from 'lucide-react'
import { monasteries } from '../data/monasteryData.js'
import 'leaflet/dist/leaflet.css'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function FlyToButton({ monastery }) {
  const map = useMap()

  return (
    <button
      className="map-list-item"
      onClick={() => map.flyTo([monastery.lat, monastery.lng], 12, { duration: 0.8 })}
    >
      <span>
        <strong>{monastery.name}</strong>
        <small>{monastery.location}</small>
      </span>
      <Navigation size={16} />
    </button>
  )
}

function MapContent() {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {monasteries.map((monastery) => (
        <Marker key={monastery.id} position={[monastery.lat, monastery.lng]} icon={markerIcon}>
          <Popup>
            <strong>{monastery.name}</strong>
            <br />
            {monastery.location}
            <br />
            {monastery.hours}
          </Popup>
        </Marker>
      ))}
      <div className="map-floating-list">
        {monasteries.map((monastery) => (
          <FlyToButton key={monastery.id} monastery={monastery} />
        ))}
      </div>
    </>
  )
}

export default function Map() {
  return (
    <section className="map-page">
      <aside className="map-sidebar">
        <div className="sidebar-kicker">Live Heritage Map</div>
        <h1>Sikkim Monastery Network</h1>
        <p>
          Explore verified monastery locations with open map data, visitor context, and route planning anchors.
        </p>

        <div className="map-summary">
          <div>
            <strong>{monasteries.length}</strong>
            <span>featured sites</span>
          </div>
          <div>
            <strong>2</strong>
            <span>regions covered</span>
          </div>
        </div>

        <div className="map-location-list">
          {monasteries.map((monastery) => (
            <article key={monastery.id} className="map-location-card">
              <img src={monastery.image} alt={monastery.name} />
              <div>
                <h2>{monastery.name}</h2>
                <p>{monastery.location}</p>
                <span><Star size={13} /> {monastery.rating} / 5</span>
              </div>
            </article>
          ))}
        </div>
      </aside>

      <div className="map-container">
        <MapContainer center={[27.32, 88.43]} zoom={10} scrollWheelZoom className="leaflet-container">
          <MapContent />
        </MapContainer>
      </div>
    </section>
  )
}
