import { z } from 'zod';

export const TimelinePhotoSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  focalPoint: z.tuple([z.number(), z.number()]).optional(),
});

export const TimelineMilestoneSchema = z.object({
  year: z.number(),
  dateString: z.string(),
  heading: z.string(),
  summary: z.string(),
  quote: z.string(),
  photos: z.array(TimelinePhotoSchema),
  highlightBadge: z.string().optional(),
});

export type TimelineMilestone = z.infer<typeof TimelineMilestoneSchema>;

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    year: 2020,
    dateString: "23 November 2020",
    heading: "Where It All Began",
    summary: "The quiet, beautiful beginning of something that would change our lives completely. A single day that turned into the anchor of our story.",
    quote: "We began with a tentative first conversation; six years later, you are woven into every thought I have.",
    photos: [
      {
        src: "/images/our-story/memories/IMG-20201203-WA0015.jpg",
        alt: "K & N early memory from late 2020",
        caption: "Where two separate journeys quietly became one.",
        focalPoint: [0.5, 0.4],
      },
      {
        src: "/images/our-story/memories/IMG-20201203-WA0016.jpg",
        alt: "K & N keepsake from December 2020",
        caption: "The first smiles of our shared story.",
        focalPoint: [0.5, 0.5],
      }
    ],
    highlightBadge: "The Beginning",
  },
  {
    year: 2021,
    dateString: "November 2021",
    heading: "Becoming a Part of Each Other's Days",
    summary: "One full year of discovering the nuances of each other's smiles, sharing late-night conversations, and realizing that home is a person.",
    quote: "Loving you has always felt as natural and quiet as drawing a morning breath.",
    photos: [
      {
        src: "/images/our-story/together/IMG-20210516-WA0011.jpg",
        alt: "K & N together in 2021",
        caption: "Finding endless comfort in simply being together.",
        focalPoint: [0.5, 0.5],
      },
      {
        src: "/images/our-story/portraits/IMG-20211119-WA0027.jpg",
        alt: "K & N first anniversary season in November 2021",
        caption: "Building laughter in between ordinary days.",
        focalPoint: [0.5, 0.4],
      }
    ],
    highlightBadge: "Year One",
  },
  {
    year: 2022,
    dateString: "November 2022",
    heading: "Collecting Little Memories",
    summary: "By the second year, our memories had accumulated like treasures. The shared playlists, the unprompted laughter, and the peace of quiet company.",
    quote: "We walked into each other’s stories as quiet acquaintances and built an entire shared world together.",
    photos: [
      {
        src: "/images/our-story/gallery/IMG_20220503_095120.jpg",
        alt: "K & N scenic memory in May 2022",
        caption: "Even in silence, being near you feels complete.",
        focalPoint: [0.5, 0.45],
      },
      {
        src: "/images/our-story/portraits/IMG_20220520_222512_646.jpg",
        alt: "K & N evening portrait in 2022",
        caption: "The warmth that makes every season softer.",
        focalPoint: [0.5, 0.4],
      }
    ],
    highlightBadge: "Two Years",
  },
  {
    year: 2023,
    dateString: "November 2023",
    heading: "Growing Together",
    summary: "Three years of navigating life side by side. Celebrating every victory, supporting each other through changes, and knowing our roots were deep.",
    quote: "Sharing an ice cream on an ordinary pavement can feel richer than any banquet when I am with you.",
    photos: [
      {
        src: "/images/our-story/portraits/IMG_20231018_221857.jpg",
        alt: "K & N portrait from Autumn 2023",
        caption: "Looking forward together with pure certainty.",
        focalPoint: [0.5, 0.35],
      },
      {
        src: "/images/our-story/gallery/IMG_20230814_085427.jpg",
        alt: "K & N travels in August 2023",
        caption: "The world feels brighter when explored with you.",
        focalPoint: [0.5, 0.5],
      }
    ],
    highlightBadge: "Three Years",
  },
  {
    year: 2024,
    dateString: "November 2024",
    heading: "More Chapters, More Feelings",
    summary: "Through busy days, quiet evenings, and countless journeys. Knowing that whatever tomorrow brings, having your hand in mine is all the certainty I need.",
    quote: "Through every unexpected turn of these past seasons, holding your hand kept my footing sure.",
    photos: [
      {
        src: "/images/our-story/portraits/IMG-20240411-WA0038.jpg",
        alt: "K & N portrait from Spring 2024",
        caption: "The simple moments that outshine everything else.",
        focalPoint: [0.5, 0.4],
      },
      {
        src: "/images/our-story/portraits/IMG_20240205_105528.jpg",
        alt: "K & N memory in February 2024",
        caption: "Treasuring every smile and every laughter.",
        focalPoint: [0.5, 0.4],
      }
    ],
    highlightBadge: "Four Years",
  },
  {
    year: 2025,
    dateString: "November 2025",
    heading: "Still My Favourite Story",
    summary: "Five years of love that grew deeper, calmer, and more grateful. Not just loving each other on celebratory days, but in every small, everyday gesture.",
    quote: "I look forward to growing older with you, watching our stories collect like fallen autumn leaves.",
    photos: [
      {
        src: "/images/our-story/gallery/IMG_20250420_201853.jpg",
        alt: "K & N widescreen memory in 2025",
        caption: "Half a decade of love, and still just the prologue.",
        focalPoint: [0.5, 0.5],
      },
      {
        src: "/images/our-story/gallery/IMG_20250607_104001.jpg",
        alt: "K & N summer memory in 2025",
        caption: "Still choosing each other with all our hearts.",
        focalPoint: [0.5, 0.4],
      }
    ],
    highlightBadge: "Five Years",
  },
  {
    year: 2026,
    dateString: "23 November 2026",
    heading: "Six Years and Beyond",
    summary: "Six complete years. 2,191 days of being loved by you, growing with you, and building our world together. Today is our celebration, and every tomorrow belongs to us.",
    quote: "Six years, two thousand one hundred and ninety-one days, and yet time still moves too quickly beside you.",
    photos: [
      {
        src: "/images/our-story/portraits/DSC_0111_1.JPG",
        alt: "K & N master anniversary portrait for 2026",
        caption: "To the six years behind us, and every year waiting ahead.",
        focalPoint: [0.5, 0.35],
      }
    ],
    highlightBadge: "Sixth Anniversary",
  }
];
