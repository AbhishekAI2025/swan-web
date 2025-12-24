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

## Next Up
- `apps/swan-functions` for backend APIs (Stripe donations, volunteer form)
- `packages/ui` for shared components/styles
