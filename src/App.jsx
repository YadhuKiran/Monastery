import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Monasteries from './pages/Monasteries.jsx'
import Map from './pages/Map.jsx'
import Festivals from './pages/Festivals.jsx'
import Archives from './pages/Archives.jsx'
import VirtualTour from './pages/VirtualTour.jsx'
import GovernmentDemo from './pages/GovernmentDemo.jsx'
import InfoPage from './pages/InfoPage.jsx'
import Planner from './pages/Planner.jsx'
import Enquiry from './pages/Enquiry.jsx'
import AiAssistant from './components/AiAssistant.jsx'

function NotFound() {
  return (
    <section className="section">
      <div className="container empty-state">
        <h1>Page not found</h1>
        <p>The Monastery360 page you are looking for does not exist.</p>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monasteries" element={<Monasteries />} />
            <Route path="/tour" element={<VirtualTour />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/map" element={<Map />} />
            <Route path="/festivals" element={<Festivals />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/demo" element={<GovernmentDemo />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/resources/:slug" element={<InfoPage />} />
            <Route path="/about" element={<InfoPage pageKey="about" />} />
            <Route path="/contact" element={<InfoPage pageKey="contact" />} />
            <Route path="/support" element={<InfoPage pageKey="support" />} />
            <Route path="/privacy" element={<InfoPage pageKey="privacy" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <AiAssistant />
      </div>
    </BrowserRouter>
  )
}
