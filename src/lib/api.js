const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export async function createEnquiry(payload) {
  try {
    const response = await fetch(`${API_BASE}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Could not submit enquiry.')
    return { source: 'api', data }
  } catch (error) {
    const fallback = {
      id: crypto.randomUUID(),
      ...payload,
      status: 'stored-locally',
      createdAt: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem('monastery360-enquiries') || '[]')
    localStorage.setItem('monastery360-enquiries', JSON.stringify([fallback, ...existing]))
    return { source: 'local', data: { ok: true, enquiry: fallback }, warning: error.message }
  }
}

export async function trackEvent(event) {
  try {
    await fetch(`${API_BASE}/api/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event }),
    })
  } catch {
    const key = `monastery360-${event}`
    localStorage.setItem(key, String(Number(localStorage.getItem(key) || 0) + 1))
  }
}
