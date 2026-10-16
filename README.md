# LHIMF Dev

Next.js (App Router) + TypeScript port of the LHIMF Dev landing page.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit
- `lib/data.ts` – contact email, social links, pricing, projects, tech stack, form endpoint
- `public/images/<slug>.png` – project screenshots (e.g. `barangaycofradia.png`)
- `app/globals.css` – all styles

## Deploy
Push to GitHub and import into Vercel (no extra config needed).
