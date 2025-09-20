'use client'

import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Calendar, Clock, MapPin, Info, Ticket } from 'lucide-react'
import { apiService, Festival } from '@/lib/api'

// Fallback data for immediate display - using current and future dates
const currentDate = new Date()

// Helper function to get future dates
const getFutureDate = (daysFromNow: number) => {
  const futureDate = new Date()
  futureDate.setDate(currentDate.getDate() + daysFromNow)
  return futureDate.toISOString().split('T')[0]
}

const fallbackFestivals: Festival[] = [
  {
    id: 1,
    name: "Losar Festival",
    nameNepali: "लोसार पर्व",
    date: getFutureDate(15), // 15 days from now
    description: "Tibetan New Year celebration with traditional ceremonies and cultural performances.",
    descriptionNepali: "तिब्बती नयाँ वर्षको उत्सव पारम्परिक समारोह र सांस्कृतिक प्रदर्शनहरूसहित।",
    location: "Rumtek Monastery",
    duration: "3 days",
    significance: "New Year celebration and community gathering",
    image: "/rumtek-monastery-golden-roof-traditional-architect.jpg"
  },
  {
    id: 2,
    name: "Saga Dawa Festival",
    nameNepali: "सगा दावा पर्व",
    date: getFutureDate(30), // 30 days from now
    description: "Sacred festival commemorating Buddha's birth, enlightenment, and parinirvana.",
    descriptionNepali: "बुद्धको जन्म, ज्ञानोदय र परिनिर्वाणको स्मरण गर्ने पवित्र पर्व।",
    location: "Pemayangtse Monastery",
    duration: "1 day",
    significance: "Triple celebration of Buddha's major life events",
    image: "/majestic-himalayan-monastery-with-prayer-flags-and.jpg"
  },
  {
    id: 3,
    name: "New Year Blessing Ceremony",
    nameNepali: "नयाँ वर्ष आशीर्वाद समारोह",
    date: getFutureDate(5), // 5 days from now
    description: "Special blessing ceremony for the new year with prayers for peace and prosperity.",
    descriptionNepali: "नयाँ वर्षका लागि विशेष आशीर्वाद समारोह, शान्ति र समृद्धिका लागि प्रार्थनासहित।",
    location: "All Monasteries",
    duration: "3 hours",
    significance: "New year blessings and purification",
    image: "/pemayangtse-monastery-white-walls-mountain-view.jpg"
  },
  {
    id: 4,
    name: "Bumchu Festival",
    nameNepali: "बुम्चु पर्व",
    date: getFutureDate(20), // 20 days from now
    description: "Sacred water festival with the opening of the holy water vase at Tashiding Monastery.",
    descriptionNepali: "ताशिडिङ गुम्बामा पवित्र पानीको भाँडो खोल्ने पवित्र पानी पर्व।",
    location: "Tashiding Monastery",
    duration: "1 day",
    significance: "Sacred water ceremony and pilgrimage",
    image: "/tashiding-monastery-hilltop-prayer-flags-valley-vi.jpg"
  },
  {
    id: 5,
    name: "Butter Lamp Festival",
    nameNepali: "घिउको बत्ती पर्व",
    date: getFutureDate(25), // 25 days from now
    description: "Beautiful evening festival with thousands of butter lamps creating a magical atmosphere.",
    descriptionNepali: "हजारौं घिउको बत्तीहरूले जादुई वातावरण सिर्जना गर्ने सुन्दर साँझको पर्व।",
    location: "Pemayangtse Monastery",
    duration: "4 hours",
    significance: "Light offering and spiritual illumination",
    image: "/pemayangtse-monastery-white-walls-mountain-view.jpg"
  }
]

export default function EventCalendar() {
  const [festivals, setFestivals] = useState<Festival[]>(fallbackFestivals) // Start with fallback data
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)
  const [loading, setLoading] = useState(false) // Start as false since we have fallback data

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        // Set a timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 2000)
        )
        
        const festivalsPromise = apiService.getFestivals()
        
        const data = await Promise.race([festivalsPromise, timeoutPromise]) as Festival[]
        
        // Only update if we got data
        if (data && data.length > 0) {
          setFestivals(data)
        }
      } catch (error) {
        // Silently fail - we already have fallback data
        console.warn('API fetch failed, using fallback data:', error)
      }
    }

    // Fetch in background without blocking UI
    fetchFestivals()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getUpcomingFestivals = () => {
    const today = new Date()
    return festivals
      .filter(festival => new Date(festival.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  // Button handlers
  const handleLearnMore = (festival: Festival) => {
    setSelectedFestival(festival)
  }

  const handleBookTickets = (festival: Festival) => {
    alert(`Booking tickets for ${festival.name} at ${festival.location}`)
  }

  const handleAddToCalendar = (festival: Festival) => {
    alert(`Adding ${festival.name} to your calendar`)
  }

  // No loading state needed since we start with fallback data

  const upcomingFestivals = getUpcomingFestivals()

  return (
    <div className="w-full">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          Festival Calendar
        </h2>

        {/* Festival Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {upcomingFestivals.map((festival) => (
            <Card
              key={festival.id}
              className={`p-4 cursor-pointer transition-all duration-200 ${
                selectedFestival?.id === festival.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedFestival(festival)}
            >
              <div className="relative">
                <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden mb-3">
                  <img
                    src={festival.image}
                    alt={festival.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute top-2 right-2 bg-red-600 text-white">
                  {festival.duration}
                </Badge>
              </div>

              <h3 className="font-semibold text-lg mb-2">{festival.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{festival.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(festival.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{festival.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{festival.duration}</span>
                </div>
              </div>

              <Button
                size="sm"
                className="w-full mt-3"
                onClick={(e) => {
                  e.stopPropagation()
                  handleLearnMore(festival)
                }}
              >
                <Info className="w-4 h-4 mr-2" />
                Learn More
              </Button>
            </Card>
          ))}
        </div>

        {/* Selected Festival Details */}
        {selectedFestival && (
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={selectedFestival.image}
                  alt={selectedFestival.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{selectedFestival.name}</h3>
                <p className="text-gray-600 mb-4">{selectedFestival.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="font-medium">Date:</span> {formatDate(selectedFestival.date)}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {selectedFestival.duration}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {selectedFestival.location}
                  </div>
                  <div>
                    <span className="font-medium">Significance:</span> {selectedFestival.significance}
                  </div>
                </div>

                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Nepali Translation:</h4>
                  <p className="text-gray-700">{selectedFestival.descriptionNepali}</p>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button 
                    onClick={() => handleAddToCalendar(selectedFestival)}
                    className="flex-1"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleBookTickets(selectedFestival)}
                    className="flex-1"
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    Book Tickets
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* No Festivals Message */}
        {upcomingFestivals.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Upcoming Festivals</h3>
            <p className="text-gray-500">Check back later for new festival announcements.</p>
          </div>
        )}
      </Card>
    </div>
  )
}
