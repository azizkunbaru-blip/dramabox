import type { Metadata } from 'next';
import { DramaSection } from '@/components/sections/drama-section';
import { getLatest } from '@/lib/api/drama-service';

export const metadata: Metadata = {
  title: 'Terbaru - DramaBox Web',
  description: 'Drama pendek terbaru di DramaBox Web.'
};

export default function TerbaruPage() {
  return <DramaSection title="Terbaru" queryKey={['latest']} queryFn={getLatest} />;
}
