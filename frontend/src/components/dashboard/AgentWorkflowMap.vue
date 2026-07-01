<script setup lang="ts">
import { Check, Clock3, LoaderCircle, TriangleAlert } from 'lucide-vue-next'

export type WorkflowStatus = 'success' | 'running' | 'waiting' | 'warning'
export type WorkflowNode = { name: string; label: string; detail: string; status: WorkflowStatus }

defineProps<{ nodes: WorkflowNode[]; compact?: boolean }>()

const icons = { success: Check, running: LoaderCircle, waiting: Clock3, warning: TriangleAlert }
const statusText = { success: 'success', running: 'running', waiting: 'waiting', warning: 'warning' }
</script>

<template>
  <ol class="workflow-map" :class="{ compact }" aria-label="Agent 工作流">
    <li v-for="(node, index) in nodes" :key="node.name" :class="`is-${node.status}`">
      <div class="workflow-rail" aria-hidden="true"><span></span></div>
      <div class="workflow-node">
        <div class="node-icon"><component :is="icons[node.status]" :size="15" /></div>
        <div class="node-copy">
          <b>{{ node.label }}</b>
          <small>{{ node.detail }}</small>
        </div>
        <code>{{ statusText[node.status] }}</code>
      </div>
      <span v-if="index < nodes.length - 1" class="workflow-link" aria-hidden="true"></span>
    </li>
  </ol>
</template>
