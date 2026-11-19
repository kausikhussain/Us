# KAUSEEN — CONTENT PERSONALIZATION GUIDE
*How to Personalize Your Photos, Letters, Milestones, and Songs*

Welcome to the KAUSEEN personalization guide. Every personal memory, letter, photograph, quote, and song lives in clean, human-readable data files inside the `/content/` directory. You do **not** need to touch any UI or code files.

---

## 1. WHERE FILES LIVE

All personal content is organized inside the `/content` folder:

| File | What It Controls |
|---|---|
| `/content/site.ts` | Partner names, relationship start date, anniversary, brand lines, passcode |
| `/content/timeline.ts` | The 6-year journey milestones (2020 through 2026), headings, stories, and photos |
| `/content/letters.ts` | Letter 01 (Six Years of Us) and Letter 02 (For Everything Ahead) paragraphs and signatures |
| `/content/gallery.ts` | Photos for the 5 editorial compositions (Asymmetric, Full-bleed, Portraits, Filmstrip, Polaroids) |
| `/content/songs.ts` | Song titles, artists, and audio paths for *Alfaaz* and *Dilruba Dilnasee* |
| `/content/surprise.ts` | Sealed gift secret message, romantic reveal photo, and unlock prompt |
| `/content/quotes.ts` | Curated romantic thoughts and short phrases |

---

## 2. HOW TO SWAP PHOTOGRAPHS

1. Place your real photographs inside the `/public/photos/` folder.
   - For example: `/public/photos/our-first-trip.jpg`, `/public/photos/her-smile.jpg`, etc.
2. Open `/content/gallery.ts` or `/content/timeline.ts`.
3. Update the `src` path to point to your new file:
   ```typescript
   {
     id: "mem-2020",
     src: "/photos/our-first-trip.jpg",
     alt: "Kausik and Parveen enjoying sunset by the lake",
     caption: "The first evening we stayed talking until the stars came out.",
     focalPoint: [0.5, 0.4] // [X, Y] center point between 0.0 and 1.0 to ensure faces are never awkwardly cropped
   }
   ```

---

## 3. HOW TO PERSONALIZE THE LOVE LETTERS

Open `/content/letters.ts`. You will find two letters structured into paragraph arrays:

```typescript
export const LETTERS_DATA: LoveLetter[] = [
  {
    id: "letter-01",
    recipient: "My Dearest,",
    title: "Six Years of Us",
    date: "23 November 2026",
    paragraphs: [
      "Six years ago today, our story quietly began...",
      "Write your heartfelt personal memories here in your own words...",
      "Thank you for choosing me every single day."
    ],
    signature: "Forever Yours, Kausik",
    postscript: "P.S. You will always be my favourite story."
  },
  // Letter 02...
];
```

---

## 4. HOW TO ADD AUDIO FILES FOR ALFAAZ & DILRUBA DILNASEE

1. Obtain your personal audio files for *Alfaaz* and *Dilruba Dilnasee*.
2. Place them in `/public/audio/alfaaz.mp3` and `/public/audio/dilruba-dilnasee.mp3`.
3. In `/content/songs.ts`, ensure the file paths match:
   ```typescript
   export const SONGS_DATA: SongTrack[] = [
     {
       id: "alfaaz",
       title: "Alfaaz",
       artist: "Our Soundtrack",
       audioSrc: "/audio/alfaaz.mp3",
       coverImage: "/photos/alfaaz-cover.jpg",
       duration: "4:12"
     },
     {
       id: "dilruba-dilnasee",
       title: "Dilruba Dilnasee",
       artist: "Our Soundtrack",
       audioSrc: "/audio/dilruba-dilnasee.mp3",
       coverImage: "/photos/dilruba-cover.jpg",
       duration: "3:48"
     }
   ];
   ```
   *Note: If no mp3 files are provided yet, KAUSEEN features a built-in lush ambient audio synthesizer so the music player and visualizer are immediately interactive and beautiful out of the box!*

---

## 5. WHAT DOES `TODO_PERSONAL` MEAN?

In the default files, any placeholder text that awaits your intimate, specific personal words is flagged with `TODO_PERSONAL`.
- In development mode (`npm run dev`), a discreet gold badge in the corner notifies you of remaining placeholders.
- When you fill them with your genuine words, remove the `TODO_PERSONAL` marker and the badge will disappear.
