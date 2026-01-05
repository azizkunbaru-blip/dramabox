import { z } from 'zod';
import type { Drama, DramaDetail, Episode, StreamInfo } from '@/lib/types';

const dramaItemSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  title: z.string().optional().catch('Untitled'),
  name: z.string().optional(),
  poster: z.string().optional(),
  thumbnail: z.string().optional(),
  image: z.string().optional(),
  badge: z.string().optional(),
  rating: z.union([z.string(), z.number()]).optional().transform((val) => (val !== undefined ? String(val) : undefined)),
  views: z.union([z.string(), z.number()]).optional().transform((val) => (val !== undefined ? String(val) : undefined))
});

const dramaDetailSchema = dramaItemSchema.extend({
  synopsis: z.string().optional().catch(''),
  description: z.string().optional(),
  genres: z.array(z.string()).optional(),
  totalEpisodes: z.number().optional(),
  totalEpisode: z.number().optional()
});

const episodeSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  episode: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  title: z.string().optional()
});

const streamSchema = z.object({
  url: z.string().optional(),
  type: z.string().optional(),
  stream: z.string().optional(),
  hls: z.string().optional()
});

function extractList(response: unknown): unknown[] {
  if (Array.isArray(response)) return response;
  if (response && typeof response === 'object') {
    const obj = response as Record<string, unknown>;
    const candidates = [obj.data, obj.results, obj.items, obj.list];
    for (const candidate of candidates) {
      if (Array.isArray(candidate)) return candidate;
    }
  }
  return [];
}

export function parseDramaList(response: unknown): Drama[] {
  const list = extractList(response);
  return list.map((item) => {
    const parsed = dramaItemSchema.safeParse(item);
    const data = parsed.success ? parsed.data : { id: 'unknown', title: 'Untitled' };
    return {
      id: data.id,
      title: data.title ?? data.name ?? 'Untitled',
      poster: data.poster ?? data.thumbnail ?? data.image ?? '/placeholder.svg',
      badge: data.badge,
      rating: data.rating,
      views: data.views
    };
  });
}

export function parseDramaDetail(response: unknown): DramaDetail | null {
  const data = Array.isArray(response) ? response[0] : response;
  const parsed = dramaDetailSchema.safeParse(data);
  if (!parsed.success) return null;
  const detail = parsed.data;
  return {
    id: detail.id,
    title: detail.title ?? detail.name ?? 'Untitled',
    poster: detail.poster ?? detail.thumbnail ?? detail.image ?? '/placeholder.svg',
    badge: detail.badge,
    rating: detail.rating,
    views: detail.views,
    synopsis: detail.synopsis ?? detail.description ?? '',
    genres: detail.genres,
    totalEpisodes: detail.totalEpisodes ?? detail.totalEpisode
  };
}

export function parseEpisodes(response: unknown): Episode[] {
  const list = extractList(response);
  return list
    .map((item) => episodeSchema.safeParse(item))
    .filter((result) => result.success)
    .map((result) => result.data);
}

export function parseStream(response: unknown): StreamInfo | null {
  if (!response || typeof response !== 'object') return null;
  const parsed = streamSchema.safeParse(response);
  if (!parsed.success) return null;
  return {
    url: parsed.data.url ?? parsed.data.stream ?? parsed.data.hls ?? '',
    type: parsed.data.type
  };
    }
