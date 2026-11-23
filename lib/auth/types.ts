export type UserRole = 'owner' | 'viewer';
export type UserStatus = 'active' | 'revoked' | 'disabled';
export type MfaFactorType = 'webauthn' | 'totp';
export type AuthAssuranceLevel = 'aal1' | 'aal2';

export interface WebAuthnCredentialData {
  id: string; // base64url encoded credential ID
  publicKey: string; // base64url encoded public key
  counter: number;
  transports?: string[];
  createdAt: number;
  deviceName?: string;
}

export interface HashedRecoveryCode {
  hash: string;
  used: boolean;
  usedAt?: number;
}

export interface AuthorizedUser {
  userId: string; // Immutable identifier, e.g. usr_kausik_admin
  role: UserRole;
  email: string;
  emailVerified: boolean;
  status: UserStatus;
  passwordHash?: string; // Scrypt or Argon2-compatible hash for primary factor
  enrolledFactors: MfaFactorType[];
  totpSecret?: string; // Encrypted or base32 secret
  webauthnCredentials: WebAuthnCredentialData[];
  recoveryCodes: HashedRecoveryCode[];
  createdAt: number;
  lastLoginAt?: number;
}

export interface SessionTokenPayload {
  sub: string; // userId
  email: string;
  role: UserRole;
  aal: AuthAssuranceLevel;
  amr: string[]; // authentication methods references, e.g. ['password', 'webauthn']
  jti: string; // Unique token ID for revocation
  idleExp: number; // Idle timeout timestamp in ms
}

export interface AuthAuditEntry {
  timestamp: string;
  event:
    | 'LOGIN_ATTEMPT'
    | 'LOGIN_SUCCESS'
    | 'LOGIN_FAILURE'
    | 'MFA_CHALLENGE'
    | 'MFA_VERIFIED'
    | 'MFA_FAILED'
    | 'RECOVERY_CODE_USED'
    | 'SESSION_REVOKED'
    | 'RATE_LIMIT_EXCEEDED'
    | 'ACCESS_DENIED'
    | 'ACCESS_GRANTED';
  userId?: string;
  ipHash: string;
  reason?: string;
}
