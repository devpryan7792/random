# 🚀 How to Host & Share with Atwaja (Cloudflare Pages)

The project is built and optimized for mobile screens. The compiled production bundle is located in `/home/pryan/code/atwaja-island/dist`.

---

## ⚡ Option 1: 1-Click Deploy via Terminal (Fastest)

Run this single command inside the project directory:

```bash
cd /home/pryan/code/atwaja-island
npx wrangler pages deploy dist --project-name for-atwaja
```

1. If you aren't logged into Cloudflare yet, Wrangler will open a browser tab to log in (free account).
2. It uploads the `dist` directory and gives you a permanent live URL, like:
   `https://for-atwaja.pages.dev`
3. Send this link directly to your bro!

---

## 🌐 Option 2: Drag & Drop via Web Browser (Zero CLI Login)

If you prefer using the Cloudflare Dashboard:

1. Log into [dash.cloudflare.com](https://dash.cloudflare.com/) (free).
2. Go to **Workers & Pages** → **Create application** → **Pages** → **Upload assets**.
3. Name your project (e.g. `for-atwaja`).
4. Drag and drop the entire `/home/pryan/code/atwaja-island/dist` folder into the drop zone.
5. Click **Deploy Site**.
6. Cloudflare will give you an instant live link `https://for-atwaja.pages.dev` that works anywhere in the world!

---

## 💌 How Your Bro Can Personalize the Messages

If your bro wants to add custom inside jokes or tweak the coupons:

Open `src/data/storyContent.ts`:
- **Scratch Coupons:** Edit `SCRATCH_COUPONS` (the perks, subtitles, or badges).
- **Appreciation Note:** Edit `COZY_NOTE` (the paragraphs, signature, or P.S.).
- **Mood Tags:** Edit `MOOD_TAGS` (the little pills at the top).

After making any edits, just re-run:
```bash
npm run build
npx wrangler pages deploy dist
```

---

## 📱 Mobile Features Included:
- **Zero Melodrama:** Sincere, warm, admiring, and playful tone with zero awkward clichés.
- **Touch Scratch-Off Foil:** Real canvas physics where she rubs her thumb over the metallic foil to scratch and reveal perks with confetti & haptics.
- **Spinning Lo-Fi Cassette:** Authentic retro tape with spinning cogs playing relaxing chill chords on toggle.
- **Tactile Good Vibes Popper:** Floating button that pops pastel petals and tracks good vibes.
