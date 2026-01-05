"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { DramaGrid } from '@/components/drama-grid';
import { LoadingGrid } from '@/components/loading-grid';
import { ErrorState } from '@/components/error-state';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { searchDrama } from '@/lib/api/drama-service';
import { ApiError } from '@/lib/api/client';

export default function SearchClient() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 500);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchDrama(debouncedQuery),
    enabled: debouncedQuery.length > 1
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Cari Drama</h1>
        <Input
          placeholder="Cari judul drama..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {isLoading && <LoadingGrid />}
      {error ? (
        <ErrorState
          message={(error as ApiError)?.message ?? 'Terjadi kesalahan.'}
          onRetry={() => {
            console.error('Search error', error);
            refetch();
          }}
        />
      ) : (
        data && <DramaGrid items={data} />
      )}
      {!debouncedQuery && (
        <p className="text-sm text-muted-foreground">Mulai ketik untuk mencari drama favorit.</p>
      )}
    </div>
  );
}
