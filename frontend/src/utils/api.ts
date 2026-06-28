// Centralized API base URL so the backend host isn't hardcoded across the app.
// Override per environment with NEXT_PUBLIC_API_URL; falls back to local dev.
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:4000';

/** Build a full API URL from a path, e.g. apiUrl('/api/patients'). */
export const apiUrl = (path: string): string =>
  `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
