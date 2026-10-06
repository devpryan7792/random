import { describe, it, expect } from 'vitest';
import { soundEngine } from '../services/audioSynth';

describe('Lo-Fi Audio Engine Safety & States', () => {
  it('toggles mute safely without crashing', () => {
    const initial = soundEngine.getMuted();
    const next = soundEngine.toggleMute();
    expect(next).toBe(!initial);
    expect(soundEngine.getMuted()).toBe(next);

    soundEngine.toggleMute();
    expect(soundEngine.getMuted()).toBe(initial);
  });

  it('handles track start, stop, and toggle safely in headless environment', () => {
    expect(() => {
      soundEngine.startLofiTrack();
      soundEngine.toggleLofiTrack();
      soundEngine.stopLofiTrack();
    }).not.toThrow();
  });

  it('plays tactile scratch, reveal, and pop sounds without errors', () => {
    expect(() => {
      soundEngine.playScratchSound();
      soundEngine.playRevealChime();
      soundEngine.playPopSound();
    }).not.toThrow();
  });
});
