import { z } from 'zod';

export const SongTrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  coverImage: z.string(),
  durationFormatted: z.string(),
  description: z.string(),
  audioPath: z.string(),
});

export type SongTrack = z.infer<typeof SongTrackSchema>;

export const SONGS_DATA: SongTrack[] = [
  {
    id: "alfaaz",
    title: "Alfaaz",
    artist: "Our Anniversary Soundtrack",
    coverImage: "/images/our-story/portraits/IMG_20231018_221857.jpg",
    durationFormatted: "3:42",
    description: "The melody that speaks the words our hearts have known for six years.",
    audioPath: "/audio/alfaaz.mp3",
  },
  {
    id: "dilruba-dilnasee",
    title: "Dilruba Dilnasee",
    artist: "Our Anniversary Soundtrack",
    coverImage: "/images/our-story/portraits/IMG_20240205_105528.jpg",
    durationFormatted: "4:15",
    description: "A timeless ode celebrating the beauty and grace of devotion.",
    audioPath: "/audio/dilruba-dilnasee.mp3",
  }
];
