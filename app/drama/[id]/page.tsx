import type { Metadata } from 'next';
import DramaDetailClient from '@/app/drama/[id]/client';

export const metadata: Metadata = {
  title: 'Detail Drama - DramaBox Web',
  description: 'Detail drama dan daftar episode.'
};

export default function DramaDetailPage({ params }: { params: { id: string } }) {
  return <DramaDetailClient id={params.id} />;
}
