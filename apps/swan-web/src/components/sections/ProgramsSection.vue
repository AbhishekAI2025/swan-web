<script setup lang="ts">
import SectionHeading from '../common/SectionHeading.vue'

import type { Program } from '@/types/content'

defineProps<{
  programs: Program[]
}>()
</script>

<template>
  <section class="section-shell" id="programs">
    <div class="card-soft space-y-8 p-8 lg:p-10">
      <SectionHeading
        eyebrow="Programs"
        title="Evidence-backed programs rooted in local leadership."
        subtitle="Every program blends engineering, health, and livelihood support so communities are resilient long after we leave."
        align="center"
      />

      <div class="grid gap-6 md:grid-cols-2">
        <el-card
          v-for="program in programs"
          :key="program.title"
          class="!border-0 !bg-white/90 shadow-soft"
          body-style="padding: 20px;"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-deep">{{ program.focus }}</p>
              <h3 class="mt-1 text-xl font-semibold text-slate-900">{{ program.title }}</h3>
            </div>
            <el-tag type="info" class="!bg-brand-sky !text-brand-deep">Active</el-tag>
          </div>
          <p class="mt-3 text-sm text-slate-600">{{ program.summary }}</p>

          <div class="mt-4 rounded-xl bg-brand-sky/60 p-3 text-sm text-brand-deep">
            {{ program.impact }}
          </div>

          <div class="mt-4 flex items-center justify-between text-sm font-semibold text-brand-deep">
            <span>Fully monitored</span>
            <span aria-hidden="true">→</span>
          </div>
        </el-card>
      </div>
    </div>
  </section>
</template>
