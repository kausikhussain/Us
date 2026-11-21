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
  id: 'editorial-asymmetric' | 'cinematic-fullbleed' | 'vertical-portraits' | 'filmstrip-scroller' | 'polaroid-cluster' | 'story-collages';
  title: string;
  subtitle: string;
  items: GalleryItem[];
}

export const GALLERY_COMPOSITIONS: GalleryComposition[] = [
  {
    id: 'editorial-asymmetric',
    title: 'The Two of Us',
    subtitle: 'Moments captured in gentle light, quiet comfort, and pure devotion.',
    items: [
      {
        id: 'edit-1',
        src: '/images/our-story/portraits/IMG-20240411-WA0038.jpg',
        alt: 'K & N together in Spring 2024',
        title: 'Our Favourite Haven',
        caption: 'Every photograph holds a conversation we never wanted to end.',
        date: 'Spring 2024',
        focalPoint: [0.5, 0.35],
      },
      {
        id: 'edit-2',
        src: '/images/our-story/portraits/IMG_20231018_221857.jpg',
        alt: 'K & N evening portrait in Autumn 2023',
        title: 'Golden Reflections',
        caption: 'The warmth that turns any room into a sanctuary.',
        date: 'Autumn 2023',
        focalPoint: [0.5, 0.4],
      },
      {
        id: 'edit-3',
        src: '/images/our-story/together/IMG-20210516-WA0011.jpg',
        alt: 'K & N early memory in 2021',
        title: 'Building Our World',
        caption: 'Two separate lives woven into one shared eternity.',
        date: 'May 2021',
        focalPoint: [0.5, 0.5],
      }
    ]
  },
  {
    id: 'cinematic-fullbleed',
    title: 'Forever in Frames',
    subtitle: 'Widescreen memories that felt larger than life, preserved in full splendour.',
    items: [
      {
        id: 'cine-1',
        src: '/images/our-story/gallery/IMG_20250420_201853.jpg',
        alt: 'K & N cinematic widescreen view across the horizon',
        title: 'The Golden Hour of Us',
        caption: 'When the world quietens and only your laughter remains.',
        date: '2025',
        focalPoint: [0.5, 0.5],
      }
    ]
  },
  {
    id: 'vertical-portraits',
    title: 'Your Beautiful Moments',
    subtitle: 'Portraits in cathedral arches celebrating radiance, grace, and smiles.',
    items: [
      {
        id: 'port-1',
        src: '/images/our-story/portraits/IMG_20240205_105528.jpg',
        alt: 'Radiant portrait of her in February 2024',
        title: 'Radiance in Morning Light',
        caption: 'A smile that makes even the longest week feel light.',
        date: 'February 2024',
        focalPoint: [0.5, 0.35],
      },
      {
        id: 'port-2',
        src: '/images/our-story/portraits/IMG_20240205_112413.jpg',
        alt: 'Gentle portrait of her smiling softly',
        title: 'Grace & Quiet Peace',
        caption: 'Looking ahead together, with nothing left unspoken.',
        date: 'February 2024',
        focalPoint: [0.5, 0.35],
      }
    ]
  },
  {
    id: 'filmstrip-scroller',
    title: 'The 35mm Memory Reel',
    subtitle: 'Unscripted candid frames from the ongoing reel of our life together.',
    items: [
      {
        id: 'film-1',
        src: '/images/our-story/portraits/IMG-20240411-WA0043.jpg',
        alt: 'K & N candid smile in 2024',
        title: 'Frame 01: The Glance',
        caption: 'A moment captured before we even noticed the shutter.',
        date: '2024',
        focalPoint: [0.5, 0.4],
      },
      {
        id: 'film-2',
        src: '/images/our-story/portraits/IMG-20240411-WA0052.jpg',
        alt: 'K & N joyful laughter in 2024',
        title: 'Frame 02: Pure Laughter',
        caption: 'The sound that will always feel like home.',
        date: '2024',
        focalPoint: [0.5, 0.4],
      },
      {
        id: 'film-3',
        src: '/images/our-story/portraits/IMG-20240430-WA0033.jpg',
        alt: 'K & N candid memory in late April 2024',
        title: 'Frame 03: Candid Joy',
        caption: 'Celebrating another year of shared dreams.',
        date: '2024',
        focalPoint: [0.5, 0.4],
      },
      {
        id: 'film-4',
        src: '/images/our-story/portraits/IMG-20240524-WA0144.jpg',
        alt: 'K & N candid memory in May 2024',
        title: 'Frame 04: Side by Side',
        caption: 'Holding hands across every milestone.',
        date: '2024',
        focalPoint: [0.5, 0.4],
      }
    ]
  },
  {
    id: 'polaroid-cluster',
    title: 'Little Moments',
    subtitle: 'Everyday snapshots and instant memories that never fade.',
    items: [
      {
        id: 'pol-1',
        src: '/images/our-story/portraits/IMG-20230108-WA0007.jpg',
        alt: 'Polaroid snapshot of K & N in January 2023',
        title: 'New Year, Same Love',
        caption: 'Starting another chapter wrapped in your warmth.',
        date: 'January 2023',
        focalPoint: [0.5, 0.4],
      },
      {
        id: 'pol-2',
        src: '/images/our-story/portraits/IMG-20210510-WA0016.jpg',
        alt: 'Polaroid memory from May 2021',
        title: 'Early Days of Us',
        caption: 'Two souls realizing how bright the world could be.',
        date: 'May 2021',
        focalPoint: [0.5, 0.4],
      },
      {
        id: 'pol-3',
        src: '/images/our-story/portraits/IMG_20240801_040421.jpg',
        alt: 'Polaroid snapshot in August 2024',
        title: 'Late Night Talks',
        caption: 'Talking about everything we would build together.',
        date: 'August 2024',
        focalPoint: [0.5, 0.4],
      }
    ]
  },
  {
    id: 'story-collages',
    title: 'Collages of Our Story',
    subtitle: 'Beautiful aesthetic scrapbook memories made just for us.',
    items: [
      {
        id: 'col-1',
        src: '/images/our-story/collages/Brown_Moody_Romantic_Collage_Valentines_Day_Your_Story.png',
        alt: 'Moody romantic aesthetic collage of our story',
        title: 'The Romantic Story',
        caption: 'A tapestry of the feelings we share every day.',
        date: 'Our Story',
        focalPoint: [0.5, 0.5],
      },
      {
        id: 'col-2',
        src: '/images/our-story/collages/Beige_Aesthetic_Photo_Collage_Frame_Instagram_Story.png',
        alt: 'Beige aesthetic photo collage frame of K & N',
        title: 'Frames of Devotion',
        caption: 'Treasures of six unforgettable years.',
        date: 'Our Story',
        focalPoint: [0.5, 0.5],
      },
      {
        id: 'col-3',
        src: '/images/our-story/collages/Gray_White_Simple_Love_Photo_Collage.png',
        alt: 'Love photo collage of K & N',
        title: 'Simple Love',
        caption: 'Pure, calm, and unchanging devotion.',
        date: 'Our Story',
        focalPoint: [0.5, 0.5],
      }
    ]
  }
];
