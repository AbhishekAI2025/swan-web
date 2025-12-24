<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuth } from '@/composables/useAuth'

const email = ref('')
const password = ref('')
const formError = ref<string | null>(null)

const route = useRoute()
const router = useRouter()

const { login, isAdmin, loading, user, error, authReady, logout } = useAuth()

watchEffect(() => {
  if (error.value) {
    formError.value = error.value
  }
})

const handleSubmit = async () => {
  formError.value = null
  if (!email.value || !password.value) {
    formError.value = 'Email and password are required.'
    return
  }

  try {
    await login(email.value, password.value)
    await authReady

    if (!isAdmin.value) {
      formError.value = 'Access restricted to admin accounts.'
      await logout()
      return
    }

    const redirect = (route.query.redirect as string) || '/admin'
    router.replace(redirect)
  } catch (err) {
    formError.value = (err as Error)?.message ?? 'Login failed.'
  }
}

if (user.value && isAdmin.value) {
  router.replace('/admin')
}
</script>

<template>
  <section class="section-shell py-10 lg:py-16">
    <div class="card-soft grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
      <div class="space-y-6 bg-gradient-to-br from-brand-sand via-brand-sky/70 to-white p-8 lg:p-12">
        <p class="pill">Admin access</p>
        <h1 class="text-3xl font-bold leading-tight lg:text-4xl">Sign in to manage Swan operations.</h1>
        <p class="text-base text-slate-700">
          Access is restricted to approved admin emails. If you need access, contact the operations lead.
        </p>
        <ul class="space-y-3 text-sm text-slate-700">
          <li class="flex items-start gap-3">
            <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep text-xs font-semibold text-white">✓</span>
            View donations, volunteers, and contacts.
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep text-xs font-semibold text-white">✓</span>
            Internal dashboards only. Public site is unaffected.
          </li>
        </ul>
      </div>

      <div class="p-8 lg:p-10">
        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-slate-900">Admin login</h2>
          <div class="space-y-3">
            <label class="block text-sm font-medium text-slate-700">
              Email
              <input
                v-model="email"
                type="email"
                autocomplete="username"
                class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                placeholder="admin@example.org"
              />
            </label>

            <label class="block text-sm font-medium text-slate-700">
              Password
              <input
                v-model="password"
                type="password"
                autocomplete="current-password"
                class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                placeholder="********"
              />
            </label>
          </div>

          <div v-if="formError" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {{ formError }}
          </div>

          <el-button
            type="primary"
            size="large"
            :loading="loading"
            :disabled="loading"
            class="!bg-brand-primary !text-white"
            @click="handleSubmit"
          >
            {{ loading ? 'Signing in…' : 'Sign in' }}
          </el-button>

          <p class="text-xs text-slate-500">
            Admin access only. Public routes and donation flows remain unaffected.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
