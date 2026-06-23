export const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000/api/v1';
export async function api(path, init) { const response = await fetch(`${API_BASE}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } }); if (!response.ok)
    throw new Error(`请求失败 ${response.status}`); return response.json(); }
