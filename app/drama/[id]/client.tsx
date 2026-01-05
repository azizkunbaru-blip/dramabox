'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EpisodesList } from '@/components/episodes-list';
import { ErrorState } from '@/components/error-state';
import { LoadingGrid } from '@/components/loading-grid';
import { getDetail, getEpisodes } from '@/lib/api/drama-service';
import type { DramaDetail, Episode } from '@/lib/types';
import { ApiError } from '@/lib/api/client';

interface DetailState {
  detail?: DramaDetail | null;
  episodes?: Episode[];
}

export default function DramaDetailClient({ id }: { id: string }) {
  const [state, setState] = useState<DetailState>({});
  const [lastEpisode, setLastEpisode] = useState<number | null>(null);

  const { data: detail, isLoading: detailLoading, error: detailError, refetch: refetchDetail } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getDetail(id)
  });

  const { data: episodes, isLoading: episodesLoading, error: episodesError, refetch: refetchEpisodes } = useQuery({
    queryKey: ['episodes', id],
    queryFn: () => getEpisodes(id, 1)
  });

  useEffect(() => {
    setState({ detail, episodes });
  }, [detail, episodes]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(`dramabox:last:${id}`);
      setLastEpisode(saved ? Number(saved) : null);
    }
  }, [id]);

  const isLoading = detailLoading || episodesLoading;
  const error = detailError || episodesError;

  if (isLoading) {
    return <LoadingGrid />;
  }

  if (error) {
    return (
      <ErrorState
        message={(error as ApiError)?.message ?? 'Terjadi kesalahan.'}
        onRetry={() => {
          console.error('Detail error', error);
          refetchDetail();
          refetchEpisodes();
        }}
      />
    );
  }

  if (!state.detail) {
    return <ErrorState message="Drama tidak ditemukan." />;
  }

  const firstEpisode = state.episodes?.[0];

  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">
          <Image src={state.detail.poster} alt={state.detail.title} fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">{state.detail.title}</h1>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {state.detail.badge && <Badge>{state.detail.badge}</Badge>}
              {state.detail.rating && <span>⭐ {state.detail.rating}</span>}
              {state.detail.totalEpisodes && <span>{state.detail.totalEpisodes} episode</span>}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{state.detail.synopsis || 'Sinopsis belum tersedia.'}</p>
          <div className="flex flex-wrap gap-2">
            {state.detail.genres?.map((genre) => (
              <Badge key={genre}>{genre}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {firstEpisode && (
              <Button asChild>
                <Link href={`/tonton/${id}/${firstEpisode.episode}`}>Mulai Nonton</Link>
              </Button>
            )}
            {lastEpisode && (
              <Button variant="secondary" asChild>
                <Link href={`/tonton/${id}/${lastEpisode}`}>Lanjutkan</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Daftar Episode</h2>
        {state.episodes ? (
          <EpisodesList dramaId={id} episodes={state.episodes} />
        ) : (
          <p className="text-sm text-muted-foreground">Episode belum tersedia.</p>
        )}
      </section>
    </div>
  );
}
