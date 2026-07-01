<script setup lang="ts">
import { Terminal } from 'lucide-vue-next'

export type ToolCallItem = { time: string; name: string; status: 'success' | 'warning' | 'running'; latency?: string; message?: string }
defineProps<{ calls: ToolCallItem[]; title?: string }>()
</script>

<template>
  <section class="mc-panel terminal-panel" aria-label="实时工具调用">
    <header class="mc-panel-head">
      <div><Terminal :size="16" /><span>{{ title || 'Skills / MCP Live Calls' }}</span></div>
      <span class="live-indicator"><i></i> LIVE</span>
    </header>
    <div class="terminal-body" role="log" aria-live="polite">
      <div v-for="item in calls" :key="item.time + item.name" class="terminal-line">
        <time>[{{ item.time }}]</time>
        <span class="terminal-command">{{ item.name }}</span>
        <b :class="`terminal-${item.status}`">{{ item.status }}</b>
        <span v-if="item.latency" class="terminal-latency">{{ item.latency }}</span>
        <small v-if="item.message">{{ item.message }}</small>
      </div>
      <div class="terminal-prompt"><span>$</span><i></i></div>
    </div>
  </section>
</template>
