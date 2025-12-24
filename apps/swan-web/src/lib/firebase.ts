import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app'

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
}

const requiredKeys: Array<keyof FirebaseOptions> = ['apiKey', 'authDomain', 'projectId']
const missing = requiredKeys.filter((key) => !firebaseConfig[key])

if (missing.length) {
  console.warn(`Missing Firebase config keys: ${missing.join(', ')}. Admin routes will be disabled.`)
}

let app: FirebaseApp | undefined

export const getFirebaseApp = (): FirebaseApp => {
  if (app) return app

  if (missing.length) {
    throw new Error(`Firebase config is incomplete. Missing: ${missing.join(', ')}`)
  }

  app = getApps()[0] ?? initializeApp(firebaseConfig)
  return app
}
