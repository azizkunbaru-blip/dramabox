import type { Metadata } from 'next';
import SulihSuaraClient from '@/app/sulih-suara/client';

export const metadata: Metadata = {
  title: 'Sulih Suara - DramaBox Web',
  description: 'Drama sulih suara Indonesia, terbaru dan terpopuler.'
};

export default function SulihSuaraPage() {
  return <SulihSuaraClient />;
}
