import { create } from 'zustand';
import { SONGS_DATA, SongTrack } from '@/content/songs';

export type QualityTier = 'high' | 'medium' | 'low' | 'static';

interface AppStore {
  // Audio state
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: SongTrack;
  isMuted: boolean;
  volume: number;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrackIndex: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;

  // Active scene / section
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Timeline
  selectedYear: number;
  setSelectedYear: (year: number) => void;

  // Lightbox
  lightboxOpen: boolean;
  lightboxIndex: number;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;

  // Letters
  activeLetterId: string;
  isEnvelopeOpen: boolean;
  letterRevealMode: 'cinematic' | 'instant';
  setActiveLetterId: (id: string) => void;
  setIsEnvelopeOpen: (open: boolean) => void;
  setLetterRevealMode: (mode: 'cinematic' | 'instant') => void;

  // Surprise
  isSurpriseUnlocked: boolean;
  setIsSurpriseUnlocked: (unlocked: boolean) => void;

  // Quality & Accessibility
  qualityTier: QualityTier;
  reducedMotion: boolean;
  setQualityTier: (tier: QualityTier) => void;
  setReducedMotion: (reduced: boolean) => void;

  // Time Travel (Dev / Testing)
  timeTravelMode: 'before' | 'anniversary' | 'after' | null;
  setTimeTravelMode: (mode: 'before' | 'anniversary' | 'after' | null) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  isPlaying: false,
  currentTrackIndex: 0,
  currentTrack: SONGS_DATA[0],
  isMuted: false,
  volume: 0.75,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTrackIndex: (index) => {
    const validIndex = (index + SONGS_DATA.length) % SONGS_DATA.length;
    set({
      currentTrackIndex: validIndex,
      currentTrack: SONGS_DATA[validIndex],
    });
  },
  nextTrack: () => {
    const nextIdx = (get().currentTrackIndex + 1) % SONGS_DATA.length;
    get().setCurrentTrackIndex(nextIdx);
  },
  prevTrack: () => {
    const prevIdx = (get().currentTrackIndex - 1 + SONGS_DATA.length) % SONGS_DATA.length;
    get().setCurrentTrackIndex(prevIdx);
  },
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setVolume: (volume) => set({ volume }),

  activeSection: 'hero',
  setActiveSection: (activeSection) => set({ activeSection }),

  selectedYear: 2020,
  setSelectedYear: (selectedYear) => set({ selectedYear }),

  lightboxOpen: false,
  lightboxIndex: 0,
  openLightbox: (lightboxIndex) => set({ lightboxOpen: true, lightboxIndex }),
  closeLightbox: () => set({ lightboxOpen: false }),

  activeLetterId: 'letter-01',
  isEnvelopeOpen: false,
  letterRevealMode: 'cinematic',
  setActiveLetterId: (activeLetterId) => set({ activeLetterId }),
  setIsEnvelopeOpen: (isEnvelopeOpen) => set({ isEnvelopeOpen }),
  setLetterRevealMode: (letterRevealMode) => set({ letterRevealMode }),

  isSurpriseUnlocked: false,
  setIsSurpriseUnlocked: (isSurpriseUnlocked) => set({ isSurpriseUnlocked }),

  qualityTier: 'high',
  reducedMotion: false,
  setQualityTier: (qualityTier) => set({ qualityTier }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),

  timeTravelMode: null,
  setTimeTravelMode: (timeTravelMode) => set({ timeTravelMode }),
}));
