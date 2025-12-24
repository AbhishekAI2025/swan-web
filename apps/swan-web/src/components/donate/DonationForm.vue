<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { loadStripe, type Stripe, type StripeCardElement, type StripeElements } from '@stripe/stripe-js'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const functionsBaseUrl =
  import.meta.env.VITE_FUNCTIONS_BASE_URL ?? 'https://us-central1-swan-platform.cloudfunctions.net'

const presetAmounts = [25, 50, 100, 250]
const selectedPreset = ref<number>(50)
const customAmount = ref<number | null>(null)
const name = ref('')
const email = ref('')
const status = ref<'idle' | 'processing' | 'succeeded'>('idle')
const cardError = ref<string | null>(null)
const message = ref<string | null>(null)

const amountInCents = computed(() => {
  const amount = customAmount.value && customAmount.value > 0 ? customAmount.value : selectedPreset.value
  return Math.round(amount * 100)
})

let stripe: Stripe | null = null
let elements: StripeElements | null = null
let cardElement: StripeCardElement | null = null

const mountCardElement = async () => {
  cardError.value = null

  if (!publishableKey) {
    cardError.value = 'Missing Stripe publishable key. Set VITE_STRIPE_PUBLISHABLE_KEY.'
    return
  }

  stripe = await loadStripe(publishableKey)
  if (!stripe) {
    cardError.value = 'Unable to load Stripe. Check your publishable key.'
    return
  }

  elements = stripe.elements()
  cardElement = elements.create('card', {
    hidePostalCode: true,
    style: {
      base: {
        color: '#0f3b3f',
        fontFamily: '"DM Sans", system-ui, sans-serif',
        fontSize: '16px',
        '::placeholder': { color: '#9ca3af' },
      },
      invalid: {
        color: '#ef4444',
      },
    },
  })

  cardElement.mount('#card-element')
}

const resetForm = () => {
  status.value = 'idle'
  message.value = null
  cardError.value = null
}

const createPaymentIntent = async () => {
  const response = await fetch(`${functionsBaseUrl}/createDonationIntent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: amountInCents.value,
      currency: 'usd',
      email: email.value || undefined,
      name: name.value || undefined,
    }),
  })

  const data = await response.json()

  if (!response.ok || !data?.clientSecret) {
    const message = data?.error || 'Unable to start payment. Please try again.'
    throw new Error(message)
  }

  return data.clientSecret as string
}

const submitDonation = async () => {
  resetForm()

  if (amountInCents.value < 200) {
    cardError.value = 'Minimum donation is $2.'
    return
  }

  if (!stripe || !elements || !cardElement) {
    cardError.value = 'Payment form is not ready. Reload the page and try again.'
    return
  }

  status.value = 'processing'

  try {
    const clientSecret = await createPaymentIntent()

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name.value || undefined,
          email: email.value || undefined,
        },
      },
    })

    if (result.error) {
      throw new Error(result.error.message || 'Payment was not completed.')
    }

    if (result.paymentIntent?.status === 'succeeded') {
      status.value = 'succeeded'
      cardElement.clear()
      message.value = 'Thank you. Your gift is confirmed and directly fuels field work.'
      return
    }

    throw new Error('Payment not completed. Please try again.')
  } catch (error) {
    status.value = 'idle'
    cardError.value = (error as Error)?.message ?? 'Payment failed. Please try again.'
  }
}

onMounted(async () => {
  await mountCardElement()
})

onBeforeUnmount(() => {
  cardElement?.destroy()
})
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
    <div class="card-soft space-y-4 p-6 lg:p-8">
      <div class="space-y-1">
        <p class="eyebrow text-brand-primary">Donation</p>
        <h1 class="text-2xl font-semibold lg:text-3xl">Fuel water access, clinics, and safe schools.</h1>
        <p class="text-sm text-slate-600">Secure payment processed by Stripe. You will receive a receipt by email.</p>
      </div>

      <div class="space-y-3">
        <p class="text-sm font-semibold text-slate-700">Choose an amount</p>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            v-for="amount in presetAmounts"
            :key="amount"
            type="button"
            class="rounded-xl border px-4 py-3 text-sm font-semibold transition"
            :class="
              selectedPreset === amount
                ? 'border-brand-deep bg-brand-sky/80 text-brand-deep shadow-soft'
                : 'border-slate-200 bg-white text-slate-700 hover:border-brand-primary/70 hover:text-brand-deep'
            "
            @click="() => { selectedPreset = amount; customAmount = null }"
          >
            ${{ amount }}
          </button>
        </div>

        <label class="block text-sm font-medium text-slate-700">
          Custom amount
          <div class="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
            <span class="text-slate-500">$</span>
            <input
              v-model.number="customAmount"
              type="number"
              min="1"
              step="1"
              placeholder="Enter amount"
              class="w-full bg-transparent text-base text-slate-800 outline-none"
            />
          </div>
        </label>

        <div class="grid gap-3 md:grid-cols-2">
          <label class="block text-sm font-medium text-slate-700">
            Name
            <input
              v-model="name"
              type="text"
              class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              placeholder="Your name"
            />
          </label>

          <label class="block text-sm font-medium text-slate-700">
            Email for receipt
            <input
              v-model="email"
              type="email"
              class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <div class="space-y-2">
          <p class="text-sm font-semibold text-slate-700">Payment details</p>
          <div id="card-element" class="rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-inner"></div>
        </div>

        <div v-if="cardError" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {{ cardError }}
        </div>

        <div v-if="message" class="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {{ message }}
        </div>

        <el-button
          type="primary"
          size="large"
          :loading="status === 'processing'"
          :disabled="status !== 'idle'"
          class="!bg-brand-primary !text-white"
          @click="submitDonation"
        >
          {{ status === 'succeeded' ? 'Donation received' : `Donate $${(amountInCents / 100).toFixed(0)}` }}
        </el-button>

        <p class="text-xs text-slate-500">
          Stripe processes your payment securely. We do not store card details. Minimum donation $2.
        </p>
      </div>
    </div>

    <aside class="card-soft space-y-4 p-6 lg:p-8">
      <div>
        <p class="eyebrow text-brand-primary">Where your gift goes</p>
        <h2 class="text-xl font-semibold">Every dollar is tracked and reported.</h2>
      </div>
      <ul class="space-y-3 text-sm text-slate-700">
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep text-xs font-semibold text-white">✓</span>
          Water systems, clinic stabilization, and school protections with quarterly updates.
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep text-xs font-semibold text-white">✓</span>
          Local jobs: technicians, community mobilizers, and health workers.
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep text-xs font-semibold text-white">✓</span>
          Crisis response funds ready for floods, outbreaks, and displacement.
        </li>
      </ul>

      <div class="rounded-2xl bg-brand-deep px-4 py-5 text-sm text-white shadow-soft">
        <p class="font-semibold">Prefer a partnership call?</p>
        <p class="mt-1 text-brand-sand/90">Email <a href="mailto:info@swanrelief.org" class="underline">info@swanrelief.org</a> and we will respond within one business day.</p>
      </div>
    </aside>
  </div>
</template>
