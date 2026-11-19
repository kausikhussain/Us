import { z } from 'zod';

export const GalleryItemSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  title: z.string(),
  caption: z.string(),
  date: z.string().optional(),
  focalPoint: z.tuple([z.number(), z.number()]).default([0.5, 0.5]),
  aspectRatio: z.string().optional(),
});

export type GalleryItem = z.infer<typeof GalleryItemSchema>;

export interface GalleryComposition {
  id: 'editorial-asymmetric' | 'cinematic-fullbleed' | 'vertical-portraits' | 'filmstrip-scroller' | 'polaroid-cluster';
  title: string;
  subtitle: string;
  items: GalleryItem[];
}

export const GALLERY_COMPOSITIONS: GalleryComposition[] = [
  {
    id: 'editorial-asymmetric',
    title: 'Editorial Reverie',
    subtitle: 'Moments captured in gentle light and quiet elegance.',
    items: [
      {
        id: 'edit-1',
        src: '/photos/inspiration/scrapbook-our-story.jpg',
        alt: 'Keepsake scrapbook titled Our Love Story with pink rose and polaroid',
        title: 'The Pages of Us',
        caption: 'Every photograph holds a conversation we never wanted to end.',
        date: '2020',
        focalPoint: [0.5, 0.4],
      },
      {
        id: 'edit-2',
        src: '/photos/inspiration/roses-burgundy-silk.jpg',
        alt: 'Deep burgundy silk fabric with red roses and warm candle illumination',
        title: 'Velvet Evenings',
        caption: 'The warmth that turns any room into a sanctuary.',
        date: '2022',
        focalPoint: [0.5, 0.45],
      },
      {
        id: 'edit-3',
        src: '/photos/inspiration/handwritten-love-letter.jpg',
        alt: 'Preserved handwritten love letter with dried petals and blush wax seal',
        title: 'Keepsakes in Ink',
        caption: 'Words penned down when simple speech was not enough.',
        date: '2023',
        focalPoint: [0.5, 0.5],
      }
    ]
  },
  {
    id: 'cinematic-fullbleed',
    title: 'Cinematic Widescreen',
    subtitle: 'Moments that felt larger than life, preserved in full splendour.',
    items: [
      {
        id: 'cine-1',
        src: '/photos/inspiration/roses-burgundy-silk.jpg',
        alt: 'Cinematic landscape of crimson roses resting on dark silk with candlelight',
        title: 'The Golden Hour',
        caption: 'When the world quietens and only your laughter remains.',
        date: 'Autumn 2024',
        focalPoint: [0.5, 0.4],
      }
    ]
  },
  {
    id: 'vertical-portraits',
    title: 'Portraits in Archways',
    subtitle: 'The faces that look at each other with pure certainty.',
    items: [
      {
        id: 'port-1',
        src: '/photos/inspiration/scrapbook-our-story.jpg',
        alt: 'Vertical romantic keepsake capturing gentle smiles',
        title: 'Her Radiance',
        caption: 'A smile that makes even the longest week feel light.',
        date: '2021',
        focalPoint: [0.5, 0.35],
      },
      {
        id: 'port-2',
        src: '/photos/inspiration/handwritten-love-letter.jpg',
        alt: 'Vertical presentation of letters written with pure devotion',
        title: 'Quiet Reflections',
        caption: 'Looking ahead together, with nothing left unspoken.',
        date: '2025',
        focalPoint: [0.5, 0.5],
      }
    ]
  },
  {
    id: 'filmstrip-scroller',
    title: 'The 35mm Memory Reel',
    subtitle: 'Frames from the ongoing reel of our life together.',
    items: [
      {
        id: 'film-1',
        src: '/photos/inspiration/filmstrip-anniversary.jpg',
        alt: 'Film strip photo of a tender look between partners',
        title: 'Frame 01: The Glance',
        caption: 'A moment captured before we even noticed the shutter.',
        date: '2021',
        focalPoint: [0.2, 0.5],
      },
      {
        id: 'film-2',
        src: '/photos/inspiration/filmstrip-anniversary.jpg',
        alt: 'Film strip photo of joyful laughter surrounded by bokeh lights',
        title: 'Frame 02: Pure Laughter',
        caption: 'The sound that will always feel like home.',
        date: '2023',
        focalPoint: [0.5, 0.5],
      },
      {
        id: 'film-3',
        src: '/photos/inspiration/filmstrip-anniversary.jpg',
        alt: 'Film strip photo of anniversary flowers in soft pink bloom',
        title: 'Frame 03: In Full Bloom',
        caption: 'Celebrating another year of shared dreams.',
        date: '2025',
        focalPoint: [0.8, 0.5],
      }
    ]
  },
  {
    id: 'polaroid-cluster',
    title: 'The Floating Polaroids',
    subtitle: 'Instant memories that never faded.',
    items: [
      {
        id: 'pol-1',
        src: '/photos/inspiration/scrapbook-our-story.jpg',
        alt: 'Polaroid snapshot with handwritten caption Forever Yours',
        title: 'Our First Road Trip',
        caption: 'Lost the map, but found the prettiest sunset.',
        date: 'July 2021',
        focalPoint: [0.65, 0.45],
      },
      {
        id: 'pol-2',
        src: '/photos/inspiration/filmstrip-anniversary.jpg',
        alt: 'Polaroid style snapshot of shared warmth',
        title: 'Coffee in the Rain',
        caption: 'Two cups, one umbrella, zero hurry.',
        date: 'October 2022',
        focalPoint: [0.5, 0.5],
      },
      {
        id: 'pol-3',
        src: '/photos/inspiration/roses-burgundy-silk.jpg',
        alt: 'Polaroid capture of romantic anniversary celebration',
        title: 'Under the Stars',
        caption: 'Talking about everything we would build together.',
        date: 'November 2024',
        focalPoint: [0.5, 0.4],
      }
    ]
  }
];
