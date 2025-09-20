'use client'

import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Archive, Image, BookOpen, Search, Info } from 'lucide-react'
import { apiService, Archive as ArchiveType } from '@/lib/api'

// Fallback data for immediate display
const fallbackArchives: ArchiveType[] = [
  {
    id: 1,
    title: "Buddhist Thangka Paintings",
    titleNepali: "बौद्ध थाङ्का चित्रहरू",
    description: "Traditional Tibetan Buddhist scroll paintings depicting deities, mandalas, and religious scenes. These intricate artworks serve as meditation aids and religious teaching tools.",
    descriptionNepali: "पारम्परिक तिब्बती बौद्ध स्क्रोल चित्रहरू जुन देवताहरू, मण्डलहरू र धार्मिक दृश्यहरू चित्रण गर्छन्। यी जटिल कलाकृतिहरू ध्यान सहायक र धार्मिक शिक्षण उपकरणको रूपमा काम गर्छन्।",
    category: "Art",
    period: "17th-19th Century",
    location: "Rumtek Monastery",
    significance: "Religious art and meditation aids",
    image: "/Archives-1.jpg"
  },
  {
    id: 2,
    title: "Ancient Buddhist Manuscripts",
    titleNepali: "प्राचीन बौद्ध पाण्डुलिपिहरू",
    description: "Handwritten Buddhist texts and scriptures preserved in monasteries, containing teachings, prayers, and philosophical discourses from ancient times.",
    descriptionNepali: "गुम्बाहरूमा संरक्षित हस्तलिखित बौद्ध ग्रन्थ र धर्मशास्त्रहरू, प्राचीन कालका शिक्षा, प्रार्थना र दार्शनिक प्रवचनहरू समावेश गर्छन्।",
    category: "Literature",
    period: "12th-18th Century",
    location: "Pemayangtse Monastery",
    significance: "Preservation of Buddhist teachings and philosophy",
    image: "/Archives 2.avif"
  },
  {
    id: 3,
    title: "Prayer Wheels and Ritual Objects",
    titleNepali: "प्रार्थना चक्र र अनुष्ठानिक वस्तुहरू",
    description: "Sacred ritual objects including prayer wheels, bells, dorjes, and other ceremonial items used in Buddhist practices and ceremonies.",
    descriptionNepali: "पवित्र अनुष्ठानिक वस्तुहरू जसमा प्रार्थना चक्र, घण्टी, दोर्जे र अन्य समारोहिक वस्तुहरू समावेश छन् जुन बौद्ध अभ्यास र समारोहहरूमा प्रयोग हुन्छन्।",
    category: "Artifacts",
    period: "15th-20th Century",
    location: "Tashiding Monastery",
    significance: "Ritual and ceremonial importance in Buddhist practice",
    image: "/Archive 3.jpg"
  },
  {
    id: 4,
    title: "Monastery Architecture & Murals",
    titleNepali: "गुम्बा वास्तुकला र भित्ता चित्रहरू",
    description: "Traditional monastery architecture featuring intricate murals, wall paintings, and structural designs that reflect centuries of Buddhist artistic tradition.",
    descriptionNepali: "पारम्परिक गुम्बा वास्तुकला जसमा जटिल भित्ता चित्रहरू, भित्ता चित्रहरू र संरचनात्मक डिजाइनहरू समावेश छन् जुन बौद्ध कलात्मक परम्पराको शताब्दीहरू प्रतिबिम्बित गर्छन्।",
    category: "Art",
    period: "16th-20th Century",
    location: "Various Monasteries",
    significance: "Architectural heritage and artistic expression",
    image: "/archive 4.jpg"
  },
  {
    id: 5,
    title: "Sacred Textiles & Ceremonial Robes",
    titleNepali: "पवित्र कपडा र समारोहिक लुगाहरू",
    description: "Traditional ceremonial robes, prayer flags, and sacred textiles used in Buddhist rituals and ceremonies, representing spiritual significance and cultural heritage.",
    descriptionNepali: "पारम्परिक समारोहिक लुगा, प्रार्थना झण्डाहरू र पवित्र कपडाहरू जुन बौद्ध अनुष्ठान र समारोहहरूमा प्रयोग हुन्छन्, आध्यात्मिक महत्व र सांस्कृतिक विरासत प्रतिनिधित्व गर्छन्।",
    category: "Artifacts",
    period: "14th-19th Century",
    location: "Rumtek Monastery",
    significance: "Ceremonial and spiritual importance",
    image: "/Archive 5.jpeg"
  },
  {
    id: 6,
    title: "Historical Photographs & Documents",
    titleNepali: "ऐतिहासिक फोटोग्राफहरू र कागजातहरू",
    description: "Rare historical photographs and documents chronicling the evolution of Sikkim's monasteries, capturing moments of spiritual and cultural significance.",
    descriptionNepali: "दुर्लभ ऐतिहासिक फोटोग्राफहरू र कागजातहरू जुन सिक्किमका गुम्बाहरूको विकासको इतिहास लेख्छन्, आध्यात्मिक र सांस्कृतिक महत्वका क्षणहरू कब्जा गर्छन्।",
    category: "Literature",
    period: "19th-21st Century",
    location: "Digital Archive",
    significance: "Historical documentation and preservation",
    image: "/Archive 6.jpg"
  }
]

export default function DigitalArchive() {
  const [archives, setArchives] = useState<ArchiveType[]>(fallbackArchives) // Start with fallback data
  const [selectedArchive, setSelectedArchive] = useState<ArchiveType | null>(null)
  const [loading, setLoading] = useState(false) // Start as false since we have fallback data
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredArchives, setFilteredArchives] = useState<ArchiveType[]>(fallbackArchives)

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        // Set a timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 2000)
        )
        
        const archivesPromise = apiService.getArchives()
        
        const data = await Promise.race([archivesPromise, timeoutPromise]) as ArchiveType[]
        
        // Only update if we got data
        if (data && data.length > 0) {
          setArchives(data)
          setFilteredArchives(data)
        }
      } catch (error) {
        // Silently fail - we already have fallback data
        console.warn('API fetch failed, using fallback data:', error)
      }
    }

    // Fetch in background without blocking UI
    fetchArchives()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredArchives(archives)
    } else {
      const filtered = archives.filter(archive =>
        archive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archive.titleNepali.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archive.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archive.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredArchives(filtered)
    }
  }, [searchQuery, archives])

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'art':
        return <Image className="w-4 h-4" />
      case 'literature':
        return <BookOpen className="w-4 h-4" />
      default:
        return <Archive className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'art':
        return 'bg-purple-100 text-purple-800'
      case 'literature':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  // No loading state needed since we start with fallback data

  return (
    <div className="w-full">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Archive className="w-6 h-6 text-blue-600" />
            Digital Archive
          </h2>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="art">Art</TabsTrigger>
            <TabsTrigger value="literature">Literature</TabsTrigger>
            <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ArchiveGrid
              archives={filteredArchives}
              selectedArchive={selectedArchive}
              onArchiveSelect={setSelectedArchive}
              getCategoryIcon={getCategoryIcon}
              getCategoryColor={getCategoryColor}
            />
          </TabsContent>

          <TabsContent value="art" className="mt-6">
            <ArchiveGrid
              archives={filteredArchives.filter(archive => archive.category.toLowerCase() === 'art')}
              selectedArchive={selectedArchive}
              onArchiveSelect={setSelectedArchive}
              getCategoryIcon={getCategoryIcon}
              getCategoryColor={getCategoryColor}
            />
          </TabsContent>

          <TabsContent value="literature" className="mt-6">
            <ArchiveGrid
              archives={filteredArchives.filter(archive => archive.category.toLowerCase() === 'literature')}
              selectedArchive={selectedArchive}
              onArchiveSelect={setSelectedArchive}
              getCategoryIcon={getCategoryIcon}
              getCategoryColor={getCategoryColor}
            />
          </TabsContent>

          <TabsContent value="artifacts" className="mt-6">
            <ArchiveGrid
              archives={filteredArchives.filter(archive => archive.category.toLowerCase() === 'artifacts')}
              selectedArchive={selectedArchive}
              onArchiveSelect={setSelectedArchive}
              getCategoryIcon={getCategoryIcon}
              getCategoryColor={getCategoryColor}
            />
          </TabsContent>
        </Tabs>

        {/* Selected Archive Details */}
        {selectedArchive && (
          <Card className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={selectedArchive.image}
                  alt={selectedArchive.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold">{selectedArchive.title}</h3>
                  <Badge className={getCategoryColor(selectedArchive.category)}>
                    {getCategoryIcon(selectedArchive.category)}
                    <span className="ml-1">{selectedArchive.category}</span>
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-4">{selectedArchive.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="font-medium">Period:</span> {selectedArchive.period}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {selectedArchive.location}
                  </div>
                  <div>
                    <span className="font-medium">Significance:</span> {selectedArchive.significance}
                  </div>
                </div>

                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Nepali Translation:</h4>
                  <p className="text-gray-700">{selectedArchive.descriptionNepali}</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </Card>
    </div>
  )
}

interface ArchiveGridProps {
  archives: ArchiveType[]
  selectedArchive: ArchiveType | null
  onArchiveSelect: (archive: ArchiveType) => void
  getCategoryIcon: (category: string) => React.ReactNode
  getCategoryColor: (category: string) => string
}

function ArchiveGrid({ archives, selectedArchive, onArchiveSelect, getCategoryIcon, getCategoryColor }: ArchiveGridProps) {
  if (archives.length === 0) {
    return (
      <div className="text-center py-8">
        <Archive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Archives Found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {archives.map((archive) => (
        <Card
          key={archive.id}
          className={`p-4 cursor-pointer transition-all duration-200 ${
            selectedArchive?.id === archive.id
              ? 'ring-2 ring-blue-500 bg-blue-50'
              : 'hover:shadow-md'
          }`}
          onClick={() => onArchiveSelect(archive)}
        >
          <div className="relative">
            <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden mb-3">
              <img
                src={archive.image}
                alt={archive.title}
                className="w-full h-full object-cover"
              />
            </div>
            <Badge className={`absolute top-2 right-2 ${getCategoryColor(archive.category)}`}>
              {getCategoryIcon(archive.category)}
              <span className="ml-1">{archive.category}</span>
            </Badge>
          </div>

          <h3 className="font-semibold text-lg mb-2">{archive.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{archive.description}</p>

          <div className="space-y-1 text-xs text-gray-500">
            <div><span className="font-medium">Period:</span> {archive.period}</div>
            <div><span className="font-medium">Location:</span> {archive.location}</div>
          </div>

          <Button
            size="sm"
            className="w-full mt-3"
            onClick={(e) => {
              e.stopPropagation()
              onArchiveSelect(archive)
            }}
          >
            <Info className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Card>
      ))}
    </div>
  )
}
