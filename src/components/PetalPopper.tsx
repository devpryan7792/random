import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { soundEngine } from '../services/audioSynth';

export const PetalPopper: React.FC = () => {
  const [popCount, setPopCount] = useState(0);

  const handlePop = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundEngine.unlock();
    soundEngine.playPopSound();
    setPopCount((prev) => prev + 1);

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(25);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    try {
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { x, y },
        colors: ['#f472b6', '#fde047', '#a7f3d0', '#c4b5fd'],
        ticks: 80,
        gravity: 0.8,
        scalar: 0.8,
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={handlePop}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900/90 hover:bg-stone-900 text-white shadow-xl border border-stone-700/60 text-xs font-semibold backdrop-blur-md active:scale-90 transition-transform"
      >
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Pop Good Vibes</span>
        {popCount > 0 && (
          <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-[10px] text-white font-mono">
            +{popCount}
          </span>
        )}
      </button>
    </div>
  );
};
