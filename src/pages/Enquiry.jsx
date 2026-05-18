import { useState } from 'react'
import { CheckCircle2, Mail, Send, ShieldCheck } from 'lucide-react'
import { createEnquiry } from '../lib/api.js'

const initialForm = {
  name: '',
  email: '',
  organisation: '',
  interest: 'Government demo',
  message: '',
}

export default function Enquiry() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    try {
      const result = await createEnquiry(form)
      setStatus({
        type: 'success',
        text:
          result.source === 'api'
            ? 'Enquiry submitted to the Monastery360 API database.'
            : 'API is offline, so this enquiry was saved locally in the browser for demo continuity.',
      })
      setForm(initialForm)
    } catch (error) {
      setStatus({ type: 'error', text: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Partnership Enquiry</h1>
          <p>Capture government, tourism, archive, and implementation enquiries through a real form workflow.</p>
        </div>
      </section>

      <section className="section">
        <div className="container enquiry-layout">
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input value={form.name} onChange={(event) => updateField('name', event.target.value)} required />
            </label>
            <label>
              Email address
              <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required />
            </label>
            <label>
              Organisation
              <input value={form.organisation} onChange={(event) => updateField('organisation', event.target.value)} />
            </label>
            <label>
              Interest area
              <select value={form.interest} onChange={(event) => updateField('interest', event.target.value)}>
                <option>Government demo</option>
                <option>Tourism partnership</option>
                <option>Archive digitisation</option>
                <option>Technical deployment</option>
                <option>Content verification</option>
              </select>
            </label>
            <label className="form-full">
              Message
              <textarea
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
                rows={6}
                required
                placeholder="Tell us what you want to evaluate, deploy, or verify."
              />
            </label>
            <button className="btn-primary form-full" disabled={isSubmitting}>
              <Send size={16} /> {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
            {status && <p className={`form-status ${status.type}`}>{status.text}</p>}
          </form>

          <aside className="enquiry-aside">
            <Mail />
            <h2>Why This Matters</h2>
            <p>
              A project meant for departments or tourism stakeholders needs a capture path. This page proves the
              platform can collect enquiries and store them in an API-backed database during a full-stack deployment.
            </p>
            <div className="info-check-list">
              <p><CheckCircle2 /> Works with the Node API when it is running.</p>
              <p><CheckCircle2 /> Falls back to local browser storage during static demos.</p>
              <p><CheckCircle2 /> Keeps the user journey complete from pitch to contact.</p>
            </div>
            <div className="privacy-note">
              <ShieldCheck />
              <p>Production deployment should add authentication, spam protection, audit logs, and official privacy review.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
