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
    artist: "K & N Soundtrack",
    coverImage: "/images/our-story/together/IMG-20210516-WA0011.jpg",
    durationFormatted: "3:05",
    description: "Unki tareef me kahe kya alfaaz hi nahi hai — our soul-stirring melody.",
    audioPath: "/audio/alfaaz.m4a",
  },
  {
    id: "dilruba-dilnasee",
    title: "Dilruba Dilnasee",
    artist: "K & N Soundtrack",
    coverImage: "/images/our-story/portraits/IMG_0724.JPG",
    durationFormatted: "2:53",
    description: "Qabil-e-tareef tu, apsara jaisi hubahu — a timeless ode celebrating her grace.",
    audioPath: "/audio/dilruba-dilnasee.mp3",
  }
];
