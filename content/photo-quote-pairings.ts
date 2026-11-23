export type PhotoCategory =
  | 'Together'
  | 'Nasreen portraits'
  | 'Kausik portraits'
  | 'Candid moments'
  | 'Smiles & happiness'
  | 'Beautiful expressions'
  | 'Special memories'
  | 'Everyday moments'
  | 'Portrait photography'
  | 'Other meaningful';

export type SectionId =
  | '01-entrance'
  | '02-message'
  | '03-counter'
  | '04-beauty-of-you'
  | '05-two-of-us'
  | '06-little-moments'
  | '07-words-from-heart'
  | '08-soundtrack'
  | '09-timeline'
  | '10-letters'
  | '11-surprise'
  | '12-final-memory'
  | '13-finale';

export type PhotoQuotePairing = Pairing;

export interface Pairing {
  photoId: string;
  imagePath: string;
  category: PhotoCategory;
  quoteId: string;
  quoteText: string;
  caption?: string;
  date?: string;
  section: SectionId;
  priority: number;
  textPlacement: 'above' | 'below' | 'beside' | 'overlay-safe-zone';
  rationale: string;
  confidence: 1 | 2 | 3 | 4 | 5;
  reviewStatus: 'proposed' | 'reviewed' | 'visually-verified';
}

export const PHOTO_QUOTE_PAIRINGS: Pairing[] = [
  // SECTION 04: THE BEAUTY OF YOU (Nasreen Portraits)
  {
    photoId: 'ph-020',
    imagePath: '/images/our-story/portraits/IMG_0724.JPG',
    category: 'Nasreen portraits',
    quoteId: 'smi-01',
    quoteText: 'Among all the sights life has offered me, your happiness remains my absolute favourite.',
    caption: 'Holding a single red rose, peaceful and timeless.',
    date: '2024',
    section: '04-beauty-of-you',
    priority: 1,
    textPlacement: 'beside',
    rationale: 'The red rose and monumental stone arches reflect timeless elegance, perfectly matching the admiration of her happiness.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-014',
    imagePath: '/images/our-story/portraits/IMG-20240411-WA0038.jpg',
    category: 'Nasreen portraits',
    quoteId: 'smi-04',
    quoteText: 'If I could gift you one thing, it would be the sight of yourself whenever you smile without noticing.',
    caption: 'Spring daylight, open skies.',
    date: 'April 2024',
    section: '04-beauty-of-you',
    priority: 2,
    textPlacement: 'below',
    rationale: 'Her spontaneous, bright smile under open skies connects directly with appreciating her natural, unforced joy.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-046',
    imagePath: '/images/our-story/portraits/IMG_20240801_040421.jpg',
    category: 'Nasreen portraits',
    quoteId: 'love-01',
    quoteText: 'Some people have a way of making the world feel a little softer. You are that person for me.',
    caption: 'Serenity and quiet grace.',
    date: 'August 2024',
    section: '04-beauty-of-you',
    priority: 3,
    textPlacement: 'below',
    rationale: 'The calm, poised demeanor in white attire creates a soothing visual atmosphere that mirrors the line about softening the world.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-029',
    imagePath: '/images/our-story/gallery/IMG_20230814_085427.jpg',
    category: 'Portrait photography',
    quoteId: 'smi-02',
    quoteText: 'The subtle crinkle beside your eyes when something truly delights you is where poetry begins.',
    caption: 'Seated outdoors in morning contemplation.',
    date: 'August 2023',
    section: '04-beauty-of-you',
    priority: 4,
    textPlacement: 'beside',
    rationale: 'A high-resolution environmental portrait with gentle eye crinkles and a thoughtful expression, evoking genuine poetry.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-040',
    imagePath: '/images/our-story/portraits/IMG_20240205_112434.jpg',
    category: 'Smiles & happiness',
    quoteId: 'smi-03',
    quoteText: 'Your smile has a beautiful way of untangling even the longest, most exhausting day.',
    caption: 'Pure laughter on a February morning.',
    date: 'February 2024',
    section: '04-beauty-of-you',
    priority: 5,
    textPlacement: 'below',
    rationale: 'An unreserved, beaming smile that visually radiates warmth, comforting the viewer just as the quote describes.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-018',
    imagePath: '/images/our-story/portraits/IMG-20240524-WA0144.jpg',
    category: 'Beautiful expressions',
    quoteId: 'love-06',
    quoteText: 'You have a gentle way of holding up the corners of my life without ever making it feel heavy.',
    caption: 'Soft golden hour tones.',
    date: 'May 2024',
    section: '04-beauty-of-you',
    priority: 6,
    textPlacement: 'below',
    rationale: 'Amber, tender lighting that exudes quiet strength and gentle companionship.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },

  // SECTION 05: THE TWO OF US (Together Photos)
  {
    photoId: 'ph-034',
    imagePath: '/images/our-story/portraits/IMG_20240205_105528.jpg',
    category: 'Together',
    quoteId: 'tog-01',
    quoteText: 'We never needed an extravagant plot. We only needed a story that belonged genuinely to us.',
    caption: 'Close together, sharing an unscripted smile.',
    date: 'February 2024',
    section: '05-two-of-us',
    priority: 1,
    textPlacement: 'beside',
    rationale: 'A close, natural couple selfie capturing two people completely comfortable in their own world without any pretense.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-009',
    imagePath: '/images/our-story/together/IMG-20210516-WA0011.jpg',
    category: 'Together',
    quoteId: 'tog-02',
    quoteText: 'There is a special peace in having someone with whom even complete silence feels entirely comfortable.',
    caption: 'Side by side, early in our journey.',
    date: 'May 2021',
    section: '05-two-of-us',
    priority: 2,
    textPlacement: 'below',
    rationale: 'An early square portrait showing natural ease and mutual trust during their first year together.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-033',
    imagePath: '/images/our-story/portraits/IMG_20231018_221857.jpg',
    category: 'Together',
    quoteId: 'lit-04',
    quoteText: 'Sharing an ice cream on an ordinary pavement can feel richer than any banquet when I am with you.',
    caption: 'Impromptu chocolate ice cream date.',
    date: 'October 2023',
    section: '05-two-of-us',
    priority: 3,
    textPlacement: 'beside',
    rationale: 'Factual macro photo of their two hands holding ice cream cones side by side, making the quote completely authentic and literal.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-022',
    imagePath: '/images/our-story/gallery/IMG_20220503_095120.jpg',
    category: 'Special memories',
    quoteId: 'tog-06',
    quoteText: 'Through every unexpected turn of these past seasons, holding your hand kept my footing sure.',
    caption: 'A sunny holiday morning.',
    date: 'May 2022',
    section: '05-two-of-us',
    priority: 4,
    textPlacement: 'below',
    rationale: 'A bright, festive memory that shows steadfast support and shared celebration.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-049',
    imagePath: '/images/our-story/gallery/IMG_20250607_104001.jpg',
    category: 'Together',
    quoteId: 'tog-03',
    quoteText: 'I don’t need every day to be dramatic. Turning ordinary afternoons into sweet memories together is plenty.',
    caption: 'Morning sunshine, fifth year of us.',
    date: 'June 2025',
    section: '05-two-of-us',
    priority: 5,
    textPlacement: 'below',
    rationale: 'Bright, happy outdoor travel together illustrating how simple days become the most treasured memories.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-048',
    imagePath: '/images/our-story/gallery/IMG_20250420_201853.jpg',
    category: 'Special memories',
    quoteId: 'tog-05',
    quoteText: 'Walking beside you taught me that home isn’t a physical building; it is your steady hand in mine.',
    caption: 'Golden hour panorama across the horizon.',
    date: 'April 2025',
    section: '05-two-of-us',
    priority: 6,
    textPlacement: 'below',
    rationale: 'An expansive 21:9 sunset horizon conveying the feeling of having found home in each other.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },

  // SECTION 06: LITTLE MOMENTS, BIG FEELINGS (Candids & Everyday Frames)
  {
    photoId: 'ph-001',
    imagePath: '/images/our-story/collages/Beige_Aesthetic_Photo_Collage_Frame_Instagram_Story.png',
    category: 'Everyday moments',
    quoteId: 'lit-03',
    quoteText: 'A thousand small gestures woven together until they became the foundation of our entire life.',
    caption: 'Keepsake polaroids of laughter and small adventures.',
    section: '06-little-moments',
    priority: 1,
    textPlacement: 'below',
    rationale: 'A multi-frame scrapbook layout representing hundreds of small memories collected over the years.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-035',
    imagePath: '/images/our-story/gallery/IMG_20240205_110314.jpg',
    category: 'Candid moments',
    quoteId: 'lit-05',
    quoteText: 'The unscripted moments between our plans are always the ones that linger the longest.',
    caption: 'Looking back with a spontaneous smile.',
    date: 'February 2024',
    section: '06-little-moments',
    priority: 2,
    textPlacement: 'below',
    rationale: 'An unposed mid-walk glance that captures unplanned, natural intimacy.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-041',
    imagePath: '/images/our-story/gallery/IMG_20240207_094420.jpg',
    category: 'Candid moments',
    quoteId: 'lit-06',
    quoteText: 'Holding your hand while walking nowhere in particular has always been my favourite destination.',
    caption: 'Morning stroll without any hurry.',
    date: 'February 2024',
    section: '06-little-moments',
    priority: 3,
    textPlacement: 'below',
    rationale: 'Two people strolling together outdoors on an unhurried morning.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-007',
    imagePath: '/images/our-story/memories/IMG-20201203-WA0016.jpg',
    category: 'Candid moments',
    quoteId: 'smi-05',
    quoteText: 'There is an effortless grace in your laughter that turns simple street corners into sunny afternoons.',
    caption: 'Laughing across telephone screens.',
    date: 'December 2020',
    section: '06-little-moments',
    priority: 4,
    textPlacement: 'below',
    rationale: 'Unfiltered laughter during their earliest winter calls.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
  {
    photoId: 'ph-027',
    imagePath: '/images/our-story/gallery/IMG_20230812_101308.jpg',
    category: 'Candid moments',
    quoteId: 'lit-02',
    quoteText: 'Happiness was never in grand gestures; it was always tucked into your sleepy morning voice.',
    caption: 'Mid-conversation in late summer.',
    date: 'August 2023',
    section: '06-little-moments',
    priority: 5,
    textPlacement: 'below',
    rationale: 'A candid conversation frame with authentic, relaxed expression.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },

  // SECTION 07: WORDS FROM MY HEART (Duet Card)
  {
    photoId: 'ph-006',
    imagePath: '/images/our-story/memories/IMG-20201203-WA0015.jpg',
    category: 'Special memories',
    quoteId: 'mem-05',
    quoteText: 'Remembering those early video calls still brings a quiet smile to my face on cold winter nights.',
    caption: 'Our very first video call, December 2020.',
    date: '3 December 2020',
    section: '07-words-from-heart',
    priority: 1,
    textPlacement: 'overlay-safe-zone',
    rationale: 'The actual December 2020 video call screenshot paired with the exact reflection on those winter nights.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },

  // SECTION 12: THE FINAL MEMORY (Penultimate Signature Frame)
  {
    photoId: 'ph-004',
    imagePath: '/images/our-story/portraits/DSC_0111_1.JPG',
    category: 'Nasreen portraits',
    quoteId: 'for-02',
    quoteText: 'Some stories are not meant to end. They are meant to keep becoming more beautiful with each passing year.',
    caption: 'Nasreen, our sixth anniversary.',
    date: 'November 2026',
    section: '12-final-memory',
    priority: 1,
    textPlacement: 'below',
    rationale: 'The absolute pinnacle master portrait of Nasreen paired with the most dignified, timeless closing statement before the grand finale.',
    confidence: 5,
    reviewStatus: 'visually-verified',
  },
];

export function getPairingsBySection(section: SectionId): Pairing[] {
  return PHOTO_QUOTE_PAIRINGS.filter((p) => p.section === section).sort(
    (a, b) => a.priority - b.priority
  );
}
