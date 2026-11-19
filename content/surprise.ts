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
  isPendingPersonalization: z.boolean().default(false),
});

export type SurpriseConfig = z.infer<typeof SurpriseSchema>;

export const SURPRISE_DATA: SurpriseConfig = {
  title: "A Little Something for You",
  subtitle: "Bound in silk ribbon, kept safe just for this very moment.",
  instruction: "Press & hold the seal to unlock your surprise",
  unlockedTitle: "To My Entire World,",
  secretMessage: "In a world full of rushing moments and fleeting noise, you have been my favorite stillness. Thank you for six unforgettable years of joy, laughter, and pure understanding. I would choose you in every lifetime, in every world, across every universe. Happy 6th Anniversary, my love! [TODO_PERSONAL: Add your own secret surprise note or reveal a special gift here].",
  photo: {
    src: "/photos/inspiration/scrapbook-our-story.jpg",
    alt: "A treasured photograph revealed from the sealed gift",
    caption: "Forever Yours — 23 November 2020 through infinity.",
  },
  isPendingPersonalization: true,
};
