import type { Metadata } from 'next';
import { Hero } from '@/components/hero';
import { DramaSection } from '@/components/sections/drama-section';
import { getForYou } from '@/lib/api/drama-service';

export const metadata: Metadata = {
  title: 'Beranda - DramaBox Web',
  description: 'Rekomendasi drama pendek untuk kamu di DramaBox Web.'
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />
      <DramaSection title="Untuk Kamu" queryKey={['forYou']} queryFn={getForYou} />
    </div>
  );
}
