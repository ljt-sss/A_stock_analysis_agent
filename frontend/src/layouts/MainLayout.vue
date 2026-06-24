<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Bot, BookOpenCheck, FileText, LineChart, Search, Star } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../api/client'
import { stockApi } from '../api/stocks'
import { useLibraryStore } from '../stores/libraryStore'

const route = useRoute()
const router = useRouter()
const library = useLibraryStore()

const keyword = ref('')
const results = ref<any[]>([])
const searching = ref(false)
const searchError = ref('')
const showResults = ref(false)
const health = ref<any>(null)
let timer: ReturnType<typeof setTimeout> | undefined

const title = computed(() => String(route.meta.title || '个股研究'))
const now = new Date()
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

const nav = [
  ['个股研究', '/stocks/600519.SH', LineChart],
  ['AI 分析记录', '/analysis', FileText],
  ['工具与知识库', '/ops', BookOpenCheck],
]

watch(keyword, value => {
  clearTimeout(timer)
  results.value = []
  searchError.value = ''
  if (!value.trim()) return

  timer = setTimeout(async () => {
    searching.value = true
    try {
      results.value = await stockApi.search(value)
      showResults.value = true
    } catch (error: any) {
      searchError.value = error.message || '搜索失败'
    } finally {
      searching.value = false
    }
  }, 260)
})

async function selectStock(item: any) {
  keyword.value = `${item.name} ${item.symbol}`
  showResults.value = false
  await router.push(`/stocks/${item.ts_code}`)
}

async function submitSearch() {
  const text = keyword.value.trim()
  if (!text) return

  try {
    if (!results.value.length) results.value = await stockApi.search(text)
    if (results.value[0]) await selectStock(results.value[0])
    else searchError.value = '没有找到对应的 A 股公司'
  } catch (error: any) {
    searchError.value = error.message || '搜索失败'
  }
}

function shortDate(value?: string) {
  return value ? value.slice(5, 10) : '未分析'
}

onMounted(async () => {
  try {
    health.value = await api('/../health')
  } catch {
    health.value = null
  }
})
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand">
        <span class="brand-icon"><Star :size="22" fill="currentColor" /></span>
        <div>
          <strong>A 股基本面研究</strong>
          <small>真实公开数据 · 手动生成 AI 报告 · 自动沉淀知识库</small>
        </div>
      </div>

      <div class="search-wrap">
        <form class="global-search" @submit.prevent="submitSearch">
          <Search :size="18" />
          <input
            v-model="keyword"
            aria-label="搜索 A 股公司"
            placeholder="输入公司名或股票代码，例如：美的 / 000333"
            @focus="showResults = true"
          />
          <span v-if="searching" class="muted">搜索中</span>
        </form>

        <div v-if="showResults && (results.length || searchError)" class="search-results">
          <button
            v-for="item in results"
            :key="item.ts_code"
            type="button"
            @mousedown.prevent="selectStock(item)"
          >
            <span>
              <b>{{ item.name }}</b>
              <small>{{ item.ts_code }}</small>
            </span>
            <em>查看真实数据</em>
          </button>
          <p v-if="searchError">{{ searchError }}</p>
        </div>
      </div>

      <div class="top-actions">
        <span class="date">{{ today }}</span>
        <span class="market"><i></i>真实数据源已连接</span>
        <span class="ai-state"><Bot :size="14" />AI {{ health?.llm_configured ? '已连接' : '未连接' }}</span>
      </div>
    </header>

    <aside class="sidebar">
      <nav>
        <RouterLink
          v-for="[label, path, icon] in nav"
          :key="String(path)"
          :to="String(path)"
        >
          <component :is="icon" :size="19" />
          <span>{{ label }}</span>
        </RouterLink>
      </nav>

      <section v-if="library.sortedItems.length" class="library-nav">
        <p>我的库</p>
        <RouterLink v-for="item in library.sortedItems" :key="item.ts_code" :to="`/stocks/${item.ts_code}`">
          <span>{{ item.name || item.ts_code }}</span>
          <small>{{ item.ts_code }} · {{ shortDate(item.last_analysis_at) }}</small>
        </RouterLink>
      </section>

      <div class="system-card">
        <strong>服务状态</strong>
        <p><i></i>行情与财报 <span>实时请求</span></p>
        <p><i></i>AI 分析 <span>{{ health?.llm_configured ? '已连接' : '未连接' }}</span></p>
        <p><Bot :size="14" />数据提供 <span>AKShare</span></p>
      </div>
    </aside>

    <main class="content">
      <div class="page-heading">
        <h1>{{ title }}</h1>
        <span>搜索只查看真实数据 · 手动 AI 分析后归档进入 wiki 知识库</span>
      </div>
      <RouterView />
    </main>

    <footer>公开数据仅供研究参考，请以上市公司公告和交易所披露为准，不构成投资建议。</footer>
  </div>
</template>
