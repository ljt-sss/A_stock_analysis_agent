import { defineStore } from 'pinia'
import { ref } from 'vue'
import { agentApi } from '../api/agent'

export const useTaskStore = defineStore('tasks', () => {
  const current = ref<any>(null)
  const steps = ref<any[]>([])
  const calls = ref<any[]>([])
  const error = ref('')

  async function create(code: string) {
    error.value = ''
    calls.value = []
    try {
      current.value = await agentApi.create(code)
      await poll(current.value.id)
      if (current.value?.status === 'failed') {
        error.value = current.value.error_message || 'AI 分析失败'
      }
      return current.value
    } catch (e: any) {
      error.value = e.message || 'AI 分析失败'
      return null
    }
  }

  async function poll(id: string) {
    for (let i = 0; i < 240; i++) {
      current.value = await agentApi.get(id)
      steps.value = await agentApi.steps(id)
      calls.value = await agentApi.calls(id)
      if (['success', 'failed'].includes(current.value.status)) return
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    error.value = 'AI 分析超时，请稍后在分析记录中查看'
  }

  return { current, steps, calls, error, create, poll }
})
