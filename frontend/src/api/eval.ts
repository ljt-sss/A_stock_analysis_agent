import {api} from './client'
export const evalApi={metrics:()=>api<any>('/evals/metrics'),cases:()=>api<any[]>('/evals/cases'),results:()=>api<any[]>('/evals/results'),tools:()=>api<any[]>('/mcp/tools'),skills:()=>api<any[]>('/skills'),calls:()=>api<any[]>('/evals/tool-calls')}

