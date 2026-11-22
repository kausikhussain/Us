import {
  normalizePasscode,
  validatePasscode,
  generateSessionToken,
  verifySessionToken,
  DEFAULT_ACCESS_CODE,
} from '../lib/auth';
import { SONGS_DATA } from '../content/songs';
import fs from 'fs';
import path from 'path';

async function runAuthTests() {
  console.log('--- STARTING AUTH & PASSCODE GATE UNIT TESTS ---');

  // Test 1: Passcode normalization
  console.log('Test 1: Testing normalization of various anniversary date formats...');
  const formats = [
    '23112020',
    '23-11-2020',
    '23/11/2020',
    '23 / 11 / 2020',
    '23.11.2020',
    ' 23-11-2020 ',
    '23 11 2020',
  ];

  for (const fmt of formats) {
    const normalized = normalizePasscode(fmt);
    if (normalized !== '23112020') {
      throw new Error(`Failed to normalize "${fmt}": expected "23112020", got "${normalized}"`);
    }
  }
  console.log('✓ All 7 date formats normalized to "23112020" successfully.');

  // Test 2: Passcode validation
  console.log('Test 2: Testing passcode acceptance & rejection...');
  for (const fmt of formats) {
    if (!validatePasscode(fmt)) {
      throw new Error(`Expected validatePasscode("${fmt}") to be true, got false`);
    }
  }

  const invalidInputs = [
    '12345678',
    '24-11-2020',
    '23/11/2021',
    'kauseen',
    'random',
    '',
    '   ',
  ];
  for (const invalid of invalidInputs) {
    if (validatePasscode(invalid)) {
      throw new Error(`Expected validatePasscode("${invalid}") to be false, got true`);
    }
  }
  console.log('✓ Valid dates accepted and invalid dates rejected successfully.');

  // Test 3: Session Token Signing & Verification
  console.log('Test 3: Testing HMAC-SHA256 session token generation & verification...');
  const token = await generateSessionToken();
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    throw new Error(`Generated invalid session token format: ${token}`);
  }

  const isValid = await verifySessionToken(token);
  if (!isValid) {
    throw new Error('Freshly generated session token failed verification!');
  }

  // Tampered token test
  const tamperedToken = token.slice(0, -4) + 'abcd';
  const isTamperedValid = await verifySessionToken(tamperedToken);
  if (isTamperedValid) {
    throw new Error('Tampered session token unexpectedly passed verification!');
  }

  // Expired timestamp test
  const expiredTimestamp = Date.now() - 10000;
  const expiredToken = `${expiredTimestamp}.fakesignature`;
  const isExpiredValid = await verifySessionToken(expiredToken);
  if (isExpiredValid) {
    throw new Error('Expired session token unexpectedly passed verification!');
  }

  // Null/empty test
  if (await verifySessionToken(null) || await verifySessionToken('')) {
    throw new Error('Null or empty token unexpectedly passed verification!');
  }
  console.log('✓ HMAC session tokens signed and verified with cryptographic integrity.');

  // Test 4: Audio track parity check
  console.log('Test 4: Verifying audio tracks and files...');
  if (SONGS_DATA.length !== 2) {
    throw new Error(`Expected exactly 2 songs, found ${SONGS_DATA.length}`);
  }
  if (SONGS_DATA[0].title !== 'Alfaaz' || SONGS_DATA[0].audioPath !== '/audio/alfaaz.m4a') {
    throw new Error(`Song 1 must be Alfaaz (/audio/alfaaz.m4a), got: ${JSON.stringify(SONGS_DATA[0])}`);
  }
  if (SONGS_DATA[1].title !== 'Dilruba Dilnasee' || SONGS_DATA[1].audioPath !== '/audio/dilruba-dilnasee.mp3') {
    throw new Error(`Song 2 must be Dilruba Dilnasee (/audio/dilruba-dilnasee.mp3), got: ${JSON.stringify(SONGS_DATA[1])}`);
  }

  for (const song of SONGS_DATA) {
    const filePath = path.join(process.cwd(), 'public', song.audioPath.replace(/^\//, ''));
    if (!fs.existsSync(filePath)) {
      throw new Error(`Audio file missing on disk: ${filePath}`);
    }
    const stat = fs.statSync(filePath);
    if (stat.size < 6000000) {
      throw new Error(`Audio file ${song.audioPath} unexpectedly small: ${stat.size} bytes`);
    }
  }
  console.log('✓ Audio tracks verified: Track 1 "Alfaaz" and Track 2 "Dilruba Dilnasee".');

  console.log('--- ALL AUTH & AUDIO UNIT TESTS PASSED ---');
}

runAuthTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
