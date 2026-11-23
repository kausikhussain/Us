/**
 * Comprehensive Automated Security Audit Test Suite for K & N
 *
 * Covers:
 * 1. Fail-closed unauthenticated access (401)
 * 2. Unauthenticated media access fails closed (401)
 * 3. Path traversal attack prevention (400/403)
 * 4. Primary factor authentication (AAL1 generation)
 * 5. Step-up enforcement: AAL1 denied access to private content/media (403)
 * 6. Multi-factor authentication via TOTP upgrading to AAL2
 * 7. Authorized AAL2 access to private content (200)
 * 8. HTTP Range streaming verification for media (206)
 * 9. Single-use recovery code burn logic
 * 10. Token tampering & forgery rejection (401)
 * 11. Instantaneous revocation enforcement (401)
 * 12. Rate limiter backoff on brute force (429)
 */

import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { upsertUser, revokeUser, getUserById, clearAllowlistForTesting } from '../lib/auth/allowlist';
import { generateTotpSetup, createTotpInstance } from '../lib/auth/totp';
import { generateRecoveryCodes } from '../lib/auth/recovery';
import { createSessionToken, verifySessionToken, SESSION_COOKIE_NAME } from '../lib/auth/session';
import { resetRateLimitsForTesting } from '../lib/auth/rate-limiter';
import { GET as getPrivateContent } from '../app/api/private/content/route';
import { GET as getMediaRoute } from '../app/api/media/[...path]/route';
import { POST as loginRoute } from '../app/api/auth/login/route';
import { POST as totpMfaRoute } from '../app/api/auth/mfa/totp/route';
import { POST as recoveryMfaRoute } from '../app/api/auth/mfa/recovery/route';
import { AuthorizedUser } from '../lib/auth/types';

interface TestResult {
  id: string;
  name: string;
  status: 'PASSED' | 'FAILED';
  evidence: string;
  error?: string;
}

const testResults: TestResult[] = [];

function record(id: string, name: string, status: 'PASSED' | 'FAILED', evidence: string, error?: string) {
  testResults.push({ id, name, status, evidence, error });
  const icon = status === 'PASSED' ? '✓' : '✗';
  console.log(`[${icon}] ${id}: ${name} -> ${status}`);
  if (evidence) console.log(`    Evidence: ${evidence}`);
  if (error) console.log(`    Error: ${error}`);
}

function attachCookie(req: NextRequest, token: string) {
  req.cookies.set(SESSION_COOKIE_NAME, token);
  req.cookies.set('kn_session', token);
  req.cookies.set('__Host-kn_session', token);
}

async function runTestSuite() {
  console.log('=================================================================');
  console.log('   STARTING K & N AUTOMATED APPLICATION SECURITY SUITE');
  console.log('=================================================================\n');

  // Clean test fixtures
  clearAllowlistForTesting();
  resetRateLimitsForTesting();

  // Setup synthetic test identities
  const testUserId = 'usr_synth_test_owner';
  const testEmail = 'synthetic.owner@test.internal';
  const testPassword = 'SyntheticHighEntropyPassword2026!';
  const passwordHash = crypto.createHash('sha256').update(testPassword.trim()).digest('hex');

  const totpSetup = await generateTotpSetup(testEmail);
  const recoverySetup = generateRecoveryCodes(8);

  const testUser: AuthorizedUser = {
    userId: testUserId,
    email: testEmail,
    role: 'owner',
    passwordHash,
    emailVerified: true,
    status: 'active',
    enrolledFactors: ['totp'],
    totpSecret: totpSetup.secret,
    webauthnCredentials: [],
    recoveryCodes: recoverySetup.hashedCodes,
    createdAt: Date.now(),
  };

  await upsertUser(testUser);

  // --------------------------------------------------------------------------
  // TEST 1: Unauthenticated request to /api/private/content fails closed (401)
  // --------------------------------------------------------------------------
  try {
    const req = new NextRequest('http://localhost:3000/api/private/content');
    const res = await getPrivateContent(req);
    if (res.status === 401) {
      record('SEC-T01', 'Unauthenticated request to /api/private/content fails closed', 'PASSED', 'HTTP status 401 Unauthorized received');
    } else {
      record('SEC-T01', 'Unauthenticated request to /api/private/content fails closed', 'FAILED', `Unexpected status: ${res.status}`);
    }
  } catch (err: any) {
    record('SEC-T01', 'Unauthenticated request to /api/private/content fails closed', 'FAILED', '', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 2: Unauthenticated request to /api/media/... fails closed (401)
  // --------------------------------------------------------------------------
  try {
    const req = new NextRequest('http://localhost:3000/api/media/audio/alfaaz.m4a');
    const res = await getMediaRoute(req, { params: { path: ['audio', 'alfaaz.m4a'] } });
    if (res.status === 401) {
      record('SEC-T02', 'Unauthenticated request to /api/media/audio/alfaaz.m4a fails closed', 'PASSED', 'HTTP status 401 Unauthorized received');
    } else {
      record('SEC-T02', 'Unauthenticated request to /api/media/audio/alfaaz.m4a fails closed', 'FAILED', `Unexpected status: ${res.status}`);
    }
  } catch (err: any) {
    record('SEC-T02', 'Unauthenticated request to /api/media/audio/alfaaz.m4a fails closed', 'FAILED', '', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 3: Directory Traversal attempts are rejected (400 or 403)
  // --------------------------------------------------------------------------
  try {
    const aal2Token = await createSessionToken({
      userId: testUserId,
      email: testEmail,
      role: 'owner',
      aal: 'aal2',
    });
    const req = new NextRequest('http://localhost:3000/api/media/..%2f..%2fpackage.json');
    attachCookie(req, aal2Token);

    const res = await getMediaRoute(req, { params: { path: ['..', '..', 'package.json'] } });
    if (res.status === 400 || res.status === 403 || res.status === 404) {
      record('SEC-T03', 'Path traversal attempt (../..) is rejected', 'PASSED', `Status ${res.status} returned; forbidden access prevented`);
    } else {
      record('SEC-T03', 'Path traversal attempt (../..) is rejected', 'FAILED', `Vulnerable: status ${res.status}`);
    }
  } catch (err: any) {
    record('SEC-T03', 'Path traversal attempt is rejected', 'FAILED', '', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 4: Primary factor login produces temporary AAL1 token
  // --------------------------------------------------------------------------
  let aal1SessionCookie = '';
  try {
    const loginReq = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: testEmail, password: testPassword }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await loginRoute(loginReq);
    const body = await res.json();
    const setCookie = res.headers.get('set-cookie') || '';
    const match = setCookie.match(/kn_session=([^;]+)/) || setCookie.match(/__Host-kn_session=([^;]+)/);
    if (res.status === 200 && body.mfaRequired === true && match) {
      aal1SessionCookie = match[1];
      const verified = await verifySessionToken(aal1SessionCookie);
      if (verified && verified.payload?.aal === 'aal1') {
        record('SEC-T04', 'Primary factor authentication succeeds and issues AAL1 token', 'PASSED', `Token verified with claim aal=aal1, userId=${verified.payload?.sub}`);
      } else {
        record('SEC-T04', 'Primary factor authentication succeeds and issues AAL1 token', 'FAILED', 'Token verification failed or aal was not aal1');
      }
    } else {
      record('SEC-T04', 'Primary factor authentication succeeds and issues AAL1 token', 'FAILED', `Status: ${res.status}, body: ${JSON.stringify(body)}`);
    }
  } catch (err: any) {
    record('SEC-T04', 'Primary factor authentication succeeds and issues AAL1 token', 'FAILED', '', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 5: AAL1 token is strictly DENIED access to private content (403 Step-Up Required)
  // --------------------------------------------------------------------------
  try {
    const req = new NextRequest('http://localhost:3000/api/private/content');
    attachCookie(req, aal1SessionCookie);
    const res = await getPrivateContent(req);
    if (res.status === 403) {
      record('SEC-T05', 'AAL1 token denied access to private content (Step-Up Required)', 'PASSED', 'HTTP 403 Forbidden received. Step-up AAL2 strictly enforced');
    } else {
      record('SEC-T05', 'AAL1 token denied access to private content (Step-Up Required)', 'FAILED', `Expected 403, received ${res.status}`);
    }
  } catch (err: any) {
    record('SEC-T05', 'AAL1 token denied access to private content', 'FAILED', '', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 6: TOTP Multi-factor verification upgrades session to AAL2
  // --------------------------------------------------------------------------
  let aal2SessionCookie = '';
  try {
    const totp = createTotpInstance(totpSetup.secret, testEmail);
    const currentCode = totp.generate();

    const mfaReq = new NextRequest('http://localhost:3000/api/auth/mfa/totp', {
      method: 'POST',
      body: JSON.stringify({ code: currentCode }),
      headers: { 'Content-Type': 'application/json' },
    });
    attachCookie(mfaReq, aal1SessionCookie);

    const res = await totpMfaRoute(mfaReq);
    const body = await res.json();
    const setCookie = res.headers.get('set-cookie') || '';
    const match = setCookie.match(/kn_session=([^;]+)/) || setCookie.match(/__Host-kn_session=([^;]+)/);

    if (res.status === 200 && body.success === true && match) {
      aal2SessionCookie = match[1];
      const verified = await verifySessionToken(aal2SessionCookie);
      if (verified && verified.payload?.aal === 'aal2') {
        record('SEC-T06', 'TOTP MFA verification upgrades session to AAL2', 'PASSED', `Token upgraded with claim aal=aal2`);
      } else {
        record('SEC-T06', 'TOTP MFA verification upgrades session to AAL2', 'FAILED', 'Token missing aal2 claim');
      }
    } else {
      record('SEC-T06', 'TOTP MFA verification upgrades session to AAL2', 'FAILED', `Status: ${res.status}, body: ${JSON.stringify(body)}`);
    }
  } catch (err: any) {
    record('SEC-T06', 'TOTP MFA verification upgrades session to AAL2', 'FAILED', '', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 7: AAL2 session receives decrypted private content (200)
  // --------------------------------------------------------------------------
  try {
    const req = new NextRequest('http://localhost:3000/api/private/content');
    attachCookie(req, aal2SessionCookie);
    const res = await getPrivateContent(req);
    const body = await res.json();
    const data = body.content || body;

    if (res.status === 200 && data.letters && data.letters.length === 3 && data.surprise) {
      record('SEC-T07', 'AAL2 authenticated session accesses private content successfully', 'PASSED', `Received ${data.letters.length} letters, surprise payload and quotes`);
    } else {
      record('SEC-T07', 'AAL2 authenticated session accesses private content successfully', 'FAILED', `Status: ${res.status}, body: ${JSON.stringify(body)}`);
    }
  } catch (err: any) {
    record('SEC-T07', 'AAL2 authenticated session accesses private content', 'FAILED', '', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 8: Authenticated HTTP Range streaming for master audio tracks (206)
  // --------------------------------------------------------------------------
  try {
    const req = new NextRequest('http://localhost:3000/api/media/audio/alfaaz.m4a', {
      headers: { Range: 'bytes=0-1023' },
    });
    attachCookie(req, aal2SessionCookie);
    const res = await getMediaRoute(req, { params: { path: ['audio', 'alfaaz.m4a'] } });

    const contentRange = res.headers.get('content-range');
    const acceptRanges = res.headers.get('accept-ranges');
    if (res.status === 206 && acceptRanges === 'bytes' && contentRange && contentRange.startsWith('bytes 0-1023/')) {
      record('SEC-T08', 'HTTP Range streaming returns 206 Partial Content with Content-Range', 'PASSED', `Status 206, Content-Range: ${contentRange}`);
    } else {
      record('SEC-T08', 'HTTP Range streaming returns 206 Partial Content', 'FAILED', `Status: ${res.status}, range: ${contentRange}`);
    }
  } catch (err: any) {
    record('SEC-T08', 'HTTP Range streaming returns 206 Partial Content', 'FAILED', '', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 9: Single-use recovery code redemption & burn logic
  // --------------------------------------------------------------------------
  try {
    const recoveryCodeToUse = recoverySetup.plaintextCodes[0];

    // Issue a fresh AAL1 token
    const freshAal1 = await createSessionToken({
      userId: testUserId,
      email: testEmail,
      role: 'owner',
      aal: 'aal1',
    });

    const req1 = new NextRequest('http://localhost:3000/api/auth/mfa/recovery', {
      method: 'POST',
      body: JSON.stringify({ recoveryCode: recoveryCodeToUse }),
      headers: { 'Content-Type': 'application/json' },
    });
    attachCookie(req1, freshAal1);

    const res1 = await recoveryMfaRoute(req1);
    const body1 = await res1.json();

    // Now attempt to reuse the exact same code
    const freshAal1ForReuse = await createSessionToken({
      userId: testUserId,
      email: testEmail,
      role: 'owner',
      aal: 'aal1',
    });

    const req2 = new NextRequest('http://localhost:3000/api/auth/mfa/recovery', {
      method: 'POST',
      body: JSON.stringify({ recoveryCode: recoveryCodeToUse }),
      headers: { 'Content-Type': 'application/json' },
    });
    attachCookie(req2, freshAal1ForReuse);

    const res2 = await recoveryMfaRoute(req2);

    if (res1.status === 200 && body1.success === true && res2.status === 401) {
      record('SEC-T09', 'Single-use recovery code burns after first use; replay fails', 'PASSED', 'First attempt succeeded (200), replay attempt rejected (401)');
    } else {
      record('SEC-T09', 'Single-use recovery code burns after first use; replay fails', 'FAILED', `Res1: ${res1.status}, Res2: ${res2.status}`);
    }
  } catch (err: any) {
    record('SEC-T09', 'Single-use recovery code burns after first use', 'FAILED', '', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 10: Forged / Tampered token signature fails verification (401)
  // --------------------------------------------------------------------------
  try {
    const parts = aal2SessionCookie.split('.');
    const tamperedToken = `${parts[0]}.${parts[1]}.tamperedSignatureHere12345`;

    const req = new NextRequest('http://localhost:3000/api/private/content');
    attachCookie(req, tamperedToken);
    const res = await getPrivateContent(req);

    if (res.status === 401) {
      record('SEC-T10', 'Tampered JWT signature fails cryptographic verification (401)', 'PASSED', 'HTTP 401 received. HMAC-SHA256 signature mismatch prevented forgery');
    } else {
      record('SEC-T10', 'Tampered JWT signature fails cryptographic verification', 'FAILED', `Expected 401, got ${res.status}`);
    }
  } catch (err: any) {
    record('SEC-T10', 'Tampered JWT signature fails cryptographic verification', 'FAILED', '', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 11: Instantaneous user revocation invalidates active session (401)
  // --------------------------------------------------------------------------
  try {
    await revokeUser(testUserId);

    const req = new NextRequest('http://localhost:3000/api/private/content');
    attachCookie(req, aal2SessionCookie);
    const res = await getPrivateContent(req);

    if (res.status === 401) {
      record('SEC-T11', 'Revoked user session is immediately rejected (401)', 'PASSED', 'HTTP 401 received. Revocation verified across allowlist');
    } else {
      record('SEC-T11', 'Revoked user session is immediately rejected', 'FAILED', `Expected 401, got ${res.status}`);
    }
  } catch (err: any) {
    record('SEC-T11', 'Revoked user session is immediately rejected', 'FAILED', '', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 12: Rate limiter triggers HTTP 429 on brute force attempts
  // --------------------------------------------------------------------------
  try {
    resetRateLimitsForTesting();
    let hitRateLimit = false;

    // Simulate rapid failed login attempts with wrong password
    for (let i = 0; i < 7; i++) {
      const bruteReq = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'attacker@evil.com', password: 'wrongpassword' }),
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '198.51.100.42' },
      });
      const res = await loginRoute(bruteReq);
      if (res.status === 429) {
        hitRateLimit = true;
        break;
      }
    }

    if (hitRateLimit) {
      record('SEC-T12', 'Rate limiter triggers HTTP 429 on brute force attempts', 'PASSED', 'HTTP 429 Too Many Requests triggered after repeated failures');
    } else {
      record('SEC-T12', 'Rate limiter triggers HTTP 429 on brute force attempts', 'FAILED', 'Rate limiter failed to trigger 429 within threshold');
    }
  } catch (err: any) {
    record('SEC-T12', 'Rate limiter triggers HTTP 429 on brute force attempts', 'FAILED', '', err.message);
  }

  console.log('\n=================================================================');
  console.log(`TEST SUMMARY: ${testResults.filter(t => t.status === 'PASSED').length}/${testResults.length} PASSED`);
  console.log('=================================================================\n');

  return testResults;
}

if (require.main === module) {
  runTestSuite()
    .then((results) => {
      const allPassed = results.every(r => r.status === 'PASSED');
      process.exit(allPassed ? 0 : 1);
    })
    .catch((err) => {
      console.error('Fatal test runner error:', err);
      process.exit(1);
    });
}

export { runTestSuite };
