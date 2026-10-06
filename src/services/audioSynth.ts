/**
 * Procedural Lo-Fi and Tactile Sound Engine
 * Zero external mp3 dependencies, 100% reliable on mobile Safari & Chrome Android.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isLofiPlaying: boolean = false;
  private lofiIntervalId: number | null = null;
  private currentChordIndex: number = 0;

  constructor() {
    try {
      const saved = localStorage.getItem('atwaja_bento_muted');
      if (saved !== null) {
        this.isMuted = saved === 'true';
      }
    } catch {
      this.isMuted = false;
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public unlock(): void {
    const ctx = this.initContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isLofiPlaying) {
      this.stopLofiTrack();
    }
    try {
      localStorage.setItem('atwaja_bento_muted', String(this.isMuted));
    } catch {
      // ignore
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public isTrackPlaying(): boolean {
    return this.isLofiPlaying;
  }

  /**
   * Play a warm lo-fi Rhodes-style chord note
   */
  private playRhodesNote(freq: number, duration: number = 1.6): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Soft warm sine/triangle blend
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Lowpass filter to simulate vintage cassette tape warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
      filter.Q.setValueAtTime(1.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // audio safety
    }
  }

  /**
   * Starts playing the looping chill lo-fi chord progression:
   * Fmaj7 -> Em7 -> Dm7 -> Cmaj7
   */
  public startLofiTrack(): void {
    this.unlock();
    if (this.isLofiPlaying) return;
    this.isLofiPlaying = true;

    // Fmaj7, Em7, Dm7, Cmaj7 frequencies (mid octave)
    const chords = [
      [349.23, 440.0, 523.25, 659.25], // F4, A4, C5, E5
      [329.63, 392.0, 493.88, 587.33], // E4, G4, B4, D5
      [293.66, 349.23, 440.0, 523.25], // D4, F4, A4, C5
      [261.63, 329.63, 392.0, 493.88], // C4, E4, G4, B4
    ];

    const stepChord = () => {
      if (!this.isLofiPlaying) return;
      const currentChord = chords[this.currentChordIndex];
      currentChord.forEach((freq, idx) => {
        setTimeout(() => {
          if (this.isLofiPlaying) {
            this.playRhodesNote(freq, 2.2);
          }
        }, idx * 110);
      });

      this.currentChordIndex = (this.currentChordIndex + 1) % chords.length;
    };

    stepChord();
    this.lofiIntervalId = (setInterval as unknown as (handler: TimerHandler, timeout?: number) => number)(stepChord, 2400);
  }

  public stopLofiTrack(): void {
    this.isLofiPlaying = false;
    if (this.lofiIntervalId !== null) {
      clearInterval(this.lofiIntervalId);
      this.lofiIntervalId = null;
    }
  }

  public toggleLofiTrack(): boolean {
    if (this.isLofiPlaying) {
      this.stopLofiTrack();
    } else {
      this.startLofiTrack();
    }
    return this.isLofiPlaying;
  }

  /**
   * Sound when scratching the foil (soft friction noise / high frequency pop)
   */
  public playScratchSound(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.015, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // audio safety
    }
  }

  /**
   * Sound when ticket is revealed (>45% scratched)
   */
  public playRevealChime(): void {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playRhodesNote(freq, 1.2);
      }, idx * 75);
    });
  }

  /**
   * Soft pop for petal taps
   */
  public playPopSound(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // audio safety
    }
  }
}

export const soundEngine = new SoundEngine();
