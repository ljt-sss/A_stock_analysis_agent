import { defineStore } from 'pinia';
import { ref } from 'vue';
import { agentApi } from '../api/agent';
export const useTaskStore = defineStore('tasks', () => { const current = ref(null); const steps = ref([]); async function create(code) { current.value = await agentApi.create(code); await poll(current.value.id); } async function poll(id) { for (let i = 0; i < 90; i++) {
    current.value = await agentApi.get(id);
    steps.value = await agentApi.steps(id);
    if (['success', 'failed'].includes(current.value.status))
        break;
    await new Promise(r => setTimeout(r, 1000));
} } return { current, steps, create, poll }; });
