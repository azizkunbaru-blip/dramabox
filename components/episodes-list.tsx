'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Episode } from '@/lib/types';

interface EpisodesListProps {
  dramaId: string;
  episodes: Episode[];
}

const PAGE_SIZE = 10;

export function EpisodesList({ dramaId, episodes }: EpisodesListProps) {
  const [page, setPage] = useState(1);
  const total = Math.ceil(episodes.length / PAGE_SIZE);
  const items = episodes.slice(0, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((episode) => (
          <Link
            key={episode.id}
            href={`/tonton/${dramaId}/${episode.episode}`}
            className="rounded-lg border border-border bg-card px-4 py-3 text-sm hover:bg-muted"
          >
            Episode {episode.episode} {episode.title ? `- ${episode.title}` : ''}
          </Link>
        ))}
      </div>
      {page < total && (
        <Button variant="secondary" onClick={() => setPage((prev) => prev + 1)}>
          Muat lebih banyak
        </Button>
      )}
    </div>
  );
}
