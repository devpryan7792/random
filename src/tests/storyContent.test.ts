import { describe, it, expect } from 'vitest';
import { SCRATCH_COUPONS, COZY_NOTE, MOOD_TAGS } from '../data/storyContent';

describe('Bento Story Content & Zero-Melodrama Tone Verification', () => {
  it('defines 3 interactive scratch coupons with valid details', () => {
    expect(SCRATCH_COUPONS).toHaveLength(3);
    SCRATCH_COUPONS.forEach((coupon) => {
      expect(coupon.id).toBeTruthy();
      expect(coupon.title).toBeTruthy();
      expect(coupon.perk).toBeTruthy();
      expect(coupon.subtitle).toBeTruthy();
      expect(coupon.badge).toBeTruthy();
      expect(coupon.foilColor).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it('addresses the personal note specifically to Atwaja', () => {
    expect(COZY_NOTE.recipient).toContain('Atwaja');
    expect(COZY_NOTE.paragraphs.length).toBeGreaterThanOrEqual(2);
    expect(COZY_NOTE.signature).toBeTruthy();
  });

  it('strictly adheres to the Zero-Melodrama contract (no cringe phrases)', () => {
    const fullText = [
      COZY_NOTE.recipient,
      COZY_NOTE.tagline,
      ...COZY_NOTE.paragraphs,
      COZY_NOTE.signature,
      COZY_NOTE.postScript,
      ...SCRATCH_COUPONS.map((c) => `${c.title} ${c.perk} ${c.subtitle}`),
    ]
      .join(' ')
      .toLowerCase();

    // Ensure banned heavy clichés are absent
    expect(fullText).not.toContain('i love you');
    expect(fullText).not.toContain('soulmate');
    expect(fullText).not.toContain('forever and always');
    expect(fullText).not.toContain('marry me');
  });

  it('has at least 3 mood tags for the bento header', () => {
    expect(MOOD_TAGS.length).toBeGreaterThanOrEqual(3);
    MOOD_TAGS.forEach((tag) => {
      expect(tag.label).toBeTruthy();
      expect(tag.bg).toBeTruthy();
    });
  });
});
