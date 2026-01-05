import { apiClient } from '@/lib/api/client';
import { endpointMap } from '@/lib/api/endpoints';
import { parseDramaDetail, parseDramaList, parseEpisodes, parseStream } from '@/lib/api/parser';
import type { Drama, DramaDetail, Episode, StreamInfo } from '@/lib/types';

export async function getForYou(): Promise<Drama[]> {
  const data = await apiClient.get(endpointMap.getForYou);
  return parseDramaList(data);
}

export async function getLatest(): Promise<Drama[]> {
  const data = await apiClient.get(endpointMap.getLatest);
  return parseDramaList(data);
}

export async function getPopular(): Promise<Drama[]> {
  const data = await apiClient.get(endpointMap.getPopular);
  return parseDramaList(data);
}

export async function getDubLatest(): Promise<Drama[]> {
  const data = await apiClient.get(endpointMap.getDubLatest);
  return parseDramaList(data);
}

export async function getDubPopular(): Promise<Drama[]> {
  const data = await apiClient.get(endpointMap.getDubPopular);
  return parseDramaList(data);
}

export async function searchDrama(query: string): Promise<Drama[]> {
  const data = await apiClient.get(endpointMap.search, { q: query });
  return parseDramaList(data);
}

export async function getDetail(id: string): Promise<DramaDetail | null> {
  const data = await apiClient.get(endpointMap.getDetail.map((path) => `${path}/${id}`));
  return parseDramaDetail(data);
}

export async function getEpisodes(id: string, page = 1): Promise<Episode[]> {
  const data = await apiClient.get(endpointMap.getEpisodes.map((path) => `${path}/${id}`), { page });
  return parseEpisodes(data);
}

export async function getStream(id: string, episode: number): Promise<StreamInfo | null> {
  const data = await apiClient.get(endpointMap.getStream.map((path) => `${path}/${id}/${episode}`));
  return parseStream(data);
}
