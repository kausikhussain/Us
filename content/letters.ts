import { z } from 'zod';

export const LoveLetterSchema = z.object({
  id: z.string(),
  letterNumber: z.string(),
  title: z.string(),
  subtitle: z.string(),
  date: z.string(),
  salutation: z.string(),
  paragraphs: z.array(z.string()),
  closing: z.string(),
  signatureName: z.string(),
  postscript: z.string().optional(),
});

export type LoveLetter = z.infer<typeof LoveLetterSchema>;

export const LETTERS_DATA: LoveLetter[] = [
  {
    id: "letter-01",
    letterNumber: "Letter 01",
    title: "Six Years of Us",
    subtitle: "A reflection on the journey that brought us here.",
    date: "23 November 2026",
    salutation: "My Dearest N,",
    paragraphs: [
      "Six years ago, on the twenty-third of November, our story began without grand fanfare—just two souls realizing that the world felt a little softer, a little brighter, whenever we were together.",
      "Looking back across these six years—2,191 days of shared laughter, quiet evenings, long talks that outlasted the night, and gentle mornings—I am overwhelmed by how effortlessly you became my sanctuary.",
      "You have celebrated my smallest victories as if they were milestones of your own, and you have stood beside me with unwavering grace whenever life felt heavy. In your presence, I found not just love, but true belonging.",
      "Thank you for being my constant, my confidante, and the most beautiful part of my everyday life. Six years is a milestone, but loving you feels as fresh and miraculous as the very first day."
    ],
    closing: "With all my heart and forever yours,",
    signatureName: "K",
    postscript: "P.S. Six years down, a lifetime of beautiful chapters still waiting to be written.",
  },
  {
    id: "letter-02",
    letterNumber: "Letter 02",
    title: "For All the Years Ahead",
    subtitle: "A promise for every tomorrow yet to unfold.",
    date: "23 November 2026",
    salutation: "Dearest N,",
    paragraphs: [
      "If the last six years have taught me anything, it is that love is not a single moment frozen in time; it is a choice made every single sunrise. And choosing you remains the easiest, most instinctive truth of my life.",
      "I look forward to all the unwritten chapters: the cities we haven't explored yet, the quiet rainy afternoons we will share, the dreams we haven't even dared to whisper, and the simple joy of growing older by your side.",
      "Whatever tomorrow brings—whether easy paths or steep climbs—I promise to listen to you, to protect your peace, to cheer for your happiness, and to love you with even greater depth than yesterday.",
      "Here is to our six years, to today, and to every single year that waits for us."
    ],
    closing: "Always and entirely yours,",
    signatureName: "K",
    postscript: "P.P.S. Six Years. One Story. A Thousand Feelings.",
  }
];
