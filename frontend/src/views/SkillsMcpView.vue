<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { AlertTriangle, Quote, RotateCcw, Search, Target, Wrench } from 'lucide-vue-next'
import KpiCard from '../components/common/KpiCard.vue'
import BaseChart from '../components/charts/BaseChart.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { evalApi } from '../api/eval'

const metrics = ref<any>(null)
const skills = ref<any[]>([])
const tools = ref<any[]>([])
const calls = ref<any[]>([])

onMounted(async () => {
  ;[metrics.value, skills.value, tools.value, calls.value] = await Promise.all([
    evalApi.metrics(),
    evalApi.skills(),
    evalApi.tools(),
    evalApi.calls(),
  ])
})

const option = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: { top: 0 },
  grid: { left: 42, right: 42, top: 38, bottom: 28 },
  xAxis: { type: 'category', data: metrics.value?.trend.map((x: any) => x.date) || [] },
  yAxis: { type: 'value', min: 80, max: 100, splitLine: { lineStyle: { color: '#eef2f7' } } },
  series: [
    ['数据准确率', 'data_accuracy', '#2563eb'],
    ['检索命中率', 'retrieval_hit_rate', '#10b981'],
    ['工具成功率', 'tool_success_rate', '#f59e0b'],
  ].map(([name, key, color]) => ({
    name,
    type: 'line',
    smooth: true,
    symbol: 'none',
    data: metrics.value?.trend.map((x: any) => x[key]) || [],
    lineStyle: { color },
  })),
}))
</script>

<template>
  <div v-if="metrics">
    <div class="kpi-grid six grid">
      <KpiCard label="数据准确率" :value="metrics.data_accuracy + '%'" change="较上周 +2.31pp" tone="blue" :icon="Target" />
      <KpiCard label="检索命中率" :value="metrics.retrieval_hit_rate + '%'" change="较上周 +1.87pp" tone="green" :icon="Search" />
      <KpiCard label="引用覆盖率" :value="metrics.citation_coverage + '%'" change="较上周 +2.06pp" tone="purple" :icon="Quote" />
      <KpiCard label="工具成功率" :value="metrics.tool_success_rate + '%'" change="较上周 +3.41pp" tone="orange" :icon="Wrench" />
      <KpiCard label="幻觉率" :value="metrics.hallucination_rate + '%'" change="较上周 -0.64pp" tone="red" :icon="AlertTriangle" />
      <KpiCard label="任务恢复率" :value="metrics.task_recovery_rate + '%'" change="较上周 +1.23pp" tone="green" :icon="RotateCcw" />
    </div>
    <div class="chart-grid" style="grid-template-columns: 1.05fr 1fr 1fr">
      <article class="panel chart-panel">
        <div class="panel-title"><h2>评估趋势（近30天）</h2></div>
        <div class="panel-body"><BaseChart :option="option" :height="270" /></div>
      </article>
      <article class="panel">
        <div class="panel-title"><h2>技能（Skills）运行状态</h2></div>
        <div class="table-wrap"><table><thead><tr><th>技能名称</th><th>成功率</th><th>平均耗时</th><th>状态</th></tr></thead><tbody>
          <tr v-for="item in skills.slice(0, 7)" :key="item.name"><td><b>{{ item.title }}</b></td><td>{{ item.success_rate }}%</td><td>{{ (item.avg_latency_ms / 1000).toFixed(2) }}s</td><td><StatusBadge text="通过" tone="success" /></td></tr>
        </tbody></table></div>
      </article>
      <article class="panel">
        <div class="panel-title"><h2>MCP 工具（服务）</h2></div>
        <div v-for="item in tools" :key="item.name" style="padding:14px;border-bottom:1px solid var(--color-border)">
          <div style="display:flex;justify-content:space-between"><b>{{ item.name }}</b><StatusBadge text="在线" tone="success" /></div>
          <p class="muted">{{ item.tools.length }} 个工具 · 平均延迟 {{ item.avg_latency_ms }}ms</p>
          <div class="progress"><i :style="{ width: item.success_rate + '%' }"></i></div>
        </div>
      </article>
    </div>
    <div class="split-main" style="margin-top:14px">
      <article class="panel">
        <div class="panel-title"><h2>任务执行 / 工具调用日志</h2></div>
        <div class="table-wrap"><table><thead><tr><th>时间</th><th>工具 / 技能</th><th>类型</th><th>耗时</th><th>状态</th></tr></thead><tbody>
          <tr v-for="item in calls" :key="item.tool_name + item.created_at"><td>{{ item.created_at?.slice(11, 19) }}</td><td><b>{{ item.tool_name }}</b></td><td>{{ item.tool_type }}</td><td>{{ item.latency_ms }}ms</td><td><StatusBadge :text="item.status" tone="success" /></td></tr>
        </tbody></table></div>
      </article>
      <aside class="panel"><div class="panel-title"><h2>下一步行动建议</h2></div><ul class="timeline"><li>优化风险红旗分析的规则与特征库</li><li>加强检索召回策略，提升引用覆盖率</li><li>补充财报口径映射，减少数据期间问题</li></ul></aside>
    </div>
  </div>
  <div v-else class="empty">正在加载 Skills / MCP 指标...</div>
</template>
