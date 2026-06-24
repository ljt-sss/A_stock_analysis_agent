<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Bookmark, BookmarkCheck, Download, FileText, RefreshCw, Trash2 } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import BaseChart from '../components/charts/BaseChart.vue'
import AgentInsightPanel from '../components/agent/AgentInsightPanel.vue'
import { wikiApi } from '../api/wiki'
import { useLibraryStore } from '../stores/libraryStore'
import { useStockStore } from '../stores/stockStore'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const store = useStockStore()
const tasks = useTaskStore()
const library = useLibraryStore()

const activeTab = ref('业绩')
const memories = ref<any[]>([])

const code = computed(() => String(route.params.tsCode || '600519.SH'))
const data = computed(() => store.dashboard)
const tsCode = computed(() => data.value?.stock?.ts_code || code.value)
const isInLibrary = computed(() => library.has(tsCode.value))
const libraryItem = computed(() => library.get(tsCode.value))
const isTaskRunning = computed(() => ['pending', 'running'].includes(tasks.current?.status))
const tabs = ['业绩', '估值', '盈利质量', '资产负债']

onMounted(() => loadCurrent())
watch(code, () => loadCurrent())

async function loadCurrent() {
  await store.load(code.value)
  await loadMemories()
}

async function loadMemories() {
  if (!tsCode.value) return
  try {
    memories.value = await wikiApi.memories(tsCode.value)
  } catch {
    memories.value = []
  }
}

function addToLibrary() {
  if (!data.value?.stock) return
  library.add({
    ts_code: data.value.stock.ts_code,
    name: data.value.stock.name,
  })
}

function removeFromLibrary() {
  library.remove(tsCode.value)
}

async function generate() {
  if (!isInLibrary.value && data.value?.stock) addToLibrary()
  const task = await tasks.create(tsCode.value)
  if (task?.status === 'success') {
    library.markAnalyzed(tsCode.value, task)
    await loadMemories()
  }
}

function makeChart(title: string, source: 'financial' | 'valuation', series: Array<{ key: string, name: string, color: string, type?: string }>) {
  return computed(() => {
    const rows = source === 'valuation' ? data.value?.valuation_series : data.value?.quarterly_financials
    return {
      title,
      option: {
        tooltip: { trigger: 'axis' },
        legend: { top: 4 },
        grid: { left: 55, right: 18, top: 38, bottom: 28 },
        xAxis: { type: 'category', data: rows?.map((x: any) => x.period || x.date?.slice(0, 7)) || [] },
        yAxis: { type: 'value', splitLine: { lineStyle: { color: '#eef2f7' } } },
        series: series.map(item => ({
          name: item.name,
          type: item.type || 'line',
          smooth: true,
          symbol: 'none',
          data: rows?.map((x: any) => x[item.key]) || [],
          itemStyle: { color: item.color },
          lineStyle: { color: item.color, width: 2 },
        })),
      },
    }
  })
}

const chartGroups: Record<string, any[]> = {
  业绩: [
    makeChart('单季度营收（亿元）', 'financial', [{ key: 'revenue', name: '营业收入', color: '#2563eb', type: 'bar' }]),
    makeChart('单季度归母净利润（亿元）', 'financial', [{ key: 'net_profit_parent', name: '归母净利润', color: '#10b981', type: 'bar' }]),
    makeChart('营收与利润同比（%）', 'financial', [{ key: 'revenue_yoy', name: '营收同比', color: '#2563eb' }, { key: 'net_profit_yoy', name: '利润同比', color: '#f97316' }]),
  ],
  估值: [
    makeChart('PE-TTM 近五年', 'valuation', [{ key: 'pe_ttm', name: 'PE-TTM', color: '#2563eb' }]),
    makeChart('PB 近五年', 'valuation', [{ key: 'pb', name: 'PB', color: '#f97316' }]),
    makeChart('总市值近五年（亿元）', 'valuation', [{ key: 'total_mv', name: '总市值', color: '#10b981' }]),
  ],
  盈利质量: [
    makeChart('盈利能力（%）', 'financial', [{ key: 'roe', name: 'ROE', color: '#2563eb' }, { key: 'gross_margin', name: '毛利率', color: '#f97316' }, { key: 'net_margin', name: '净利率', color: '#10b981' }]),
    makeChart('经营现金流（亿元）', 'financial', [{ key: 'net_operate_cashflow', name: '经营现金流', color: '#2563eb', type: 'bar' }]),
  ],
  资产负债: [
    makeChart('资产与负债（亿元）', 'financial', [{ key: 'total_assets', name: '总资产', color: '#2563eb' }, { key: 'total_liabilities', name: '总负债', color: '#f97316' }]),
    makeChart('资产负债率（%）', 'financial', [{ key: 'debt_asset_ratio', name: '资产负债率', color: '#ef4444' }]),
  ],
}

const visibleCharts = computed(() => chartGroups[activeTab.value].map(chart => chart.value))

function exportReport() {
  const report = tasks.current?.result?.content_md
  if (!report || !data.value?.stock) return
  const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${data.value.stock.name}_${data.value.stock.ts_code}_AI分析报告.md`
  link.click()
  URL.revokeObjectURL(link.href)
}

function display(value: any, suffix = '') {
  return value === null || value === undefined ? '--' : `${value}${suffix}`
}

function formatTime(value?: string) {
  return value ? value.replace('T', ' ').slice(0, 16) : '暂无'
}
</script>

<template>
  <div>
    <div class="cockpit-actions panel">
      <div class="library-status">
        <b>{{ isInLibrary ? '已加入我的库' : '临时查看' }}</b>
        <span>{{ isInLibrary ? '点击手动 AI 分析后，会生成报告并归档到 wiki 知识库' : '仅查看真实数据，不会自动生成 AI 报告' }}</span>
        <small v-if="isInLibrary">最近 AI 分析：{{ formatTime(libraryItem?.last_analysis_at) }}</small>
      </div>

      <div class="action-buttons">
        <button v-if="!isInLibrary" class="btn primary-soft" :disabled="!data" @click="addToLibrary">
          <Bookmark :size="16" />加入我的库
        </button>
        <button v-else class="btn success" disabled>
          <BookmarkCheck :size="16" />已在我的库
        </button>
        <button v-if="isInLibrary" class="btn" @click="removeFromLibrary">
          <Trash2 :size="16" />移出库
        </button>
        <button class="btn" :disabled="store.loading" @click="loadCurrent">
          <RefreshCw :size="16" />刷新数据
        </button>
        <button class="btn" :disabled="!tasks.current?.result?.content_md" @click="exportReport">
          <Download :size="16" />导出 AI 报告
        </button>
        <button class="btn primary" :disabled="store.loading || isTaskRunning" @click="generate">
          <FileText :size="16" />{{ isTaskRunning ? `AI 分析中 ${tasks.current?.progress || 0}%` : '手动 AI 分析' }}
        </button>
      </div>
    </div>

    <div v-if="store.loading" class="panel loading-state">
      <RefreshCw class="spin" :size="24" />
      <b>正在从公开数据源获取行情、财报和近五年估值</b>
      <span>首次查询通常需要 10-30 秒</span>
    </div>

    <div v-else-if="store.error" class="panel error-state">
      <b>真实数据加载失败</b>
      <p>{{ store.error }}</p>
      <button class="btn" @click="loadCurrent">重试</button>
    </div>

    <template v-else-if="data">
      <div class="source-strip">
        <b>真实公开数据</b>
        <span>行情时间：{{ data.meta.quote_time?.replace('T', ' ') || '--' }}</span>
        <span>最新财报：{{ data.summary.latest_report_period }}</span>
        <span class="source-list">来源：{{ data.meta.sources.join('、') }}</span>
      </div>

      <div class="panel stock-summary">
        <div><small>A 股公司</small><strong>{{ data.stock.name }} <span class="muted">{{ data.stock.ts_code }}</span></strong></div>
        <div><small>最新价</small><strong :class="data.summary.pct_chg >= 0 ? 'positive' : 'negative'">{{ display(data.summary.price, '元') }}</strong></div>
        <div><small>涨跌幅</small><strong :class="data.summary.pct_chg >= 0 ? 'positive' : 'negative'">{{ display(data.summary.pct_chg, '%') }}</strong></div>
        <div><small>总市值</small><strong>{{ display(data.summary.total_mv, '亿') }}</strong></div>
        <div><small>PE-TTM</small><strong>{{ display(data.summary.pe_ttm, 'x') }}</strong></div>
        <div><small>PB</small><strong>{{ display(data.summary.pb, 'x') }}</strong></div>
        <div><small>股息率</small><strong>{{ display(data.summary.dividend_yield, '%') }}</strong></div>
      </div>

      <div class="tabs">
        <button v-for="tab in tabs" :key="tab" :class="{ active: activeTab === tab }" @click="activeTab = tab">{{ tab }}</button>
      </div>

      <div class="split-main">
        <section>
          <div class="chart-grid">
            <article v-for="chart in visibleCharts" :key="chart.title" class="panel chart-panel">
              <div class="panel-title"><h3>{{ chart.title }}</h3></div>
              <div class="panel-body"><BaseChart :option="chart.option" :height="230" /></div>
            </article>
          </div>

          <article class="panel financial-table">
            <div class="panel-title">
              <h3>近五年季度财务数据</h3>
              <span class="spacer muted">单位：亿元 / %</span>
            </div>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>报告期</th><th>营收</th><th>营收同比</th><th>归母净利润</th><th>利润同比</th><th>ROE</th><th>经营现金流</th><th>总资产</th><th>总负债</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in [...data.quarterly_financials].reverse()" :key="row.period">
                    <td><b>{{ row.period }}</b></td>
                    <td>{{ display(row.revenue) }}</td>
                    <td :class="row.revenue_yoy >= 0 ? 'positive' : 'negative'">{{ display(row.revenue_yoy, '%') }}</td>
                    <td>{{ display(row.net_profit_parent) }}</td>
                    <td :class="row.net_profit_yoy >= 0 ? 'positive' : 'negative'">{{ display(row.net_profit_yoy, '%') }}</td>
                    <td>{{ display(row.roe, '%') }}</td>
                    <td>{{ display(row.net_operate_cashflow) }}</td>
                    <td>{{ display(row.total_assets) }}</td>
                    <td>{{ display(row.total_liabilities) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <AgentInsightPanel :insight="data.agent_insight" />
      </div>

      <div v-if="tasks.error" class="task-error">AI 分析失败：{{ tasks.error }}</div>
      <div v-if="tasks.current?.status === 'success'" class="task-success">
        AI 报告已生成，并已归档到 wiki 知识库。可以导出报告，或到“工具与知识库”查看 Skills / MCP 调用情况。
      </div>

      <section v-if="tasks.current?.status === 'success' || memories.length" class="archive-grid">
        <article class="panel">
          <div class="panel-title"><h3>wiki 知识库归档</h3></div>
          <div class="panel-body archive-list">
            <div v-for="item in memories.slice(0, 4)" :key="item.id">
              <b>{{ item.title || item.memory_type }}</b>
              <span>{{ formatTime(item.updated_at || item.created_at) }}</span>
              <p>{{ item.content }}</p>
            </div>
            <p v-if="!memories.length" class="muted">生成 AI 报告后会自动写入该股票的 wiki 知识库。</p>
          </div>
        </article>

        <article class="panel">
          <div class="panel-title"><h3>本次 Skills / MCP 使用</h3></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>工具 / 技能</th><th>类型</th><th>耗时</th><th>状态</th></tr></thead>
              <tbody>
                <tr v-for="item in tasks.calls" :key="item.id">
                  <td><b>{{ item.tool_name }}</b></td>
                  <td>{{ item.tool_type }}</td>
                  <td>{{ item.latency_ms || '--' }}ms</td>
                  <td>{{ item.status }}</td>
                </tr>
                <tr v-if="!tasks.calls.length"><td colspan="4" class="muted">AI 分析完成后显示本次调用记录。</td></tr>
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </template>
  </div>
</template>
