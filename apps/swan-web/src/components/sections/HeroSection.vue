<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { ImpactStat } from '@/types/content'

defineProps<{
  stats: ImpactStat[]
}>()

const commitments = [
  'Community-led water committees with transparent budgets',
  'Rapid response teams for clinics and shelters in crises',
  'Data-backed monitoring every quarter with local partners',
  'Climate-smart solutions that honor local knowledge',
]

const scrollToDonate = () => {
  const anchor = document.getElementById('donate')
  anchor?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="section-shell">
    <div class="card-soft overflow-hidden">
      <div class="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div class="space-y-6 p-8 lg:p-12">
          <div class="pill w-fit">Humanitarian & Climate Resilience</div>
          <h1 class="text-4xl font-bold leading-tight lg:text-5xl">
            Clean water, safe health, and dignity for every community we stand beside.
          </h1>
          <p class="text-lg text-slate-600">
            Swan Relief equips local leaders with resources, engineering support, and community health programs so families can
            thrive without having to leave home.
          </p>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <el-button size="large" color="#1f7a8c" class="!text-white" @click="scrollToDonate">
              Fund a water system
            </el-button>
            <RouterLink
              :to="{ path: '/', hash: '#mission' }"
              class="inline-flex items-center gap-2 text-sm font-semibold text-brand-deep hover:text-brand-primary"
            >
              See how we work
              <span aria-hidden="true">→</span>
            </RouterLink>
          </div>

          <ul class="grid gap-3 text-slate-700 md:grid-cols-2">
            <li v-for="item in commitments" :key="item" class="flex items-start gap-3 rounded-xl bg-brand-sky/60 p-3">
              <span
                class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep text-xs font-semibold text-white"
              >
                ✓
              </span>
              <span class="text-sm font-medium leading-relaxed">{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="relative h-full bg-brand-sand/60">
          <div class="absolute inset-0 bg-gradient-to-br from-brand-sky/70 via-white to-transparent" />
          <div class="relative flex h-full flex-col gap-4 p-8">
            <div class="flex items-center justify-between rounded-2xl border border-brand-sky/60 bg-white/90 p-4 shadow-soft">
              <div>
                <p class="text-sm font-semibold text-brand-deep">Field teams active</p>
                <p class="text-3xl font-bold text-slate-900">26</p>
                <p class="text-sm text-slate-600">Across East Africa and South Asia</p>
              </div>
              <div class="rounded-xl bg-brand-primary/10 px-3 py-2 text-sm font-semibold text-brand-deep">
                Real-time updates
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div v-for="stat in stats.slice(0, 2)" :key="stat.label" class="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-soft">
                <p class="text-xs font-semibold uppercase tracking-[0.15em] text-brand-deep">{{ stat.label }}</p>
                <p class="text-3xl font-bold text-slate-900">{{ stat.value }}</p>
                <p class="text-sm text-slate-600">{{ stat.detail }}</p>
              </div>
            </div>

            <div class="card-soft border-brand-sky/60 bg-brand-deep text-white">
              <div class="flex items-center justify-between gap-4">
                <div class="space-y-2">
                  <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sand">Stewardship</p>
                  <p class="text-lg font-semibold">90% of every gift funds programs</p>
                  <p class="text-sm text-brand-sand/90">
                    Independent audits, open ledgers, and community oversight boards keep us accountable.
                  </p>
                </div>
                <div class="hidden rounded-xl bg-white/15 px-4 py-3 text-center text-sm font-semibold lg:block">
                  Live dashboards<br />
                  + monthly briefs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
