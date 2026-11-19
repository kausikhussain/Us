/**
 * Audio Engine for KAUSEEN
 * Handles audio playback, session persistence, smooth crossfading,
 * and a procedural harmonic ambient romantic synthesizer fallback.
 */

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private synthInterval: NodeJS.Timeout | null = null;
  private isSynthesizing = false;
  private isMuted = false;
  private volume = 0.75;
  private audioElement: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = sessionStorage.getItem('kauseen_audio_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
      const savedVol = sessionStorage.getItem('kauseen_audio_vol');
      if (savedVol !== null) {
        this.volume = parseFloat(savedVol);
      }
    }
  }

  private initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(32).fill(12);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  public async playTrack(audioPath: string, trackId: string, onEnded?: () => void) {
    this.initContext();
    this.stop();

    // First attempt to load real audio element
    try {
      this.audioElement = new Audio(audioPath);
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      this.audioElement.onended = () => {
        if (onEnded) onEnded();
      };

      // Connect to Web Audio Analyser if supported
      if (this.audioCtx && this.analyser) {
        try {
          const source = this.audioCtx.createMediaElementSource(this.audioElement);
          source.connect(this.analyser);
          this.analyser.connect(this.audioCtx.destination);
        } catch {
          // Fallback if already connected or CORS
        }
      }

      await this.audioElement.play();
      this.isSynthesizing = false;
      return true;
    } catch {
      // If the file doesn't exist or playback was prevented, engage the romantic harmonic synthesizer!
      this.startHarmonicSynth(trackId);
      return false;
    }
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynth();
  }

  public stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement = null;
    }
    this.stopSynth();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.audioCtx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('kauseen_audio_vol', this.volume.toString());
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('kauseen_audio_muted', this.isMuted.toString());
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Procedural lush romantic soundtrack synthesizer
   * Generates warm, soulful chord progressions (F# minor, D major, A major, C# minor)
   * emulating cinematic strings and piano arpeggios.
   */
  private startHarmonicSynth(trackId: string) {
    if (this.isSynthesizing || !this.audioCtx || !this.gainNode || !this.analyser) return;
    this.isSynthesizing = true;

    // Frequencies for "Alfaaz" (gentle, warm F#m/D/A progression)
    // Frequencies for "Dilruba Dilnasee" (romantic lyricism, Bm/G/D/F#)
    const chords = trackId === 'alfaaz' ? [
      [185.00, 220.00, 277.18, 370.00], // F#m9
      [146.83, 220.00, 293.66, 369.99], // Dmaj7
      [220.00, 277.18, 329.63, 440.00], // Amaj9
      [138.59, 207.65, 277.18, 329.63], // C#m7
    ] : [
      [246.94, 293.66, 369.99, 440.00], // Bm7
      [196.00, 246.94, 293.66, 392.00], // Gmaj7
      [146.83, 220.00, 293.66, 369.99], // Dmaj7
      [185.00, 233.08, 277.18, 369.99], // F#7
    ];

    let step = 0;
    const playChord = () => {
      if (!this.isSynthesizing || !this.audioCtx || !this.gainNode || !this.analyser) return;
      const currentChord = chords[step % chords.length];
      step++;

      currentChord.forEach((freq, idx) => {
        if (!this.audioCtx || !this.gainNode || !this.analyser) return;
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + idx * 250, this.audioCtx.currentTime);

        const now = this.audioCtx.currentTime;
        const attack = 0.8 + idx * 0.15;
        const decay = 3.2;

        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.06 / (idx + 1), now + attack);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.analyser);
        noteGain.connect(this.gainNode);

        osc.start(now);
        osc.stop(now + attack + decay);
      });
    };

    playChord();
    this.synthInterval = setInterval(playChord, 3800);
  }

  private stopSynth() {
    this.isSynthesizing = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const soundEngine = typeof window !== 'undefined' ? new SoundEngine() : ({} as SoundEngine);
