import { useMemo, useState } from 'react'
import { Bot, Send, Sparkles, X } from 'lucide-react'
import { archives, festivals, formatDate, monasteries } from '../data/monasteryData.js'

const suggestions = [
  'Tell me about Rumtek Monastery',
  'What festivals are coming up?',
  'Best time to visit monasteries?',
  'What is in the archive?',
]

function generateResponse(query) {
  const q = query.toLowerCase()

  const monastery = monasteries.find((item) => q.includes(item.slug) || q.includes(item.name.toLowerCase()))
  if (monastery) {
    return `${monastery.name}\n\n${monastery.description}\n\nLocation: ${monastery.location}\nFounded: ${monastery.founded}\nLineage: ${monastery.sect}\nBest time: ${monastery.bestTime}\nVisitor note: ${monastery.accessibility}`
  }

  const festival = festivals.find((item) => q.includes(item.name.toLowerCase().split(' ')[0]))
  if (festival) {
    return `${festival.name}\n\n${festival.description}\n\nDate: ${formatDate(festival.date)}\nLocation: ${festival.location}\nDuration: ${festival.duration}\nSignificance: ${festival.significance}`
  }

  if (q.includes('festival') || q.includes('event') || q.includes('coming')) {
    return `Major festival records:\n\n${festivals
      .map((item) => `${item.name}: ${formatDate(item.date)} at ${item.location}`)
      .join('\n')}`
  }

  if (q.includes('best time') || q.includes('when') || q.includes('weather')) {
    return 'Best visitor windows are March to May and October to November. These periods usually offer clearer mountain views, easier road conditions, and strong festival or photography potential. June to September is monsoon season, so itinerary planning should include landslide and travel buffer risk.'
  }

  if (q.includes('archive') || q.includes('art') || q.includes('manuscript') || q.includes('thangka')) {
    return `The archive currently covers:\n\n${archives
      .map((item) => `${item.title} (${item.category}, ${item.period})`)
      .join('\n')}\n\nThese records can support public exhibitions, school learning modules, conservation planning, and tourism interpretation.`
  }

  if (q.includes('government') || q.includes('proposal') || q.includes('sell')) {
    return 'For a government demo, lead with public value: heritage preservation, tourism discovery, cultural education, open map access, and future-ready archive workflows. The current build is a front-end prototype that can be deployed as a static site and extended with CMS, analytics, and official data integrations.'
  }

  return 'I can help with monastery profiles, festival dates, travel planning, heritage archive records, and demo positioning for Monastery360. Try asking about Rumtek, Pemayangtse, Tashiding, festivals, or archive material.'
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Namaste. I am the Monastery360 heritage assistant. Ask me about Sikkim monasteries, festivals, archives, or visitor planning.',
    },
  ])
  const [input, setInput] = useState('')
  const canSend = useMemo(() => input.trim().length > 0, [input])

  const sendMessage = (message = input) => {
    const text = message.trim()
    if (!text) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text }, { role: 'bot', text: generateResponse(text) }])
  }

  return (
    <>
      <button className="ai-fab" onClick={() => setIsOpen((value) => !value)} title="Heritage assistant">
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {isOpen && (
        <section className="ai-panel" aria-label="Heritage AI assistant">
          <div className="ai-panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={18} />
              <h3>Heritage Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: 'white', opacity: 0.85 }} aria-label="Close assistant">
              <X size={18} />
            </button>
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`ai-msg ${message.role}`}>
                {message.text.split('\n').map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
            ))}
          </div>

          {messages.length <= 1 && (
            <div className="ai-suggestions">
              {suggestions.map((suggestion) => (
                <button key={suggestion} className="ai-suggestion-chip" onClick={() => sendMessage(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="ai-input-area">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') sendMessage()
              }}
              placeholder="Ask about monasteries..."
            />
            <button onClick={() => sendMessage()} disabled={!canSend} aria-label="Send message">
              <Send size={16} />
            </button>
          </div>
        </section>
      )}
    </>
  )
}
