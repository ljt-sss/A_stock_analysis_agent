<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FileText, Play, RefreshCw } from 'lucide-vue-next'
import { agentApi } from '../api/agent'
import { useTaskStore } from '../stores/taskStore'
import StatusBadge from '../components/common/StatusBadge.vue'

const tasks = useTaskStore()
const reports = ref<any[]>([])
const selected = ref<any>(null)
const code = ref('600519.SH')
const loading = ref(false)
const error = ref('')

const stepNames: Record<string, string> = {
  check_data_freshness: '检查数据',
  load_stock_context: '读取真实行情与财报',
  retrieve_evidence: '整理证据',
  run_financial_skills: '计算财务指标',
  generate_report: 'AI 生成报告',
  verify_evidence: '检查输出',
  update_memory: '保存结论',
  evaluate_output: '报告落库',
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    reports.value = await agentApi.reports()
    if (!selected.value && reports.value.length) selected.value = reports.value[0]
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function run() {
  await tasks.create(code.value.trim())
  if (!tasks.error) {
    selected.value = null
    await load()
    selected.value = reports.value[0]
  }
}

onMounted(load)
</script>

<template>
  <div>
    <div class="analysis-toolbar panel">
      <div>
        <label for="analysis-code">A股代码</label>
        <input id="analysis-code" v-model="code" placeholder="例如 000333 或 600519.SH" @keyup.enter="run" />
      </div>
      <button class="btn" :disabled="loading" @click="load">
        <RefreshCw :size="16" />刷新记录
      </button>
      <button class="btn primary" :disabled="['pending','running'].includes(tasks.current?.status) || !code.trim()" @click="run">
        <Play :size="16" />{{ ['pending','running'].includes(tasks.current?.status) ? `AI 分析中 ${tasks.current?.progress || 0}%` : '生成 AI 报告' }}
      </button>
    </div>

    <div v-if="tasks.error || error" class="task-error">{{ tasks.error || error }}</div>

    <article v-if="tasks.current && ['pending','running'].includes(tasks.current.status)" class="panel task-progress-panel">
      <div class="panel-title">
        <h2>当前任务</h2>
        <StatusBadge class="spacer" :text="tasks.current.status" tone="info" />
      </div>
      <div class="panel-body">
        <div class="progress"><i :style="{ width: (tasks.current.progress || 0) + '%' }"></i></div>
        <p>当前步骤：{{ stepNames[tasks.current.current_step] || tasks.current.current_step || '等待开始' }}</p>
        <div class="step-list">
          <span v-for="step in tasks.steps" :key="step.id" :class="step.status">
            <b>{{ step.step_order }}</b>{{ stepNames[step.step_name] || step.step_name }}
          </span>
        </div>
      </div>
    </article>

    <div class="report-layout">
      <aside class="panel report-list">
        <div class="panel-title">
          <h2>历史 AI 报告</h2>
          <span class="spacer muted">{{ reports.length }} 份</span>
        </div>
        <button v-for="item in reports" :key="item.id" :class="{ active: selected?.id === item.id }" @click="selected = item">
          <b>{{ item.title }}</b>
          <small>{{ item.ts_code }} · {{ item.created_at?.replace('T', ' ').slice(0, 16) }}</small>
        </button>
        <div v-if="!reports.length && !loading" class="empty">暂无报告</div>
      </aside>

      <article class="panel">
        <div class="panel-title">
          <FileText :size="17" />
          <h2>{{ selected?.title || 'AI 分析报告' }}</h2>
        </div>
        <pre v-if="selected" class="markdown">{{ selected.content_md }}</pre>
        <div v-else class="empty">输入股票代码后生成第一份真实数据 AI 报告。</div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.analysis-toolbar{display:flex;align-items:flex-end;justify-content:flex-end;gap:10px;margin-bottom:12px;padding:12px 14px}
.analysis-toolbar>div{margin-right:auto}
.analysis-toolbar label{display:block;margin-bottom:5px;color:#475569;font-size:12px}
.analysis-toolbar input{width:260px;height:38px;padding:0 11px;border:1px solid #cbd5e1;border-radius:6px}
.task-progress-panel{margin-bottom:12px}
.step-list{display:flex;flex-wrap:wrap;gap:7px}
.step-list span{padding:7px 9px;border-radius:6px;color:#64748b;background:#f1f5f9;font-size:12px}
.step-list span.success{color:#166534;background:#dcfce7}
.step-list span.running{color:#1d4ed8;background:#dbeafe}
.step-list b{margin-right:5px}
.report-layout{display:grid;grid-template-columns:300px minmax(0,1fr);gap:12px}
.report-list button{display:block;width:100%;padding:12px 14px;border:0;border-bottom:1px solid #edf1f6;background:#fff;text-align:left}
.report-list button:hover,.report-list button.active{background:#eff6ff}
.report-list small{display:block;margin-top:5px;color:#64748b}
.markdown{margin:0;max-height:calc(100vh - 230px);overflow:auto}
@media(max-width:760px){.analysis-toolbar{align-items:stretch;flex-direction:column}.analysis-toolbar>div,.analysis-toolbar input{width:100%}.report-layout{grid-template-columns:1fr}.markdown{max-height:none}}
</style>
