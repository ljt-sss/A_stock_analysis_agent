import { api } from './client';
export const agentApi = { create: (ts_code) => api('/agent/tasks/fundamental-analysis', { method: 'POST', body: JSON.stringify({ ts_code }) }), get: (id) => api(`/agent/tasks/${id}`), steps: (id) => api(`/agent/tasks/${id}/steps`), calls: (id) => api(`/agent/tasks/${id}/tool-calls`), reports: (code) => api(`/analysis/reports${code ? `?ts_code=${code}` : ''}`) };
