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

// Client bundle safe fallback shell. Real surprise served via authenticated /api/private/content.
export const SURPRISE_DATA: SurpriseConfig = {
  title: 'A Little Something for You',
  subtitle: 'Bound in silk ribbon, kept safe just for this very moment.',
  instruction: 'Press & hold the seal to unlock your surprise',
  unlockedTitle: 'Dearest Nasreen,',
  secretMessage:
    'Private keepsake message. Identity verification and multi-factor authentication required to reveal.',
  photo: {
    src: '/api/media/images/our-story/portraits/DSC_0111_1.JPG',
    alt: 'A treasured portrait of Nasreen revealed from the sealed gift',
    caption: 'Kausik & Nasreen — 23 November 2020 through every tomorrow.',
  },
};
