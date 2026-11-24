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

// Provisioned baseline allowlist
const DEFAULT_ALLOWLIST: Record<string, AuthorizedUser> = {
  usr_kausik_owner: {
    userId: 'usr_kausik_owner',
    role: 'owner',
    email: 'kausikhussain@gmail.com',
    emailVerified: true,
    status: 'active',
    passwordHash: 'c2fe65c5326cf6c93490347d51cbdf5395485a031888799c86943bc7589bd355',
    enrolledFactors: ['totp'],
    totpSecret: 'TSGI6GMKDCLF7JKTZXD7RV7NMYDIJGW3',
    webauthnCredentials: [],
    recoveryCodes: [
      { hash: 'ada18bce9dc0eb34e7fcdc5266b22e2891a4225a32762e7f4a31f3e774f3952d', used: false },
      { hash: '8ae4878190c8a4414b1b2ddd59fbc707494896dc61daad2b3d97b6c05eb7accb', used: false },
      { hash: 'fd7d8803037140951164df875368b42f2782a01638236bef45b2b42a9692b9d3', used: false },
      { hash: '3450a81ffe72ecc5555b34b690cecfc0a3d5cb62c9b7c9fe674fc822f495c765', used: false },
      { hash: '665cb7191edf29b697843aace07c9d3f937040334a0337ef3b37a7f1442b0ac6', used: false },
      { hash: '5017ce5ef5cba3ade3dfb00cd9306e1b07420381a710dce0769dd2d7c04585b8', used: false },
      { hash: '9c308781155847128f0cd9588cbbfbc1760c8ef6ed1c6b602eabea39143d18ed', used: false },
      { hash: '35725ad215299489bfdf97679f190fdbdc69aef6697c57fe12aad42ea2dee13f', used: false },
    ],
    createdAt: 1795502640620,
  },
};

function ensureStorageDir() {
  const dir = path.dirname(ALLOWLIST_STORE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadAllowlist(): Record<string, AuthorizedUser> {
  const merged: Record<string, AuthorizedUser> = { ...DEFAULT_ALLOWLIST };

  // Check persistent store on disk
  try {
    if (fs.existsSync(ALLOWLIST_STORE_PATH)) {
      const raw = fs.readFileSync(ALLOWLIST_STORE_PATH, 'utf-8');
      const diskUsers = JSON.parse(raw);
      if (typeof diskUsers === 'object' && diskUsers !== null) {
        Object.assign(merged, diskUsers);
      }
    }
  } catch {
    // Keep baseline on disk read failure
  }

  // Check if AUTHORIZED_USERS_JSON env variable is provided (Vercel production secure override)
  if (process.env.AUTHORIZED_USERS_JSON) {
    try {
      const parsed = JSON.parse(process.env.AUTHORIZED_USERS_JSON);
      if (typeof parsed === 'object' && parsed !== null) {
        Object.assign(merged, parsed);
      }
    } catch {
      console.error('Failed to parse AUTHORIZED_USERS_JSON environment variable.');
    }
  }

  return merged;
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
