import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, Mail, MapPin, Shield, Sparkles } from 'lucide-react'

const pages = {
  'travel-guide': {
    title: 'Travel Guide',
    kicker: 'Visitor Planning',
    intro: 'Practical planning notes for monastery circuits across Sikkim, designed for tourism desks, guides, and public visitors.',
    image: '/tashiding-monastery-hilltop-prayer-flags-valley-vi.jpg',
    items: [
      'Best visitor windows are March to May and October to November.',
      'Monsoon travel from June to September should include road-condition buffers.',
      'Gangtok and Pelling work well as anchor hubs for short monastery circuits.',
      'Respectful dress, quiet conduct, and photography permission should be communicated before arrival.',
    ],
  },
  'cultural-insights': {
    title: 'Cultural Insights',
    kicker: 'Interpretation',
    intro: 'Plain-language context that helps visitors understand living Buddhist heritage without reducing monasteries to sightseeing spots.',
    image: '/pemayangtse-monastery-white-walls-mountain-view.jpg',
    items: [
      'Monasteries are active religious institutions, not only monuments.',
      'Cham dances combine ritual, storytelling, costume, music, and community memory.',
      'Murals and thangkas often function as teaching tools for Buddhist cosmology and ethics.',
      'Digital interpretation should protect sacred knowledge and respect access boundaries.',
    ],
  },
  'photography-tips': {
    title: 'Photography Tips',
    kicker: 'Responsible Media',
    intro: 'Guidelines for high-quality, respectful photography that can support tourism promotion and archive documentation.',
    image: '/majestic-himalayan-monastery-with-prayer-flags-and.jpg',
    items: [
      'Ask before photographing monks, ceremonies, or interiors.',
      'Use natural light and avoid flash near murals, manuscripts, or ritual objects.',
      'Capture context: approach roads, courtyards, signage, accessibility, and landscape.',
      'Maintain metadata for official archive use: location, date, photographer, and permissions.',
    ],
  },
  'meditation-guide': {
    title: 'Meditation Guide',
    kicker: 'Quiet Practice',
    intro: 'Simple visitor guidance for entering sacred spaces with attention, calm, and respect.',
    image: '/rumtek-monastery-golden-roof-traditional-architect.jpg',
    items: [
      'Begin with silence and observe how local practitioners move through the space.',
      'Do not interrupt prayer, teaching, or monastic routines.',
      'Use designated visitor areas unless invited elsewhere.',
      'Treat the visit as cultural learning, not only content collection.',
    ],
  },
  about: {
    title: 'About Monastery360',
    kicker: 'Platform Vision',
    intro: 'A digital heritage platform for preserving, interpreting, and promoting Sikkim’s monastery network through maps, archives, tours, and AI-assisted discovery.',
    image: '/rumtek-monastery-golden-roof-traditional-architect.jpg',
    items: [
      'Create public access to curated monastery information.',
      'Support responsible tourism and regional cultural education.',
      'Provide a foundation for official data, GIS layers, CMS workflows, and archive digitisation.',
      'Help departments present heritage assets through a modern, accessible interface.',
    ],
  },
  contact: {
    title: 'Contact',
    kicker: 'Project Desk',
    intro: 'For a production rollout, this section can connect to department contacts, tender support, guide onboarding, and archive partner workflows.',
    image: '/Archives-1.jpg',
    items: [
      'Tourism department coordination',
      'Monastery data verification',
      'Archive digitisation partnerships',
      'Technical deployment and training support',
    ],
  },
  support: {
    title: 'Support',
    kicker: 'Operations',
    intro: 'A support surface for public users, administrators, guides, and field teams once the platform moves beyond prototype stage.',
    image: '/Archive 6.jpg',
    items: [
      'Report incorrect location or visitor information.',
      'Request archive metadata corrections.',
      'Submit festival schedule updates for verification.',
      'Escalate accessibility or safety notices.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    kicker: 'Trust',
    intro: 'Prototype privacy posture for a public-sector heritage platform. Production deployment should be reviewed by legal and IT security teams.',
    image: '/Archives 2.avif',
    items: [
      'The current prototype stores no visitor accounts or payment details.',
      'Future analytics should use privacy-preserving aggregate reporting.',
      'Archive submissions should include consent and rights metadata.',
      'Sensitive religious or community material should have access controls.',
    ],
  },
}

export default function InfoPage({ pageKey }) {
  const params = useParams()
  const key = pageKey || params.slug
  const page = pages[key] || pages.about

  return (
    <>
      <section className="info-hero" style={{ backgroundImage: `url(${page.image})` }}>
        <div className="info-hero-overlay" />
        <div className="container info-hero-content">
          <span>{page.kicker}</span>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container info-grid-page">
          <article className="info-main">
            <Sparkles />
            <h2>What This Covers</h2>
            <div className="info-check-list">
              {page.items.map((item) => (
                <p key={item}>
                  <CheckCircle2 />
                  {item}
                </p>
              ))}
            </div>
          </article>

          <aside className="info-aside">
            <h2>Useful Links</h2>
            <Link to="/tour" className="btn btn-filled">Start Virtual Tour</Link>
            <Link to="/map" className="btn btn-outline"><MapPin size={16} /> Open Map</Link>
            <Link to="/enquiry" className="btn btn-outline"><Mail size={16} /> Send Enquiry</Link>
            <div className="privacy-note">
              <Shield />
              <p>Government production use should connect this prototype to verified official data, security review, and content governance.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
