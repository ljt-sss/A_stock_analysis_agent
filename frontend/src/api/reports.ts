import {api} from './client'
export const reportApi={list:()=>api<any[]>('/reports'),updateAll:()=>api('/reports/update-all',{method:'POST'}),pipeline:(id:string)=>api<any[]>(`/reports/${id}/pipeline`)}

