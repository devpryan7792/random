import React, { useState } from 'react';
import { Play, Pause, Music, Disc } from 'lucide-react';
import { soundEngine } from '../services/audioSynth';

export const LofiCassette: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(soundEngine.isTrackPlaying());

  const handleToggle = () => {
    const nextState = soundEngine.toggleLofiTrack();
    setIsPlaying(nextState);
  };

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-[#292524] via-[#1c1917] to-[#0c0a09] text-stone-200 p-5 shadow-lg border border-stone-700/60 relative overflow-hidden select-none">
      {/* Subtle cassette tape screws */}
      <div className="absolute top-3 left-3 w-2 h-2 rounded-full border border-stone-600 bg-stone-800" />
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full border border-stone-600 bg-stone-800" />
      <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full border border-stone-600 bg-stone-800" />
      <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full border border-stone-600 bg-stone-800" />

      {/* Cassette Label Area */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 text-stone-800 p-4 shadow-inner border border-amber-200/80 mb-4">
        <div className="flex items-center justify-between border-b border-stone-300/60 pb-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-stone-700 uppercase">
            <Music className="w-3.5 h-3.5 text-rose-500" />
            <span>Side A • Cozy Lo-Fi</span>
          </div>
          <span className="text-[10px] font-mono bg-stone-200/80 px-2 py-0.5 rounded text-stone-600 font-semibold">
            CHILL-01
          </span>
        </div>

        {/* Cassette Center Window with Dual Spinning Spools */}
        <div className="h-14 rounded-xl bg-stone-900 border-2 border-stone-700/80 p-2 flex items-center justify-around relative shadow-inner">
          {/* Left Spool */}
          <div
            className={`w-9 h-9 rounded-full border-2 border-stone-400 bg-stone-800 flex items-center justify-center transition-transform ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3s' }}
          >
            <div className="w-3 h-3 rounded-full bg-stone-300" />
          </div>

          {/* Center Tape Window */}
          <div className="w-16 h-4 bg-stone-950/80 rounded border border-stone-700 flex items-center justify-center">
            <div
              className={`w-10 h-1 bg-amber-500/80 rounded-full ${
                isPlaying ? 'animate-pulse' : 'opacity-40'
              }`}
            />
          </div>

          {/* Right Spool */}
          <div
            className={`w-9 h-9 rounded-full border-2 border-stone-400 bg-stone-800 flex items-center justify-center transition-transform ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3s' }}
          >
            <div className="w-3 h-3 rounded-full bg-stone-300" />
          </div>
        </div>

        {/* Title Tag */}
        <p className="mt-2.5 text-xs text-stone-700 font-medium italic text-center">
          "Chill Chords for Atwaja's Day"
        </p>
      </div>

      {/* Cassette Player Controls */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Disc
            className={`w-4 h-4 text-rose-400 ${
              isPlaying ? 'animate-spin' : 'opacity-40'
            }`}
          />
          <span className="text-xs font-mono text-stone-300">
            {isPlaying ? 'Playing • Soft Rhodes' : 'Paused • Tap to play'}
          </span>
        </div>

        <button
          onClick={handleToggle}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-semibold shadow-md active:scale-95 transition-transform"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-white" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Play Vibes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
