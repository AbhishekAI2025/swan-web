<script setup lang="ts">
import SectionHeading from '../common/SectionHeading.vue'

import type { ImpactStat } from '@/types/content'

defineProps<{
  stats: ImpactStat[]
}>()
</script>

<template>
  <section class="section-shell" id="impact">
    <div class="card-soft space-y-8 p-8 lg:p-10">
      <SectionHeading
        eyebrow="Impact"
        title="Measured, transparent outcomes the community can feel."
        subtitle="Impact dashboards are refreshed every quarter with partner sign-off, ensuring the numbers match lived experience."
        align="center"
      />

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="flex flex-col gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-left shadow-soft"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-deep">{{ stat.label }}</p>
          <p class="text-3xl font-bold text-slate-900">{{ stat.value }}</p>
          <p class="text-sm text-slate-600">{{ stat.detail }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
