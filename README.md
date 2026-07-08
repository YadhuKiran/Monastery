# Monastery360

Monastery360 is a deployable Vite + React digital heritage prototype for Sikkim monastery discovery. It includes destination profiles, an OpenStreetMap-powered interactive map, a visit planner, a virtual tour, a festival calendar, searchable archives, a local heritage assistant, and a lightweight Node API for enquiry capture.

## Run locally.
 
```bash
npm install
npm run dev
```

## Run the API
//
```bash
npm run api
```

The API runs on `http://localhost:8080` and exposes:

- `GET /api/health`
- `GET /api/monasteries`
- `GET /api/festivals`
- `GET /api/archives`
- `GET /api/search?q=rumtek`
- `POST /api/enquiries`
- `GET /api/enquiries`

Enquiries are stored in `server/data/database.json`. The frontend enquiry form falls back to browser storage if the API is not running, so static demos remain usable.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Deployment

This project is ready for static deployment on Vercel, Netlify, Cloudflare Pages, or any static host that can serve a Vite build. SPA fallback files are included:

- `vercel.json` for Vercel rewrites.
- `public/_redirects` for Netlify redirects.

For a full-stack deployment, run the Vite frontend and the Node API as separate services, then set `VITE_API_URL` to the deployed API URL.

## Notes for a government demo

- The map uses OpenStreetMap tiles through Leaflet, so no paid map API key is required for the prototype.
- Content is local and can be replaced with officially verified department data.
- The included API/database layer is intentionally lightweight for demo and pilot use.
- Recommended next integrations for production procurement are authentication, admin CMS, analytics dashboard, accessibility audit, official GIS layers, multilingual content, secure media storage, spam protection, and audit logs.
