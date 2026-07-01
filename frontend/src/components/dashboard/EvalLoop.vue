<script setup lang="ts">
import { ArrowRight, CheckCircle2, CircleX, FlaskConical, RotateCcw, Wrench } from 'lucide-vue-next'

const stages = [
  { label: 'Failed Task', icon: CircleX, tone: 'danger' },
  { label: 'Eval Case', icon: FlaskConical, tone: 'warning' },
  { label: 'Rule Fix', icon: Wrench, tone: 'info' },
  { label: 'Regression Test', icon: RotateCcw, tone: 'info' },
  { label: 'Skill Update', icon: CheckCircle2, tone: 'success' },
]
defineProps<{ resolved?: number; passRate?: string }>()
</script>

<template>
  <section class="mc-panel eval-loop-panel">
    <header class="mc-panel-head">
      <div><FlaskConical :size="16" /><span>Eval Self-improvement Loop</span></div>
      <span class="panel-meta">{{ resolved || 18 }} cases resolved</span>
    </header>
    <div class="eval-loop">
      <template v-for="(stage, index) in stages" :key="stage.label">
        <div class="eval-stage" :class="`tone-${stage.tone}`"><component :is="stage.icon" :size="17" /><span>{{ stage.label }}</span></div>
        <ArrowRight v-if="index < stages.length - 1" :size="16" class="eval-arrow" />
      </template>
    </div>
    <footer><span>Regression pass rate</span><strong>{{ passRate || '94.8%' }}</strong><i><b style="width:94.8%"></b></i></footer>
  </section>
</template>
