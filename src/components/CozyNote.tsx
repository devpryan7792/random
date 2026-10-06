import React, { useState } from 'react';
import { Heart, Sparkles, Check } from 'lucide-react';
import { COZY_NOTE } from '../data/storyContent';
import { soundEngine } from '../services/audioSynth';

export const CozyNote: React.FC = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    soundEngine.playPopSound();
    setLiked(!liked);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <div className="relative w-full rounded-3xl bg-[#fffdfa] border border-stone-200/90 shadow-sm p-6 sm:p-7 text-stone-800 overflow-hidden">
      {/* Decorative Washi Tape on top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-200/80 backdrop-blur-sm border-x border-amber-300/60 rotate-1 shadow-sm opacity-90 pointer-events-none" />

      {/* Note Header */}
      <div className="pt-2 flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
            Personal Note
          </span>
          <h2 className="text-xl font-bold text-stone-900 mt-1">
            {COZY_NOTE.recipient}
          </h2>
        </div>
        <Sparkles className="w-5 h-5 text-amber-400" />
      </div>

      {/* Tagline */}
      <p className="text-xs font-semibold text-rose-500 mb-4 tracking-wide">
        {COZY_NOTE.tagline}
      </p>

      {/* Paragraphs */}
      <div className="space-y-3.5 text-stone-700 text-sm leading-relaxed">
        {COZY_NOTE.paragraphs.map((p, idx) => (
          <p key={idx} className="leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {/* Signature & PS */}
      <div className="mt-5 pt-4 border-t border-stone-100">
        <p className="font-semibold text-stone-900 text-sm">
          {COZY_NOTE.signature}
        </p>
        <p className="mt-2 text-xs text-stone-500 italic bg-stone-50 p-3 rounded-xl border border-stone-100">
          {COZY_NOTE.postScript}
        </p>
      </div>

      {/* Bottom Appreciation Button */}
      <div className="mt-5 flex items-center justify-end">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all active:scale-95 ${
            liked
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-600'
          }`}
        >
          {liked ? (
            <>
              <Check className="w-3.5 h-3.5 text-rose-500" />
              <span>Smiled! 😊</span>
            </>
          ) : (
            <>
              <Heart className="w-3.5 h-3.5" />
              <span>Leave a smile</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
