import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { archives, festivals, monasteries, searchAll } from '../src/data/monasteryData.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, 'data', 'database.json')
const port = Number(process.env.PORT || 8080)

async function readDb() {
  const raw = await readFile(dbPath, 'utf8')
  return JSON.parse(raw)
}

async function writeDb(data) {
  await writeFile(dbPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(data))
}

async function readBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}

function validateEnquiry(payload) {
  const name = String(payload.name || '').trim()
  const email = String(payload.email || '').trim()
  const organisation = String(payload.organisation || '').trim()
  const message = String(payload.message || '').trim()
  const interest = String(payload.interest || 'Government demo').trim()

  if (name.length < 2) return { error: 'Name is required.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'A valid email is required.' }
  if (message.length < 10) return { error: 'Message should be at least 10 characters.' }

  return { value: { name, email, organisation, interest, message } }
}

async function handleRequest(req, res) {
  if (req.method === 'OPTIONS') return sendJson(res, 204, {})

  const url = new URL(req.url, `http://${req.headers.host}`)

  try {
    if (req.method === 'GET' && url.pathname === '/api/health') {
      return sendJson(res, 200, {
        ok: true,
        service: 'Monastery360 API',
        timestamp: new Date().toISOString(),
      })
    }

    if (req.method === 'GET' && url.pathname === '/api/monasteries') {
      return sendJson(res, 200, monasteries)
    }

    if (req.method === 'GET' && url.pathname === '/api/festivals') {
      return sendJson(res, 200, festivals)
    }

    if (req.method === 'GET' && url.pathname === '/api/archives') {
      return sendJson(res, 200, archives)
    }

    if (req.method === 'GET' && url.pathname === '/api/search') {
      return sendJson(res, 200, searchAll(url.searchParams.get('q') || ''))
    }

    if (req.method === 'GET' && url.pathname === '/api/enquiries') {
      const db = await readDb()
      return sendJson(res, 200, db.enquiries)
    }

    if (req.method === 'POST' && url.pathname === '/api/enquiries') {
      const payload = await readBody(req)
      const result = validateEnquiry(payload)
      if (result.error) return sendJson(res, 400, { ok: false, error: result.error })

      const db = await readDb()
      const enquiry = {
        id: crypto.randomUUID(),
        ...result.value,
        status: 'new',
        createdAt: new Date().toISOString(),
      }

      db.enquiries.unshift(enquiry)
      await writeDb(db)
      return sendJson(res, 201, { ok: true, enquiry })
    }

    if (req.method === 'POST' && url.pathname === '/api/analytics') {
      const payload = await readBody(req)
      const event = String(payload.event || '').trim()
      const db = await readDb()

      if (event && Object.hasOwn(db.analytics, event)) {
        db.analytics[event] += 1
        await writeDb(db)
      }

      return sendJson(res, 200, { ok: true, analytics: db.analytics })
    }

    return sendJson(res, 404, { ok: false, error: 'Endpoint not found.' })
  } catch (error) {
    return sendJson(res, 500, { ok: false, error: error.message })
  }
}

createServer(handleRequest).listen(port, () => {
  console.log(`Monastery360 API running on http://localhost:${port}`)
})
