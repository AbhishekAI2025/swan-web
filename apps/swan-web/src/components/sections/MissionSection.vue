<script setup lang="ts">
import SectionHeading from '../common/SectionHeading.vue'

import type { Pillar } from '@/types/content'

defineProps<{
  pillars: Pillar[]
}>()
</script>

<template>
  <section class="section-shell" id="mission">
    <div class="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="card-soft space-y-6 p-8 lg:p-10">
        <SectionHeading
          eyebrow="Our mission"
          title="We build systems that keep water, health, and trust flowing."
          subtitle="Our teams train local technicians, support women-led water councils, and work alongside clinics to keep families safe through crisis and recovery."
        />

        <div class="flex flex-wrap gap-3">
          <el-tag size="large" class="!bg-brand-sky !text-brand-deep">Community-owned</el-tag>
          <el-tag size="large" class="!bg-brand-sky !text-brand-deep">Data-verified</el-tag>
          <el-tag size="large" class="!bg-brand-sky !text-brand-deep">Transparent</el-tag>
        </div>

        <div class="grid gap-4 rounded-2xl border border-brand-sky/70 bg-white/80 p-4 text-sm text-slate-700">
          <div class="flex items-start gap-3">
            <span class="mt-1 h-2.5 w-2.5 rounded-full bg-brand-primary" />
            <p>
              Local leadership is non-negotiable. We invest in technicians, governance training, and women's safety committees so
              infrastructure and trust endure together.
            </p>
          </div>
          <div class="flex items-start gap-3">
            <span class="mt-1 h-2.5 w-2.5 rounded-full bg-brand-primary" />
            <p>
              Every site is monitored quarterly, with open dashboards for donors and communities. Issues are triaged within 72
              hours by nearby teams.
            </p>
          </div>
          <div class="flex items-start gap-3">
            <span class="mt-1 h-2.5 w-2.5 rounded-full bg-brand-primary" />
            <p>Climate-smart upgrades and spare-parts pipelines keep systems running through floods and droughts.</p>
          </div>
        </div>
      </div>

      <div class="grid gap-4">
        <article
          v-for="pillar in pillars"
          :key="pillar.title"
          class="card-soft border border-slate-200/80 p-6 transition hover:translate-y-[-2px]"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-deep">Priority</p>
          <h3 class="text-xl font-semibold text-slate-900">{{ pillar.title }}</h3>
          <p class="mt-2 text-sm text-slate-600">{{ pillar.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
