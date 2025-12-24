# Swan Web Monorepo

Public repo for the Swan website. The deployable frontend lives in `apps/swan-web` (Vue 3 + Vite + Tailwind + Element Plus). Additional apps/packages will be added alongside it.

## Layout
- `apps/swan-web/` – main web app and Vercel deploy target
- `packages/` – reserved for shared packages (empty today)

## Requirements
- Node 20.19+ (or 22.12+) and npm

## Local Development
```sh
cd apps/swan-web
npm install
npm run dev           # start dev server
npm run lint          # eslint with cache
npm run type-check    # vue-tsc project check
npm run build         # production bundle
npm run preview       # serve the built app locally
```

## Deployment (Vercel)
- Root Directory: `apps/swan-web`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Runtime: Node 20+ (matches `package.json` engines)

## Backend (Firebase Functions + Stripe)
- Firebase config: `firebase.json` points functions to `apps/swan-functions` (Node 20).
- Install once: `cd apps/swan-functions && npm install`.
- Stripe secrets (do not commit):\
  `firebase functions:config:set stripe.secret="sk_live_xxx" stripe.webhook="whsec_xxx"`
- Firestore: volunteer submissions stored in `volunteers` collection via `submitVolunteer` HTTPS function.
- Develop locally: `npm run serve` (emulator, uses config project `swan-platform`).
- Deploy functions: `npm run deploy`.

## Frontend Env Vars
- `VITE_STRIPE_PUBLISHABLE_KEY` – required for the Donate page.
- `VITE_FUNCTIONS_BASE_URL` – optional override (e.g., `http://localhost:5001/swan-platform/us-central1` for emulator). Default points to the live Cloud Functions base.
- Firebase Auth (admin-only):
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_ADMIN_EMAILS` – comma-separated allowlist for admin access.

## Next Up
- `apps/swan-functions` for backend APIs (Stripe donations, volunteer form)
- `packages/ui` for shared components/styles
