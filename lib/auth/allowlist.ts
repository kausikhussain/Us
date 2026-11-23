/**
 * Server-Side Authorized User Allowlist
 * Keyed by immutable User ID. Never ships to client JavaScript bundles.
 * Strict least-privilege: only explicitly provisioned identities can access the platform.
 */

import { AuthorizedUser } from './types';
import fs from 'fs';
import path from 'path';

// Memory cache + local file storage for durable local/serverless persistence
const ALLOWLIST_STORE_PATH = path.join(process.cwd(), '.system_generated', 'auth_allowlist.json');

// Initial baseline allowlist with immutable IDs
// NOTE: Actual owner & viewer emails are provisioned via server admin script / env variable.
// Zero made-up emails. Owner provisions real credentials via `PROVISIONING.md`.
const DEFAULT_ALLOWLIST: Record<string, AuthorizedUser> = {};

function ensureStorageDir() {
  const dir = path.dirname(ALLOWLIST_STORE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadAllowlist(): Record<string, AuthorizedUser> {
  // Check if AUTHORIZED_USERS_JSON env variable is provided (Vercel production secure override)
  if (process.env.AUTHORIZED_USERS_JSON) {
    try {
      const parsed = JSON.parse(process.env.AUTHORIZED_USERS_JSON);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed;
      }
    } catch {
      console.error('Failed to parse AUTHORIZED_USERS_JSON environment variable.');
    }
  }

  // Check persistent store on disk
  try {
    if (fs.existsSync(ALLOWLIST_STORE_PATH)) {
      const raw = fs.readFileSync(ALLOWLIST_STORE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // Return empty on read failure
  }

  return DEFAULT_ALLOWLIST;
}

function saveAllowlist(allowlist: Record<string, AuthorizedUser>) {
  try {
    ensureStorageDir();
    fs.writeFileSync(ALLOWLIST_STORE_PATH, JSON.stringify(allowlist, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save allowlist to disk:', err);
  }
}

export async function getUserById(userId: string): Promise<AuthorizedUser | null> {
  const allowlist = loadAllowlist();
  const user = allowlist[userId];
  if (!user || user.status !== 'active') return null;
  return user;
}

export async function getUserByEmail(email: string): Promise<AuthorizedUser | null> {
  if (!email) return null;
  const normalizedEmail = email.trim().toLowerCase();
  const allowlist = loadAllowlist();
  for (const user of Object.values(allowlist)) {
    if (user.email.toLowerCase() === normalizedEmail) {
      if (user.status !== 'active') return null;
      return user;
    }
  }
  return null;
}

export async function isUserAuthorized(userId: string): Promise<boolean> {
  const user = await getUserById(userId);
  return user !== null && user.status === 'active' && user.emailVerified;
}

export async function upsertUser(user: AuthorizedUser): Promise<void> {
  const allowlist = loadAllowlist();
  allowlist[user.userId] = user;
  saveAllowlist(allowlist);
}

export async function revokeUser(userId: string): Promise<void> {
  const allowlist = loadAllowlist();
  if (allowlist[userId]) {
    allowlist[userId].status = 'revoked';
    saveAllowlist(allowlist);
  }
}

export async function listAuthorizedUserIds(): Promise<string[]> {
  const allowlist = loadAllowlist();
  return Object.keys(allowlist).filter((uid) => allowlist[uid].status === 'active');
}

export function clearAllowlistForTesting() {
  try {
    if (fs.existsSync(ALLOWLIST_STORE_PATH)) {
      fs.unlinkSync(ALLOWLIST_STORE_PATH);
    }
  } catch {
    // Ignore cleanup error
  }
}

