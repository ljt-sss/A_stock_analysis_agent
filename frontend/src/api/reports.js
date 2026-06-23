import { api } from './client';
export const reportApi = { list: () => api('/reports'), updateAll: () => api('/reports/update-all', { method: 'POST' }), pipeline: (id) => api(`/reports/${id}/pipeline`) };
