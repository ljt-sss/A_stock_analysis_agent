<script setup lang="ts">
import { computed } from 'vue'
import { Radar } from 'lucide-vue-next'
import BaseChart from '../charts/BaseChart.vue'
const props = defineProps<{ metrics: any }>()
const option = computed(() => ({
  radar: {
    radius: '66%', splitNumber: 4,
    indicator: [
      { name: '数据准确', max: 100 }, { name: '检索命中', max: 100 }, { name: '引用覆盖', max: 100 },
      { name: '工具稳定', max: 100 }, { name: '任务恢复', max: 100 }, { name: '低幻觉', max: 100 },
    ],
    axisName: { color: '#475569', fontSize: 11 },
    splitLine: { lineStyle: { color: '#dbe5f2' } },
    splitArea: { areaStyle: { color: ['#f8fafc', '#f1f5f9'] } },
    axisLine: { lineStyle: { color: '#cbd8e8' } },
  },
  series: [{ type: 'radar', symbol: 'circle', symbolSize: 5, data: [{
    value: [props.metrics?.data_accuracy || 0, props.metrics?.retrieval_hit_rate || 0, props.metrics?.citation_coverage || 0, props.metrics?.tool_success_rate || 0, props.metrics?.task_recovery_rate || 0, 100 - (props.metrics?.hallucination_rate || 0)],
    areaStyle: { color: 'rgba(37,99,235,.16)' }, lineStyle: { color: '#2563eb', width: 2 }, itemStyle: { color: '#2563eb' },
  }] }],
}))
</script>

<template>
  <section class="mc-panel radar-panel">
    <header class="mc-panel-head"><div><Radar :size="16" /><span>Evidence Quality Radar</span></div><span class="panel-meta">6 dimensions</span></header>
    <BaseChart :option="option" :height="260" />
  </section>
</template>
