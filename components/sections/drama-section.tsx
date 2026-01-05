import { useQuery } from '@tanstack/react-query';
import { DramaGrid } from '@/components/drama-grid';
import { LoadingGrid } from '@/components/loading-grid';
import { ErrorState } from '@/components/error-state';
import type { Drama } from '@/lib/types';
import { ApiError } from '@/lib/api/client';

interface DramaSectionProps {
  title: string;
  queryKey: string[];
  queryFn: () => Promise<Drama[]>;
}

export function DramaSection({ title, queryKey, queryFn }: DramaSectionProps) {
  const { data, isLoading, error, refetch } = useQuery({ queryKey, queryFn });

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {isLoading && <LoadingGrid />}
      {error ? (
        <ErrorState
          message={(error as ApiError)?.message ?? 'Terjadi kesalahan.'}
          onRetry={() => {
            console.error('Fetch error', error);
            refetch();
          }}
        />
      ) : (
        data && <DramaGrid items={data} />
      )}
    </section>
  );
  }
