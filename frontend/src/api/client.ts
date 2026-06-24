export const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000/api/v1'

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path === '/../health' ? 'http://localhost:8000/health' : `${API_BASE}${path}`
  const response = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  })
  if (!response.ok) {
    let message = `请求失败 ${response.status}`
    try {
      const body = await response.json()
      message = body.detail || message
    } catch {}
    throw new Error(message)
  }
  return response.json()
}
