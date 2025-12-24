<script setup lang="ts">
import { ref } from 'vue'

const functionsBaseUrl =
  import.meta.env.VITE_FUNCTIONS_BASE_URL ?? 'https://us-central1-swan-platform.cloudfunctions.net'

const name = ref('')
const email = ref('')
const phone = ref('')
const interests = ref('')
const message = ref('')
const honeypot = ref('')

const loading = ref(false)
const success = ref(false)
const errorMessage = ref<string | null>(null)

const resetForm = () => {
  name.value = ''
  email.value = ''
  phone.value = ''
  interests.value = ''
  message.value = ''
  honeypot.value = ''
}

const submitVolunteer = async () => {
  if (loading.value) return
  success.value = false
  errorMessage.value = null

  if (!name.value || !email.value) {
    errorMessage.value = 'Please provide your name and email.'
    return
  }

  loading.value = true
  try {
    const response = await fetch(`${functionsBaseUrl}/submitVolunteer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        phone: phone.value,
        interests: interests.value,
        message: message.value,
        honeypot: honeypot.value,
      }),
    })

    const data = await response.json()

    if (!response.ok || data?.error) {
      throw new Error(data?.error || 'Unable to submit. Please try again.')
    }

    success.value = true
    resetForm()
  } catch (error) {
    errorMessage.value = (error as Error)?.message ?? 'Unable to submit. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
    <div class="card-soft space-y-4 p-6 lg:p-8">
      <div class="space-y-1">
        <p class="eyebrow text-brand-primary">Volunteer</p>
        <h1 class="text-2xl font-semibold lg:text-3xl">Stand with communities keeping water flowing.</h1>
        <p class="text-sm text-slate-600">
          Share where you’d like to help and we’ll respond within one business day. This form uses our secure backend; data is
          stored in Firestore.
        </p>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <label class="block text-sm font-medium text-slate-700">
          Name *
          <input
            v-model="name"
            type="text"
            class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            placeholder="Your name"
          />
        </label>

        <label class="block text-sm font-medium text-slate-700">
          Email *
          <input
            v-model="email"
            type="email"
            class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <label class="block text-sm font-medium text-slate-700">
          Phone
          <input
            v-model="phone"
            type="tel"
            class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            placeholder="+1 (202) 555-0181"
          />
        </label>

        <label class="block text-sm font-medium text-slate-700">
          Interests (skills, availability)
          <input
            v-model="interests"
            type="text"
            class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            placeholder="e.g., Field logistics, design, fundraising"
          />
        </label>
      </div>

      <label class="block text-sm font-medium text-slate-700">
        Notes
        <textarea
          v-model="message"
          rows="3"
          class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          placeholder="Tell us more about how you’d like to help."
        />
      </label>

      <input v-model="honeypot" type="text" autocomplete="off" tabindex="-1" class="hidden" aria-hidden="true" />

      <div class="space-y-3">
        <el-button
          type="primary"
          size="large"
          :loading="loading"
          :disabled="loading"
          class="!bg-brand-primary !text-white"
          @click="submitVolunteer"
        >
          {{ loading ? 'Submitting…' : 'Submit interest' }}
        </el-button>

        <div v-if="errorMessage" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {{ errorMessage }}
        </div>
        <div v-if="success" class="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Thank you. We received your interest and will follow up within one business day.
        </div>

        <p class="text-xs text-slate-500">
          Data is stored securely in Firestore. We will never share your information. If you prefer email, reach us at
          <a href="mailto:info@swanrelief.org" class="font-semibold text-brand-primary">info@swanrelief.org</a>.
        </p>
      </div>
    </div>

    <aside class="card-soft space-y-4 p-6 lg:p-8">
      <div>
        <p class="eyebrow text-brand-primary">Where volunteers help</p>
        <h2 class="text-xl font-semibold">Logistics, community mobilization, and storytelling.</h2>
      </div>
      <ul class="space-y-3 text-sm text-slate-700">
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep text-xs font-semibold text-white">✓</span>
          Field logistics and partner coordination.
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep text-xs font-semibold text-white">✓</span>
          Community health outreach and training support.
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep text-xs font-semibold text-white">✓</span>
          Storytelling, design, and donor communications.
        </li>
      </ul>

      <div class="rounded-2xl bg-brand-deep px-4 py-5 text-sm text-white shadow-soft">
        <p class="font-semibold">Prefer a call?</p>
        <p class="mt-1 text-brand-sand/90">
          Email <a href="mailto:info@swanrelief.org" class="underline">info@swanrelief.org</a> and we’ll schedule a conversation.
        </p>
      </div>
    </aside>
  </div>
</template>
