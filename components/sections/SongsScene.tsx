'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SONGS_DATA } from '@/content/songs';
import { useAppStore } from '@/lib/store';
import { soundEngine } from '@/lib/audio';
import { Play, Pause, Music, Disc, Sparkles } from 'lucide-react';
import Image from 'next/image';

export const SongsScene: React.FC = () => {
  const {
    isPlaying,
    setIsPlaying,
    currentTrackIndex,
    setCurrentTrackIndex,
    currentTrack,
  } = useAppStore();

  const handlePlaySong = async (index: number) => {
    if (currentTrackIndex === index && isPlaying) {
      soundEngine.pause();
      setIsPlaying(false);
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      await soundEngine.playTrack(SONGS_DATA[index].audioPath, SONGS_DATA[index].id);
    }
  };

  return (
    <section
      id="soundtrack"
      className="relative min-h-[90vh] py-24 sm:py-36 px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-rosegold-300 mb-3 block">
            Scene VIII · Harmonic Devotion
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory-50 tracking-[0.05em]">
            Our Soundtrack
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ivory-50/70 uppercase tracking-[0.2em] mt-3">
            Two Melodies That Hold the Rhythm of Our Six Years
          </p>
        </div>

        {/* Two Songs Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {SONGS_DATA.map((song, index) => {
            const isThisTrackPlaying = isPlaying && currentTrackIndex === index;

            return (
              <motion.div
                key={song.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-3xl p-6 sm:p-8 border transition-all shadow-luxury-lg overflow-hidden flex flex-col justify-between ${
                  isThisTrackPlaying
                    ? 'bg-gradient-to-b from-burgundy-900/90 to-wine-950/95 border-rosegold-400 shadow-crimson-glow'
                    : 'bg-wine-950/60 backdrop-blur-xl border-rosegold-400/25 hover:border-rosegold-400/50'
                }`}
              >
                {/* Background Vinyl Grooves Glow */}
                {isThisTrackPlaying && (
                  <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-crimson-600/15 rounded-full blur-[80px] pointer-events-none" />
                )}

                <div className="flex items-center space-x-6">
                  {/* Album Vinyl Record Artwork */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-rosegold-400/50 flex-shrink-0 shadow-luxury">
                    <motion.div
                      animate={isThisTrackPlaying ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={song.coverImage}
                        alt={song.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 m-auto w-6 h-6 bg-wine-950 border border-rosegold-400 rounded-full" />
                    </motion.div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-rosegold-300">
                      Track 0{index + 1}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 tracking-[0.05em] mt-1">
                      {song.title}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-ivory-50/60 mt-1">
                      {song.artist}
                    </span>
                    <span className="text-xs font-mono text-rosegold-400 mt-2">
                      {song.durationFormatted}
                    </span>
                  </div>
                </div>

                <div className="my-6">
                  <p className="font-serif italic text-base text-blush-200/90 leading-relaxed">
                    &ldquo;{song.description}&rdquo;
                  </p>
                </div>

                {/* Play Button Action */}
                <div className="pt-4 border-t border-rosegold-400/20 flex items-center justify-between">
                  <button
                    onClick={() => handlePlaySong(index)}
                    className="px-6 py-3 rounded-full bg-crimson-600 hover:bg-crimson-700 text-ivory-50 text-xs uppercase tracking-[0.25em] flex items-center space-x-2.5 transition-all shadow-crimson-glow"
                    data-cursor="play"
                  >
                    {isThisTrackPlaying ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isThisTrackPlaying ? 'Pause Melody' : 'Play This Song'}</span>
                  </button>

                  <div className="flex items-center space-x-1 text-rosegold-300 text-xs uppercase tracking-[0.2em]">
                    <Music size={14} />
                    <span>{isThisTrackPlaying ? 'Active' : 'Queued'}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
