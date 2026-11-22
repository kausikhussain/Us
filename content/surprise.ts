import { z } from 'zod';

export const SurpriseSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  instruction: z.string(),
  unlockedTitle: z.string(),
  secretMessage: z.string(),
  photo: z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string(),
  }),
});

export type SurpriseConfig = z.infer<typeof SurpriseSchema>;

export const SURPRISE_DATA: SurpriseConfig = {
  title: "A Little Something for You",
  subtitle: "Bound in silk ribbon, kept safe just for this very moment.",
  instruction: "Press & hold the seal to unlock your surprise",
  unlockedTitle: "Dearest Nasreen,",
  secretMessage: "In a life full of rushing hours and fleeting noise, you have been my favourite peace. Thank you for six unforgettable years of laughter, warmth, and quiet understanding. Walking beside you has been the greatest gift I have ever known. Happy 6th Anniversary, with all my love — Kausik.",
  photo: {
    src: "/images/our-story/portraits/DSC_0111_1.JPG",
    alt: "A treasured portrait of Nasreen revealed from the sealed gift",
    caption: "Kausik & Nasreen — 23 November 2020 through every tomorrow.",
  },
};
