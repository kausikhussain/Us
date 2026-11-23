/**
 * Static Bundle Canary Scanner for K & N
 * Inspects all compiled production JS assets in .next/static to verify
 * that zero private letter text, surprise text, or legacy passcodes leaked into client bundles.
 */

const fs = require('fs');
const path = require('path');

const CANARY_PHRASES = [
  'Six years ago, on the twenty-third of November 2020',
  'When I look back across these six years',
  'If you are opening this letter, it means there is a little distance',
  'In a life full of rushing hours and fleeting noise',
  'my favourite peace',
  '23112020',
];

const STATIC_DIR = path.resolve(__dirname, '..', '.next', 'static');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (file.endsWith('.js')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function runCanaryScan() {
  console.log('--- STARTING STATIC BUNDLE CANARY SCAN ---');
  console.log(`Scanning target directory: ${STATIC_DIR}\n`);

  if (!fs.existsSync(STATIC_DIR)) {
    console.error('ERROR: .next/static directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  const jsFiles = getAllFiles(STATIC_DIR);
  console.log(`Found ${jsFiles.length} compiled client JavaScript bundle files.\n`);

  let totalLeaks = 0;

  for (const phrase of CANARY_PHRASES) {
    let matchedFiles = [];
    for (const filePath of jsFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.includes(phrase)) {
        matchedFiles.push(path.basename(filePath));
      }
    }

    if (matchedFiles.length > 0) {
      console.error(`[FAIL] Canary leak detected for: "${phrase}"`);
      console.error(`       Found in files: ${matchedFiles.join(', ')}`);
      totalLeaks += matchedFiles.length;
    } else {
      console.log(`[PASS] Zero matches for canary: "${phrase}"`);
    }
  }

  console.log('\n------------------------------------------');
  if (totalLeaks === 0) {
    console.log('✓ AUDIT RESULT: PASSED. Zero private strings or credentials detected in public client bundles.');
    process.exit(0);
  } else {
    console.error(`✗ AUDIT RESULT: FAILED. ${totalLeaks} leak(s) found in client bundles.`);
    process.exit(1);
  }
}

runCanaryScan();
