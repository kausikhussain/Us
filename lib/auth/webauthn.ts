/**
 * WebAuthn / Passkey Relying Party Engine
 * Using @simplewebauthn/server for strict FIDO2 WebAuthn authentication
 */

import {
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
  GenerateAuthenticationOptionsOpts,
  VerifiedAuthenticationResponse,
} from '@simplewebauthn/server';
import { WebAuthnCredentialData } from './types';

export function getExpectedRPID(reqHost?: string): string {
  if (reqHost) {
    return reqHost.split(':')[0];
  }
  return process.env.WEBAUTHN_RPID || 'localhost';
}

export function getExpectedOrigin(reqHost?: string): string {
  if (process.env.WEBAUTHN_ORIGIN) {
    return process.env.WEBAUTHN_ORIGIN;
  }
  if (reqHost) {
    const proto = reqHost.includes('localhost') ? 'http' : 'https';
    return `${proto}://${reqHost}`;
  }
  return 'http://localhost:3000';
}

/**
 * Generates cryptographic assertion options for passkey authentication
 */
export async function generatePasskeyAuthOptions(params: {
  allowCredentials?: WebAuthnCredentialData[];
  reqHost?: string;
}) {
  const rpID = getExpectedRPID(params.reqHost);

  const opts: GenerateAuthenticationOptionsOpts = {
    rpID,
    timeout: 60000,
    userVerification: 'preferred',
  };

  if (params.allowCredentials && params.allowCredentials.length > 0) {
    opts.allowCredentials = params.allowCredentials.map((c) => ({
      id: c.id,
      transports: c.transports as any,
    }));
  }

  return generateAuthenticationOptions(opts);
}

export async function createWebAuthnAuthOptions(params: {
  credentials?: WebAuthnCredentialData[];
  reqHost?: string;
}) {
  return generatePasskeyAuthOptions({
    allowCredentials: params.credentials,
    reqHost: params.reqHost,
  });
}

/**
 * Cryptographically verifies WebAuthn authentication response
 */
export async function verifyPasskeyAuthResponse(params: {
  response: any;
  expectedChallenge: string;
  credential: WebAuthnCredentialData;
  reqHost?: string;
}): Promise<VerifiedAuthenticationResponse> {
  const rpID = getExpectedRPID(params.reqHost);
  const origin = getExpectedOrigin(params.reqHost);

  return verifyAuthenticationResponse({
    response: params.response,
    expectedChallenge: params.expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
    authenticator: {
      credentialID: params.credential.id,
      credentialPublicKey: Buffer.from(params.credential.publicKey, 'base64url'),
      counter: params.credential.counter,
      transports: params.credential.transports as any,
    },
  });
}

export const verifyWebAuthnAuth = verifyPasskeyAuthResponse;
