<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{
  title: string
  subtitle: string
  actions: string[]
}>()

const openEmail = () => {
  window.location.href = 'mailto:info@swanrelief.org'
}
</script>

<template>
  <section class="section-shell" id="donate">
    <div class="card-soft overflow-hidden bg-gradient-to-br from-brand-deep via-brand-primary to-brand-deep text-white">
      <div class="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div class="space-y-4 p-8 lg:p-10">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand">Partner with us</p>
          <h2 class="text-3xl font-bold leading-tight lg:text-4xl">{{ props.title }}</h2>
          <p class="text-base text-brand-sand/90 lg:text-lg">{{ props.subtitle }}</p>
          <div class="flex flex-wrap items-center gap-3">
            <el-button size="large" class="!bg-white !text-brand-deep" @click="openEmail">Start a partnership</el-button>
            <RouterLink
              to="/donate"
              class="inline-flex items-center gap-2 rounded-full bg-brand-deep/80 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-white hover:text-brand-deep"
            >
              Donate now
              <span aria-hidden="true">→</span>
            </RouterLink>
            <a
              class="inline-flex items-center gap-2 text-sm font-semibold text-brand-sand hover:text-white"
              href="https://www.guidestar.org/"
              target="_blank"
              rel="noreferrer"
            >
              Review our accreditation
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div class="relative h-full bg-white/5">
          <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
          <ul class="relative grid gap-4 p-8 lg:p-10">
            <li
              v-for="action in props.actions"
              :key="action"
              class="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-lg"
            >
              <span class="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-brand-deep">✓</span>
              <span class="text-sm font-medium leading-relaxed text-brand-sand">{{ action }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
