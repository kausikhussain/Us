import { z } from 'zod';

export const TimelinePhotoSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  focalPoint: z.tuple([z.number(), z.number()]).optional(), // [x, y] between 0 and 1
});

export const TimelineMilestoneSchema = z.object({
  year: z.number(),
  dateString: z.string(),
  heading: z.string(),
  summary: z.string(),
  quote: z.string(),
  photos: z.array(TimelinePhotoSchema),
  highlightBadge: z.string().optional(),
  isPendingPersonalization: z.boolean().default(false),
});

export type TimelineMilestone = z.infer<typeof TimelineMilestoneSchema>;

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    year: 2020,
    dateString: "23 November 2020",
    heading: "The Day Our Story Began",
    summary: "The quiet beginning of something that would change our lives completely. A single day that turned into our favourite date in the calendar. [TODO_PERSONAL: Add your first conversation or how you both officially began].",
    quote: "Some people step into your world and suddenly everything makes sense.",
    photos: [
      {
        src: "/photos/inspiration/scrapbook-our-story.jpg",
        alt: "The beginning of our love story scrapbook with rose and keepsake ticket",
        caption: "Where two separate journeys quietly became one.",
        focalPoint: [0.5, 0.4]
      }
    ],
    highlightBadge: "The Beginning",
    isPendingPersonalization: true,
  },
  {
    year: 2021,
    dateString: "November 2021",
    heading: "Growing Together, Step by Step",
    summary: "One full year of learning every shade of each other's smiles, sharing late-night conversations, and understanding that home isn't a place—it's a person. [TODO_PERSONAL: Mention a special trip or memory from 2021].",
    quote: "With every season, choosing you was the easiest decision I ever made.",
    photos: [
      {
        src: "/photos/inspiration/filmstrip-anniversary.jpg",
        alt: "Filmstrip frames capturing romantic moments and anniversary flowers",
        caption: "Building laughter in between ordinary days.",
        focalPoint: [0.5, 0.5]
      }
    ],
    highlightBadge: "Year One",
    isPendingPersonalization: true,
  },
  {
    year: 2022,
    dateString: "November 2022",
    heading: "Memories That Stayed",
    summary: "By the second year, the memories had accumulated like treasures. The shared playlists, the unprompted laughter, and the quiet comfort of just sitting beside each other. [TODO_PERSONAL: Add your favourite 2022 milestone].",
    quote: "You became the peace in every chaotic day.",
    photos: [
      {
        src: "/photos/inspiration/roses-burgundy-silk.jpg",
        alt: "Deep burgundy velvet silk draped with fresh red roses and candle glow",
        caption: "Even in silence, being near you feels complete.",
        focalPoint: [0.5, 0.4]
      }
    ],
    highlightBadge: "Two Years",
    isPendingPersonalization: true,
  },
  {
    year: 2023,
    dateString: "November 2023",
    heading: "Another Chapter Written",
    summary: "Three years of navigating the world together. Celebrating our wins, supporting each other's dreams, and realizing how deeply our lives had become intertwined. [TODO_PERSONAL: Insert 2023 travel or personal highlight].",
    quote: "Among all the stories in this world, ours remains my favourite.",
    photos: [
      {
        src: "/photos/inspiration/handwritten-love-letter.jpg",
        alt: "Preserved handwritten letter with wax seal and delicate petals",
        caption: "Words penned down when the heart had too much to say.",
        focalPoint: [0.5, 0.5]
      }
    ],
    highlightBadge: "Three Years",
    isPendingPersonalization: true,
  },
  {
    year: 2024,
    dateString: "November 2024",
    heading: "Through Everything, Side by Side",
    summary: "Through busy days, quiet evenings, long journeys, and gentle mornings. Knowing that whatever tomorrow brings, having your hand in mine is all the certainty I need. [TODO_PERSONAL: Mention a 2024 milestone].",
    quote: "Every chapter feels better because it is lived with you.",
    photos: [
      {
        src: "/photos/inspiration/filmstrip-anniversary.jpg",
        alt: "Candid smiles framed in vintage filmstrip borders",
        caption: "The simple moments that outshine everything else.",
        focalPoint: [0.5, 0.5]
      }
    ],
    highlightBadge: "Four Years",
    isPendingPersonalization: true,
  },
  {
    year: 2025,
    dateString: "November 2025",
    heading: "Still Choosing Each Other",
    summary: "Five years of love that grew deeper, calmer, and more grateful. Not just loving each other on the big days, but in every small, everyday gesture in between. [TODO_PERSONAL: Add your 2025 memory].",
    quote: "Six years later, and your smile still feels like my favourite place.",
    photos: [
      {
        src: "/photos/inspiration/scrapbook-our-story.jpg",
        alt: "Memory album preserving the beauty of five years of devotion",
        caption: "Half a decade of love, and still just the prologue.",
        focalPoint: [0.5, 0.4]
      }
    ],
    highlightBadge: "Five Years",
    isPendingPersonalization: true,
  },
  {
    year: 2026,
    dateString: "23 November 2026",
    heading: "Six Years and Forever Beyond",
    summary: "Six complete years. 2,191 days of being loved by you, growing with you, and building our world together. Today is our celebration, and every tomorrow belongs to us. [TODO_PERSONAL: Your anniversary message to your love].",
    quote: "Six Years. Still My Favourite Story. A Thousand More Memories to Come.",
    photos: [
      {
        src: "/photos/inspiration/roses-burgundy-silk.jpg",
        alt: "Grand roses on satin velvet illuminated by candlelight",
        caption: "To the six years behind us, and every year waiting ahead.",
        focalPoint: [0.5, 0.4]
      }
    ],
    highlightBadge: "Sixth Anniversary",
    isPendingPersonalization: true,
  }
];
