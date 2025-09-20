"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Search,
  Filter,
  Star,
  Users,
  Camera,
  Route,
  Phone,
  Globe,
  Calendar,
  Mountain,
  Car,
  Bus,
  Plane,
} from "lucide-react"
import Image from "next/image"
import Navigation from "@/components/navigation"

const monasteries = [
  {
    id: "rumtek",
    name: "Rumtek Monastery",
    location: "Gangtok, East Sikkim",
    coordinates: { lat: 27.3389, lng: 88.5583 },
    description: "The largest monastery in Sikkim and seat of the Karmapa",
    image: "/rumtek-monastery-golden-roof-traditional-architect.jpg",
    rating: 4.9,
    visitors: "2.1k",
    established: "1966",
    altitude: "1,550m",
    category: "Kagyu",
    accessibility: "Easy",
    distance: "24 km from Gangtok",
    highlights: ["Golden Stupa", "Prayer Hall", "Monks' Quarters"],
    contact: "+91-3592-252-xxx",
    website: "rumtek-monastery.org",
    bestTime: "March-June, Sept-Nov",
    transportation: ["Car", "Bus", "Taxi"],
  },
  {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    location: "Pelling, West Sikkim",
    coordinates: { lat: 27.2951, lng: 88.2183 },
    description: "One of the oldest and most important monasteries in Sikkim",
    image: "/pemayangtse-monastery-white-walls-mountain-view.jpg",
    rating: 4.8,
    visitors: "1.8k",
    established: "1705",
    altitude: "2,085m",
    category: "Nyingma",
    accessibility: "Moderate",
    distance: "110 km from Gangtok",
    highlights: ["Ancient Murals", "Wooden Sculptures", "Sacred Texts"],
    contact: "+91-3595-250-xxx",
    website: "pemayangtse.org",
    bestTime: "April-June, Oct-Dec",
    transportation: ["Car", "Bus"],
  },
  {
    id: "tashiding",
    name: "Tashiding Monastery",
    location: "Tashiding, West Sikkim",
    coordinates: { lat: 27.3333, lng: 88.2667 },
    description: "Sacred monastery on a hilltop with panoramic valley views",
    image: "/tashiding-monastery-hilltop-prayer-flags-valley-vi.jpg",
    rating: 4.7,
    visitors: "1.5k",
    established: "1641",
    altitude: "1,465m",
    category: "Nyingma",
    accessibility: "Moderate",
    distance: "85 km from Gangtok",
    highlights: ["Sacred Chorten", "Valley Views", "Prayer Flags"],
    contact: "+91-3595-251-xxx",
    website: "tashiding-monastery.org",
    bestTime: "March-May, Sept-Nov",
    transportation: ["Car", "Taxi"],
  },
  {
    id: "enchey",
    name: "Enchey Monastery",
    location: "Gangtok, East Sikkim",
    coordinates: { lat: 27.3314, lng: 88.6138 },
    description: "Historic monastery with stunning views of Kanchenjunga",
    image: "/placeholder.svg?height=300&width=400&text=Enchey+Monastery",
    rating: 4.6,
    visitors: "1.2k",
    established: "1909",
    altitude: "1,675m",
    category: "Nyingma",
    accessibility: "Easy",
    distance: "3 km from Gangtok",
    highlights: ["Mountain Views", "Traditional Architecture", "Annual Cham Dance"],
    contact: "+91-3592-253-xxx",
    website: "enchey-monastery.org",
    bestTime: "Year-round",
    transportation: ["Car", "Bus", "Walking"],
  },
  {
    id: "dubdi",
    name: "Dubdi Monastery",
    location: "Yuksom, West Sikkim",
    coordinates: { lat: 27.3667, lng: 88.2167 },
    description: "The oldest monastery in Sikkim, founded in 1701",
    image: "/placeholder.svg?height=300&width=400&text=Dubdi+Monastery",
    rating: 4.5,
    visitors: "900",
    established: "1701",
    altitude: "2,100m",
    category: "Nyingma",
    accessibility: "Difficult",
    distance: "125 km from Gangtok",
    highlights: ["Historical Significance", "Trekking Route", "Ancient Artifacts"],
    contact: "+91-3595-252-xxx",
    website: "dubdi-monastery.org",
    bestTime: "April-June, Sept-Nov",
    transportation: ["Car", "Trekking"],
  },
]

export default function InteractiveMapPage() {
  const [selectedMonastery, setSelectedMonastery] = useState<(typeof monasteries)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [accessibilityFilter, setAccessibilityFilter] = useState("all")
  const [showDirections, setShowDirections] = useState(false)

  const filteredMonasteries = monasteries.filter((monastery) => {
    const matchesSearch =
      monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      monastery.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || monastery.category === categoryFilter
    const matchesAccessibility = accessibilityFilter === "all" || monastery.accessibility === accessibilityFilter

    return matchesSearch && matchesCategory && matchesAccessibility
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters and Search Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Search & Filter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search monasteries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Nyingma">Nyingma</SelectItem>
                      <SelectItem value="Kagyu">Kagyu</SelectItem>
                      <SelectItem value="Gelug">Gelug</SelectItem>
                      <SelectItem value="Sakya">Sakya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Accessibility</label>
                  <Select value={accessibilityFilter} onValueChange={setAccessibilityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Difficult">Difficult</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Reset Filters
                </Button>
              </CardContent>
            </Card>

            {/* Monastery List */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Monasteries ({filteredMonasteries.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {filteredMonasteries.map((monastery) => (
                  <div
                    key={monastery.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedMonastery?.id === monastery.id
                        ? "ring-2 ring-primary border-primary/50 bg-primary/5"
                        : "border-border hover:border-primary/20"
                    }`}
                    onClick={() => setSelectedMonastery(monastery)}
                  >
                    <div className="flex gap-3">
                      <Image
                        src={monastery.image || "/placeholder.svg"}
                        alt={monastery.name}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{monastery.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{monastery.location}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            <span className="text-xs">{monastery.rating}</span>
                          </div>
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            {monastery.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Map and Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Map Container */}
            <Card className="overflow-hidden">
              <div className="relative h-96 bg-muted">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                      {/* Mountain ranges */}
                      <path d="M0,200 Q100,150 200,180 T400,160 L400,300 L0,300 Z" fill="#10b981" opacity="0.3" />
                      <path d="M0,220 Q150,170 300,190 T400,180 L400,300 L0,300 Z" fill="#059669" opacity="0.4" />

                      {/* Rivers */}
                      <path
                        d="M50,250 Q150,200 250,220 T350,200"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.6"
                      />
                    </svg>
                  </div>
                </div>

                {/* Monastery Markers */}
                {filteredMonasteries.map((monastery, index) => (
                  <div
                    key={monastery.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
                      selectedMonastery?.id === monastery.id ? "scale-125 z-10" : "z-5"
                    }`}
                    style={{
                      left: `${20 + ((index * 15) % 60)}%`,
                      top: `${30 + ((index * 12) % 40)}%`,
                    }}
                    onClick={() => setSelectedMonastery(monastery)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                        selectedMonastery?.id === monastery.id
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    {selectedMonastery?.id === monastery.id && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-lg px-2 py-1 text-xs font-medium whitespace-nowrap shadow-lg">
                        {monastery.name}
                      </div>
                    )}
                  </div>
                ))}

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button size="sm" variant="secondary" className="bg-background/90 hover:bg-background">
                    +
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-background/90 hover:bg-background">
                    -
                  </Button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-background/90 rounded-lg p-3 text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Monastery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span>Selected</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Selected Monastery Details */}
            {selectedMonastery && (
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="font-heading font-bold text-2xl mb-2">{selectedMonastery.name}</h2>
                          <p className="text-muted-foreground mb-4">{selectedMonastery.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{selectedMonastery.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mountain className="w-4 h-4 text-muted-foreground" />
                              <span>{selectedMonastery.altitude}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-accent text-accent" />
                              <span>{selectedMonastery.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Image
                          src={selectedMonastery.image || "/placeholder.svg"}
                          alt={selectedMonastery.name}
                          width={120}
                          height={90}
                          className="rounded-lg object-cover"
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Established</span>
                          <p className="font-medium">{selectedMonastery.established}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Category</span>
                          <p className="font-medium">{selectedMonastery.category}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Accessibility</span>
                          <p className="font-medium">{selectedMonastery.accessibility}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Distance</span>
                          <p className="font-medium">{selectedMonastery.distance}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Highlights</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedMonastery.highlights.map((highlight, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium mb-2">Contact Information</h4>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              <span>{selectedMonastery.contact}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="w-3 h-3 text-muted-foreground" />
                              <span>{selectedMonastery.website}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Visit Information</h4>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span>{selectedMonastery.bestTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3 text-muted-foreground" />
                              <span>{selectedMonastery.visitors} monthly visitors</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-3">Transportation</h3>
                        <div className="space-y-2">
                          {selectedMonastery.transportation.map((transport, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              {transport === "Car" && <Car className="w-4 h-4 text-muted-foreground" />}
                              {transport === "Bus" && <Bus className="w-4 h-4 text-muted-foreground" />}
                              {transport === "Taxi" && <Car className="w-4 h-4 text-muted-foreground" />}
                              {transport === "Walking" && <MapPin className="w-4 h-4 text-muted-foreground" />}
                              {transport === "Trekking" && <Mountain className="w-4 h-4 text-muted-foreground" />}
                              {transport === "Plane" && <Plane className="w-4 h-4 text-muted-foreground" />}
                              <span>{transport}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button className="w-full">
                          <Route className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          <Camera className="w-4 h-4 mr-2" />
                          Virtual Tour
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          <Calendar className="w-4 h-4 mr-2" />
                          Plan Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{monasteries.length}</div>
                  <div className="text-sm text-muted-foreground">Total Monasteries</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent mb-1">4</div>
                  <div className="text-sm text-muted-foreground">Buddhist Schools</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">320+</div>
                  <div className="text-sm text-muted-foreground">Years of History</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent mb-1">7.5k</div>
                  <div className="text-sm text-muted-foreground">Monthly Visitors</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
