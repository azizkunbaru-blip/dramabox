import type { Metadata } from 'next';
import { DramaSection } from '@/components/sections/drama-section';
import { getPopular } from '@/lib/api/drama-service';

export const metadata: Metadata = {
  title: 'Terpopuler - DramaBox Web',
  description: 'Drama pendek trending dan terpopuler di DramaBox Web.'
};

export default function TerpopulerPage() {
  return <DramaSection title="Terpopuler" queryKey={['popular']} queryFn={getPopular} />;
}
