import logger from '../utils/logger';

const API_BASE = import.meta.env.VITE_API_URL ?? 'https://localhost:7143';

export async function apiRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: any,
  token?: string
): Promise<T> {
  logger.debug(`API ${method} ${path}`, body ? { body } : {});

  // Add a check for API base URL
  if (!API_BASE) {
    throw new Error('API base URL is not configured');
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    let errorMessage = `Request failed: ${res.status} ${res.statusText}`;
    try {
      const errJson = JSON.parse(errText);
      errorMessage = errJson.message || errJson.title || errJson.detail || errorMessage;
    } catch {
      errorMessage = errText || errorMessage;
    }
    logger.error(`API ${method} ${path} failed:`, errorMessage);
    throw new Error(errorMessage);
  }

  // Handle empty responses (204 No Content)
  const text = await res.text();
  const result = text ? JSON.parse(text) : ({} as T);

  logger.success(`API ${method} ${path} succeeded`);
  return result;
}