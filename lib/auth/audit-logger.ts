/**
 * Structured Security Audit Logger
 * Records security-critical events (logins, MFA attempts, revocations, rate limits)
 * Zero secrets, tokens, passwords, or personal letter texts are ever logged.
 */

import { AuthAuditEntry } from './types';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const AUDIT_LOG_PATH = path.join(process.cwd(), '.system_generated', 'security_audit.log');

export function hashIp(ip: string): string {
  if (!ip) return 'unknown';
  return crypto.createHash('sha256').update(ip + '-salt-kn-2026').digest('hex').slice(0, 12);
}

export function logSecurityEvent(entry: Omit<AuthAuditEntry, 'timestamp'>) {
  const fullEntry: AuthAuditEntry = {
    timestamp: new Date().toISOString(),
    ...entry,
  };

  const logLine = JSON.stringify(fullEntry);

  // In production / local dev: write to console for Vercel logging and local file
  console.info(`[SECURITY_AUDIT] ${fullEntry.event} ${fullEntry.ipHash} ${fullEntry.userId || 'anon'}`);

  try {
    const dir = path.dirname(AUDIT_LOG_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(AUDIT_LOG_PATH, logLine + '\n', 'utf-8');
  } catch {
    // In read-only serverless runtimes, console.info captures the structured log
  }
}
