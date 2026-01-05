import type { Metadata } from 'next';
import SearchClient from '@/app/cari/client';

export const metadata: Metadata = {
  title: 'Cari Drama - DramaBox Web',
  description: 'Cari drama pendek favoritmu.'
};

export default function SearchPage() {
  return <SearchClient />;
}
