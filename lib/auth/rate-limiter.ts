/**
 * Durable Server-Side Rate Limiter & Abuse Defense
 * Protects against credential stuffing, brute force, and automated attacks.
 * Tracks attempts by IP address and by user identifier.
 */

import fs from 'fs';
import path from 'path';

interface RateLimitRecord {
  attempts: number;
  firstAttemptAt: number;
  lockedUntil?: number;
}

const RATE_LIMIT_STORE_PATH = path.join(process.cwd(), '.system_generated', 'rate_limits.json');

// Memory cache
let inMemoryStore: Record<string, RateLimitRecord> = {};

function loadStore(): Record<string, RateLimitRecord> {
  try {
    if (fs.existsSync(RATE_LIMIT_STORE_PATH)) {
      const raw = fs.readFileSync(RATE_LIMIT_STORE_PATH, 'utf-8');
      inMemoryStore = JSON.parse(raw);
    }
  } catch {
    // Keep inMemoryStore
  }
  return inMemoryStore;
}

function saveStore() {
  try {
    const dir = path.dirname(RATE_LIMIT_STORE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(RATE_LIMIT_STORE_PATH, JSON.stringify(inMemoryStore), 'utf-8');
  } catch {
    // Ignore write errors in restricted serverless contexts
  }
}

/**
 * Evaluates rate limit for a key (e.g. `login:ip:1.2.3.4` or `mfa:uid:usr_123`)
 * Window: windowMs (e.g. 15 minutes)
 * Max Attempts: maxAttempts (e.g. 5)
 * Lockout Duration: lockoutMs (e.g. 15 minutes)
 */
export function checkRateLimit(
  key: string,
  options: { maxAttempts: number; windowMs: number; lockoutMs: number }
): { allowed: boolean; remainingAttempts: number; retryAfterSeconds?: number } {
  const store = loadStore();
  const now = Date.now();
  const record = store[key];

  if (!record) {
    return { allowed: true, remainingAttempts: options.maxAttempts };
  }

  // Check if currently locked out
  if (record.lockedUntil && now < record.lockedUntil) {
    const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  // Check if window expired
  if (now - record.firstAttemptAt > options.windowMs) {
    delete store[key];
    saveStore();
    return { allowed: true, remainingAttempts: options.maxAttempts };
  }

  const remaining = Math.max(0, options.maxAttempts - record.attempts);
  if (record.attempts >= options.maxAttempts) {
    record.lockedUntil = now + options.lockoutMs;
    saveStore();
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds: Math.ceil(options.lockoutMs / 1000) };
  }

  return { allowed: true, remainingAttempts: remaining };
}

/**
 * Records an attempt (failed authentication, MFA attempt, etc.)
 */
export function recordAttempt(
  key: string,
  options: { maxAttempts: number; windowMs: number; lockoutMs: number }
) {
  const store = loadStore();
  const now = Date.now();
  const record = store[key] || { attempts: 0, firstAttemptAt: now };

  if (now - record.firstAttemptAt > options.windowMs) {
    record.attempts = 1;
    record.firstAttemptAt = now;
    delete record.lockedUntil;
  } else {
    record.attempts += 1;
  }

  if (record.attempts >= options.maxAttempts) {
    record.lockedUntil = now + options.lockoutMs;
  }

  store[key] = record;
  saveStore();
}

/**
 * Resets rate limit for a key upon successful authentication
 */
export function resetRateLimit(key: string) {
  const store = loadStore();
  if (store[key]) {
    delete store[key];
    saveStore();
  }
}

export function resetRateLimitsForTesting() {
  inMemoryStore = {};
  try {
    if (fs.existsSync(RATE_LIMIT_STORE_PATH)) {
      fs.unlinkSync(RATE_LIMIT_STORE_PATH);
    }
  } catch {
    // Ignore cleanup error
  }
}

