'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { LenisProvider } from '@/components/ui/LenisProvider';
import { InitialLoader } from '@/components/ui/InitialLoader';
import { Navigation } from '@/components/ui/Navigation';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Lightbox } from '@/components/ui/Lightbox';
import { DevPersonalizationBadge } from '@/components/ui/DevPersonalizationBadge';

// The 13 Cinematic Narrative Scenes (Strict Order)
import { HeroScene } from '@/components/sections/HeroScene';
import { MessageScene } from '@/components/sections/MessageScene';
import { CounterScene } from '@/components/sections/CounterScene';
import { BeautyOfYouScene } from '@/components/sections/BeautyOfYouScene';
import { TwoOfUsScene } from '@/components/sections/TwoOfUsScene';
import { LittleMomentsScene } from '@/components/sections/LittleMomentsScene';
import { QuoteJourneyScene } from '@/components/sections/QuoteJourneyScene';
import { SongsScene } from '@/components/sections/SongsScene';
import { TimelineScene } from '@/components/sections/TimelineScene';
import { LettersScene } from '@/components/sections/LettersScene';
import { SurpriseScene } from '@/components/sections/SurpriseScene';
import { FinalMemoryScene } from '@/components/sections/FinalMemoryScene';
import { FinaleScene } from '@/components/sections/FinaleScene';

// Dynamically import Three.js Canvas to optimize initial load & SSR
const MainCanvas = dynamic(
  () => import('@/components/three/MainCanvas').then((mod) => mod.MainCanvas),
  { ssr: false }
);

export const MainStoryApp: React.FC = () => {
  return (
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

      {/* THE COMPLETE 13-SCENE STORY ARC */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* 01. Overture */}
        <HeroScene />
        {/* 02. A Message Before the Journey */}
        <MessageScene />
        {/* 03. Our Six Years (Anniversary Milestone & Live Counter) */}
        <CounterScene />
        {/* 04. The Beauty of You (Nasreen Portraits) */}
        <BeautyOfYouScene />
        {/* 05. The Two of Us (Together Compositions & Ultrawide) */}
        <TwoOfUsScene />
        {/* 06. Little Moments, Big Feelings (Candids & Filmstrip) */}
        <LittleMomentsScene />
        {/* 07. The Quote Journey (67 Original Quotes across 10 Themes) */}
        <QuoteJourneyScene />
        {/* 08. Our Soundtrack (Two Sacred Melodies) */}
        <SongsScene />
        {/* 09. Six Years of Us (Interactive Timeline 2020-2026) */}
        <TimelineScene />
        {/* 10. The Letters (Three Keepsake Envelopes) */}
        <LettersScene />
        {/* 11. Intimate Secret (Interactive Surprise Box) */}
        <SurpriseScene />
        {/* 12. The Final Memory (Master Portrait & Signature Line) */}
        <FinalMemoryScene />
        {/* 13. The Grand Finale (Eternity & Monogram) */}
        <FinaleScene />
      </main>
    </LenisProvider>
  );
};
