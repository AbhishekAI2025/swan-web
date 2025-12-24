<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { useRoute, RouterLink } from 'vue-router'

type NavLink = {
  label: string
  to: RouteLocationRaw
}

const route = useRoute()

const navLinks: NavLink[] = [
  { label: 'Home', to: { path: '/' } },
  { label: 'Mission', to: { path: '/', hash: '#mission' } },
  { label: 'Programs', to: { path: '/', hash: '#programs' } },
  { label: 'Impact', to: { path: '/', hash: '#impact' } },
  { label: 'About', to: { path: '/about' } },
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
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur">
    <div class="section-shell flex items-center justify-between gap-4 py-4">
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
          :to="{ path: '/', hash: '#donate' }"
          class="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:translate-y-[-1px] hover:bg-brand-deep"
        >
          Donate
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
