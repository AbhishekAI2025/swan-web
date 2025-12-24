import { computed, reactive, toRefs } from 'vue'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'

import { getFirebaseApp } from '@/lib/firebase'

const adminAllowlist = new Set(
  (import.meta.env.VITE_ADMIN_EMAILS ?? '')
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean),
)

let authLoadError: string | null = null
let authReadyResolver: (() => void) | null = null
const authReady = new Promise<void>((resolve) => {
  authReadyResolver = resolve
})

const state = reactive<{
  user: User | null
  initialized: boolean
  loading: boolean
  error: string | null
}>({
  user: null,
  initialized: false,
  loading: false,
  error: null,
})

let authInstance = null as ReturnType<typeof getAuth> | null

const initAuth = () => {
  if (authInstance) return authInstance

  try {
    authInstance = getAuth(getFirebaseApp())
    onAuthStateChanged(authInstance, (user) => {
      state.user = user
      state.initialized = true
      authReadyResolver?.()
    })
  } catch (error) {
    authLoadError = (error as Error)?.message ?? 'Unable to initialize auth.'
    state.error = authLoadError
    state.initialized = true
    authReadyResolver?.()
  }

  return authInstance
}

initAuth()

const isAdmin = computed(() => {
  if (!state.user?.email) return false
  return adminAllowlist.has(state.user.email.toLowerCase())
})

const login = async (email: string, password: string) => {
  const auth = initAuth()
  if (!auth) {
    throw new Error(authLoadError ?? 'Auth not available.')
  }

  state.loading = true
  state.error = null
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    state.error = (error as Error)?.message ?? 'Login failed.'
    throw error
  } finally {
    state.loading = false
  }
}

const logout = async () => {
  const auth = initAuth()
  if (!auth) return
  await signOut(auth)
}

export const useAuth = () => {
  return {
    ...toRefs(state),
    isAdmin,
    login,
    logout,
    adminAllowlist,
    authReady,
    authLoadError,
  }
}
