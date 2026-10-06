import { ScratchCoupon, CozyNoteData } from '../types/island';

export const SCRATCH_COUPONS: ScratchCoupon[] = [
  {
    id: 'coupon-boba',
    title: 'The Caffeine Emergency',
    perk: '1x Coffee or Boba Delivery',
    subtitle: 'Redeemable anytime you need a mood boost or quick study fuel. No questions asked.',
    iconName: 'Coffee',
    badge: '100% On Me',
    foilColor: '#f59e0b', // Golden Amber foil
    accentColor: 'from-amber-500 to-yellow-400',
    isRevealed: false,
  },
  {
    id: 'coupon-aux',
    title: 'The Playlist Pass',
    perk: 'VIP Aux Privileges',
    subtitle: 'Unrestricted control of the car audio on the next drive. Zero skips, zero complaints.',
    iconName: 'Music',
    badge: 'Unlimited Skips',
    foilColor: '#ec4899', // Rose Quartz foil
    accentColor: 'from-pink-500 to-rose-400',
    isRevealed: false,
  },
  {
    id: 'coupon-rant',
    title: 'The Venting Sanctuary',
    perk: '1x Guilt-Free Rant Session',
    subtitle: 'A full uninterrupted debrief where you are 100% right by default and snacks are provided.',
    iconName: 'MessageSquareHeart',
    badge: 'VIP Listener',
    foilColor: '#8b5cf6', // Lavender Amethyst foil
    accentColor: 'from-purple-500 to-indigo-400',
    isRevealed: false,
  },
];

export const COZY_NOTE: CozyNoteData = {
  recipient: 'Hey Atwaja,',
  tagline: 'Just a certified appreciation drop ✨',
  paragraphs: [
    'I put this little corner together just to bring a smile to your face today. Between all the busy routines and long days, I wanted you to have a cozy reminder of how appreciated you are.',
    'You have this effortless energy that makes every conversation easy and fun. You are genuinely one of my favorite people to talk to, and regular days are simply a whole lot better whenever you are around.',
    'Scratch those tickets above whenever you need a boost—they come with zero expiration dates and guaranteed delivery.',
  ],
  signature: 'Hope this made you smile today :)',
  postScript: 'P.S. Tap the cassette player at the top for some relaxing lo-fi background vibes!',
};

export const MOOD_TAGS = [
  { label: '✨ 10/10 Laugh', bg: 'bg-amber-100 text-amber-800 border-amber-200' },
  { label: '🎧 Elite Taste in Music', bg: 'bg-pink-100 text-pink-800 border-pink-200' },
  { label: '☕ Certified Chill Vibes', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { label: '⭐ Brightens Any Room', bg: 'bg-purple-100 text-purple-800 border-purple-200' },
];
