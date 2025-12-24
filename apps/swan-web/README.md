# swan-web

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Environment for Stripe Donate page

- `VITE_STRIPE_PUBLISHABLE_KEY` – required to render Stripe Elements.
- `VITE_FUNCTIONS_BASE_URL` – optional; set to your Firebase Functions base URL (defaults to production).

### Volunteer form
- Uses `submitVolunteer` Firebase Function to write to Firestore `volunteers` collection.
- Fields: name (required), email (required), phone, interests, notes, honeypot.

### Admin-only authentication (Firebase Auth)
- Env vars required:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_ADMIN_EMAILS` (comma-separated allowlist)
- Routes:
  - `/admin/login` – admin sign-in
  - `/admin` – protected dashboard (guarded by allowlist)

### Admin dashboard (read-only)
- Reads Firestore collections: `donations`, `volunteers`, `contacts`.
- Shows counts and tables only; no mutations.
# swan-web
