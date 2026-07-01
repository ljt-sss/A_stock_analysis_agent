<script setup lang="ts">
import { BookOpenCheck, FilePlus2, RefreshCw } from 'lucide-vue-next'

export type MemoryItem = { type: 'new' | 'update'; title: string; detail: string; time: string }
defineProps<{ items: MemoryItem[] }>()
</script>

<template>
  <section class="mc-panel memory-panel">
    <header class="mc-panel-head">
      <div><BookOpenCheck :size="16" /><span>Wiki Memory Update</span></div>
      <span class="panel-meta">versioned</span>
    </header>
    <ol class="memory-feed">
      <li v-for="item in items" :key="item.time + item.title">
        <div class="memory-icon"><component :is="item.type === 'new' ? FilePlus2 : RefreshCw" :size="15" /></div>
        <div><b>{{ item.title }}</b><p>{{ item.detail }}</p></div>
        <time>{{ item.time }}</time>
      </li>
    </ol>
  </section>
</template>
