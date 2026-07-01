<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Activity, ArrowRight, Bot, BrainCircuit, Database, FileCheck2, Gauge, Network, ShieldCheck, Sparkles } from 'lucide-vue-next'
import AgentWorkflowMap, { type WorkflowNode } from '../components/dashboard/AgentWorkflowMap.vue'
import EvidenceLedger, { type EvidenceItem } from '../components/dashboard/EvidenceLedger.vue'
import EvalLoop from '../components/dashboard/EvalLoop.vue'
import LiveToolCalls, { type ToolCallItem } from '../components/dashboard/LiveToolCalls.vue'
import WikiMemoryFeed, { type MemoryItem } from '../components/dashboard/WikiMemoryFeed.vue'
import EvidenceRadar from '../components/capabilities/EvidenceRadar.vue'
import { evalApi } from '../api/eval'
import { wikiApi } from '../api/wiki'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()
const metrics = ref<any>({ data_accuracy: 96.28, retrieval_hit_rate: 92.15, citation_coverage: 88.73, tool_success_rate: 95.44, hallucination_rate: 2.18, task_recovery_rate: 84.62 })
const wikiPages = ref<any[]>([])
const recentCalls = ref<any[]>([])

const defaultNodes: WorkflowNode[] = [
  { name: 'data', label: 'Data Check', detail: '数据完整性与口径检查', status: 'success' },
  { name: 'evidence', label: 'Evidence Retrieval', detail: '检索财报、公告与 Wiki', status: 'success' },
  { name: 'finance', label: 'Financial Analysis', detail: '三张表与现金流质量', status: 'success' },
  { name: 'valuation', label: 'Valuation', detail: 'PE / PB 历史分位计算', status: 'running' },
  { name: 'risk', label: 'Risk Red Flags', detail: '风险与反证交叉检查', status: 'waiting' },
  { name: 'report', label: 'Report Generation', detail: '组织结论与证据引用', status: 'waiting' },
  { name: 'eval', label: 'Eval', detail: '准确率与幻觉风险评估', status: 'waiting' },
  { name: 'wiki', label: 'Wiki Memory Update', detail: '增量写回长期记忆', status: 'waiting' },
]

const stepLabels: Record<string, string> = {
  master_orchestrator: 'Orchestrator', load_context: 'Context Load', data_cleaning_agent: 'Data Check', retrieve_evidence: 'Evidence Retrieval',
  financial_calculation_agent: 'Financial Analysis', reasoning_agent: 'Risk & Reasoning', report_writer_agent: 'Report Generation', verify_evidence: 'Evidence Verify', evaluate_output: 'Eval', update_memory: 'Wiki Memory Update',
}

const workflowNodes = computed<WorkflowNode[]>(() => {
  if (!taskStore.steps.length) return defaultNodes
  return taskStore.steps.map((step: any) => ({
    name: step.step_name,
    label: stepLabels[step.step_name] || step.step_name,
    detail: step.status === 'running' ? '节点正在处理结构化状态' : step.status === 'success' ? '节点产物已写入 State' : '等待上游节点完成',
    status: step.status === 'running' ? 'running' : step.status === 'success' ? 'success' : step.status === 'failed' ? 'warning' : 'waiting',
  }))
})

const toolCalls = computed<ToolCallItem[]>(() => {
  const source = taskStore.calls.length ? taskStore.calls : recentCalls.value
  if (source.length) return source.slice(0, 8).map((item: any, index: number) => ({
    time: item.created_at?.slice(11, 19) || `09:41:${String(23 + index * 2).padStart(2, '0')}`,
    name: `${item.tool_type === 'function_call' ? 'skill' : item.tool_type}.${item.tool_name}`,
    status: item.status === 'success' ? 'success' : 'warning', latency: `${item.latency_ms || 0}ms`,
  }))
  return [
    { time: '09:41:23', name: 'market-data-mcp.get_valuation_range', status: 'success', latency: '286ms' },
    { time: '09:41:25', name: 'financial-report-mcp.get_three_statements', status: 'success', latency: '341ms' },
    { time: '09:41:28', name: 'skill.cashflow_quality_analysis', status: 'success', latency: '260ms' },
    { time: '09:41:31', name: 'skill.evidence_coverage_check', status: 'warning', message: 'missing cashflow source' },
    { time: '09:41:34', name: 'wiki-memory-mcp.search_history', status: 'running' },
  ]
})

const evidence: EvidenceItem[] = [
  { source: '2025 年年度报告', period: 'FY2025', evidence: '经营活动产生的现金流净额同比改善，现金流与利润匹配度回升。', supports: '现金流质量边际改善', confidence: 92 },
  { source: '公司公告', period: '2026-06-28', evidence: '渠道库存保持在公司披露的合理区间，批价波动仍需持续跟踪。', supports: '渠道风险整体可控', confidence: 88 },
  { source: '历史估值序列', period: '5Y Range', evidence: '当前 PE-TTM 位于近五年中低分位，估值尚未进入极端区间。', supports: '估值处于历史中部', confidence: 86 },
]

const memoryItems = computed<MemoryItem[]>(() => wikiPages.value.length ? wikiPages.value.slice(0, 4).map((page: any, index: number) => ({
  type: index === 0 ? 'new' : 'update', title: `${index === 0 ? '新增公司记忆' : '更新研究 Wiki'}：${page.title}`,
  detail: `${page.ts_code || page.page_type} · version ${page.version} · ${page.freshness || 'fresh'}`, time: page.updated_at?.slice(11, 16) || `09:${48 + index * 3}`,
})) : [
  { type: 'new', title: '新增公司记忆：贵州茅台 - 渠道库存风险', detail: '写入风险点、证据来源与 0.88 置信度', time: '09:48' },
  { type: 'update', title: '更新指标：ROE / 毛利率 / 经营现金流', detail: '追加 2025Q4 结构化指标变化', time: '09:51' },
  { type: 'new', title: '生成复盘笔记', detail: '2026-07-01_贵州茅台复盘.md', time: '09:53' },
])

const currentStep = computed(() => taskStore.current?.current_step ? stepLabels[taskStore.current.current_step] || taskStore.current.current_step : 'Valuation Agent')
const progress = computed(() => taskStore.current?.progress || 62)

onMounted(async () => {
  const results = await Promise.allSettled([evalApi.metrics(), wikiApi.pages(), evalApi.calls()])
  if (results[0].status === 'fulfilled') metrics.value = results[0].value
  if (results[1].status === 'fulfilled') wikiPages.value = results[1].value
  if (results[2].status === 'fulfilled') recentCalls.value = results[2].value
})
</script>

<template>
  <div class="mission-page dashboard-mission">
    <section class="mission-hero">
      <div class="mission-copy">
        <span class="mission-eyebrow"><Sparkles :size="14" /> FUNDAMENTAL RESEARCH WORKFLOW</span>
        <h1>A 股基本面研究 Agent 平台</h1>
        <p class="mission-subtitle">一个面向个人股票研究与复盘的 AI Native 投研系统。</p>
        <p class="mission-description">它不是简单生成分析文本，而是把研究任务拆解为可执行、可追踪、可评估、可写回记忆的 Agent 工作流。</p>
        <div class="capability-path" aria-label="研究处理链路">
          <span>公开数据</span><ArrowRight :size="14" /><span>Multi-Agent</span><ArrowRight :size="14" /><span>Skills / MCP</span><ArrowRight :size="14" /><span>Evidence</span><ArrowRight :size="14" /><span>Wiki Memory</span>
        </div>
        <div class="value-points">
          <div><FileCheck2 :size="18" /><span><b>Evidence-driven</b><small>每个核心结论绑定财报、公告、新闻或 Wiki 证据。</small></span></div>
          <div><Network :size="18" /><span><b>Agent Workflow</b><small>通过多节点任务流完成数据检查、证据检索、财务分析、估值、风险识别和报告生成。</small></span></div>
          <div><BrainCircuit :size="18" /><span><b>Self-improving Memory</b><small>将报告结论、失败案例和风险变化写回 Wiki 与 Eval Case，形成持续迭代闭环。</small></span></div>
        </div>
      </div>
      <div class="hero-workflow">
        <div class="hero-workflow-head"><span><Bot :size="17" /> Agent Runtime</span><b><i></i> ONLINE</b></div>
        <AgentWorkflowMap :nodes="workflowNodes" compact />
      </div>
    </section>

    <section class="runtime-strip" aria-label="系统运行指标">
      <div><Activity :size="16" /><span>Runtime</span><strong>Online</strong></div>
      <div><Gauge :size="16" /><span>Active tools</span><strong>12</strong></div>
      <div><ShieldCheck :size="16" /><span>Success rate</span><strong>{{ metrics.tool_success_rate }}%</strong></div>
      <div><Database :size="16" /><span>Evidence coverage</span><strong>{{ metrics.citation_coverage }}%</strong></div>
      <div class="runtime-task"><span>Current mission</span><strong>贵州茅台 600519.SH</strong><small>{{ currentStep }} running</small></div>
    </section>

    <section class="mission-control-grid">
      <article class="mc-panel current-mission-panel">
        <header class="mc-panel-head"><div><Bot :size="16" /><span>Agent Mission Control</span></div><span class="running-label"><i></i> ANALYZING</span></header>
        <div class="mission-stock"><div><small>正在分析</small><h2>贵州茅台 <code>600519.SH</code></h2><p>任务类型：基本面研究 · 当前节点：{{ currentStep }}</p></div><strong>{{ Math.round(progress) }}%</strong></div>
        <div class="mission-progress"><i :style="{ width: `${progress}%` }"></i></div>
        <AgentWorkflowMap :nodes="workflowNodes" />
      </article>
      <EvidenceLedger :items="evidence" />
      <LiveToolCalls :calls="toolCalls" />
    </section>

    <section class="mission-lower-grid">
      <WikiMemoryFeed :items="memoryItems" />
      <EvidenceRadar :metrics="metrics" />
      <EvalLoop :resolved="18" pass-rate="94.8%" />
    </section>
  </div>
</template>
