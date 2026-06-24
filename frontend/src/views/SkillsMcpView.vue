<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Activity, BookOpenCheck, Brain, DatabaseZap, Wrench } from 'lucide-vue-next'
import KpiCard from '../components/common/KpiCard.vue'
import BaseChart from '../components/charts/BaseChart.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { evalApi } from '../api/eval'
import { wikiApi } from '../api/wiki'

const metrics = ref<any>(null)
const skills = ref<any[]>([])
const tools = ref<any[]>([])
const calls = ref<any[]>([])
const wikiPages = ref<any[]>([])
const memories = ref<any[]>([])

onMounted(async () => {
  ;[metrics.value, skills.value, tools.value, calls.value, wikiPages.value, memories.value] = await Promise.all([
    evalApi.metrics(),
    evalApi.skills(),
    evalApi.tools(),
    evalApi.calls(),
    wikiApi.pages(),
    wikiApi.memories(''),
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
      <KpiCard label="wiki 页面" :value="String(wikiPages.length)" change="AI 报告归档" tone="blue" :icon="BookOpenCheck" />
      <KpiCard label="记忆条目" :value="String(memories.length)" change="长期复盘素材" tone="green" :icon="Brain" />
      <KpiCard label="Skills" :value="String(skills.length)" change="可复用分析能力" tone="purple" :icon="Activity" />
      <KpiCard label="MCP 服务" :value="String(tools.length)" change="数据与工具接口" tone="orange" :icon="DatabaseZap" />
      <KpiCard label="工具成功率" :value="metrics.tool_success_rate + '%'" change="近30天" tone="green" :icon="Wrench" />
      <KpiCard label="引用覆盖率" :value="metrics.citation_coverage + '%'" change="报告可核验" tone="blue" :icon="BookOpenCheck" />
    </div>

    <div class="chart-grid ops-grid">
      <article class="panel chart-panel">
        <div class="panel-title"><h2>评估趋势（近30天）</h2></div>
        <div class="panel-body"><BaseChart :option="option" :height="270" /></div>
      </article>

      <article class="panel">
        <div class="panel-title"><h2>Skills 使用状态</h2></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>技能</th><th>成功率</th><th>平均耗时</th><th>状态</th></tr></thead>
            <tbody>
              <tr v-for="item in skills.slice(0, 8)" :key="item.name">
                <td><b>{{ item.title }}</b><br><small class="muted">{{ item.name }}</small></td>
                <td>{{ item.success_rate }}%</td>
                <td>{{ (item.avg_latency_ms / 1000).toFixed(2) }}s</td>
                <td><StatusBadge text="可用" tone="success" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <article class="panel">
        <div class="panel-title"><h2>MCP 服务</h2></div>
        <div v-for="item in tools" :key="item.name" class="tool-row">
          <div><b>{{ item.name }}</b><StatusBadge text="在线" tone="success" /></div>
          <p class="muted">{{ item.tools.length }} 个工具 · 平均延迟 {{ item.avg_latency_ms }}ms</p>
          <div class="progress"><i :style="{ width: item.success_rate + '%' }"></i></div>
        </div>
      </article>
    </div>

    <div class="split-main" style="margin-top:14px">
      <article class="panel">
        <div class="panel-title"><h2>最近工具调用日志</h2></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>时间</th><th>工具 / 技能</th><th>类型</th><th>耗时</th><th>状态</th></tr></thead>
            <tbody>
              <tr v-for="item in calls" :key="item.tool_name + item.created_at">
                <td>{{ item.created_at?.replace('T', ' ').slice(5, 19) }}</td>
                <td><b>{{ item.tool_name }}</b></td>
                <td>{{ item.tool_type }}</td>
                <td>{{ item.latency_ms }}ms</td>
                <td><StatusBadge :text="item.status" :tone="item.status === 'success' ? 'success' : 'danger'" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <aside class="panel">
        <div class="panel-title"><h2>wiki 知识库</h2></div>
        <div class="panel-body archive-list">
          <div v-for="page in wikiPages.slice(0, 6)" :key="page.id">
            <b>{{ page.title }}</b>
            <span>{{ page.ts_code || page.page_type }} · v{{ page.version }}</span>
            <p>{{ page.content_md?.slice(0, 90) }}</p>
          </div>
          <p v-if="!wikiPages.length" class="muted">生成 AI 报告后，这里会出现对应股票的 wiki 页面。</p>
        </div>
      </aside>
    </div>
  </div>
  <div v-else class="empty">正在加载工具与知识库指标...</div>
</template>
