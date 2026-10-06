/**
 * Strict Architectural Contracts for Atwaja's Cozy 2D Bento Capsule
 */

export interface ScratchCoupon {
  id: string;
  title: string;
  perk: string;
  subtitle: string;
  iconName: string;
  badge: string;
  foilColor: string; // e.g. '#f59e0b', '#ec4899', '#8b5cf6'
  accentColor: string;
  isRevealed: boolean;
}

export interface CozyNoteData {
  recipient: string;
  tagline: string;
  paragraphs: string[];
  signature: string;
  postScript: string;
}

export interface CassetteState {
  isPlaying: boolean;
  trackTitle: string;
  artist: string;
  durationSeconds: number;
}

export interface PetalParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  life: number;
  maxLife: number;
}
