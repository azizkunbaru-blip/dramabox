import type { Drama } from '@/lib/types';
import { DramaCard } from '@/components/drama-card';

interface DramaGridProps {
  items: Drama[];
}

export function DramaGrid({ items }: DramaGridProps) {
  if (!items.length) {
    return <p className="text-sm text-muted-foreground">Belum ada drama untuk ditampilkan.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((drama) => (
        <DramaCard key={drama.id} drama={drama} />
      ))}
    </div>
  );
}
