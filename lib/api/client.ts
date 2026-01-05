import axios from 'axios';
import { defaultBaseUrls } from '@/lib/api/endpoints';

export class ApiError extends Error {
  constructor(message: string, public debug?: unknown) {
    super(message);
    this.name = 'ApiError';
  }
}

async function requestWithFallback<T>(paths: string[], params?: Record<string, string | number | undefined>) {
  const errors: unknown[] = [];

  for (const base of defaultBaseUrls) {
    for (const path of paths) {
      const url = path.startsWith('http') ? path : `${base}${path}`;
      try {
        const response = await axios.get<T>(url, { params });
        return response.data;
      } catch (error) {
        errors.push({ url, error });
      }
    }
  }

  throw new ApiError('Gagal mengambil data. Silakan coba lagi.', { attempts: errors });
}

export const apiClient = {
  get: requestWithFallback
};
