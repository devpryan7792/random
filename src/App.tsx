import React, { useState } from 'react';
import { Volume2, VolumeX, Coffee, Music, MessageSquareHeart, CheckCircle2, Sparkles } from 'lucide-react';
import { LofiCassette } from './components/LofiCassette';
import { ScratchCard } from './components/ScratchCard';
import { CozyNote } from './components/CozyNote';
import { PetalPopper } from './components/PetalPopper';
import { SCRATCH_COUPONS, MOOD_TAGS } from './data/storyContent';
import { soundEngine } from './services/audioSynth';

export const App: React.FC = () => {
  const [coupons, setCoupons] = useState(SCRATCH_COUPONS);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  const revealedCount = coupons.filter((c) => c.isRevealed).length;

  const handleRevealCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isRevealed: true } : c))
    );
  };

  const handleToggleMute = () => {
    const next = soundEngine.toggleMute();
    setIsMuted(next);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-700" />;
      case 'Music':
        return <Music className="w-5 h-5 text-rose-700" />;
      case 'MessageSquareHeart':
        return <MessageSquareHeart className="w-5 h-5 text-purple-700" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-stone-800 font-sans antialiased pb-20 selection:bg-rose-200">
      {/* Top Floating Header */}
      <header className="sticky top-0 z-30 bg-[#f7f6f2]/85 backdrop-blur-md border-b border-stone-200/80 px-4 py-3.5">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
            <h1 className="text-sm font-bold tracking-tight text-stone-900">
              Atwaja's Cozy Corner ✨
            </h1>
          </div>

          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2 rounded-full bg-stone-200/70 hover:bg-stone-300/70 text-stone-700 active:scale-95 transition-transform"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-stone-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-rose-500" />
            )}
          </button>
        </div>
      </header>

      {/* Main Bento Container */}
      <main className="max-w-md mx-auto px-4 pt-5 space-y-6">
        {/* Mood Tags Row */}
        <section className="flex flex-wrap gap-2">
          {MOOD_TAGS.map((tag, idx) => (
            <span
              key={idx}
              className={`text-xs px-3 py-1 rounded-full font-medium border shadow-xs ${tag.bg}`}
            >
              {tag.label}
            </span>
          ))}
        </section>

        {/* Bento Item 1: Retro Lo-Fi Cassette Player */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Cozy Audio Hub
            </span>
            <span className="text-[11px] text-stone-400">Headphones recommended 🎧</span>
          </div>
          <LofiCassette />
        </section>

        {/* Bento Item 2: Interactive Scratch-Off Coupons */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Scratch & Claim Perks
              </h2>
              <p className="text-[11px] text-stone-400">
                Rub your thumb across the cards to scratch!
              </p>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold">
              {revealedCount}/{coupons.length} Claimed
            </div>
          </div>

          <div className="space-y-3.5">
            {coupons.map((coupon) => (
              <ScratchCard
                key={coupon.id}
                id={coupon.id}
                foilColor={coupon.foilColor}
                isRevealed={coupon.isRevealed}
                onRevealed={() => handleRevealCoupon(coupon.id)}
              >
                {/* Coupon Content Under the Foil */}
                <div className="p-4 sm:p-5 flex items-start gap-3.5 bg-gradient-to-r from-white to-stone-50">
                  <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 shadow-inner shrink-0">
                    {renderIcon(coupon.iconName)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-700">
                        {coupon.badge}
                      </span>
                      {coupon.isRevealed && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Unlocked!
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-stone-900 leading-tight">
                      {coupon.perk}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-snug">
                      {coupon.subtitle}
                    </p>
                  </div>
                </div>
              </ScratchCard>
            ))}
          </div>
        </section>

        {/* Bento Item 3: Personal Appreciation Note */}
        <section>
          <CozyNote />
        </section>

        {/* Footer info */}
        <footer className="text-center pt-2 pb-6 text-xs text-stone-400 space-y-1">
          <p>Built just for Atwaja ✨ • 100% No Expiration Dates</p>
        </footer>
      </main>

      {/* Floating Petal / Confetti Popper */}
      <PetalPopper />
    </div>
  );
};

export default App;
