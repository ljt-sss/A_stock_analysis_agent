import { api } from './client';
export const wikiApi = { pages: () => api('/wiki/pages'), memories: (code = '600519.SH') => api(`/memory?scope=stock&ts_code=${code}`), createMemory: (body) => api('/memory', { method: 'POST', body: JSON.stringify(body) }) };
