import {defineStore} from 'pinia'
import {ref} from 'vue'
import {agentApi} from '../api/agent'
export const useTaskStore=defineStore('tasks',()=>{const current=ref<any>(null);const steps=ref<any[]>([]);const error=ref('');async function create(code:string){error.value='';try{current.value=await agentApi.create(code);await poll(current.value.id);if(current.value?.status==='failed')error.value=current.value.error_message||'分析失败'}catch(e:any){error.value=e.message||'分析失败'}}async function poll(id:string){for(let i=0;i<240;i++){current.value=await agentApi.get(id);steps.value=await agentApi.steps(id);if(['success','failed'].includes(current.value.status))return;await new Promise(r=>setTimeout(r,1000))}error.value='分析超时，请稍后在分析记录中查看'}return{current,steps,error,create,poll}})
