import { defineStore } from 'pinia'
import { ref } from 'vue'
import { stockApi } from '../api/stocks'

export const useStockStore = defineStore('stock', () => {
  const selectedCode = ref('600519.SH')
  const dashboard = ref<any>(null)
  const loading = ref(false)
  const error = ref('')

  async function load(code = selectedCode.value) {
    selectedCode.value = code
    loading.value = true
    error.value = ''
    dashboard.value = null
    try {
      dashboard.value = await stockApi.dashboard(code)
    } catch (e: any) {
      error.value = e.message || '真实数据加载失败'
    } finally {
      loading.value = false
    }
  }

  return { selectedCode, dashboard, loading, error, load }
})
