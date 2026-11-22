import fs from 'fs';
import path from 'path';
import { getCounterState, computeCalendarDifference, START_DATE_ISO, ANNIVERSARY_DATE_ISO } from '../lib/time';
import { SITE_CONFIG } from '../content/site';
import { TIMELINE_DATA } from '../content/timeline';
import { LETTERS_DATA } from '../content/letters';
import { SONGS_DATA } from '../content/songs';
import { SURPRISE_DATA } from '../content/surprise';
import { QUOTES_DATA, QUOTE_CATEGORIES, getRandomQuote, getQuotesByCategory } from '../content/quotes';
import { PHOTO_QUOTE_PAIRINGS } from '../content/photo-quote-pairings';

console.log('--- STARTING UNIT TESTS FOR K & N ---');

// Test 1: Content Schemas & K & N Brand Identity
console.log('Testing content data integrity & K & N brand...');
if (!SITE_CONFIG.brandName || SITE_CONFIG.brandName !== 'K & N') {
  throw new Error(`SITE_CONFIG.brandName must be 'K & N', got: ${SITE_CONFIG.brandName}`);
}
if (SITE_CONFIG.partnerOne !== 'K' || SITE_CONFIG.partnerTwo !== 'N') {
  throw new Error(`Expected partnerOne 'K' and partnerTwo 'N', got: ${SITE_CONFIG.partnerOne}, ${SITE_CONFIG.partnerTwo}`);
}
if (TIMELINE_DATA.length !== 7) {
  throw new Error(`Expected 7 timeline milestones (2020-2026), got ${TIMELINE_DATA.length}`);
}
if (LETTERS_DATA.length !== 3) {
  throw new Error(`Expected exactly 3 keepsake letters, got ${LETTERS_DATA.length}`);
}
if (LETTERS_DATA[2].sealType !== 'ribbon') {
  throw new Error(`Expected Letter 03 to have sealType 'ribbon', got ${LETTERS_DATA[2].sealType}`);
}
if (SONGS_DATA.length !== 2) {
  throw new Error(`Expected 2 songs (Alfaaz & Dilruba Dilnasee), got ${SONGS_DATA.length}`);
}
for (const song of SONGS_DATA) {
  const filePath = path.join(process.cwd(), 'public', song.audioPath.replace(/^\//, ''));
  if (!fs.existsSync(filePath)) {
    throw new Error(`Audio file for song ${song.title} not found at ${filePath}`);
  }
}
console.log('✓ Both actual audio files verified on disk (Alfaaz & Dilruba Dilnasee).');

if (QUOTE_CATEGORIES.length !== 10) {
  throw new Error(`Expected 10 quote categories, got ${QUOTE_CATEGORIES.length}`);
}
if (QUOTES_DATA.length !== 67) {
  throw new Error(`Expected 67 curated quotes, got ${QUOTES_DATA.length}`);
}

const randomQ = getRandomQuote();
if (!randomQ || !randomQ.text) {
  throw new Error('getRandomQuote() failed to return a valid quote item');
}

const sixYearsQuotes = getQuotesByCategory('Six years');
if (sixYearsQuotes.length === 0) {
  throw new Error("getQuotesByCategory('Six years') returned 0 items");
}

console.log(`✓ All content schemas validated successfully. Found ${QUOTES_DATA.length} quotes across ${QUOTE_CATEGORIES.length} categories.`);

// Test 2: Photo-Quote Pairings Validation
console.log('Testing photo-quote pairings integrity...');
if (PHOTO_QUOTE_PAIRINGS.length !== 19) {
  throw new Error(`Expected 19 photo-quote pairings, got ${PHOTO_QUOTE_PAIRINGS.length}`);
}

const quoteIds = new Set(QUOTES_DATA.map((q) => q.id));
for (const pairing of PHOTO_QUOTE_PAIRINGS) {
  if (!quoteIds.has(pairing.quoteId)) {
    throw new Error(`Pairing references unknown quoteId: ${pairing.quoteId}`);
  }
  const imgPath = path.join(process.cwd(), 'public', pairing.imagePath.replace(/^\//, ''));
  if (!fs.existsSync(imgPath)) {
    throw new Error(`Paired image file not found on disk: ${imgPath}`);
  }
  if (!['beside', 'below', 'overlay-safe-zone'].includes(pairing.textPlacement)) {
    throw new Error(`Invalid textPlacement in pairing: ${pairing.textPlacement}`);
  }
  if (pairing.confidence !== 5) {
    throw new Error(`Pairing confidence must be 5, got: ${pairing.confidence}`);
  }
}
console.log('✓ All 19 photo-quote pairings verified with valid files, safe zones, and 5/5 confidence.');

// Test 3: Calendar Math & Leap Year 2024
console.log('Testing leap year 2024 calculation...');
const start = new Date('2024-02-28T00:00:00+05:30');
const end = new Date('2024-03-01T00:00:00+05:30');
const leapDiff = computeCalendarDifference(start, end);
if (leapDiff.days !== 2) {
  throw new Error(`Expected 2 days across leap day (Feb 28 to Mar 1 in 2024), got ${leapDiff.days}`);
}
console.log('✓ Leap year 2024 handling verified.');

// Test 4: Exact 6-Year Mark
console.log('Testing 6-year exact anniversary milestone (2020-11-23 to 2026-11-23)...');
const startAnniv = new Date(START_DATE_ISO);
const endAnniv = new Date(ANNIVERSARY_DATE_ISO);
const annivDiff = computeCalendarDifference(startAnniv, endAnniv);
if (annivDiff.years !== 6 || annivDiff.months !== 0 || annivDiff.days !== 0) {
  throw new Error(`Expected exactly 6 years, 0 months, 0 days, got ${annivDiff.years}y ${annivDiff.months}m ${annivDiff.days}d`);
}
if (annivDiff.totalDays !== 2191) {
  throw new Error(`Expected exactly 2191 total days, got ${annivDiff.totalDays}`);
}
console.log('✓ Exact 6-year milestone verified: 6 years, 0 months, 0 days, total days =', annivDiff.totalDays);

// Test 5: Counter States (Before, Anniversary Day, After)
console.log('Testing counter states...');
const beforeDate = new Date('2026-11-20T10:00:00+05:30');
const stateBefore = getCounterState(beforeDate);
if (stateBefore.mode !== 'before') {
  throw new Error(`Expected mode 'before', got ${stateBefore.mode}`);
}

const onDate = new Date('2026-11-23T14:00:00+05:30');
const stateOn = getCounterState(onDate);
if (stateOn.mode !== 'anniversary') {
  throw new Error(`Expected mode 'anniversary', got ${stateOn.mode}`);
}

const afterDate = new Date('2026-12-01T10:00:00+05:30');
const stateAfter = getCounterState(afterDate);
if (stateAfter.mode !== 'after') {
  throw new Error(`Expected mode 'after', got ${stateAfter.mode}`);
}
console.log('✓ All 3 counter states verified (before, anniversary, after).');

console.log('--- ALL UNIT TESTS PASSED WITH 100% SUCCESS ---');
