<script setup lang="ts">
import { Flame } from 'lucide-vue-next'
defineProps<{ skills: any[] }>()
const heat = (value: number) => value >= 98 ? 'hot' : value >= 95 ? 'warm' : 'cool'
</script>

<template>
  <section class="mc-panel capability-panel">
    <header class="mc-panel-head"><div><Flame :size="16" /><span>Skills 调用热力榜</span></div><span class="panel-meta">24h activity</span></header>
    <div class="skill-heat-list">
      <article v-for="(skill, index) in skills.slice(0, 8)" :key="skill.name">
        <span class="skill-rank">{{ String(index + 1).padStart(2, '0') }}</span>
        <div><b>{{ skill.title }}</b><code>{{ skill.name }}</code></div>
        <span class="heat-cell" :class="heat(Number(skill.success_rate))">{{ skill.success_rate }}%</span>
        <small>{{ skill.avg_latency_ms }}ms</small>
      </article>
    </div>
  </section>
</template>
