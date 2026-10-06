import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../services/audioSynth';

interface ScratchCardProps {
  id: string;
  foilColor: string;
  isRevealed: boolean;
  onRevealed: () => void;
  children: React.ReactNode;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  foilColor,
  isRevealed,
  onRevealed,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScratchingRef = useRef(false);
  const lastSoundTimeRef = useRef(0);
  const [cleared, setCleared] = useState(isRevealed);

  // Initialize Canvas with metallic foil texture
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || cleared) return;

    const width = (canvas.width = container.offsetWidth);
    const height = (canvas.height = container.offsetHeight);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Metallic foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, foilColor);
    grad.addColorStop(0.3, '#ffffff');
    grad.addColorStop(0.5, foilColor);
    grad.addColorStop(0.8, '#fef08a');
    grad.addColorStop(1, foilColor);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle holographic sparkles pattern
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 2 + 1,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Centered instruction pill
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    const pillW = Math.min(width * 0.75, 180);
    const pillH = 32;
    const pillX = (width - pillW) / 2;
    const pillY = (height - pillH) / 2;

    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 16);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 12px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Rub to Scratch & Reveal', width / 2, height / 2);
  }, [foilColor, cleared]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  // Check how much of the foil is scratched by sampling 100 points
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || cleared) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return;

    try {
      const sampleCount = 64;
      let transparentCount = 0;

      for (let i = 0; i < sampleCount; i++) {
        const sx = Math.floor((i % 8) * (width / 8) + width / 16);
        const sy = Math.floor(Math.floor(i / 8) * (height / 8) + height / 16);
        const pixel = ctx.getImageData(sx, sy, 1, 1).data;
        if (pixel[3] < 128) {
          transparentCount++;
        }
      }

      const ratio = transparentCount / sampleCount;
      if (ratio >= 0.45) {
        // Threshold reached: complete the scratch!
        setCleared(true);
        soundEngine.playRevealChime();
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([40, 70]);
        }

        // Mini confetti burst from the card
        try {
          confetti({
            particleCount: 35,
            spread: 50,
            origin: { y: 0.65 },
            colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981'],
          });
        } catch {
          // ignore
        }

        onRevealed();
      }
    } catch {
      // ignore
    }
  };

  // Scratch action
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || cleared) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    // Throttle scratch friction sound
    const now = Date.now();
    if (now - lastSoundTimeRef.current > 75) {
      soundEngine.playScratchSound();
      lastSoundTimeRef.current = now;
    }

    checkScratchPercentage();
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    soundEngine.unlock();
    isScratchingRef.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isScratchingRef.current = false;
  };

  // Mouse handlers for desktop preview
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    soundEngine.unlock();
    isScratchingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isScratchingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 bg-white"
    >
      {/* Underlying Content Card */}
      <div className="w-full">{children}</div>

      {/* Foil Canvas Layer */}
      {!cleared && (
        <canvas
          ref={canvasRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="absolute inset-0 w-full h-full cursor-pointer z-10 touch-none transition-opacity duration-300"
        />
      )}
    </div>
  );
};
