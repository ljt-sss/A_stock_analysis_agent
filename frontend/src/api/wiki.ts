import {api} from './client'
export const wikiApi={pages:()=>api<any[]>('/wiki/pages'),memories:(code='600519.SH')=>api<any[]>(`/memory?scope=stock&ts_code=${code}`),createMemory:(body:any)=>api('/memory',{method:'POST',body:JSON.stringify(body)})}

