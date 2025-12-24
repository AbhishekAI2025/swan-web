<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle?: string
    align?: 'left' | 'center'
  }>(),
  {
    align: 'left',
  },
)

const wrapperClasses = computed(() => (props.align === 'center' ? 'items-center text-center' : 'items-start text-left'))
</script>

<template>
  <div :class="['flex flex-col gap-3', wrapperClasses]">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 class="text-3xl font-bold leading-tight lg:text-4xl">{{ title }}</h2>
    <p
      v-if="subtitle"
      :class="[
        'text-base text-slate-600 lg:text-lg',
        align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-2xl',
      ]"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
