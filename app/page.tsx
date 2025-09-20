import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Camera, BookOpen, Calendar, Play, Star, Users, Clock, Archive } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import PanoramaViewer from "@/components/panorama-viewer"
import InteractiveMap from "@/components/interactive-map"
import EventCalendar from "@/components/event-calendar"
import DigitalArchive from "@/components/digital-archive"
import SearchBar from "@/components/search-bar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-muted text-foreground border-border">
                  Digital Heritage Platform
                </Badge>
                <h1 className="font-heading font-bold text-4xl lg:text-6xl text-balance leading-tight">
                  Discover Sikkim's Sacred <span className="text-primary">Monasteries</span>
                </h1>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed max-w-xl">
                  Immerse yourself in the spiritual heritage of the Himalayas through virtual tours, interactive maps,
                  and digital archives of Sikkim's ancient monasteries.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Play className="w-4 h-4 mr-2" />
                  Start Virtual Tour
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 bg-transparent"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Explore Map
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"></div>
                    <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background"></div>
                    <div className="w-8 h-8 rounded-full bg-primary/30 border-2 border-background"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">12,000+</span> visitors
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold">4.9</span>
                  <span className="text-sm text-muted-foreground">(2.1k reviews)</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Archives-1.jpg"
                  alt="Digital Archive showcasing Buddhist heritage artifacts"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Card className="bg-background/95 backdrop-blur border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-sm">Digital Heritage Archive</h3>
                          <p className="text-xs text-muted-foreground">Explore Sacred Artifacts</p>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <BookOpen className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Floating cards */}
              <Card className="absolute -top-4 -left-4 bg-background border-border shadow-lg">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">Digital Archives</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute -bottom-4 -right-4 bg-background border-border shadow-lg">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Archive className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium">Heritage Collection</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-balance">Explore Sacred Heritage</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Discover the rich spiritual and cultural heritage of Sikkim through our comprehensive digital platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg">Virtual Tours</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Immersive 360° experiences with multilingual audio guides and interactive hotspots
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg">Interactive Maps</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Geo-tagged locations with travel integration and detailed monastery information
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg">Digital Archives</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  AI-powered search through manuscripts, murals, and historical artifacts
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg">Cultural Calendar</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Festival schedules, events, and booking system for cultural experiences
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 360° Panoramic View */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-balance">360° Virtual Experience</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Immerse yourself in the sacred atmosphere of Sikkim's monasteries with our interactive panoramic views
            </p>
          </div>
          <PanoramaViewer
            imageUrl="/rumtek-monastery-golden-roof-traditional-architect.jpg"
            audioUrl="/audio/rumtek-english.mp3"
            title="Rumtek Monastery - 360° Virtual Tour"
            description="Experience the grandeur of Rumtek Monastery, the largest and most significant monastery in Sikkim. Drag to explore the panoramic view and listen to the audio guide."
          />
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-balance">Explore Monastery Locations</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Discover the geographical distribution of Sikkim's sacred monasteries with our interactive map
            </p>
          </div>
          <InteractiveMap />
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-balance">Cultural Festival Calendar</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Stay updated with upcoming festivals and cultural events at Sikkim's monasteries
            </p>
          </div>
          <EventCalendar />
        </div>
      </section>

      {/* Digital Archive Showcase */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-balance">Digital Heritage Archive</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Explore the rich collection of manuscripts, murals, and artifacts from Sikkim's monasteries
            </p>
          </div>

          {/* Archive Images Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[
              { src: "/Archives-1.jpg", alt: "Buddhist Thangka Paintings", title: "Thangka Art" },
              { src: "/Archives 2.avif", alt: "Ancient Buddhist Manuscripts", title: "Manuscripts" },
              { src: "/Archive 3.jpg", alt: "Prayer Wheels and Ritual Objects", title: "Ritual Objects" },
              { src: "/archive 4.jpg", alt: "Monastery Architecture & Murals", title: "Architecture" },
              { src: "/Archive 5.jpeg", alt: "Sacred Textiles & Ceremonial Robes", title: "Textiles" },
              { src: "/Archive 6.jpg", alt: "Historical Photographs & Documents", title: "Documents" }
            ].map((item, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-medium text-center">{item.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <DigitalArchive />
        </div>
      </section>

      {/* Search Functionality */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-balance">Search Monastery360</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Find information about monasteries, festivals, and cultural artifacts with our intelligent search
            </p>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* Featured Monasteries */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4">Featured Monasteries</h2>
              <p className="text-lg text-muted-foreground">Explore the most significant spiritual centers of Sikkim</p>
            </div>
            <Button variant="outline" className="hidden sm:flex bg-transparent">
              View All Monasteries
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Rumtek Monastery",
                location: "Gangtok",
                description: "The largest monastery in Sikkim, seat of the Karmapa",
                image: "/rumtek-monastery-golden-roof-traditional-architect.jpg",
                visitors: "2.1k",
                rating: "4.9",
              },
              {
                name: "Pemayangtse Monastery",
                location: "Pelling",
                description: "One of the oldest monasteries in Sikkim",
                image: "/pemayangtse-monastery-white-walls-mountain-view.jpg",
                visitors: "1.8k",
                rating: "4.8",
              },
              {
                name: "Tashiding Monastery",
                location: "West Sikkim",
                description: "Sacred monastery on a hilltop with panoramic views",
                image: "/tashiding-monastery-hilltop-prayer-flags-valley-vi.jpg",
                visitors: "1.5k",
                rating: "4.7",
              },
            ].map((monastery, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <Image
                    src={monastery.image || "/placeholder.svg"}
                    alt={`${monastery.name} - ${monastery.description}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      <Star className="w-3 h-3 mr-1 fill-accent text-accent" />
                      {monastery.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors">
                        {monastery.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {monastery.location}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground text-pretty">{monastery.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {monastery.visitors} visitors
                      </span>
                      <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                        Explore
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-balance">Begin Your Spiritual Journey</h2>
            <p className="text-lg text-primary-foreground/80 text-pretty">
              Join thousands of visitors exploring Sikkim's sacred monasteries through our immersive digital platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Play className="w-4 h-4 mr-2" />
                Start Free Tour
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                <Clock className="w-4 h-4 mr-2" />
                Plan Your Visit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-bold text-sm">M</span>
                </div>
                <span className="font-heading font-bold text-xl">Monastery360</span>
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                Preserving and sharing Sikkim's sacred monastery heritage through digital innovation.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Virtual Tours
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Interactive Map
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Digital Archives
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Cultural Calendar
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Travel Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Cultural Insights
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Photography Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Meditation Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Monastery360. Preserving sacred heritage through digital innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
