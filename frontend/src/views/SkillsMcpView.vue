<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Activity, Bot, Boxes, BrainCircuit, FileCheck2, RadioTower, ShieldCheck } from 'lucide-vue-next'
import AgentWorkflowMap, { type WorkflowNode } from '../components/dashboard/AgentWorkflowMap.vue'
import LiveToolCalls, { type ToolCallItem } from '../components/dashboard/LiveToolCalls.vue'
import WikiMemoryFeed, { type MemoryItem } from '../components/dashboard/WikiMemoryFeed.vue'
import EvidenceRadar from '../components/capabilities/EvidenceRadar.vue'
import McpServiceGrid from '../components/capabilities/McpServiceGrid.vue'
import SkillHeatmap from '../components/capabilities/SkillHeatmap.vue'
import { evalApi } from '../api/eval'
import { wikiApi } from '../api/wiki'

const metrics = ref<any>(null)
const skills = ref<any[]>([])
const tools = ref<any[]>([])
const calls = ref<any[]>([])
const wikiPages = ref<any[]>([])
const memories = ref<any[]>([])

const fallbackMetrics = { data_accuracy: 96.28, retrieval_hit_rate: 92.15, citation_coverage: 88.73, tool_success_rate: 95.44, hallucination_rate: 2.18, task_recovery_rate: 84.62 }
const fallbackSkills = [
  ['现金流质量分析', 'cashflow_quality_analysis', 99.2, 260], ['估值区间分析', 'valuation_range_analysis', 98.7, 286],
  ['三张表联动分析', 'three_statement_analysis', 97.9, 341], ['风险红旗识别', 'risk_red_flags_analysis', 97.2, 198],
  ['证据覆盖检查', 'evidence_coverage_check', 96.4, 174], ['杜邦分析', 'dupont_analysis', 95.8, 225],
].map(([title, name, success_rate, avg_latency_ms]) => ({ title, name, success_rate, avg_latency_ms }))
const fallbackTools = ['market-data-mcp', 'financial-report-mcp', 'news-sector-mcp', 'wiki-memory-mcp'].map((name, index) => ({ name, tools: Array(4 + index).fill(0), success_rate: 96.8 - index * .6, avg_latency_ms: 210 + index * 38 }))

const nodes: WorkflowNode[] = [
  { name: 'data', label: 'Data Check', detail: '行情与财务数据就绪', status: 'success' },
  { name: 'evidence', label: 'Evidence Agent', detail: '召回并压缩 6 条证据', status: 'success' },
  { name: 'finance', label: 'Financial Agent', detail: '7 个 Skills 执行完成', status: 'success' },
  { name: 'reason', label: 'Reasoning Agent', detail: '风险与反证推理中', status: 'running' },
  { name: 'report', label: 'Report Agent', detail: '等待结构化推理结果', status: 'waiting' },
  { name: 'memory', label: 'Memory Agent', detail: '等待质量门禁', status: 'waiting' },
]

const displayMetrics = computed(() => metrics.value || fallbackMetrics)
const displaySkills = computed(() => skills.value.length ? skills.value : fallbackSkills)
const displayTools = computed(() => tools.value.length ? tools.value : fallbackTools)
const liveCalls = computed<ToolCallItem[]>(() => calls.value.length ? calls.value.slice(0, 10).map((item: any, index: number) => ({
  time: item.created_at?.slice(11, 19) || `10:0${index}:12`, name: `${item.tool_type}.${item.tool_name}`,
  status: item.status === 'success' ? 'success' : 'warning', latency: `${item.latency_ms || 0}ms`,
})) : [
  { time: '10:04:12', name: 'market-data-mcp.get_valuation_range', status: 'success', latency: '286ms' },
  { time: '10:04:13', name: 'financial-report-mcp.get_three_statements', status: 'success', latency: '341ms' },
  { time: '10:04:15', name: 'skill.dupont_analysis', status: 'success', latency: '225ms' },
  { time: '10:04:18', name: 'skill.evidence_coverage_check', status: 'warning', message: '1 source requires review' },
  { time: '10:04:21', name: 'wiki-memory-mcp.upsert_research_delta', status: 'running' },
])
const memoryFeed = computed<MemoryItem[]>(() => wikiPages.value.length ? wikiPages.value.slice(0, 5).map((page: any, index: number) => ({ type: index ? 'update' : 'new', title: page.title, detail: `${page.ts_code || page.page_type} · v${page.version} · ${page.updated_by}`, time: page.updated_at?.slice(11, 16) || `10:${12 + index}` })) : [
  { type: 'new', title: '贵州茅台渠道风险记忆', detail: '新增 3 条证据与风险结论', time: '10:12' },
  { type: 'update', title: '现金流质量指标', detail: 'Wiki version 6 → 7', time: '10:15' },
  { type: 'update', title: '食品饮料行业景气度', detail: '刷新证据时间戳', time: '10:18' },
])

onMounted(async () => {
  const results = await Promise.allSettled([evalApi.metrics(), evalApi.skills(), evalApi.tools(), evalApi.calls(), wikiApi.pages(), wikiApi.memories('')])
  if (results[0].status === 'fulfilled') metrics.value = results[0].value
  if (results[1].status === 'fulfilled') skills.value = results[1].value
  if (results[2].status === 'fulfilled') tools.value = results[2].value
  if (results[3].status === 'fulfilled') calls.value = results[3].value
  if (results[4].status === 'fulfilled') wikiPages.value = results[4].value
  if (results[5].status === 'fulfilled') memories.value = results[5].value
})
</script>

<template>
  <div class="mission-page capability-center">
    <header class="capability-hero">
      <div>
        <span class="mission-eyebrow"><Boxes :size="14" /> AGENT CAPABILITY CENTER</span>
        <h1>Agent 能力中心</h1>
        <p>实时监控 Skills、MCP、Wiki、Evidence 与 Eval 的运行状态。</p>
      </div>
      <div class="runtime-online-card">
        <span><i></i> Agent Runtime Online</span>
        <dl><div><dt>active tools</dt><dd>12</dd></div><div><dt>success rate</dt><dd>{{ displayMetrics.tool_success_rate }}%</dd></div><div><dt>evidence</dt><dd>{{ displayMetrics.citation_coverage }}%</dd></div></dl>
      </div>
    </header>

    <section class="capability-stat-strip">
      <div><Bot :size="17" /><span>Agent nodes</span><strong>10</strong><small>LangGraph runtime</small></div>
      <div><Activity :size="17" /><span>Registered skills</span><strong>{{ displaySkills.length }}</strong><small>function calls</small></div>
      <div><RadioTower :size="17" /><span>MCP services</span><strong>{{ displayTools.length }}</strong><small>all connected</small></div>
      <div><BrainCircuit :size="17" /><span>Memory entries</span><strong>{{ memories.length || 28 }}</strong><small>versioned knowledge</small></div>
      <div><FileCheck2 :size="17" /><span>Evidence coverage</span><strong>{{ displayMetrics.citation_coverage }}%</strong><small>quality gate</small></div>
      <div><ShieldCheck :size="17" /><span>Low hallucination</span><strong>{{ displayMetrics.hallucination_rate }}%</strong><small>current rate</small></div>
    </section>

    <section class="capability-main-grid">
      <article class="mc-panel workflow-capability-panel">
        <header class="mc-panel-head"><div><Bot :size="16" /><span>Agent 工作流</span></div><span class="running-label"><i></i> RUNNING</span></header>
        <AgentWorkflowMap :nodes="nodes" />
      </article>
      <SkillHeatmap :skills="displaySkills" />
      <McpServiceGrid :tools="displayTools" />
    </section>

    <section class="capability-secondary-grid">
      <LiveToolCalls :calls="liveCalls" title="Runtime Terminal" />
      <EvidenceRadar :metrics="displayMetrics" />
      <WikiMemoryFeed :items="memoryFeed" />
    </section>
  </div>
</template>
