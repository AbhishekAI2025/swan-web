<script setup lang="ts">
import VolunteerForm from '@/components/volunteer/VolunteerForm.vue'
</script>

<template>
  <section class="section-shell space-y-8">
    <div class="card-soft overflow-hidden">
      <div class="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="space-y-4 p-8 lg:p-12">
          <p class="pill">Volunteer</p>
          <h1 class="text-4xl font-bold leading-tight lg:text-5xl">Help us keep water and health systems running.</h1>
          <p class="text-lg text-slate-700">
            We partner with local leaders and need skilled volunteers to strengthen logistics, health outreach, design, and
            donor communications. Share your interests; we’ll respond quickly.
          </p>
          <ul class="grid gap-3 text-slate-700 md:grid-cols-2">
            <li class="flex items-start gap-3 rounded-xl bg-brand-sky/70 p-3">
              <span
                class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep text-xs font-semibold text-white"
              >
                ✓
              </span>
              <span class="text-sm font-medium leading-relaxed">Roles in logistics, outreach, and creative storytelling.</span>
            </li>
            <li class="flex items-start gap-3 rounded-xl bg-brand-sky/70 p-3">
              <span
                class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep text-xs font-semibold text-white"
              >
                ✓
              </span>
              <span class="text-sm font-medium leading-relaxed">We reply within one business day.</span>
            </li>
          </ul>
        </div>
        <div class="h-full bg-brand-sand/70">
          <div class="h-full bg-gradient-to-br from-white via-brand-sky/60 to-white/50" />
        </div>
      </div>
    </div>

    <VolunteerForm />
  </section>
</template>
