'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { soundEngine } from '@/lib/audio';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import Image from 'next/image';

export const AudioPlayer: React.FC = () => {
  const {
    isPlaying,
    setIsPlaying,
    currentTrack,
    currentTrackIndex,
    nextTrack,
    prevTrack,
    isMuted,
    toggleMute,
    volume,
    setVolume,
  } = useAppStore();

  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('00:00');
  const [bars, setBars] = useState<number[]>([40, 65, 85, 50, 70, 95, 60, 45]);

  // Handle play/pause with soundEngine
  const handleTogglePlay = async () => {
    if (isPlaying) {
      soundEngine.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      await soundEngine.playTrack(currentTrack.audioPath, currentTrack.id, () => {
        nextTrack();
      });
    }
  };

  // Re-trigger soundEngine when current track changes
  useEffect(() => {
    if (isPlaying) {
      soundEngine.playTrack(currentTrack.audioPath, currentTrack.id, () => {
        nextTrack();
      });
    }
  }, [currentTrack, isPlaying, nextTrack]);

  // Handle Mute
  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    toggleMute();
  };

  // Handle Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    soundEngine.setVolume(val);
    setVolume(val);
  };

  // Handle Seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const dur = soundEngine.getDuration();
    if (dur > 0) {
      soundEngine.seek(ratio * dur);
      setProgress(ratio * 100);
    }
  };

  // Real audio tracking and simulated visualizer bars
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isMuted) {
      interval = setInterval(() => {
        const freq = soundEngine.getFrequencyData();
        const newBars = [
          Math.max(20, (freq[1] || 60) % 100),
          Math.max(30, (freq[3] || 80) % 100),
          Math.max(25, (freq[5] || 70) % 100),
          Math.max(40, (freq[7] || 90) % 100),
          Math.max(20, (freq[9] || 50) % 100),
          Math.max(35, (freq[11] || 75) % 100),
        ];
        setBars(newBars);

        const cur = soundEngine.getCurrentTime();
        const dur = soundEngine.getDuration();
        if (dur > 0) {
          setProgress((cur / dur) * 100);
          const mins = Math.floor(cur / 60);
          const secs = Math.floor(cur % 60);
          setCurrentTimeFormatted(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
        } else {
          setProgress((prev) => (prev >= 100 ? 0 : prev + 0.3));
        }
      }, 150);
    } else {
      setBars([20, 20, 20, 20, 20, 20]);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isMuted]);

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <motion.div
        layout
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-wine-950/85 backdrop-blur-xl border border-rosegold-400/30 rounded-2xl p-3 shadow-luxury overflow-hidden"
      >
        {/* Collapsed Pill */}
        <div className="flex items-center space-x-3">
          {/* Rotating Vinyl Record Artwork */}
          <div
            onClick={() => setExpanded(!expanded)}
            className="relative w-11 h-11 rounded-full cursor-pointer overflow-hidden border border-rosegold-400/40 group flex-shrink-0"
            title="Expand player"
          >
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="w-full h-full relative"
            >
              <Image
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
              {/* Vinyl Center Hole */}
              <div className="absolute inset-0 m-auto w-3.5 h-3.5 bg-burgundy-900 border border-rosegold-400/80 rounded-full pointer-events-none" />
            </motion.div>
          </div>

          {/* Track Info & Visualizer */}
          <div
            onClick={() => setExpanded(!expanded)}
            className="flex flex-col cursor-pointer pr-1"
          >
            <span className="font-serif text-sm tracking-[0.1em] text-ivory-50 max-w-[130px] truncate">
              {currentTrack.title}
            </span>
            <span className="text-[10px] tracking-[0.18em] text-rosegold-300 uppercase">
              {isPlaying ? 'Now Playing' : 'Our Soundtrack'}
            </span>
          </div>

          {/* Audio Visualizer Mini Bars */}
          <div className="flex items-end space-x-0.5 h-4 px-1">
            {bars.map((height, i) => (
              <motion.div
                key={i}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.15 }}
                className="w-0.5 bg-rosegold-400/80 rounded-full"
              />
            ))}
          </div>

          {/* Primary Play/Pause Button */}
          <button
            onClick={handleTogglePlay}
            className="w-9 h-9 rounded-full bg-crimson-600/90 hover:bg-crimson-600 text-ivory-50 flex items-center justify-center transition-all shadow-crimson-glow flex-shrink-0"
            aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
          </button>
        </div>

        {/* Expanded Controls Panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-3 border-t border-rosegold-400/20 flex flex-col space-y-3"
            >
              {/* Description */}
              <p className="text-xs text-ivory-50/70 italic font-serif">
                &ldquo;{currentTrack.description}&rdquo;
              </p>

              {/* Progress Bar with Seek Capability */}
              <div className="flex items-center space-x-2 text-[10px] text-rosegold-300 font-mono">
                <span>{currentTimeFormatted}</span>
                <div
                  onClick={handleSeek}
                  className="flex-1 h-2 bg-rosegold-400/20 rounded-full overflow-hidden cursor-pointer flex items-center"
                  title="Seek position"
                >
                  <div
                    className="h-1 bg-gradient-to-r from-rosegold-400 to-crimson-600 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span>{currentTrack.durationFormatted}</span>
              </div>

              {/* Playback Controls & Volume */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevTrack}
                    className="p-1.5 text-ivory-50/70 hover:text-rosegold-300 transition-colors"
                    aria-label="Previous track"
                  >
                    <SkipBack size={15} />
                  </button>
                  <button
                    onClick={nextTrack}
                    className="p-1.5 text-ivory-50/70 hover:text-rosegold-300 transition-colors"
                    aria-label="Next track"
                  >
                    <SkipForward size={15} />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleToggleMute}
                    className="p-1.5 text-ivory-50/70 hover:text-rosegold-300 transition-colors"
                    aria-label="Toggle mute"
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 accent-rosegold-400 h-1 bg-rosegold-400/30 rounded-lg cursor-pointer"
                    aria-label="Volume slider"
                  />
                </div>
              </div>

              {/* Track Switcher Pills */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {['Alfaaz', 'Dilruba Dilnasee'].map((name, idx) => (
                  <button
                    key={name}
                    onClick={() => useAppStore.getState().setCurrentTrackIndex(idx)}
                    className={`text-[10px] py-1 px-2 rounded-lg border transition-all text-center tracking-[0.15em] uppercase ${
                      currentTrackIndex === idx
                        ? 'border-rosegold-400 bg-rosegold-400/20 text-ivory-50'
                        : 'border-rosegold-400/20 text-ivory-50/60 hover:text-ivory-50'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
