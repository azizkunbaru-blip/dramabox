'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { VideoPlayer } from '@/components/video-player';
import { ErrorState } from '@/components/error-state';
import { getDetail, getEpisodes, getStream } from '@/lib/api/drama-service';
import { ApiError } from '@/lib/api/client';
import type { Episode } from '@/lib/types';

export default function WatchClient({ id, episode }: { id: string; episode: string }) {
  const episodeNumber = Number(episode);

  const { data: detail } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getDetail(id)
  });

  const { data: episodes } = useQuery({
    queryKey: ['episodes', id],
    queryFn: () => getEpisodes(id, 1)
  });

  const {
    data: stream,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['stream', id, episodeNumber],
    queryFn: () => getStream(id, episodeNumber)
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(`dramabox:last:${id}`, String(episodeNumber));
    }
  }, [id, episodeNumber]);

  const currentEpisodeIndex = useMemo(() => {
    if (!episodes) return -1;
    return episodes.findIndex((item) => item.episode === episodeNumber);
  }, [episodes, episodeNumber]);

  const prevEpisode = currentEpisodeIndex > 0 ? episodes?.[currentEpisodeIndex - 1] : null;
  const nextEpisode =
    episodes && currentEpisodeIndex >= 0 && currentEpisodeIndex < episodes.length - 1
      ? episodes[currentEpisodeIndex + 1]
      : null;

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Memuat stream...</p>;
  }

  if (error || !stream?.url) {
    return (
      <ErrorState
        message={(error as ApiError)?.message ?? 'Stream tidak tersedia.'}
        onRetry={() => {
          console.error('Stream error', error);
          refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{detail?.title ?? 'Menonton Drama'}</h1>
        <VideoPlayer src={stream.url} poster={detail?.poster} />
      </div>
      <div className="flex flex-wrap gap-3">
        {prevEpisode && (
          <Button variant="secondary" asChild>
            <Link href={`/tonton/${id}/${prevEpisode.episode}`}>Episode Sebelumnya</Link>
          </Button>
        )}
        {nextEpisode && (
          <Button asChild>
            <Link href={`/tonton/${id}/${nextEpisode.episode}`}>Episode Selanjutnya</Link>
          </Button>
        )}
      </div>
      {episodes && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Pilih Episode</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode: Episode) => (
              <Link
                key={episode.id}
                href={`/tonton/${id}/${episode.episode}`}
                className={`rounded-lg border px-3 py-2 text-sm ${
                  episode.episode === episodeNumber
                  ? 'border-primary bg-primary text-primaryForeground'
                    : 'border-border hover:bg-muted'
                }`}
              >
                Episode {episode.episode}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
  }
