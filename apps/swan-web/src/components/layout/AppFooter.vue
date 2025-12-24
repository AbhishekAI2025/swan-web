<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="border-t border-white/60 bg-white/90">
    <div class="section-shell grid gap-10 py-10 lg:grid-cols-4 lg:py-14">
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-deep text-sm font-semibold text-white">
            SW
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-deep">Swan Relief</p>
            <p class="text-sm text-slate-600">Registered non-profit</p>
          </div>
        </div>
        <p class="max-w-sm text-sm text-slate-600">
          We partner with communities to protect water, health, and dignity through local leadership and transparent stewardship.
        </p>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">Quick links</h3>
        <div class="flex flex-col gap-2 text-sm text-slate-600">
          <RouterLink class="hover:text-brand-deep" to="/">Home</RouterLink>
          <RouterLink class="hover:text-brand-deep" :to="{ path: '/', hash: '#programs' }">Programs</RouterLink>
          <RouterLink class="hover:text-brand-deep" :to="{ path: '/', hash: '#impact' }">Impact</RouterLink>
          <RouterLink class="hover:text-brand-deep" to="/about">About</RouterLink>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">Contact</h3>
        <ul class="space-y-2 text-sm text-slate-600">
          <li>info@swanrelief.org</li>
          <li>+1 (202) 555-0181</li>
          <li>Washington, DC</li>
        </ul>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">Transparency</h3>
        <p class="text-sm text-slate-600">
          Annual reports, audited financials, and program dashboards are available on request. We share real-time impact updates with donors and partners.
        </p>
        <RouterLink
          class="inline-flex items-center gap-2 text-sm font-semibold text-brand-deep hover:text-brand-primary"
          to="/about"
        >
          View our approach
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>

    <div class="border-t border-white/60 bg-brand-sand/60">
      <div class="section-shell flex flex-col gap-2 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} Swan Relief. All rights reserved.</p>
        <p class="flex gap-3">
          <span>501(c)(3) | EIN 12-3456789</span>
        </p>
      </div>
    </div>
  </footer>
</template>
