import { api } from './client';
export const evalApi = { metrics: () => api('/evals/metrics'), cases: () => api('/evals/cases'), results: () => api('/evals/results'), tools: () => api('/mcp/tools'), skills: () => api('/skills'), calls: () => api('/evals/tool-calls') };
