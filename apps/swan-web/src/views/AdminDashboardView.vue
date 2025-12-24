<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useRouter } from 'vue-router'

import { useAuth } from '@/composables/useAuth'
import { getDb } from '@/lib/firestore'
import type { AdminContact, AdminDonation, AdminVolunteer } from '@/types/admin'

const router = useRouter()
const { user, isAdmin, logout, authReady } = useAuth()

const welcomeName = computed(() => user.value?.email ?? 'Admin')

const donations = ref<AdminDonation[]>([])
const volunteers = ref<AdminVolunteer[]>([])
const contacts = ref<AdminContact[]>([])

const loading = ref(true)
const error = ref<string | null>(null)

const totalDonations = computed(() =>
  donations.value.reduce((sum, donation) => sum + (donation.amount ?? 0), 0),
)
const donationCount = computed(() => donations.value.length)
const volunteerCount = computed(() => volunteers.value.length)
const contactCount = computed(() => contacts.value.length)

const formatCurrency = (amount: number | undefined, currency = 'usd') => {
  if (!amount || Number.isNaN(amount)) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100)
}

const formatDate = (date?: string) => {
  if (!date) return '—'
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

const mapTimestamp = (value: unknown): string | undefined => {
  // Firestore Timestamp has a toDate method
  if (value && typeof value === 'object' && 'toDate' in value && typeof (value as any).toDate === 'function') {
    return (value as any).toDate().toISOString()
  }
  if (typeof value === 'string') return value
  return undefined
}

const fetchCollections = async () => {
  try {
    const db = getDb()

    const [donationsSnap, volunteersSnap, contactsSnap] = await Promise.all([
      getDocs(query(collection(db, 'donations'), orderBy('createdAt', 'desc'))).catch(() => null),
      getDocs(query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'))).catch(() => null),
      getDocs(query(collection(db, 'contacts'), orderBy('createdAt', 'desc'))).catch(() => null),
    ])

    donations.value =
      donationsSnap?.docs.map((doc) => {
        const data = doc.data() as any
        return {
          id: doc.id,
          amount: data.amount ?? 0,
          currency: data.currency ?? 'usd',
          email: data.email ?? '',
          createdAt: mapTimestamp(data.createdAt),
        }
      }) ?? []

    volunteers.value =
      volunteersSnap?.docs.map((doc) => {
        const data = doc.data() as any
        return {
          id: doc.id,
          name: data.name ?? '',
          email: data.email ?? '',
          phone: data.phone ?? '',
          interests: data.interests ?? '',
          message: data.message ?? '',
          createdAt: mapTimestamp(data.createdAt),
        }
      }) ?? []

    contacts.value =
      contactsSnap?.docs.map((doc) => {
        const data = doc.data() as any
        return {
          id: doc.id,
          name: data.name ?? '',
          email: data.email ?? '',
          message: data.message ?? '',
          createdAt: mapTimestamp(data.createdAt),
        }
      }) ?? []
  } catch (err) {
    error.value = (err as Error)?.message ?? 'Unable to load data.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await authReady
  if (!isAdmin.value) {
    router.replace({ name: 'admin-login', query: { redirect: '/admin' } })
    return
  }
  fetchCollections()
})

const handleLogout = async () => {
  await logout()
  router.replace({ name: 'admin-login' })
}
</script>

<template>
  <section class="section-shell space-y-8">
    <div class="card-soft overflow-hidden">
      <div class="bg-gradient-to-r from-brand-deep via-brand-primary to-brand-deep p-8 text-white lg:p-10">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sand">Admin</p>
        <div class="mt-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold lg:text-4xl">Operations console</h1>
            <p class="mt-2 text-sm text-brand-sand/90">Read-only data. Donation and public flows remain unchanged.</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">{{ welcomeName }}</div>
            <el-button size="small" class="!text-brand-deep" @click="handleLogout">Log out</el-button>
          </div>
        </div>
      </div>

      <div class="p-8 lg:p-10 space-y-8">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div class="card-soft border border-brand-sky/60 bg-white/90 p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-brand-deep">Total donations</p>
            <p class="mt-2 text-2xl font-bold text-slate-900">{{ formatCurrency(totalDonations || 0) }}</p>
            <p class="text-xs text-slate-500">Based on Firestore `donations` documents.</p>
          </div>
          <div class="card-soft border border-brand-sky/60 bg-white/90 p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-brand-deep">Donation count</p>
            <p class="mt-2 text-2xl font-bold text-slate-900">{{ donationCount }}</p>
            <p class="text-xs text-slate-500">One-time gifts tracked.</p>
          </div>
          <div class="card-soft border border-brand-sky/60 bg-white/90 p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-brand-deep">Volunteers</p>
            <p class="mt-2 text-2xl font-bold text-slate-900">{{ volunteerCount }}</p>
            <p class="text-xs text-slate-500">From Firestore `volunteers`.</p>
          </div>
          <div class="card-soft border border-brand-sky/60 bg-white/90 p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-brand-deep">Contacts</p>
            <p class="mt-2 text-2xl font-bold text-slate-900">{{ contactCount }}</p>
            <p class="text-xs text-slate-500">From Firestore `contacts`.</p>
          </div>
        </div>

        <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {{ error }}
        </div>

        <div v-else class="space-y-8">
          <div class="card-soft p-4">
            <div class="flex items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Donations</h2>
                <p class="text-sm text-slate-600">Read-only view from Firestore `donations`.</p>
              </div>
            </div>
            <div v-if="loading" class="py-6 text-center text-sm text-slate-600">Loading donations…</div>
            <div v-else-if="!donations.length" class="py-6 text-center text-sm text-slate-600">No donations recorded yet.</div>
            <el-table v-else :data="donations" style="width: 100%" size="small" class="mt-3">
              <el-table-column prop="email" label="Email" min-width="180" />
              <el-table-column label="Amount" min-width="120">
                <template #default="{ row }">
                  {{ formatCurrency(row.amount, row.currency) }}
                </template>
              </el-table-column>
              <el-table-column prop="currency" label="Currency" min-width="100" />
              <el-table-column label="Created" min-width="180">
                <template #default="{ row }">
                  {{ formatDate(row.createdAt) }}
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="card-soft p-4">
            <div class="flex items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Volunteers</h2>
                <p class="text-sm text-slate-600">Read-only view from Firestore `volunteers`.</p>
              </div>
            </div>
            <div v-if="loading" class="py-6 text-center text-sm text-slate-600">Loading volunteers…</div>
            <div v-else-if="!volunteers.length" class="py-6 text-center text-sm text-slate-600">No volunteers yet.</div>
            <el-table v-else :data="volunteers" style="width: 100%" size="small" class="mt-3">
              <el-table-column prop="name" label="Name" min-width="160" />
              <el-table-column prop="email" label="Email" min-width="180" />
              <el-table-column prop="phone" label="Phone" min-width="140" />
              <el-table-column prop="interests" label="Interests" min-width="180" />
              <el-table-column label="Created" min-width="180">
                <template #default="{ row }">
                  {{ formatDate(row.createdAt) }}
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="card-soft p-4">
            <div class="flex items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Contacts</h2>
                <p class="text-sm text-slate-600">Read-only view from Firestore `contacts`.</p>
              </div>
            </div>
            <div v-if="loading" class="py-6 text-center text-sm text-slate-600">Loading contacts…</div>
            <div v-else-if="!contacts.length" class="py-6 text-center text-sm text-slate-600">No contact submissions yet.</div>
            <el-table v-else :data="contacts" style="width: 100%" size="small" class="mt-3">
              <el-table-column prop="name" label="Name" min-width="160" />
              <el-table-column prop="email" label="Email" min-width="180" />
              <el-table-column prop="message" label="Message" min-width="220" />
              <el-table-column label="Created" min-width="180">
                <template #default="{ row }">
                  {{ formatDate(row.createdAt) }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
