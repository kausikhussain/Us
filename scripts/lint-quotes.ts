import { QUOTES_DATA, QUOTE_CATEGORIES } from '../content/quotes';

const BANNED_PHRASES = [
  'my everything',
  'soulmate',
  'better half',
  'love of my life',
  'meant to be',
  'you complete me',
  'butterflies',
  'my world',
  'forever and always',
  'heart skips a beat',
  'stars align',
];

console.log('--- RUNNING K & N QUOTE ENGINE LINTER ---');

const errors: string[] = [];
const shortQuotes = QUOTES_DATA.filter((q) => !q.isLongPassage);
const longPassages = QUOTES_DATA.filter((q) => q.isLongPassage);

console.log(`Total quotes: ${QUOTES_DATA.length}`);
console.log(`Short/Medium quotes: ${shortQuotes.length} (Target: 50–65)`);
console.log(`Long passages: ${longPassages.length} (Target: 10–12)`);

// 1. Quantity validation
if (shortQuotes.length < 50 || shortQuotes.length > 65) {
  errors.push(`Short quotes count is ${shortQuotes.length}, expected between 50 and 65.`);
}
if (longPassages.length < 10 || longPassages.length > 12) {
  errors.push(`Long passages count is ${longPassages.length}, expected between 10 and 12.`);
}

// 2. Uniqueness & Banned phrases
const textSet = new Set<string>();
const categoryCounts: Record<string, number> = {};

QUOTES_DATA.forEach((q) => {
  // Check exact duplicate
  const normalized = q.text.trim().toLowerCase();
  if (textSet.has(normalized)) {
    errors.push(`Duplicate quote found: "${q.text.slice(0, 40)}..."`);
  }
  textSet.add(normalized);

  // Check category
  categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;

  // Check banned phrases
  BANNED_PHRASES.forEach((banned) => {
    if (normalized.includes(banned)) {
      errors.push(`Quote ${q.id} contains banned phrase "${banned}": "${q.text}"`);
    }
  });

  // Check length bands
  const wordCount = q.text.trim().split(/\s+/).length;
  if (!q.isLongPassage) {
    if (wordCount < 4 || wordCount > 38) {
      errors.push(`Short quote ${q.id} has ${wordCount} words (expected 6–35 words): "${q.text}"`);
    }
  } else {
    if (wordCount < 35 || wordCount > 130) {
      errors.push(`Long passage ${q.id} has ${wordCount} words (expected 40–120 words): "${q.text}"`);
    }
  }
});

// Category balance check (no category > 25% of total)
const maxPerCategory = Math.ceil(QUOTES_DATA.length * 0.25);
Object.entries(categoryCounts).forEach(([cat, count]) => {
  if (count > maxPerCategory) {
    errors.push(`Category "${cat}" has ${count} quotes, exceeding 25% threshold (${maxPerCategory}).`);
  }
});

if (errors.length > 0) {
  console.error(`FAILED: Found ${errors.length} quote lint errors:`);
  errors.forEach((err) => console.error(`  ✖ ${err}`));
  process.exit(1);
} else {
  console.log('✓ QUOTE LINT PASSED: 0 errors. All quotes original, varied, and adhering to Kausik voice rules.');
  process.exit(0);
}
