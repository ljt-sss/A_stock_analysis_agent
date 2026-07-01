<script setup lang="ts">
import { DatabaseZap, Radio } from 'lucide-vue-next'
defineProps<{ tools: any[] }>()
</script>

<template>
  <section class="mc-panel capability-panel">
    <header class="mc-panel-head"><div><DatabaseZap :size="16" /><span>MCP 服务矩阵</span></div><span class="live-indicator"><i></i> ONLINE</span></header>
    <div class="mcp-grid">
      <article v-for="tool in tools" :key="tool.name">
        <div class="mcp-top"><span><Radio :size="15" /></span><b>online</b></div>
        <h3>{{ tool.name }}</h3>
        <p>{{ tool.tools.length }} tools registered</p>
        <dl><div><dt>success</dt><dd>{{ tool.success_rate }}%</dd></div><div><dt>latency</dt><dd>{{ tool.avg_latency_ms }}ms</dd></div></dl>
      </article>
    </div>
  </section>
</template>
