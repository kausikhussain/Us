/**
 * Audio Engine for K & N
 * Provides robust HTML5 audio playback for our two authentic tracks:
 * 1. "Alfaaz"
 * 2. "Dilruba Dilnasee"
 *
 * Includes Web Audio analyser support for real-time visualizer frequencies,
 * session volume persistence, seek, and error-resilient playback without
 * synthetic sound fallbacks.
 */

class SoundEngine {
  private audioElement: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private currentAudioPath: string | null = null;
  private currentTrackId: string | null = null;
  private isMuted = false;
  private volume = 0.75;
  private hasInitializedSource = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = sessionStorage.getItem('kn_audio_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
      const savedVol = sessionStorage.getItem('kn_audio_vol');
      if (savedVol !== null) {
        this.volume = parseFloat(savedVol);
      }
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (typeof window === 'undefined') return;
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.preload = 'auto';
      this.audioElement.crossOrigin = 'anonymous';
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
  }

  private initWebAudio() {
    if (typeof window === 'undefined' || !this.audioElement) return;

    try {
      if (!this.audioCtx) {
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtxClass) {
          this.audioCtx = new AudioCtxClass();
          this.analyser = this.audioCtx.createAnalyser();
          this.analyser.fftSize = 64;
          this.gainNode = this.audioCtx.createGain();
          this.gainNode.gain.setValueAtTime(
            this.isMuted ? 0 : this.volume,
            this.audioCtx.currentTime
          );
        }
      }

      if (this.audioCtx && this.analyser && this.gainNode && !this.hasInitializedSource) {
        try {
          this.sourceNode = this.audioCtx.createMediaElementSource(this.audioElement);
          this.sourceNode.connect(this.analyser);
          this.analyser.connect(this.gainNode);
          this.gainNode.connect(this.audioCtx.destination);
          this.hasInitializedSource = true;
        } catch {
          // If already connected or not permitted, direct native playback continues
        }
      }

      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
    } catch {
      // Ignore Web Audio initialization errors — direct HTML5 audio playback always works
    }
  }

  public getFrequencyData(): Uint8Array {
    if (this.analyser) {
      const data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(data);
      return data;
    }
    // Subtle rhythmic fallback for visualizer bars when Web Audio graph isn't active
    return new Uint8Array(32).map((_, i) => Math.floor(40 + Math.sin(Date.now() / 200 + i) * 30));
  }

  public async playTrack(
    audioPath: string,
    trackId: string,
    onEnded?: () => void
  ): Promise<boolean> {
    this.initAudioElement();
    if (!this.audioElement) return false;

    this.initWebAudio();

    // Setup track completion callback
    this.audioElement.onended = () => {
      if (onEnded) onEnded();
    };

    // If already playing this exact track, keep playing
    if (this.currentAudioPath === audioPath && !this.audioElement.paused) {
      return true;
    }

    try {
      if (this.currentAudioPath !== audioPath) {
        this.currentAudioPath = audioPath;
        this.currentTrackId = trackId;
        this.audioElement.src = audioPath;
        this.audioElement.currentTime = 0;
        this.audioElement.load();
      }

      this.audioElement.volume = this.isMuted ? 0 : this.volume;

      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume().catch(() => {});
      }

      await this.audioElement.play();
      return true;
    } catch (err: unknown) {
      const error = err as Error;
      // AbortError happens when a newer play request interrupts an in-flight one; benign
      if (error?.name !== 'AbortError') {
        console.warn(`Audio playback for ${trackId} (${audioPath}) encountered:`, error);
      }
      return false;
    }
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  public stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    this.currentAudioPath = null;
    this.currentTrackId = null;
  }

  public getCurrentTime(): number {
    return this.audioElement ? this.audioElement.currentTime : 0;
  }

  public getDuration(): number {
    return this.audioElement && !isNaN(this.audioElement.duration)
      ? this.audioElement.duration
      : 0;
  }

  public seek(seconds: number) {
    if (this.audioElement && !isNaN(seconds)) {
      this.audioElement.currentTime = Math.max(0, seconds);
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    const effectiveVol = this.isMuted ? 0 : this.volume;

    if (this.audioElement) {
      this.audioElement.volume = effectiveVol;
    }
    if (this.gainNode && this.audioCtx) {
      try {
        this.gainNode.gain.setValueAtTime(effectiveVol, this.audioCtx.currentTime);
      } catch {
        // GainNode catch
      }
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('kn_audio_vol', this.volume.toString());
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('kn_audio_muted', this.isMuted.toString());
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentTrackId(): string | null {
    return this.currentTrackId;
  }
}

export const soundEngine = new SoundEngine();
