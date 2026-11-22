import fs from 'fs';
import path from 'path';

const FORBIDDEN_PATTERNS = [
  { pattern: /\bKAUSEEN\b/i, name: 'KAUSEEN remnant' },
  { pattern: /\bS\s*&\s*K\b/i, name: 'S & K remnant' },
  { pattern: /\bK\s*&\s*S\b/i, name: 'K & S remnant' },
  { pattern: /\bS&K\b/i, name: 'S&K remnant' },
  { pattern: /\bK&S\b/i, name: 'K&S remnant' },
];

const IGNORE_DIRS = ['node_modules', '.next', '.git', 'tests/screenshots'];

function scanDirectory(dir: string, errors: string[]) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');

    if (IGNORE_DIRS.some((ignored) => relPath.startsWith(ignored))) {
      continue;
    }

    if (entry.isDirectory()) {
      scanDirectory(fullPath, errors);
    } else if (entry.isFile()) {
      // Only scan code, content, and markup files
      if (/\.(tsx?|jsx?|json|css|html|md)$/i.test(entry.name)) {
        // Skip this lint script itself from self-matching
        if (relPath.includes('lint-identity.ts')) continue;

        const content = fs.readFileSync(fullPath, 'utf-8');
        FORBIDDEN_PATTERNS.forEach(({ pattern, name }) => {
          const lines = content.split('\n');
          lines.forEach((line, idx) => {
            if (pattern.test(line)) {
              errors.push(`${relPath}:${idx + 1} - Found forbidden ${name}: "${line.trim()}"`);
            }
          });
        });
      }
    }
  }
}

const errors: string[] = [];
console.log('--- RUNNING K & N IDENTITY LINT ---');
scanDirectory(process.cwd(), errors);

if (errors.length > 0) {
  console.error(`FAILED: Found ${errors.length} identity violations:`);
  errors.forEach((err) => console.error(`  ✖ ${err}`));
  process.exit(1);
} else {
  console.log('✓ IDENTITY LINT PASSED: 0 forbidden remnants. 100% clean K & N / Kausik & Nasreen.');
  process.exit(0);
}
