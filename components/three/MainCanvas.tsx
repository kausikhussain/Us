'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAppStore } from '@/lib/store';
import { detectQualityTier } from '@/lib/quality';
import { SilkRibbon } from './SilkRibbon';
import { InfinityRibbon } from './InfinityRibbon';
import { RosePetals } from './RosePetals';
import { GlassHeart } from './GlassHeart';
import { CameraRig } from './CameraRig';

export const MainCanvas: React.FC = () => {
  const { qualityTier, setQualityTier, activeSection, setActiveSection, reducedMotion } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tier = detectQualityTier();
    setQualityTier(tier);

    // IntersectionObserver to sync activeSection
    const sectionIds = ['hero', 'infinity', 'timeline', 'gallery', 'letters', 'soundtrack', 'surprise', 'counter', 'finale'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setQualityTier, setActiveSection]);

  if (!mounted) return null;

  // Static / Reduced Motion Fallback
  if (qualityTier === 'static' || reducedMotion || hasWebGLError) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-radial-vignette opacity-50" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blush-200/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-crimson-600/10 rounded-full blur-[120px]" />
      </div>
    );
  }

  const petalCount = qualityTier === 'high' ? 85 : 30;
  const isHero = activeSection === 'hero';
  const isInfinity = activeSection === 'infinity';

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        dpr={qualityTier === 'high' ? [1, 1.75] : 1}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setHasWebGLError(true)}
      >
        <Suspense fallback={null}>
          <CameraRig />

          {/* Luxury Warm Studio Lighting */}
          <ambientLight intensity={0.75} color="#FFF5F7" />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFF0E6" />
          <pointLight position={[-6, -4, 4]} intensity={0.8} color="#C99A83" />
          <pointLight position={[0, 4, -3]} intensity={1.0} color="#E8BBC7" />

          {/* Contextual 3D Elements */}
          {isHero && (
            <>
              <SilkRibbon />
              <GlassHeart position={[0, 2.0, -1.8]} scale={0.85} />
            </>
          )}

          {isInfinity && <InfinityRibbon />}

          {/* Rose Petals drift softly through all scenes */}
          <RosePetals count={petalCount} />
        </Suspense>
      </Canvas>
    </div>
  );
};
