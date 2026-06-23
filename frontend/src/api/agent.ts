import {api} from './client'
export const agentApi={create:(ts_code:string)=>api<any>('/agent/tasks/fundamental-analysis',{method:'POST',body:JSON.stringify({ts_code})}),get:(id:string)=>api<any>(`/agent/tasks/${id}`),steps:(id:string)=>api<any[]>(`/agent/tasks/${id}/steps`),calls:(id:string)=>api<any[]>(`/agent/tasks/${id}/tool-calls`),reports:(code?:string)=>api<any[]>(`/analysis/reports${code?`?ts_code=${code}`:''}`)}

