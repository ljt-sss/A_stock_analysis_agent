<script setup lang="ts">
import { Bot } from 'lucide-vue-next'

defineProps<{ insight: any }>()
</script>

<template>
  <aside class="panel agent-panel">
    <div class="panel-title">
      <span class="agent-mark"><Bot :size="18" /></span>
      <h3>真实数据摘要</h3>
    </div>

    <template v-if="insight">
      <section>
        <b>估值</b>
        <span class="status-badge info">{{ insight.valuation?.label }}</span>
        <p>{{ insight.valuation?.text }}</p>
      </section>
      <section>
        <b>最新业绩</b>
        <span class="status-badge success">{{ insight.performance?.label }}</span>
        <p>{{ insight.performance?.text }}</p>
      </section>
      <section>
        <b>现金流</b>
        <p>{{ insight.cashflow?.text }}</p>
      </section>
      <section>
        <b>数据提醒</b>
        <ul><li v-for="x in insight.risks" :key="x">{{ x }}</li></ul>
      </section>
      <section>
        <b>后续关注</b>
        <ul><li v-for="x in insight.followups" :key="x">{{ x }}</li></ul>
      </section>
    </template>

    <p class="disclaimer">以上为公开数据摘要，不等同于 AI 报告；需要报告时请手动触发 AI 分析。</p>
  </aside>
</template>
