'use client'

import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { MapPin, Navigation, Info, X } from 'lucide-react'
import { apiService, Monastery } from '@/lib/api'

interface InteractiveMapProps {
  onMonasterySelect?: (monastery: Monastery) => void
}

export default function InteractiveMap({ onMonasterySelect }: InteractiveMapProps) {
  const [monasteries, setMonasteries] = useState<Monastery[]>([])
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null)
  const [infoMonastery, setInfoMonastery] = useState<Monastery | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMonasteries = async () => {
      try {
        const data = await apiService.getMonasteries()
        setMonasteries(data)
      } catch (error) {
        console.error('Failed to fetch monasteries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMonasteries()
  }, [])

  const handleMonasteryClick = (monastery: Monastery) => {
    setSelectedMonastery(monastery)
    onMonasterySelect?.(monastery)
    // Scroll to map pin (optional)
    const pin = document.getElementById(`pin-${monastery.id}`)
    if (pin) pin.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleInfoClick = (monastery: Monastery) => {
    setInfoMonastery(monastery)
  }

  const handleCloseInfo = () => {
    setInfoMonastery(null)
  }

  if (loading) {
    return (
      <Card className="w-full h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading monasteries...</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="w-full">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-600" />
          Monastery Locations
        </h2>
        
        {/* Map Container */}
        <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden mb-4">
          {/* Monastery Pins */}
          {monasteries.map((monastery, index) => {
            // Fake positions for prototype
            const x = 20 + (index * 25) + (monastery.latitude - 27.3) * 100
            const y = 30 + (monastery.longitude - 88.3) * 100
            return (
              <button
                key={monastery.id}
                id={`pin-${monastery.id}`}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                  selectedMonastery?.id === monastery.id
                    ? 'scale-125 z-10'
                    : 'hover:scale-110 z-5'
                }`}
                style={{ left: `${Math.max(10, Math.min(90, x))}%`, top: `${Math.max(10, Math.min(90, y))}%` }}
                onClick={() => handleMonasteryClick(monastery)}
                title={monastery.name}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  {selectedMonastery?.id === monastery.id && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-max">
                      <p className="text-sm font-medium text-gray-900">{monastery.name}</p>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Monastery List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {monasteries.map((monastery) => (
            <Card
              key={monastery.id}
              className={`p-4 cursor-pointer transition-all duration-200 ${
                selectedMonastery?.id === monastery.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleMonasteryClick(monastery)}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={monastery.image}
                    alt={monastery.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1 truncate">{monastery.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{monastery.address}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={e => {
                        e.stopPropagation()
                        handleMonasteryClick(monastery)
                      }}
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={e => {
                        e.stopPropagation()
                        handleInfoClick(monastery)
                      }}
                    >
                      <Info className="w-3 h-3 mr-1" />
                      Info
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Modal */}
        {infoMonastery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleCloseInfo}
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-semibold text-lg mb-2">{infoMonastery.name}</h3>
              <img
                src={infoMonastery.image}
                alt={infoMonastery.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <p className="text-gray-600 mb-3">{infoMonastery.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                <div>
                  <span className="font-medium">Founded:</span> {infoMonastery.founded}
                </div>
                <div>
                  <span className="font-medium">Significance:</span> {infoMonastery.significance}
                </div>
              </div>
              <div>
                <span className="font-medium text-sm">Features:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {infoMonastery.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}