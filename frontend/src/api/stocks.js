import { api } from './client';
export const stockApi = { search: (keyword = '') => api(`/stocks/search?keyword=${encodeURIComponent(keyword)}`), dashboard: (code) => api(`/stocks/${code}/dashboard`) };
