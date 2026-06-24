import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type LibraryItem = {
  ts_code: string
  name?: string
  added_at: string
  auto_analysis: boolean
  last_analysis_at?: string
  last_task_id?: string
}

const STORAGE_KEY = 'ashare-agent-library'

function readItems(): LibraryItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveItems(items: LibraryItem[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function isSameTradingDay(value?: string) {
  if (!value) return false
  const last = new Date(value)
  const now = new Date()
  return last.getFullYear() === now.getFullYear() && last.getMonth() === now.getMonth() && last.getDate() === now.getDate()
}

export const useLibraryStore = defineStore('library', () => {
  const items = ref<LibraryItem[]>(readItems())

  const sortedItems = computed(() =>
    [...items.value].sort((a, b) => {
      const left = a.last_analysis_at || a.added_at
      const right = b.last_analysis_at || b.added_at
      return right.localeCompare(left)
    }),
  )
  const codes = computed(() => new Set(items.value.map(item => item.ts_code)))

  function has(code: string) {
    return codes.value.has(code)
  }

  function get(code: string) {
    return items.value.find(item => item.ts_code === code)
  }

  function add(stock: { ts_code: string; name?: string }) {
    if (has(stock.ts_code)) return
    items.value = [
      {
        ts_code: stock.ts_code,
        name: stock.name,
        added_at: new Date().toISOString(),
        auto_analysis: true,
      },
      ...items.value,
    ]
    saveItems(items.value)
  }

  function remove(code: string) {
    items.value = items.value.filter(item => item.ts_code !== code)
    saveItems(items.value)
  }

  function shouldAutoAnalyze(code: string) {
    const item = get(code)
    return Boolean(item?.auto_analysis && !isSameTradingDay(item.last_analysis_at))
  }

  function markAnalyzed(code: string, task?: { id?: string; finished_at?: string }) {
    items.value = items.value.map(item =>
      item.ts_code === code
        ? {
            ...item,
            last_analysis_at: task?.finished_at || new Date().toISOString(),
            last_task_id: task?.id || item.last_task_id,
          }
        : item,
    )
    saveItems(items.value)
  }

  return { items, sortedItems, has, get, add, remove, shouldAutoAnalyze, markAnalyzed }
})
