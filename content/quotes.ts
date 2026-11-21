import { z } from 'zod';

export type QuoteCategory =
  | 'The Beginning'
  | 'Six Years of Us'
  | 'You Are My Favourite Person'
  | 'Little Things'
  | 'When I Miss You'
  | 'Our Memories'
  | 'Through Every Season'
  | 'Forever and Beyond'
  | 'For Your Smile'
  | 'My Favourite Place'
  | 'The Things I Never Say'
  | 'Our Future'
  | 'Just Because'
  | 'A Letter to You';

export interface QuoteItem {
  id: string;
  category: QuoteCategory;
  text: string;
  context?: string;
  author: string;
  isLongPassage?: boolean;
}

export const QUOTE_CATEGORIES: QuoteCategory[] = [
  'The Beginning',
  'Six Years of Us',
  'You Are My Favourite Person',
  'Little Things',
  'When I Miss You',
  'Our Memories',
  'Through Every Season',
  'Forever and Beyond',
  'For Your Smile',
  'My Favourite Place',
  'The Things I Never Say',
  'Our Future',
  'Just Because',
  'A Letter to You',
];

export const QUOTES_DATA: QuoteItem[] = [
  // 1. The Beginning
  {
    id: 'beg-1',
    category: 'The Beginning',
    text: 'Somewhere between ordinary days and unforgettable moments, you became my favourite part of life.',
    context: '23 November 2020',
    author: 'K & N',
  },
  {
    id: 'beg-2',
    category: 'The Beginning',
    text: 'We started with a beginning. Somehow, we created a whole world of memories.',
    context: 'The First Spark',
    author: 'K & N',
  },
  {
    id: 'beg-3',
    category: 'The Beginning',
    text: 'I didn’t know what love felt like until the day walking beside you felt more natural than walking alone.',
    context: 'Day One',
    author: 'K & N',
  },
  {
    id: 'beg-4',
    category: 'The Beginning',
    text: 'The easiest choice I ever made was staying right where your laughter lived.',
    context: 'November 2020',
    author: 'K & N',
  },

  // 2. Six Years of Us
  {
    id: 'six-1',
    category: 'Six Years of Us',
    text: 'Six years, and somehow, one smile from you can still make an ordinary day feel extraordinary.',
    context: '2,191 Days',
    author: 'K & N',
  },
  {
    id: 'six-2',
    category: 'Six Years of Us',
    text: 'Time gave us six years, but my heart keeps finding brand new reasons to choose you.',
    context: 'Six Years of Devotion',
    author: 'K & N',
  },
  {
    id: 'six-3',
    category: 'Six Years of Us',
    text: 'Six years is not just a measure of time; it is thousands of quiet conversations, shared meals, and the peace of being understood.',
    context: 'Our Journey',
    author: 'K & N',
    isLongPassage: true,
  },
  {
    id: 'six-4',
    category: 'Six Years of Us',
    text: 'Out of all the stories written across this universe, ours remains my absolute favourite.',
    context: 'Six Years',
    author: 'K & N',
  },

  // 3. You Are My Favourite Person
  {
    id: 'fav-1',
    category: 'You Are My Favourite Person',
    text: 'I don’t need every moment to be perfect. I just love knowing that you are part of all my moments.',
    context: 'Always You',
    author: 'K & N',
  },
  {
    id: 'fav-2',
    category: 'You Are My Favourite Person',
    text: 'In a crowded room or a quiet evening, my eyes will always search for you first.',
    context: 'Unspoken Certainty',
    author: 'K & N',
  },
  {
    id: 'fav-3',
    category: 'You Are My Favourite Person',
    text: 'You are the person I want to tell good news to, the one I seek when life gets heavy, and the only voice that settles my restless mind.',
    context: 'My Best Friend',
    author: 'K & N',
    isLongPassage: true,
  },
  {
    id: 'fav-4',
    category: 'You Are My Favourite Person',
    text: 'Loving you is as effortless as drawing breath.',
    context: 'Every Day',
    author: 'K & N',
  },

  // 4. Little Things
  {
    id: 'lit-1',
    category: 'Little Things',
    text: 'The shared cups of tea, the quiet glances across the room, the way your hand instinctively reaches for mine—these are the kingdoms we built.',
    context: 'Everyday Miracles',
    author: 'K & N',
    isLongPassage: true,
  },
  {
    id: 'lit-2',
    category: 'Little Things',
    text: 'Happiness was never in grand gestures; it was always tucked into your sleepy morning voice.',
    context: 'Quiet Mornings',
    author: 'K & N',
  },
  {
    id: 'lit-3',
    category: 'Little Things',
    text: 'A thousand small memories woven together until they became our entire life.',
    context: 'Simple Days',
    author: 'K & N',
  },
  {
    id: 'lit-4',
    category: 'Little Things',
    text: 'It is the way you remember how I take my tea, and how you save the last bite for me without even asking.',
    context: 'Unspoken Care',
    author: 'K & N',
  },

  // 5. When I Miss You
  {
    id: 'mis-1',
    category: 'When I Miss You',
    text: 'Even when miles or hours stand between us, the thought of your smile closes every distance.',
    context: 'Quiet Longing',
    author: 'K & N',
  },
  {
    id: 'mis-2',
    category: 'When I Miss You',
    text: 'Missing you is just my heart reminding me how lucky I am to have someone who feels like home.',
    context: 'Holding You in Thought',
    author: 'K & N',
  },
  {
    id: 'mis-3',
    category: 'When I Miss You',
    text: 'There is a tenderness that lingers in every room you leave. I carry your absence like a gentle promise of our next hello.',
    context: 'Between Moments',
    author: 'K & N',
    isLongPassage: true,
  },

  // 6. Our Memories
  {
    id: 'mem-1',
    category: 'Our Memories',
    text: 'Some people become memories. Some become home. You became both, in the most beautiful way.',
    context: 'Preserved Forever',
    author: 'K & N',
  },
  {
    id: 'mem-2',
    category: 'Our Memories',
    text: 'If I could revisit one thing in life, I would choose all those little moments that brought us here.',
    context: 'Looking Back',
    author: 'K & N',
  },
  {
    id: 'mem-3',
    category: 'Our Memories',
    text: 'Every photograph in our gallery is not just a captured frame—it is an echo of a day where we were utterly, beautifully happy.',
    context: 'In Our Frames',
    author: 'K & N',
    isLongPassage: true,
  },
  {
    id: 'mem-4',
    category: 'Our Memories',
    text: 'We walked into each other’s stories as strangers, and now our footprints are so intertwined they can never be separated.',
    context: 'Footsteps',
    author: 'K & N',
  },

  // 7. Through Every Season
  {
    id: 'sea-1',
    category: 'Through Every Season',
    text: 'Through autumn leaves, winter chills, monsoon showers, and warm summers—holding your hand has made every season feel like spring.',
    context: 'Changing Skies',
    author: 'K & N',
  },
  {
    id: 'sea-2',
    category: 'Through Every Season',
    text: 'We grew through storms that tested our patience and sunrises that celebrated our bond.',
    context: 'Steadfast Devotion',
    author: 'K & N',
  },
  {
    id: 'sea-3',
    category: 'Through Every Season',
    text: 'The most beautiful chapters are not always written in words. Some are lived, quietly, together.',
    context: 'Side by Side',
    author: 'K & N',
  },
  {
    id: 'sea-4',
    category: 'Through Every Season',
    text: 'Seasons shift, years turn their pages, yet the sanctuary of your love remains the one constant in my universe.',
    context: 'Everlasting',
    author: 'K & N',
    isLongPassage: true,
  },

  // 8. Forever and Beyond
  {
    id: 'for-1',
    category: 'Forever and Beyond',
    text: '23 November 2020 was the prologue. Forever is the promise.',
    context: 'Endless Horizon',
    author: 'K & N',
  },
  {
    id: 'for-2',
    category: 'Forever and Beyond',
    text: 'Six years behind us, and every tomorrow still belongs to you.',
    context: 'To Eternity',
    author: 'K & N',
  },
  {
    id: 'for-3',
    category: 'Forever and Beyond',
    text: 'I would choose you in every lifetime, under every sky, across every constellation of stars.',
    context: 'Unconditional',
    author: 'K & N',
  },
  {
    id: 'for-4',
    category: 'Forever and Beyond',
    text: 'If forever was a distance, I would walk it twice just to hear your voice at the end.',
    context: 'Infinite Horizon',
    author: 'K & N',
  },

  // 9. For Your Smile
  {
    id: 'smi-1',
    category: 'For Your Smile',
    text: 'Your smile remains my favourite sight in the whole world; it has the power to untangle all my worries in an instant.',
    context: 'Pure Radiance',
    author: 'K & N',
  },
  {
    id: 'smi-2',
    category: 'For Your Smile',
    text: 'If I could give you one gift, it would be the ability to see yourself through my eyes whenever you smile.',
    context: 'Watching You Laugh',
    author: 'K & N',
  },
  {
    id: 'smi-3',
    category: 'For Your Smile',
    text: 'The genuine, unscripted crinkle beside your eyes when something truly delights you—that is where poetry begins.',
    context: 'Joy Unspoken',
    author: 'K & N',
    isLongPassage: true,
  },

  // 10. My Favourite Place
  {
    id: 'pla-1',
    category: 'My Favourite Place',
    text: 'My favourite place in the world is not a pin on a map—it is right beside you.',
    context: 'Finding Home',
    author: 'K & N',
  },
  {
    id: 'pla-2',
    category: 'My Favourite Place',
    text: 'Home isn’t four walls and a roof; it’s the quiet ease that settles into my chest whenever you walk through the door.',
    context: 'Our Sanctuary',
    author: 'K & N',
  },
  {
    id: 'pla-3',
    category: 'My Favourite Place',
    text: 'Anywhere the world feels too noisy, I close my eyes and return to the quiet warmth of your embrace.',
    context: 'True Haven',
    author: 'K & N',
  },
  {
    id: 'pla-4',
    category: 'My Favourite Place',
    text: 'The most peaceful corner of the earth is wherever you lean your head on my shoulder and let out a soft, contented breath.',
    context: 'Sanctuary',
    author: 'K & N',
    isLongPassage: true,
  },

  // 11. The Things I Never Say
  {
    id: 'say-1',
    category: 'The Things I Never Say',
    text: 'Sometimes I just sit and look at you when you are busy doing something simple, wondering how I got so lucky.',
    context: 'Quiet Thoughts',
    author: 'K & N',
  },
  {
    id: 'say-2',
    category: 'The Things I Never Say',
    text: 'I notice how gently you care for everyone around you, how your kindness never asks for credit, and how your presence makes the heavy world feel soft.',
    context: 'What My Heart Knows',
    author: 'K & N',
    isLongPassage: true,
  },
  {
    id: 'say-3',
    category: 'The Things I Never Say',
    text: 'Thank you for choosing to stand with me even when the days were long and exhausting.',
    context: 'Gratitude',
    author: 'K & N',
  },

  // 12. Our Future
  {
    id: 'fut-1',
    category: 'Our Future',
    text: 'I hope life gives us countless more sunsets, silly conversations, unexpected smiles and little moments that become forever memories.',
    context: 'What Lies Ahead',
    author: 'K & N',
  },
  {
    id: 'fut-2',
    category: 'Our Future',
    text: 'The best chapters of our story are the ones we haven’t even lived yet.',
    context: 'Looking Forward',
    author: 'K & N',
  },
  {
    id: 'fut-3',
    category: 'Our Future',
    text: 'I cannot wait to grow old with you, to see our laughter lines deepen, and to remember that it all began on a sweet November day.',
    context: 'Growing Old Together',
    author: 'K & N',
    isLongPassage: true,
  },
  {
    id: 'fut-4',
    category: 'Our Future',
    text: 'I look forward to all the unwritten chapters—the journeys we will take, the quiet mornings we will share, and the love that will keep deepening.',
    context: 'Tomorrow and Always',
    author: 'K & N',
  },

  // 13. Just Because
  {
    id: 'bec-1',
    category: 'Just Because',
    text: 'Just a reminder that you are deeply, unconditionally, and endlessly loved.',
    context: 'Just Because',
    author: 'K & N',
  },
  {
    id: 'bec-2',
    category: 'Just Because',
    text: 'Among all the beautiful things this world has to offer, the moments with you remain my favourites.',
    context: 'Pure Truth',
    author: 'K & N',
  },
  {
    id: 'bec-3',
    category: 'Just Because',
    text: 'You make life feel like a gift rather than a routine.',
    context: 'For You',
    author: 'K & N',
  },
  {
    id: 'bec-4',
    category: 'Just Because',
    text: 'I didn’t need a special occasion to remind you: you are cherished more than words could ever convey.',
    context: 'Always in Mind',
    author: 'K & N',
  },

  // 14. A Letter to You
  {
    id: 'let-1',
    category: 'A Letter to You',
    text: 'Out of all the moments life could have given me, I am grateful that it gave me you.',
    context: 'To My Love',
    author: 'K & N',
  },
  {
    id: 'let-2',
    category: 'A Letter to You',
    text: 'If these six years were a dream, I pray never to wake up. Thank you for being the warmth in my mornings, the peace in my nights, and the melody that plays softly in my heart.',
    context: 'With All My Devotion',
    author: 'K & N',
    isLongPassage: true,
  },
  {
    id: 'let-3',
    category: 'A Letter to You',
    text: 'You turned ordinary years into poetry, and simple days into timeless art. Here is to six years of us, and an infinity more.',
    context: 'Forever Yours',
    author: 'K & N',
  },
];

export function getQuotesByCategory(cat: QuoteCategory): QuoteItem[] {
  return QUOTES_DATA.filter((q) => q.category === cat);
}

export function getRandomQuote(): QuoteItem {
  const idx = Math.floor(Math.random() * QUOTES_DATA.length);
  return QUOTES_DATA[idx];
}
