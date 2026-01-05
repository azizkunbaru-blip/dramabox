import Link from 'next/link';
import Image from 'next/image';
import type { Drama } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface DramaCardProps {
  drama: Drama;
}

export function DramaCard({ drama }: DramaCardProps) {
  return (
    <Link href={`/drama/${drama.id}`}>
      <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
        <div className="relative h-60 w-full">
          <Image src={drama.poster} alt={drama.title} fill className="object-cover" />
        </div>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold line-clamp-2">{drama.title}</h3>
            {drama.badge && <Badge>{drama.badge}</Badge>}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {drama.rating && <span>⭐ {drama.rating}</span>}
            {drama.views && <span>{drama.views} views</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
