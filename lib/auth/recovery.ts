/**
 * High-Entropy Single-Use Recovery Codes
 * Stored exclusively as SHA-256 hashes. Burned on use.
 */

import crypto from 'crypto';
import { HashedRecoveryCode } from './types';

export function hashRecoveryCode(code: string): string {
  const clean = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  return crypto.createHash('sha256').update(clean).digest('hex');
}

/**
 * Generates 10 single-use recovery codes in format `XXXX-XXXX-XXXX`
 */
export function generateRecoveryCodes(count = 8): {
  plaintextCodes: string[];
  hashedCodes: HashedRecoveryCode[];
} {
  const plaintextCodes: string[] = [];
  const hashedCodes: HashedRecoveryCode[] = [];

  for (let i = 0; i < count; i++) {
    const raw = crypto.randomBytes(6).toString('hex').toUpperCase();
    const formatted = `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
    plaintextCodes.push(formatted);
    hashedCodes.push({
      hash: hashRecoveryCode(formatted),
      used: false,
    });
  }

  return { plaintextCodes, hashedCodes };
}

/**
 * Verifies and redeems a single-use recovery code.
 * If valid, marks the code as used immediately.
 */
export function redeemRecoveryCode(
  inputCode: string,
  storedCodes: HashedRecoveryCode[]
): { valid: boolean; updatedCodes: HashedRecoveryCode[] } {
  const inputHash = hashRecoveryCode(inputCode);

  let matched = false;
  const updatedCodes = storedCodes.map((item) => {
    if (!matched && !item.used && item.hash === inputHash) {
      matched = true;
      return {
        ...item,
        used: true,
        usedAt: Date.now(),
      };
    }
    return item;
  });

  return { valid: matched, updatedCodes };
}
