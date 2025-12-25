<script setup lang="ts">
import { ref, watch } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { RouterLink, useRoute } from 'vue-router'

type NavLink = {
  label: string
  to: RouteLocationRaw
}

const route = useRoute()
const isMenuOpen = ref(false)

const navLinks: NavLink[] = [
  { label: 'Home', to: { path: '/' } },
  { label: 'Mission', to: { path: '/', hash: '#mission' } },
  { label: 'Programs', to: { path: '/', hash: '#programs' } },
  { label: 'Impact', to: { path: '/', hash: '#impact' } },
  { label: 'About', to: { path: '/about' } },
  { label: 'Donate', to: { path: '/donate' } },
  { label: 'Volunteer', to: { path: '/volunteer' } },
]

const isActive = (link: NavLink) => {
  if (typeof link.to === 'string') {
    return route.path === link.to
  }

  if (typeof link.to === 'object' && 'path' in link.to && link.to.path) {
    return route.path === link.to.path
  }

  return false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  }
)
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur">
    <div class="section-shell relative flex items-center justify-between gap-4 py-4">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-deep text-lg font-semibold text-white shadow-lg shadow-brand-deep/20">
          SW
        </div>
        <div class="leading-tight">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-brand-deep">Swan Relief</p>
          <p class="text-sm text-slate-600">Clean water. Safe health. Strong futures.</p>
        </div>
      </RouterLink>

      <nav class="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/70 px-2 py-1 shadow-sm shadow-brand-deep/5 md:flex">
        <RouterLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
          :class="isActive(link) ? 'bg-brand-sky/80 text-brand-deep' : 'text-slate-600 hover:bg-brand-sky/60 hover:text-brand-deep'"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-3">
        <RouterLink
          :to="{ path: '/', hash: '#contact' }"
          class="hidden text-sm font-medium text-slate-600 hover:text-brand-deep md:inline-flex"
        >
          Contact
        </RouterLink>
        <RouterLink
          :to="{ path: '/donate' }"
          class="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:translate-y-[-1px] hover:bg-brand-deep"
        >
          Donate
          <span aria-hidden="true">→</span>
        </RouterLink>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 7.5h16M4 12h16M4 16.5h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="m6.75 6.75 10.5 10.5M17.25 6.75 6.75 17.25" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="isMenuOpen" class="md:hidden">
      <div class="fixed inset-0 z-20 bg-slate-900/20 backdrop-blur-sm" @click="closeMenu" aria-hidden="true" />

      <div class="section-shell relative z-30">
        <div
          id="mobile-nav"
          class="mt-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5 backdrop-blur-sm"
        >
          <nav class="flex flex-col divide-y divide-slate-200/70">
            <RouterLink
              v-for="link in navLinks"
              :key="link.label"
              :to="link.to"
              class="px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-brand-sky/50 hover:text-brand-deep"
              :class="isActive(link) ? 'bg-brand-sky/60 text-brand-deep' : ''"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>
            <RouterLink
              :to="{ path: '/', hash: '#contact' }"
              class="px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-brand-sky/50 hover:text-brand-deep"
              @click="closeMenu"
            >
              Contact
            </RouterLink>
          </nav>

          <div class="border-t border-slate-200/70 bg-slate-50/80 p-4">
            <RouterLink
              :to="{ path: '/donate' }"
              class="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-4 py-3 text-base font-semibold text-white shadow-soft transition hover:-translate-y-[1px] hover:bg-brand-deep"
              @click="closeMenu"
            >
              Donate
              <span aria-hidden="true">→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
