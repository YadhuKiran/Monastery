 # Monastery360 - Sikkim Digital Heritage Platform

A functional prototype of Monastery360 featuring 360° panoramic views, interactive maps, digital archives, and cultural experiences for Sikkim's sacred monasteries.

## 🏛️ Features

### Core Features Implemented
- **360° Panoramic View**: Interactive monastery interior/exterior with drag controls
- **Audio Guide System**: Multi-language support (English + Nepali) with play/pause controls
- **Interactive Map**: Clickable monastery locations with detailed information
- **Event Calendar**: Festival listings (Losar, Saga Dawa, Pang Lhabsol) with dates and descriptions
- **Digital Archive Gallery**: Murals and manuscripts with searchable metadata
- **Search Functionality**: Intelligent search across monasteries, festivals, and archives
- **Offline Access**: PWA configuration with service worker for core content caching

### Technical Architecture
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, Radix UI components
- **Backend**: Spring Boot 3.2 with JPA/Hibernate, H2 database (prototype)
- **API Integration**: RESTful APIs with CORS support
- **PWA Support**: Service worker for offline functionality

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Java 17+ and Maven
- Git

### Frontend Setup (Next.js)
```bash
cd v0-sikkim-monastery-platform
npm install
npm run dev
```
Frontend will be available at `http://localhost:3000`

### Backend Setup (Spring Boot)
```bash
cd v0-sikkim-monastery-platform/backend
mvn spring-boot:run
```
Backend API will be available at `http://localhost:8080`

### Environment Variables
Create `.env.local` in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## 📱 Demo Features

### 1. 360° Panoramic View
- Drag to explore monastery interiors
- Audio guide integration
- Touch/mouse controls
- Reset view functionality

### 2. Interactive Map
- Monastery location pins
- Click to view details
- Geographic distribution
- Responsive design

### 3. Festival Calendar
- Upcoming festival listings
- Date and duration information
- Bilingual descriptions (English/Nepali)
- Visual festival cards

### 4. Digital Archive
- Categorized artifacts (Art, Literature, Artifacts)
- Search and filter functionality
- Detailed descriptions
- Image galleries

### 5. Search System
- Cross-platform search (monasteries, festivals, archives)
- "Losar Festival" query demonstration
- Real-time results
- Quick search suggestions

### 6. Offline Demo
- Service worker caching
- Core content available offline
- Progressive Web App features

## 🗂️ Project Structure

```
v0-sikkim-monastery-platform/
├── app/                          # Next.js app directory
│   ├── api/                     # API routes (removed - using Spring Boot)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # UI components (Radix UI)
│   ├── panorama-viewer.tsx      # 360° viewer component
│   ├── interactive-map.tsx      # Map component
│   ├── event-calendar.tsx       # Calendar component
│   ├── digital-archive.tsx      # Archive gallery
│   ├── search-bar.tsx           # Search component
│   └── navigation.tsx           # Navigation
├── lib/                         # Utilities
│   ├── utils.ts                 # Helper functions
│   └── api.ts                   # API service layer
├── backend/                     # Spring Boot backend
│   ├── src/main/java/com/monastery360/
│   │   ├── controller/          # REST controllers
│   │   ├── service/            # Business logic
│   │   ├── repository/         # Data access
│   │   ├── model/            # Entity models
│   │   └── config/            # Configuration
│   └── pom.xml                 # Maven configuration
├── public/                      # Static assets
│   ├── *.jpg                   # Monastery images
│   └── manifest.json           # PWA manifest
├── sw.js                       # Service worker
└── package.json                # Dependencies
```

## 🔧 API Endpoints

### Monasteries
- `GET /api/monasteries` - List all monasteries
- `GET /api/monasteries/{id}` - Get monastery by ID
- `GET /api/monasteries/search?q={query}` - Search monasteries

### Festivals
- `GET /api/festivals` - List all festivals
- `GET /api/festivals/{id}` - Get festival by ID
- `GET /api/festivals/search?q={query}` - Search festivals

### Archives
- `GET /api/archives` - List all archives
- `GET /api/archives/{id}` - Get archive by ID
- `GET /api/archives/search?q={query}` - Search archives

### Audio Guides
- `GET /api/audio-guides` - List all audio guides
- `GET /api/audio-guides/monastery/{id}` - Get guides by monastery
- `GET /api/audio-guides/language/{lang}` - Get guides by language

### Search
- `GET /api/search?q={query}` - Global search across all content

## 🎯 Demo Scenarios

### 1. Virtual Tour Experience
1. Navigate to the 360° viewer section
2. Drag to explore the monastery interior
3. Play audio guide for context
4. Reset view to return to center

### 2. Interactive Map Exploration
1. View monastery locations on map
2. Click on monastery pins for details
3. Explore different monastery information
4. Use the monastery list for quick access

### 3. Festival Discovery
1. Browse upcoming festivals in calendar
2. Click on festival cards for details
3. View bilingual descriptions
4. Check dates and locations

### 4. Archive Search
1. Browse digital archive categories
2. Use search functionality
3. Filter by category (Art, Literature, Artifacts)
4. View detailed artifact information

### 5. Search Demonstration
1. Search for "Losar Festival"
2. View results across different content types
3. Try other search terms like "Rumtek" or "Thangka"
4. Use quick search suggestions

### 6. Offline Access
1. Load the application
2. Turn off internet connection
3. Navigate through cached content
4. Verify core functionality works offline

## 🛠️ Development Notes

### Prototype Limitations
- Mock data for demonstration purposes
- H2 in-memory database (data resets on restart)
- Simplified 360° viewer (CSS transforms)
- Basic search functionality
- No real audio files (placeholder URLs)

### Production Considerations
- Replace H2 with PostgreSQL/MySQL
- Implement real 360° viewer library (Three.js)
- Add actual audio files and CDN storage
- Implement user authentication
- Add real-time data synchronization
- Optimize for mobile performance

## 📄 License

This is a prototype project for demonstration purposes. All monastery images and cultural content are for educational use only.

## 🤝 Contributing

This is a prototype project. For production development, please follow proper software development practices including:
- Code reviews
- Unit testing
- Security audits
- Performance optimization
- Accessibility compliance

---

**Monastery360** - Preserving Sikkim's sacred heritage through digital innovation.
