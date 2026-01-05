import type { Metadata } from 'next';
import WatchClient from '@/app/tonton/[id]/[episode]/client';

export const metadata: Metadata = {
  title: 'Tonton Drama - DramaBox Web',
  description: 'Tonton episode drama pendek favoritmu.'
};

export default function WatchPage({ params }: { params: { id: string; episode: string } }) {
  return <WatchClient id={params.id} episode={params.episode} />;
}
