'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { LenisProvider } from '@/components/ui/LenisProvider';
import { InitialLoader } from '@/components/ui/InitialLoader';
import { PasswordGate } from '@/components/ui/PasswordGate';
import { Navigation } from '@/components/ui/Navigation';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Lightbox } from '@/components/ui/Lightbox';
import { DevPersonalizationBadge } from '@/components/ui/DevPersonalizationBadge';

// 9 Scenes
import { HeroScene } from '@/components/sections/HeroScene';
import { InfinityScene } from '@/components/sections/InfinityScene';
import { TimelineScene } from '@/components/sections/TimelineScene';
import { GalleryScene } from '@/components/sections/GalleryScene';
import { LettersScene } from '@/components/sections/LettersScene';
import { SongsScene } from '@/components/sections/SongsScene';
import { SurpriseScene } from '@/components/sections/SurpriseScene';
import { CounterScene } from '@/components/sections/CounterScene';
import { FinaleScene } from '@/components/sections/FinaleScene';

// Dynamically import Three.js Canvas to optimize initial load & SSR
const MainCanvas = dynamic(
  () => import('@/components/three/MainCanvas').then((mod) => mod.MainCanvas),
  { ssr: false }
);

export default function Home() {
  return (
    <PasswordGate>
      <LenisProvider>
        {/* Initial Monogram Drawing Loader */}
        <InitialLoader />

        {/* Magnetic Custom Desktop Cursor */}
        <CustomCursor />

        {/* Floating Minimal Navigation Bar */}
        <Navigation />

        {/* 3D WebGL Background Atmosphere & Shaders */}
        <MainCanvas />

        {/* Floating Sound Controller & Visualizer */}
        <AudioPlayer />

        {/* Editorial Lightbox Modal */}
        <Lightbox />

        {/* Dev Personalization Guide Badge */}
        <DevPersonalizationBadge />

        {/* THE 9 CINEMATIC SCENES */}
        <main className="relative z-10 w-full overflow-hidden">
          <HeroScene />
          <InfinityScene />
          <TimelineScene />
          <GalleryScene />
          <LettersScene />
          <SongsScene />
          <SurpriseScene />
          <CounterScene />
          <FinaleScene />
        </main>
      </LenisProvider>
    </PasswordGate>
  );
}
