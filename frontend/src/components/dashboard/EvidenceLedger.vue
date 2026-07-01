<script setup lang="ts">
import { FileCheck2, ShieldCheck } from 'lucide-vue-next'

export type EvidenceItem = { source: string; period: string; evidence: string; supports: string; confidence: number }
defineProps<{ items: EvidenceItem[] }>()
</script>

<template>
  <section class="mc-panel evidence-panel">
    <header class="mc-panel-head">
      <div><FileCheck2 :size="16" /><span>Evidence Ledger</span></div>
      <span class="panel-meta">{{ items.length }} verified sources</span>
    </header>
    <div class="evidence-list">
      <article v-for="item in items" :key="item.source + item.evidence">
        <div class="evidence-source"><span>{{ item.source }}</span><time>{{ item.period }}</time></div>
        <p>{{ item.evidence }}</p>
        <div class="evidence-support"><ShieldCheck :size="14" /><span>支撑结论：{{ item.supports }}</span></div>
        <div class="confidence-row"><span>Confidence</span><i><b :style="{ width: `${item.confidence}%` }"></b></i><strong>{{ item.confidence }}%</strong></div>
      </article>
    </div>
  </section>
</template>
