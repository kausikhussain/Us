/**
 * Server-Only Private Content Store
 * Never imported into client bundles. Only accessible via authenticated API /api/private/content.
 */

import { LoveLetter } from '@/content/letters';
import { SurpriseConfig } from '@/content/surprise';
import { QuoteItem, QuoteCategory } from '@/content/quotes';
import { Pairing } from '@/content/photo-quote-pairings';
import { TimelineMilestone } from '@/content/timeline';
import { SongTrack } from '@/content/songs';

export const SERVER_LETTERS_DATA: LoveLetter[] = [
  {
    id: 'letter-01',
    letterNumber: 'Letter 01',
    title: 'To the Girl Who Became My Favourite Part of Every Day.',
    subtitle: 'A reflection on six years since 23 November 2020.',
    date: '23 November 2026',
    salutation: 'Dearest Nasreen,',
    sealType: 'wax',
    paragraphs: [
      'Six years ago, on the twenty-third of November 2020, our story began without fanfare or spectacle. It started as two people finding an unexpected, gentle rhythm in each other’s presence. I remember how quickly talking to you went from being a highlight of my day to the very centre around which my thoughts orbited.',
      'Looking back across these two thousand one hundred and ninety-one days, I am filled with an overwhelming sense of quiet wonder. We have walked through ordinary university semesters, career beginnings, long late-night phone conversations when the rest of the world was asleep, and hundreds of simple meals where your laughter turned an everyday table into somewhere sacred. In our early days, you showed me a kind of easy, unhurried companionship I had never known before.',
      'What moves me most about you, Nasreen, is not just your beauty—though you take my breath away every time you turn your head and smile—but the grace with which you carry yourself. You have an instinctive kindness that asks for no recognition. You listen with your whole heart. When life felt overwhelming or uncertainties piled up, your steady voice was the one anchor that never wavered.',
      'Thank you for six years of patience, warmth, and unshakeable loyalty. Thank you for celebrating my small victories and for giving me a safe haven whenever the world felt noisy. Loving you has been the easiest, most natural gift of my life, and six years have only made me more certain of how fortunate I am to walk beside you.',
      'As we mark this anniversary, my wish is simple: to keep listening to your thoughts, to keep making you smile in the middle of ordinary afternoons, and to cherish every quiet moment that belongs to us.',
    ],
    closing: 'With all my love,',
    signatureName: 'Kausik',
    postscript: 'P.S. Six years down, and you are still my favourite hello and my sweetest thought.',
  },
  {
    id: 'letter-02',
    letterNumber: 'Letter 02',
    title: 'For All the Beautiful Chapters We Have Yet to Write.',
    subtitle: 'A quiet hope for all our tomorrows together.',
    date: '23 November 2026',
    salutation: 'My Dearest Nasreen,',
    sealType: 'wax',
    paragraphs: [
      'If our first six years have taught me anything, it is that love is not a single milestone frozen in time; it is a choice made quietly and willingly with every sunrise. And choosing you, Nasreen, remains the most effortless certainty of my life.',
      'I often think about the chapters that still wait ahead of us. I think about our future mornings: the shared cups of warm tea, the spontaneous walks where we lose track of time, the silly debates over things that do not matter, and the deep, reassuring comfort of knowing whose hand I will reach for.',
      'Whatever tomorrow holds—whether the road is smooth and sunny or whether it asks us to be patient through storms—I promise to stand right beside you. I promise to listen when you need to be heard, to give you space when you need quiet, and to celebrate every dream you hold as if it were my own.',
      'We do not need an extravagant, dramatic story. We only need our own: honest, tender, and growing deeper with every passing season. Thank you for being the partner, the confidante, and the peace I always hoped to find.',
    ],
    closing: 'With all my love and devotion,',
    signatureName: 'Kausik',
    postscript: 'P.P.S. Six Years. One Story. A Thousand Feelings.',
  },
  {
    id: 'letter-03',
    letterNumber: 'Letter 03',
    title: 'Open When You Miss Me.',
    subtitle: 'A private letter kept safe just for this moment.',
    date: 'For Any Quiet Evening',
    salutation: 'Dearest Nasreen,',
    sealType: 'ribbon',
    paragraphs: [
      'If you are opening this letter, it means there is a little distance between us right now, or the day felt a little heavier than usual, and you found yourself wishing I was sitting beside you.',
      'I want you to pause, take a slow breath, and remember this: miles and hours are merely measurements on a clock; they have no power over what we built. Right now, wherever I am, you are present in my thoughts. You are in the quiet pause before I start my work, in the song that plays in the background, and in every gentle memory of our laughter.',
      'Remember that comforting warmth between us? Let that bring a small smile to your lips today. You are deeply loved, completely cherished, and never truly alone.',
      'Close this letter, picture my hand holding yours, and know that I am already counting down the moments until our next conversation.',
    ],
    closing: 'Always right here with you, with all my love,',
    signatureName: 'Kausik',
    postscript: 'P.S. Smile for me right now—you know how much that smile means to me.',
  },
];

export const SERVER_SURPRISE_DATA: SurpriseConfig = {
  title: 'A Little Something for You',
  subtitle: 'Bound in silk ribbon, kept safe just for this very moment.',
  instruction: 'Press & hold the seal to unlock your surprise',
  unlockedTitle: 'Dearest Nasreen,',
  secretMessage:
    'In a life full of rushing hours and fleeting noise, you have been my favourite peace. Thank you for six unforgettable years of laughter, warmth, and quiet understanding. Walking beside you has been the greatest gift I have ever known. Happy 6th Anniversary, with all my love — Kausik.',
  photo: {
    src: '/api/media/images/our-story/portraits/DSC_0111_1.JPG',
    alt: 'A treasured portrait of Nasreen revealed from the sealed gift',
    caption: 'Kausik & Nasreen — 23 November 2020 through every tomorrow.',
  },
};

export function getPrivateAnniversaryContent() {
  const { QUOTES_DATA, QUOTE_CATEGORIES } = require('@/content/quotes');
  const { PHOTO_QUOTE_PAIRINGS } = require('@/content/photo-quote-pairings');
  const { TIMELINE_DATA } = require('@/content/timeline');
  const { SONGS_DATA } = require('@/content/songs');

  const securedSongs = SONGS_DATA.map((s: SongTrack) => ({
    ...s,
    audioPath: s.audioPath.startsWith('/api/media/')
      ? s.audioPath
      : `/api/media${s.audioPath}`,
    coverImage: s.coverImage.startsWith('/api/media/')
      ? s.coverImage
      : `/api/media${s.coverImage}`,
  }));

  const securedPairings = PHOTO_QUOTE_PAIRINGS.map((p: Pairing) => ({
    ...p,
    imagePath: p.imagePath.startsWith('/api/media/')
      ? p.imagePath
      : `/api/media${p.imagePath}`,
  }));

  const securedTimeline = TIMELINE_DATA.map((t: TimelineMilestone) => ({
    ...t,
    photos: t.photos.map((p) => ({
      ...p,
      src: p.src.startsWith('/api/media/') ? p.src : `/api/media${p.src}`,
    })),
  }));

  return {
    letters: SERVER_LETTERS_DATA,
    surprise: SERVER_SURPRISE_DATA,
    quotes: QUOTES_DATA,
    quoteCategories: QUOTE_CATEGORIES,
    pairings: securedPairings,
    timeline: securedTimeline,
    songs: securedSongs,
  };
}
