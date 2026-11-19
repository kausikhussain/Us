import { getCounterState, computeCalendarDifference, START_DATE_ISO, ANNIVERSARY_DATE_ISO } from '../lib/time';
import { SITE_CONFIG } from '../content/site';
import { TIMELINE_DATA } from '../content/timeline';
import { GALLERY_COMPOSITIONS } from '../content/gallery';
import { LETTERS_DATA } from '../content/letters';
import { SONGS_DATA } from '../content/songs';
import { SURPRISE_DATA } from '../content/surprise';
import { QUOTES_DATA } from '../content/quotes';

console.log('--- STARTING UNIT TESTS FOR KAUSEEN ---');

// Test 1: Content Schemas
console.log('Testing content data integrity...');
if (!SITE_CONFIG.brandName || SITE_CONFIG.brandName !== 'KAUSEEN') {
  throw new Error('SITE_CONFIG.brandName must be KAUSEEN');
}
if (TIMELINE_DATA.length !== 7) {
  throw new Error(`Expected 7 timeline milestones (2020-2026), got ${TIMELINE_DATA.length}`);
}
if (LETTERS_DATA.length < 2) {
  throw new Error(`Expected at least 2 letters, got ${LETTERS_DATA.length}`);
}
if (SONGS_DATA.length !== 2) {
  throw new Error(`Expected 2 songs (Alfaaz & Dilruba Dilnasee), got ${SONGS_DATA.length}`);
}
if (GALLERY_COMPOSITIONS.length !== 5) {
  throw new Error(`Expected 5 gallery compositions, got ${GALLERY_COMPOSITIONS.length}`);
}
console.log('✓ All content schemas validated successfully.');

// Test 2: Calendar Math & Leap Year 2024
console.log('Testing leap year 2024 calculation...');
const start = new Date('2024-02-28T00:00:00+05:30');
const end = new Date('2024-03-01T00:00:00+05:30');
const leapDiff = computeCalendarDifference(start, end);
if (leapDiff.days !== 2) {
  throw new Error(`Expected 2 days across leap day (Feb 28 to Mar 1 in 2024), got ${leapDiff.days}`);
}
console.log('✓ Leap year 2024 handling verified.');

// Test 3: Exact 6-Year Mark
console.log('Testing 6-year exact anniversary milestone (2020-11-23 to 2026-11-23)...');
const startAnniv = new Date(START_DATE_ISO);
const endAnniv = new Date(ANNIVERSARY_DATE_ISO);
const annivDiff = computeCalendarDifference(startAnniv, endAnniv);
if (annivDiff.years !== 6 || annivDiff.months !== 0 || annivDiff.days !== 0) {
  throw new Error(`Expected exactly 6 years, 0 months, 0 days, got ${annivDiff.years}y ${annivDiff.months}m ${annivDiff.days}d`);
}
console.log('✓ Exact 6-year milestone verified: 6 years, 0 months, 0 days, total days =', annivDiff.totalDays);

// Test 4: Counter States (Before, Anniversary Day, After)
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
