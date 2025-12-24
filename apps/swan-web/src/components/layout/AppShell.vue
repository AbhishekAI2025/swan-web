<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
</script>

<template>
  <div class="relative flex min-h-screen flex-col bg-white/70">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-brand-sky/80 via-white to-transparent"
    />

    <AppHeader />

    <main class="flex-1 py-10 lg:py-16">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>
