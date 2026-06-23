import {api} from './client'
export const stockApi={search:(keyword='')=>api<any[]>(`/stocks/search?keyword=${encodeURIComponent(keyword)}`),dashboard:(code:string)=>api<any>(`/stocks/${code}/dashboard`)}

