<script setup lang="ts">
import CallToAction from '@/components/sections/CallToAction.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ImpactHighlights from '@/components/sections/ImpactHighlights.vue'
import MissionSection from '@/components/sections/MissionSection.vue'
import ProgramsSection from '@/components/sections/ProgramsSection.vue'
import type { ImpactStat, Pillar, Program } from '@/types/content'

const stats: ImpactStat[] = [
  {
    label: 'People with safe water',
    value: '148,200',
    detail: 'Reached through 312 community systems kept online this year',
  },
  {
    label: 'Clinics stabilized',
    value: '54',
    detail: 'Cold chains, sanitation, and backup power secured',
  },
  {
    label: 'Local jobs',
    value: '430',
    detail: 'Technicians, health workers, and community mobilizers employed',
  },
  {
    label: 'Crisis response',
    value: '24 hrs',
    detail: 'Average dispatch time for emergency supplies and repairs',
  },
]

const pillars: Pillar[] = [
  {
    title: 'Community governance',
    description: 'We train local councils to manage budgets, resolve conflicts, and oversee procurement with full transparency.',
  },
  {
    title: 'Women-first safety',
    description: 'Programs are co-designed with women leaders to protect time, safety, and leadership pathways.',
  },
  {
    title: 'Data & accountability',
    description: 'Site data, audits, and issue resolution timelines are shared with donors and community partners.',
  },
  {
    title: 'Climate resilience',
    description: 'Solar upgrades, flood-proof piping, and spare-parts networks keep systems running through shocks.',
  },
]

const programs: Program[] = [
  {
    title: 'Solar-powered water systems',
    focus: 'Infrastructure',
    summary: 'Design, build, and maintain solar pumping systems with trained local technicians and spare-parts pipelines.',
    impact: 'Average 37% reduction in waterborne illness within 12 months of commissioning.',
  },
  {
    title: 'Maternal health safeguards',
    focus: 'Health systems',
    summary: 'Stabilize clinics with clean water, sanitation, and power backups so deliveries and vaccines stay safe.',
    impact: 'Routine outages cut by 60% and vaccine viability protected across 54 clinics.',
  },
  {
    title: 'Safe schools initiative',
    focus: 'Protection & education',
    summary: 'Water access, handwashing, and menstrual hygiene support to keep students healthy and in class.',
    impact: 'Attendance restored within three weeks after safe water upgrades in every target school.',
  },
  {
    title: 'Climate early warning',
    focus: 'Preparedness',
    summary: 'Community-led monitoring and rapid response funds for floods, droughts, and displacement.',
    impact: '24-hour deployment window for repairs and emergency water storage.',
  },
]

const partnerActions = [
  'Join a monthly circle that keeps maintenance teams in the field year-round.',
  'Fund a clinic or school upgrade with quarterly reporting and open budgets.',
  'Partner with our engineers to pilot climate-smart solutions in high-risk areas.',
]
</script>

<template>
  <div class="space-y-16 lg:space-y-20">
    <HeroSection :stats="stats" />
    <MissionSection :pillars="pillars" />
    <ProgramsSection :programs="programs" />
    <ImpactHighlights :stats="stats" />
    <CallToAction
      title="Your support keeps clinics open, girls in school, and families together."
      subtitle="Give monthly or fund a full project. We commit to transparent budgets, community oversight, and quarterly impact updates."
      :actions="partnerActions"
    />

    <section id="contact" class="section-shell">
      <div class="card-soft grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div class="space-y-3">
          <p class="eyebrow">Talk with us</p>
          <h3 class="text-2xl font-semibold text-slate-900">Need a proposal or due diligence packet?</h3>
          <p class="text-sm text-slate-600">
            We share operational plans, risk registers, and compliance documentation with partners within two business days.
          </p>
        </div>
        <div class="flex flex-col gap-2 text-sm text-slate-700">
          <a class="font-semibold text-brand-deep hover:text-brand-primary" href="mailto:info@swanrelief.org">info@swanrelief.org</a>
          <a class="font-semibold text-brand-deep hover:text-brand-primary" href="tel:+12025550181">+1 (202) 555-0181</a>
          <p>Washington, DC • Nairobi • Dhaka</p>
        </div>
      </div>
    </section>
  </div>
</template>
