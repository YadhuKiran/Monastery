"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CalendarIcon,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Users,
  Ticket,
  Bell,
  List,
} from "lucide-react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { apiService, Festival } from "@/lib/api"

// Event interface to match the API data structure
interface Event {
  id: string
  title: string
  type: string
  monastery: string
  date: string
  endDate: string
  time: string
  description: string
  image: string
  category: string
  duration: string
  attendees: number
  ticketRequired: boolean
  featured: boolean
  highlights: string[]
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Fallback data for immediate display - using current and future dates
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth()

// Helper function to get future dates
const getFutureDate = (daysFromNow: number) => {
  const futureDate = new Date()
  futureDate.setDate(currentDate.getDate() + daysFromNow)
  return futureDate.toISOString().split('T')[0]
}

const fallbackEvents: Event[] = [
  {
    id: "losar-2025",
    title: "Losar Festival",
    type: "festival",
    monastery: "Rumtek Monastery",
    date: getFutureDate(15), // 15 days from now
    endDate: getFutureDate(17), // 3 days duration
    time: "6:00 AM - 8:00 PM",
    description: "Tibetan New Year celebration with traditional dances, prayers, and community feast",
    image: "/rumtek-monastery-golden-roof-traditional-architect.jpg",
    category: "Religious Festival",
    duration: "3 days",
    attendees: 500,
    ticketRequired: false,
    featured: true,
    highlights: ["Cham Dance", "Traditional Music", "Community Feast", "Prayer Ceremonies"],
  },
  {
    id: "saga-dawa-2025",
    title: "Saga Dawa Festival",
    type: "festival",
    monastery: "Pemayangtse Monastery",
    date: getFutureDate(30), // 30 days from now
    endDate: getFutureDate(30),
    time: "5:00 AM - 6:00 PM",
    description: "Sacred festival commemorating Buddha's birth, enlightenment, and parinirvana",
    image: "/majestic-himalayan-monastery-with-prayer-flags-and.jpg",
    category: "Religious Festival",
    duration: "1 day",
    attendees: 300,
    ticketRequired: false,
    featured: true,
    highlights: ["Prayer Wheels", "Butter Lamp Lighting", "Merit Making", "Meditation"],
  },
  {
    id: "meditation-retreat-march",
    title: "Spring Meditation Retreat",
    type: "retreat",
    monastery: "Tashiding Monastery",
    date: getFutureDate(45), // 45 days from now
    endDate: getFutureDate(52), // 7 days duration
    time: "6:00 AM - 6:00 PM",
    description: "7-day silent meditation retreat focusing on mindfulness and inner peace",
    image: "/tashiding-monastery-hilltop-prayer-flags-valley-vi.jpg",
    category: "Spiritual Retreat",
    duration: "7 days",
    attendees: 25,
    ticketRequired: true,
    featured: false,
    highlights: ["Silent Meditation", "Dharma Talks", "Walking Meditation", "Personal Guidance"],
  },
  {
    id: "bumchu-festival",
    title: "Bumchu Festival",
    type: "festival",
    monastery: "Tashiding Monastery",
    date: getFutureDate(20), // 20 days from now
    endDate: getFutureDate(20),
    time: "4:00 AM - 10:00 PM",
    description: "Sacred water festival with the opening of the holy water vase",
    image: "/tashiding-monastery-hilltop-prayer-flags-valley-vi.jpg",
    category: "Religious Festival",
    duration: "1 day",
    attendees: 800,
    ticketRequired: false,
    featured: true,
    highlights: ["Holy Water Ceremony", "Pilgrimage", "Traditional Dances", "Blessings"],
  },
  {
    id: "new-year-blessing",
    title: "New Year Blessing Ceremony",
    type: "ceremony",
    monastery: "All Monasteries",
    date: getFutureDate(5), // 5 days from now
    endDate: getFutureDate(5),
    time: "6:00 AM - 9:00 AM",
    description: "Special blessing ceremony for the new year with prayers for peace and prosperity",
    image: "/pemayangtse-monastery-white-walls-mountain-view.jpg",
    category: "Religious Ceremony",
    duration: "3 hours",
    attendees: 200,
    ticketRequired: false,
    featured: true,
    highlights: ["New Year Blessings", "Prayer Ceremony", "Community Gathering", "Peace Prayers"],
  },
  {
    id: "weekly-puja",
    title: "Weekly Puja Ceremony",
    type: "ceremony",
    monastery: "Enchey Monastery",
    date: getFutureDate(7), // Next Sunday
    endDate: getFutureDate(7),
    time: "7:00 AM - 9:00 AM",
    description: "Traditional prayer ceremony held every Sunday with chanting and offerings",
    image: "/pemayangtse-monastery-white-walls-mountain-view.jpg",
    category: "Regular Ceremony",
    duration: "2 hours",
    attendees: 50,
    ticketRequired: false,
    featured: false,
    highlights: ["Chanting", "Offerings", "Community Prayer", "Blessing Ceremony"],
  },
  {
    id: "dharma-teaching",
    title: "Dharma Teaching Session",
    type: "teaching",
    monastery: "Rumtek Monastery",
    date: getFutureDate(10), // 10 days from now
    endDate: getFutureDate(10),
    time: "10:00 AM - 12:00 PM",
    description: "Weekly dharma teaching session with senior monks on Buddhist philosophy and practice",
    image: "/rumtek-monastery-golden-roof-traditional-architect.jpg",
    category: "Educational",
    duration: "2 hours",
    attendees: 80,
    ticketRequired: false,
    featured: false,
    highlights: ["Dharma Talk", "Q&A Session", "Meditation Practice", "Philosophy Discussion"],
  },
  {
    id: "butter-lamp-festival",
    title: "Butter Lamp Festival",
    type: "festival",
    monastery: "Pemayangtse Monastery",
    date: getFutureDate(25), // 25 days from now
    endDate: getFutureDate(25),
    time: "6:00 PM - 10:00 PM",
    description: "Beautiful evening festival with thousands of butter lamps creating a magical atmosphere",
    image: "/pemayangtse-monastery-white-walls-mountain-view.jpg",
    category: "Religious Festival",
    duration: "4 hours",
    attendees: 400,
    ticketRequired: false,
    featured: true,
    highlights: ["Butter Lamp Lighting", "Evening Prayers", "Photography", "Community Gathering"],
  },
]

export default function CulturalCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [filterType, setFilterType] = useState("all")
  const [filterMonastery, setFilterMonastery] = useState("all")
  const [events, setEvents] = useState<Event[]>(fallbackEvents) // Start with fallback data
  const [loading, setLoading] = useState(false) // Start as false since we have fallback data
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false) // For background refresh indicator

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Fetch festivals from API (non-blocking, with timeout)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsRefreshing(true)
        
        // Set a timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 3000)
        )
        
        const festivalsPromise = apiService.getFestivals()
        
        const festivals = await Promise.race([festivalsPromise, timeoutPromise]) as Festival[]
        
        // Transform API data to match our Event interface
        const transformedEvents: Event[] = festivals.map((festival: Festival) => ({
          id: festival.id.toString(),
          title: festival.name,
          type: festival.name.toLowerCase().includes('retreat') ? 'retreat' : 
                festival.name.toLowerCase().includes('teaching') ? 'teaching' :
                festival.name.toLowerCase().includes('ceremony') ? 'ceremony' : 'festival',
          monastery: festival.location,
          date: festival.date,
          endDate: festival.date, // For now, same as start date
          time: "6:00 AM - 8:00 PM", // Default time
          description: festival.description,
          image: festival.image,
          category: festival.significance,
          duration: festival.duration,
          attendees: Math.floor(Math.random() * 500) + 50, // Random attendees for demo
          ticketRequired: festival.name.toLowerCase().includes('retreat'),
          featured: festival.name.toLowerCase().includes('losar') || 
                   festival.name.toLowerCase().includes('saga') ||
                   festival.name.toLowerCase().includes('bumchu'),
          highlights: [
            "Traditional Ceremonies",
            "Prayer Services", 
            "Community Gathering",
            "Cultural Performances"
          ]
        }))
        
        // Only update if we got data and it's different from fallback
        if (transformedEvents.length > 0) {
          setEvents(transformedEvents)
        }
      } catch (err) {
        // Silently fail - we already have fallback data
        console.warn('API fetch failed, using fallback data:', err)
      } finally {
        setIsRefreshing(false)
      }
    }

    // Fetch in background without blocking UI
    fetchEvents()
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesType = filterType === "all" || event.type === filterType
    const matchesMonastery = filterMonastery === "all" || event.monastery === filterMonastery
    return matchesType && matchesMonastery
  })

  // Events are now loaded and ready to display

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return filteredEvents.filter((event) => {
      const eventStart = new Date(event.date)
      const eventEnd = new Date(event.endDate)
      return date >= eventStart && date <= eventEnd
    })
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  // Button handlers
  const handleBookTickets = (event: Event) => {
    alert(`Booking tickets for ${event.title} at ${event.monastery}`)
  }

  const handleAddToCalendar = (event: Event) => {
    alert(`Adding ${event.title} to your calendar`)
  }

  const handleSetReminder = (event: Event) => {
    alert(`Setting reminder for ${event.title}`)
  }

  const handleLearnMore = (event: Event) => {
    setSelectedEvent(event)
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-border/50"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const dayEvents = getEventsForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      const hasEvents = dayEvents.length > 0

      days.push(
        <div
          key={day}
          className={`h-24 border border-border/50 p-2 hover:bg-muted/50 transition-colors ${
            isToday 
              ? "bg-primary/5 border-primary/20" 
              : hasEvents 
                ? "bg-accent/5 border-accent/20" 
                : ""
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday 
              ? "text-primary" 
              : hasEvents 
                ? "text-accent font-semibold" 
                : ""
          }`}>
            {day}
            {hasEvents && <span className="ml-1 text-xs">●</span>}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded cursor-pointer truncate ${
                  event.featured
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  // No loading or error states needed since we start with fallback data

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedEvent ? (
          <div className="space-y-6">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-heading font-bold text-2xl">Cultural Calendar</h2>
                  {isRefreshing && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  )}
                </div>
                <p className="text-muted-foreground">
                  Discover festivals, ceremonies, and spiritual events across Sikkim's monasteries
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="festival">Festivals</SelectItem>
                    <SelectItem value="ceremony">Ceremonies</SelectItem>
                    <SelectItem value="retreat">Retreats</SelectItem>
                    <SelectItem value="teaching">Teachings</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterMonastery} onValueChange={setFilterMonastery}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All monasteries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Monasteries</SelectItem>
                    <SelectItem value="Rumtek Monastery">Rumtek Monastery</SelectItem>
                    <SelectItem value="Pemayangtse Monastery">Pemayangtse Monastery</SelectItem>
                    <SelectItem value="Tashiding Monastery">Tashiding Monastery</SelectItem>
                    <SelectItem value="Enchey Monastery">Enchey Monastery</SelectItem>
                    <SelectItem value="Dubdi Monastery">Dubdi Monastery</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-border rounded-md">
                  <Button
                    size="sm"
                    variant={viewMode === "calendar" ? "default" : "ghost"}
                    className="rounded-r-none"
                    onClick={() => setViewMode("calendar")}
                  >
                    <CalendarIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "ghost"}
                    className="rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {viewMode === "calendar" ? (
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Calendar */}
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                      <CardTitle className="text-xl">
                        {months[currentMonth]} {currentYear}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => navigateMonth("prev")}>
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => navigateMonth("next")}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-0 mb-4">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                          <div
                            key={day}
                            className="h-10 flex items-center justify-center font-medium text-sm border border-border/50 bg-muted/30"
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-0">{renderCalendarGrid()}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upcoming Events Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                      {filteredEvents
                        .filter((event) => new Date(event.date) >= new Date())
                        .slice(0, 5)
                        .map((event) => (
                          <div
                            key={event.id}
                            className="p-3 rounded-lg border border-border hover:border-primary/20 cursor-pointer transition-colors"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-sm line-clamp-2">{event.title}</h3>
                                {event.featured && (
                                  <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.monastery}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <CalendarIcon className="w-3 h-3" />
                                {new Date(event.date).toLocaleDateString()}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs capitalize">
                                  {event.type}
                                </Badge>
                                {event.ticketRequired && (
                                  <Badge variant="outline" className="text-xs">
                                    <Ticket className="w-3 h-3 mr-1" />
                                    Ticket Required
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Event Types</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                        <span>Featured Events</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-muted rounded-full"></div>
                        <span>Regular Events</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          width={120}
                          height={90}
                          className="rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-heading font-semibold text-lg hover:text-primary transition-colors">
                                {event.title}
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                {event.monastery}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {event.featured && (
                                <Badge variant="secondary" className="bg-accent/10 text-accent">
                                  Featured
                                </Badge>
                              )}
                              <Badge variant="outline" className="capitalize">
                                {event.type}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="w-3 h-3" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{event.attendees} attendees</span>
                            </div>
                            {event.ticketRequired && (
                              <div className="flex items-center gap-1">
                                <Ticket className="w-3 h-3" />
                                <span>Ticket Required</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Event Detail View */
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={() => setSelectedEvent(null)} className="bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Calendar
              </Button>
              <div className="h-4 w-px bg-border"></div>
              <Badge variant="outline" className="capitalize">
                {selectedEvent.type}
              </Badge>
              {selectedEvent.featured && (
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  Featured Event
                </Badge>
              )}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="overflow-hidden">
                  <Image
                    src={selectedEvent.image || "/placeholder.svg"}
                    alt={selectedEvent.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6">
                    <h1 className="font-heading font-bold text-3xl mb-4">{selectedEvent.title}</h1>
                    <p className="text-muted-foreground leading-relaxed mb-6">{selectedEvent.description}</p>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Event Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {selectedEvent.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedEvent.monastery}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {new Date(selectedEvent.date).toLocaleDateString()}
                          {selectedEvent.date !== selectedEvent.endDate &&
                            ` - ${new Date(selectedEvent.endDate).toLocaleDateString()}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedEvent.attendees} expected attendees</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      {selectedEvent.ticketRequired ? (
                        <Button 
                          className="w-full"
                          onClick={() => handleBookTickets(selectedEvent)}
                        >
                          <Ticket className="w-4 h-4 mr-2" />
                          Book Tickets
                        </Button>
                      ) : (
                        <Button 
                          className="w-full"
                          onClick={() => handleAddToCalendar(selectedEvent)}
                        >
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Add to Calendar
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        className="w-full bg-transparent"
                        onClick={() => handleSetReminder(selectedEvent)}
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        Set Reminder
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Quick Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Category</span>
                        <span className="font-medium">{selectedEvent.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration</span>
                        <span className="font-medium">{selectedEvent.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Entry</span>
                        <span className="font-medium">{selectedEvent.ticketRequired ? "Ticket Required" : "Free"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
