"use client";

import { useState } from 'react';
import { DramaSection } from '@/components/sections/drama-section';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDubLatest, getDubPopular } from '@/lib/api/drama-service';

export default function SulihSuaraClient() {
  const [tab, setTab] = useState<'latest' | 'popular'>('latest');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sulih Suara Indonesia</h1>
        <Tabs value={tab} onValueChange={(v) => setTab(v as "latest" | "popular")}>
          <TabsList>
            <TabsTrigger value="latest" active={tab === 'latest'} onSelect={setTab}>
              Terbaru
            </TabsTrigger>
            <TabsTrigger value="popular" active={tab === 'popular'} onSelect={setTab}>
              Terpopuler
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {tab === 'latest' ? (
        <DramaSection title="Sulih Suara Terbaru" queryKey={['dub-latest']} queryFn={getDubLatest} />
      ) : (
        <DramaSection title="Sulih Suara Terpopuler" queryKey={['dub-popular']} queryFn={getDubPopular} />
      )}
    </div>
  );
}
