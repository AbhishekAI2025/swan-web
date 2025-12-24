<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'

const principles = [
  'Community boards govern every project with clear escalation paths.',
  'Quarterly audits and open ledgers keep partners aligned with the field.',
  'We hire locally first and invest in long-term careers for our teams.',
  'We design for climate resilience so families are protected through crisis.',
]
</script>

<template>
  <div class="space-y-12 py-8">
    <section class="section-shell">
      <div class="card-soft space-y-6 p-8 lg:p-10">
        <SectionHeading
          eyebrow="About Swan Relief"
          title="We are a humanitarian team dedicated to water, health, and dignity."
          subtitle="We partner with local leaders, governments, and health systems to build solutions that communities can sustain and trust."
        />
        <p class="text-base text-slate-600">
          Founded by engineers, clinicians, and community organizers, Swan Relief works across East Africa and South Asia to keep
          water flowing and clinics open. Our work is driven by local councils, monitored with clear data, and funded with full
          transparency to donors and communities alike.
        </p>
        <ul class="grid gap-3 rounded-2xl border border-brand-sky/70 bg-brand-sky/40 p-4 text-sm text-slate-700 md:grid-cols-2">
          <li v-for="principle in principles" :key="principle" class="flex items-start gap-2">
            <span class="mt-1 inline-block h-2 w-2 rounded-full bg-brand-primary" />
            <span>{{ principle }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="section-shell">
      <div class="grid gap-6 lg:grid-cols-3">
        <el-card class="!border-0 !bg-white/90 shadow-soft" body-style="padding: 20px;">
          <h3 class="text-xl font-semibold text-slate-900">Governance & compliance</h3>
          <p class="mt-2 text-sm text-slate-600">
            501(c)(3) registered in the US with local registrations in Kenya and Bangladesh. Annual audits are completed by third
            parties and shared with partners.
          </p>
        </el-card>

        <el-card class="!border-0 !bg-white/90 shadow-soft" body-style="padding: 20px;">
          <h3 class="text-xl font-semibold text-slate-900">Partnerships</h3>
          <p class="mt-2 text-sm text-slate-600">
            We work with ministries of health, local governments, and community cooperatives to ensure handover and long-term
            stewardship.
          </p>
        </el-card>

        <el-card class="!border-0 !bg-white/90 shadow-soft" body-style="padding: 20px;">
          <h3 class="text-xl font-semibold text-slate-900">Team</h3>
          <p class="mt-2 text-sm text-slate-600">
            82% of our staff are from the communities we serve, including program directors, engineers, clinicians, and
            safeguarding leads.
          </p>
        </el-card>
      </div>
    </section>
  </div>
</template>
