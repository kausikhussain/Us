export type QuoteCategory =
  | 'Love & affection'
  | 'Beautiful smiles'
  | 'Togetherness'
  | 'Six years'
  | 'Memories'
  | 'Gratitude'
  | 'Missing you'
  | 'Forever'
  | 'Little things'
  | 'Personal letters';

export interface QuoteItem {
  id: string;
  category: QuoteCategory;
  text: string;
  context?: string;
  author: string;
  isLongPassage?: boolean;
}

export const QUOTE_CATEGORIES: QuoteCategory[] = [
  'Love & affection',
  'Beautiful smiles',
  'Togetherness',
  'Six years',
  'Memories',
  'Gratitude',
  'Missing you',
  'Forever',
  'Little things',
  'Personal letters',
];

export const QUOTES_DATA: QuoteItem[] = [
  // 1. Love & affection (6 short/medium + 1 long)
  {
    id: 'love-01',
    category: 'Love & affection',
    text: 'Some people have a way of making the world feel a little softer. You are that person for me.',
    context: 'Unspoken Truth',
    author: 'Kausik',
  },
  {
    id: 'love-02',
    category: 'Love & affection',
    text: 'I didn’t need life to give me grand spectacles; walking beside you was more than enough.',
    context: 'Everyday Certainty',
    author: 'Kausik',
  },
  {
    id: 'love-03',
    category: 'Love & affection',
    text: 'In a room full of noise, your calm voice is the only sound that settles my thoughts.',
    context: 'Sanctuary',
    author: 'Kausik',
  },
  {
    id: 'love-04',
    category: 'Love & affection',
    text: 'The easiest choice I ever made was staying right where your laughter lived.',
    context: 'November 2020',
    author: 'Kausik',
  },
  {
    id: 'love-05',
    category: 'Love & affection',
    text: 'Loving you has always felt as natural and quiet as drawing a morning breath.',
    context: 'Natural Ease',
    author: 'Kausik',
  },
  {
    id: 'love-06',
    category: 'Love & affection',
    text: 'You have a gentle way of holding up the corners of my life without ever making it feel heavy.',
    context: 'Quiet Strength',
    author: 'Kausik',
  },
  {
    id: 'love-07',
    category: 'Love & affection',
    text: 'There is a quiet wonder in how you move through life. You don’t ask for attention, yet your kindness shifts the entire atmosphere of whatever room you enter. Sitting across from you on ordinary evenings, I often catch myself wondering how I was blessed enough to have your devotion.',
    context: 'A Reflection on You',
    author: 'Kausik',
    isLongPassage: true,
  },

  // 2. Beautiful smiles (6 short/medium + 1 long)
  {
    id: 'smi-01',
    category: 'Beautiful smiles',
    text: 'Among all the sights life has offered me, your happiness remains my absolute favourite.',
    context: 'Radiance',
    author: 'Kausik',
  },
  {
    id: 'smi-02',
    category: 'Beautiful smiles',
    text: 'The subtle crinkle beside your eyes when something truly delights you is where poetry begins.',
    context: 'True Joy',
    author: 'Kausik',
  },
  {
    id: 'smi-03',
    category: 'Beautiful smiles',
    text: 'Your smile has a beautiful way of untangling even the longest, most exhausting day.',
    context: 'Comfort',
    author: 'Kausik',
  },
  {
    id: 'smi-04',
    category: 'Beautiful smiles',
    text: 'If I could gift you one thing, it would be the sight of yourself whenever you smile without noticing.',
    context: 'Through My Eyes',
    author: 'Kausik',
  },
  {
    id: 'smi-05',
    category: 'Beautiful smiles',
    text: 'There is an effortless grace in your laughter that turns simple street corners into sunny afternoons.',
    context: 'Spontaneous Sunshine',
    author: 'Kausik',
  },
  {
    id: 'smi-06',
    category: 'Beautiful smiles',
    text: 'One warm look from you can still turn an anxious afternoon into a peaceful sunset.',
    context: 'Stillness',
    author: 'Kausik',
  },
  {
    id: 'smi-07',
    category: 'Beautiful smiles',
    text: 'There are moments when you smile at something small—a passing bird, a funny story, or a warm cup of tea—and for three seconds the entire universe feels perfectly balanced. It is not a practiced pose; it is the honest light of who you are, and it has guided me through six years.',
    context: 'The Light of Us',
    author: 'Kausik',
    isLongPassage: true,
  },

  // 3. Togetherness (6 short/medium + 1 long)
  {
    id: 'tog-01',
    category: 'Togetherness',
    text: 'We never needed an extravagant plot. We only needed a story that belonged genuinely to us.',
    context: 'Our Own Path',
    author: 'Kausik',
  },
  {
    id: 'tog-02',
    category: 'Togetherness',
    text: 'There is a special peace in having someone with whom even complete silence feels entirely comfortable.',
    context: 'Quiet Understanding',
    author: 'Kausik',
  },
  {
    id: 'tog-03',
    category: 'Togetherness',
    text: 'I don’t need every day to be dramatic. Turning ordinary afternoons into sweet memories together is plenty.',
    context: 'Everyday Miracles',
    author: 'Kausik',
  },
  {
    id: 'tog-04',
    category: 'Togetherness',
    text: 'Two cups on a wooden table, two quiet voices, and an evening that asks for nothing more.',
    context: 'Shared Presence',
    author: 'Kausik',
  },
  {
    id: 'tog-05',
    category: 'Togetherness',
    text: 'Walking beside you taught me that home isn’t a physical building; it is your steady hand in mine.',
    context: 'Finding Home',
    author: 'Kausik',
  },
  {
    id: 'tog-06',
    category: 'Togetherness',
    text: 'Through every unexpected turn of these past seasons, holding your hand kept my footing sure.',
    context: 'Steady Anchor',
    author: 'Kausik',
  },
  {
    id: 'tog-07',
    category: 'Togetherness',
    text: 'We grew up side by side through our twenties, watching our habits intertwine until we could finish each other’s thoughts without speaking. Real companionship was never about grand declarations; it was about choosing each other again across quiet kitchen counters, crowded walkways, and tired evenings.',
    context: 'Six Years of Partnership',
    author: 'Kausik',
    isLongPassage: true,
  },

  // 4. Six years (6 short/medium + 1 long)
  {
    id: 'six-01',
    category: 'Six years',
    text: 'Six years, two thousand one hundred and ninety-one days, and yet time still moves too quickly beside you.',
    context: '23 Nov 2020 – 23 Nov 2026',
    author: 'Kausik',
  },
  {
    id: 'six-02',
    category: 'Six years',
    text: 'From 23 November 2020 to this exact milestone, every chapter has deepened my admiration for you.',
    context: 'Our Journey',
    author: 'Kausik',
  },
  {
    id: 'six-03',
    category: 'Six years',
    text: 'Six years is not merely time elapsed; it is thousands of quiet kindnesses woven into our days.',
    context: 'Woven Years',
    author: 'Kausik',
  },
  {
    id: 'six-04',
    category: 'Six years',
    text: 'Time passed, seasons changed their coats, yet the warmth of your smile never aged a day.',
    context: 'Ageless Grace',
    author: 'Kausik',
  },
  {
    id: 'six-05',
    category: 'Six years',
    text: 'We began with a tentative first conversation; six years later, you are woven into every thought I have.',
    context: 'How We Grew',
    author: 'Kausik',
  },
  {
    id: 'six-06',
    category: 'Six years',
    text: 'Looking back over six years feels like browsing a gallery where every painting was blessed by your presence.',
    context: 'The Gallery of Us',
    author: 'Kausik',
  },
  {
    id: 'six-07',
    category: 'Six years',
    text: 'When we met on that late November morning in 2020, neither of us could predict what six years would bring. Yet through university terms, career shifts, early video calls, and hundreds of simple meals, you stayed my compass. Today, six full years stand behind us, and every single day was worth living because of you.',
    context: 'The Six-Year Milestone',
    author: 'Kausik',
    isLongPassage: true,
  },

  // 5. Memories (6 short/medium + 1 long)
  {
    id: 'mem-01',
    category: 'Memories',
    text: 'Sometimes the smallest photographs hold the heaviest and most tender feelings.',
    context: 'Captured Frames',
    author: 'Kausik',
  },
  {
    id: 'mem-02',
    category: 'Memories',
    text: 'I wish certain afternoons came with a replay button, because some memories deserve to be relived.',
    context: 'Fond Recall',
    author: 'Kausik',
  },
  {
    id: 'mem-03',
    category: 'Memories',
    text: 'A single candid glance frozen in an old frame can bring an entire season rushing back.',
    context: 'Time Preserved',
    author: 'Kausik',
  },
  {
    id: 'mem-04',
    category: 'Memories',
    text: 'Our memories aren’t stored in photo albums alone; they live in the quiet rhythm of our daily conversations.',
    context: 'Living Memory',
    author: 'Kausik',
  },
  {
    id: 'mem-05',
    category: 'Memories',
    text: 'Remembering those early video calls still brings a quiet smile to my face on cold winter nights.',
    context: 'December 2020',
    author: 'Kausik',
  },
  {
    id: 'mem-06',
    category: 'Memories',
    text: 'We walked into each other’s stories as quiet acquaintances and built an entire shared world together.',
    context: 'Footsteps',
    author: 'Kausik',
  },
  {
    id: 'mem-07',
    category: 'Memories',
    text: 'Looking at these photographs, I notice details that passed too quickly in the moment—the way your fingers wrapped around an ice cream cone, how the sun caught the edge of your scarf, and how easily we laughed at things only we understood. That is the luxury of remembering with someone you love.',
    context: 'Looking Across Our Frames',
    author: 'Kausik',
    isLongPassage: true,
  },

  // 6. Gratitude (5 short/medium + 1 long)
  {
    id: 'gra-01',
    category: 'Gratitude',
    text: 'Thank you for choosing to stand with me even when the days felt long and demanding.',
    context: 'Thankfulness',
    author: 'Kausik',
  },
  {
    id: 'gra-02',
    category: 'Gratitude',
    text: 'Out of all the paths my life could have taken, I am deeply grateful that it crossed with yours.',
    context: 'Pure Gratitude',
    author: 'Kausik',
  },
  {
    id: 'gra-03',
    category: 'Gratitude',
    text: 'You have given my days a sense of gentle purpose that I never had before meeting you.',
    context: 'Quiet Meaning',
    author: 'Kausik',
  },
  {
    id: 'gra-04',
    category: 'Gratitude',
    text: 'Thank you for your patience, your steadfast belief in me, and the tenderness you bring into every conversation.',
    context: 'For Nasreen',
    author: 'Kausik',
  },
  {
    id: 'gra-05',
    category: 'Gratitude',
    text: 'I notice how gently you care for the people around you, asking for nothing in return.',
    context: 'Observing Grace',
    author: 'Kausik',
  },
  {
    id: 'gra-06',
    category: 'Gratitude',
    text: 'Gratitude is often hard to put into spoken words without sounding formal. But when I think of where I was six years ago and where I stand today, so much of my peace comes from knowing you are in my corner. Thank you for your warmth, your honesty, and the unwavering grace you offer me every single day.',
    context: 'From My Heart',
    author: 'Kausik',
    isLongPassage: true,
  },

  // 7. Missing you (5 short/medium + 1 long)
  {
    id: 'mis-01',
    category: 'Missing you',
    text: 'Even when hours or distance sit between us, the thought of your voice closes every mile.',
    context: 'Quiet Longing',
    author: 'Kausik',
  },
  {
    id: 'mis-02',
    category: 'Missing you',
    text: 'Missing you is just a reminder of how fortunate I am to have someone who feels like home.',
    context: 'Comforting Thought',
    author: 'Kausik',
  },
  {
    id: 'mis-03',
    category: 'Missing you',
    text: 'A quiet room always feels a little more hollow until your message lights up the screen.',
    context: 'Between Moments',
    author: 'Kausik',
  },
  {
    id: 'mis-04',
    category: 'Missing you',
    text: 'I carry your presence through busy work days like a steady, gentle promise of our next hello.',
    context: 'Through The Day',
    author: 'Kausik',
  },
  {
    id: 'mis-05',
    category: 'Missing you',
    text: 'No matter where I go, my mind always wanders back to the last time we laughed together.',
    context: 'Constant Thoughts',
    author: 'Kausik',
  },
  {
    id: 'mis-06',
    category: 'Missing you',
    text: 'Whenever distance keeps us apart, I look at our pictures and remember the effortless ease of sitting beside you. The world can feel rushed and unfamiliar, but the thought of returning to your laughter puts everything back in perspective. You are always my quiet anchor, no matter the miles.',
    context: 'When Apart',
    author: 'Kausik',
    isLongPassage: true,
  },

  // 8. Forever (5 short/medium + 1 long)
  {
    id: 'for-01',
    category: 'Forever',
    text: 'Six years behind us, and every tomorrow still belongs to the story we are writing together.',
    context: 'Looking Ahead',
    author: 'Kausik',
  },
  {
    id: 'for-02',
    category: 'Forever',
    text: 'Some stories are not meant to end. They are meant to keep becoming more beautiful with each passing year.',
    context: 'Closing Conviction',
    author: 'Kausik',
  },
  {
    id: 'for-03',
    category: 'Forever',
    text: '23 November 2020 was the first sentence. The rest of our lives will be the book.',
    context: 'The Prologue',
    author: 'Kausik',
  },
  {
    id: 'for-04',
    category: 'Forever',
    text: 'May we always find new reasons to laugh, new places to explore, and quiet evenings to cherish.',
    context: 'A Simple Wish',
    author: 'Kausik',
  },
  {
    id: 'for-05',
    category: 'Forever',
    text: 'I look forward to growing older with you, watching our stories collect like fallen autumn leaves.',
    context: 'Years to Come',
    author: 'Kausik',
  },
  {
    id: 'for-06',
    category: 'Forever',
    text: 'People often speak of the future as an uncertainty, but sharing my tomorrows with you feels like the one true certainty I possess. I do not ask for extraordinary fortunes; I simply wish to keep walking beside you, listening to your stories, and learning how to love you better with every passing year.',
    context: 'Our Unwritten Chapters',
    author: 'Kausik',
    isLongPassage: true,
  },

  // 9. Little things (6 short/medium + 1 long)
  {
    id: 'lit-01',
    category: 'Little things',
    text: 'It is the way you remember how I take my tea, and how you save the last bite without asking.',
    context: 'Gentle Care',
    author: 'Kausik',
  },
  {
    id: 'lit-02',
    category: 'Little things',
    text: 'Happiness was never in grand gestures; it was always tucked into your sleepy morning voice.',
    context: 'Simple Mornings',
    author: 'Kausik',
  },
  {
    id: 'lit-03',
    category: 'Little things',
    text: 'A thousand small gestures woven together until they became the foundation of our entire life.',
    context: 'Quiet Foundations',
    author: 'Kausik',
  },
  {
    id: 'lit-04',
    category: 'Little things',
    text: 'Sharing an ice cream on an ordinary pavement can feel richer than any banquet when I am with you.',
    context: 'October 2023',
    author: 'Kausik',
  },
  {
    id: 'lit-05',
    category: 'Little things',
    text: 'The unscripted moments between our plans are always the ones that linger the longest.',
    context: 'Unplanned Joy',
    author: 'Kausik',
  },
  {
    id: 'lit-06',
    category: 'Little things',
    text: 'Holding your hand while walking nowhere in particular has always been my favourite destination.',
    context: 'Aimless Walks',
    author: 'Kausik',
  },
  {
    id: 'lit-07',
    category: 'Little things',
    text: 'When I look back on six years, the grand milestones blur into the background, and the little details shine brightest: the funny mispronunciations, the shared umbrella in sudden rain, the quiet glances across crowded rooms, and the comfortable reassurance of your presence. Those are the treasures of our story.',
    context: 'The Fabric of Us',
    author: 'Kausik',
    isLongPassage: true,
  },

  // 10. Personal letters (5 short/medium + 2 long)
  {
    id: 'let-01',
    category: 'Personal letters',
    text: 'To Nasreen: you turned ordinary days into poetry and simple moments into cherished keepsakes.',
    context: 'Dedication',
    author: 'Kausik',
  },
  {
    id: 'let-02',
    category: 'Personal letters',
    text: 'No letter could ever hold the full weight of my gratitude, but every word here is sincere.',
    context: 'A Sincere Note',
    author: 'Kausik',
  },
  {
    id: 'let-03',
    category: 'Personal letters',
    text: 'If these six years were a dream, I pray never to wake up from the peace you brought into my life.',
    context: 'A Prayer',
    author: 'Kausik',
  },
  {
    id: 'let-04',
    category: 'Personal letters',
    text: 'Whenever life feels demanding, remember that you are deeply, quietly, and unconditionally cherished.',
    context: 'For Your Comfort',
    author: 'Kausik',
  },
  {
    id: 'let-05',
    category: 'Personal letters',
    text: 'Here is my heart in ink: patient, grateful, and endlessly devoted to you.',
    context: 'In Ink',
    author: 'Kausik',
  },
  {
    id: 'let-06',
    category: 'Personal letters',
    text: 'Dearest Nasreen, six years ago on the twenty-third of November, our story began without fanfare. Today, looking back at all the paths we walked together, my heart is filled with a peace I cannot adequately describe. Thank you for being the warmth in my mornings, the wisdom in my doubts, and the joy in every quiet evening.',
    context: 'A Letter for Six Years',
    author: 'Kausik',
    isLongPassage: true,
  },
  {
    id: 'let-07',
    category: 'Personal letters',
    text: 'My love, whenever you find yourself missing me, open this note and remember this: across every busy day and every silent night, my thoughts never stray far from your smile. You are the stillness that anchors me, and nothing can diminish the love that has grown between us over these six beautiful years.',
    context: 'Open When You Miss Me',
    author: 'Kausik',
    isLongPassage: true,
  },
];

export function getQuotesByCategory(cat: QuoteCategory): QuoteItem[] {
  return QUOTES_DATA.filter((q) => q.category === cat);
}

export function getRandomQuote(): QuoteItem {
  const idx = Math.floor(Math.random() * QUOTES_DATA.length);
  return QUOTES_DATA[idx];
}
