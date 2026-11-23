'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monogram } from './Monogram';
import { Lock, KeyRound, ShieldCheck, ArrowRight, Sparkles, Heart, Smartphone, Key } from 'lucide-react';
import { startAuthentication } from '@simplewebauthn/browser';

interface MfaLoginGateProps {
  children: React.ReactNode;
  initialAuthenticated?: boolean;
}

export const MfaLoginGate: React.FC<MfaLoginGateProps> = ({
  children,
  initialAuthenticated = false,
}) => {
  const [unlocked, setUnlocked] = useState(initialAuthenticated);
  const [step, setStep] = useState<'credentials' | 'mfa' | 'recovery'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessRevealing, setIsSuccessRevealing] = useState(false);
  const [hasWebAuthn, setHasWebAuthn] = useState(false);

  // Check server session on mount if initial check was false
  useEffect(() => {
    if (!initialAuthenticated) {
      fetch('/api/auth/session')
        .then((res) => res.json())
        .then((data) => {
          if (data?.authenticated && data?.aal === 'aal2') {
            setUnlocked(true);
          }
        })
        .catch(() => {});
    }
  }, [initialAuthenticated]);

  // Listen for lock/logout event from Navigation or Finale Scene
  useEffect(() => {
    const handleLock = () => {
      setUnlocked(false);
      setStep('credentials');
      setPassword('');
      setMfaCode('');
      setRecoveryCode('');
      setErrorMsg('');
    };

    window.addEventListener('kn:lock', handleLock);
    return () => window.removeEventListener('kn:lock', handleLock);
  }, []);

  // Step 1: Submit Primary Factor (Email + Password)
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.mfaRequired) {
        setHasWebAuthn(!!data.hasWebAuthn);
        setStep('mfa');
      } else {
        setErrorMsg(data.error || 'Invalid credentials or account not authorized.');
      }
    } catch {
      setErrorMsg('Invalid credentials or account not authorized.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2A: Verify TOTP Authenticator Code
  const handleTotpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaCode.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/mfa/totp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: mfaCode.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        triggerSuccessReveal();
      } else {
        setErrorMsg(data.error || 'Invalid verification code. Try once more.');
      }
    } catch {
      setErrorMsg('Invalid verification code. Try once more.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2B: WebAuthn Passkey Verification
  const handleWebAuthnLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      const optRes = await fetch('/api/auth/mfa/webauthn/options');
      const options = await optRes.json();

      if (!optRes.ok) {
        throw new Error(options.error || 'Failed to start passkey authentication');
      }

      const assertion = await startAuthentication(options);

      const verifyRes = await fetch('/api/auth/mfa/webauthn/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assertion),
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok && verifyData.success) {
        triggerSuccessReveal();
      } else {
        setErrorMsg(verifyData.error || 'Passkey verification failed.');
      }
    } catch (err: unknown) {
      const error = err as Error;
      if (error?.name !== 'NotAllowedError') {
        setErrorMsg('Passkey verification cancelled or not supported.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2C: Single-Use Recovery Code Verification
  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryCode.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/mfa/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recoveryCode: recoveryCode.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        triggerSuccessReveal();
      } else {
        setErrorMsg(data.error || 'Invalid or already used recovery code.');
      }
    } catch {
      setErrorMsg('Invalid or already used recovery code.');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerSuccessReveal = () => {
    setIsSuccessRevealing(true);
    setTimeout(() => {
      setUnlocked(true);
      setIsSuccessRevealing(false);
    }, 1800);
  };

  if (unlocked && !isSuccessRevealing) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-wine-950 flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Ambient Candlelight and Deep Wine Backdrop Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-burgundy-900/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-crimson-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rosegold-400/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Rose Petal Particle Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: '15%', y: '18%', scale: 0.8, delay: 0, duration: 9 },
          { x: '82%', y: '25%', scale: 1.1, delay: 1.5, duration: 11 },
          { x: '24%', y: '78%', scale: 0.9, delay: 2.2, duration: 10 },
          { x: '75%', y: '82%', scale: 0.7, delay: 0.8, duration: 12 },
          { x: '50%', y: '12%', scale: 1.0, delay: 3.1, duration: 8.5 },
          { x: '10%', y: '50%', scale: 0.6, delay: 1.0, duration: 13 },
        ].map((petal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: [0.15, 0.45, 0.15],
              y: [-15, 15, -15],
              rotate: [0, 45, -20, 0],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: petal.delay,
            }}
            style={{ left: petal.x, top: petal.y }}
            className="absolute w-5 h-7 rounded-[50%_50%_50%_0%] bg-gradient-to-br from-crimson-600/40 via-burgundy-700/30 to-blush-200/20 blur-[0.5px]"
          />
        ))}
      </div>

      {/* Glassmorphism Luxury Stationery Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg bg-gradient-to-b from-wine-950/90 via-burgundy-990/90 to-wine-990/95 backdrop-blur-2xl border border-rosegold-400/40 rounded-3xl p-8 sm:p-12 shadow-luxury-lg text-center overflow-hidden"
      >
        <div className="absolute inset-0 rounded-3xl border border-rosegold-400/15 pointer-events-none" />

        <AnimatePresence mode="wait">
          {isSuccessRevealing ? (
            /* Success Transition */
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="py-10 flex flex-col items-center justify-center space-y-5"
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <Monogram size={72} />
                <div className="absolute inset-0 rounded-full bg-crimson-600/30 blur-xl pointer-events-none" />
              </motion.div>

              <div className="space-y-2 mt-4">
                <span className="text-[11px] uppercase tracking-[0.3em] text-rosegold-300 block font-sans">
                  Identity Verified · MFA Confirmed
                </span>
                <h3 className="font-serif italic text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-ivory-50 via-blush-200 to-rosegold-300 font-light">
                  Welcome to Our Little World.
                </h3>
              </div>

              <div className="flex items-center space-x-2 text-rosegold-400/80 text-xs tracking-[0.25em] uppercase pt-3">
                <Sparkles size={14} className="animate-spin text-rosegold-300" style={{ animationDuration: '6s' }} />
                <span>Loading memories securely...</span>
              </div>
            </motion.div>
          ) : step === 'credentials' ? (
            /* Primary Factor Login View */
            <motion.div
              key="credentials-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4">
                <Monogram size={56} />
              </div>

              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-ivory-50 uppercase font-light">
                K & N
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-ivory-50 tracking-[0.04em] mt-5 font-normal">
                A Private World of Ours
              </h2>

              <p className="font-serif italic text-sm sm:text-base text-blush-200/85 max-w-sm mt-3 leading-relaxed">
                &ldquo;Some memories are meant to be shared only with the ones who know their story.&rdquo;
              </p>

              <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-rosegold-300/90 mt-6">
                Invitation-Only Access · Identity Verification
              </p>

              <form onSubmit={handleCredentialsSubmit} className="w-full mt-7 space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Your invited email address"
                  disabled={isLoading}
                  autoComplete="username"
                  required
                  className="w-full py-3.5 px-5 rounded-2xl bg-wine-950/90 border border-rosegold-400/40 text-ivory-50 text-center tracking-[0.1em] text-sm font-sans focus:outline-none focus:border-rosegold-400 focus:ring-2 focus:ring-rosegold-400/30 transition-all placeholder:text-ivory-50/30"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Your private password"
                  disabled={isLoading}
                  autoComplete="current-password"
                  required
                  className="w-full py-3.5 px-5 rounded-2xl bg-wine-950/90 border border-rosegold-400/40 text-ivory-50 text-center tracking-[0.15em] text-sm font-sans focus:outline-none focus:border-rosegold-400 focus:ring-2 focus:ring-rosegold-400/30 transition-all placeholder:text-ivory-50/30"
                />

                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="text-xs text-rose-300 bg-crimson-600/20 border border-crimson-600/40 py-2.5 px-4 rounded-xl font-sans tracking-[0.05em]"
                    >
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-crimson-600 via-rose-700 to-burgundy-900 hover:from-crimson-500 hover:to-rose-800 text-ivory-50 text-xs uppercase tracking-[0.28em] font-sans transition-all duration-300 shadow-crimson-glow flex items-center justify-center space-x-2.5 group cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Verifying Identity...</span>
                  ) : (
                    <>
                      <span>Continue to Factor 2</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-rosegold-300" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : step === 'mfa' ? (
            /* Multi-Factor Authentication View (WebAuthn / TOTP) */
            <motion.div
              key="mfa-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full border border-rosegold-400/50 flex items-center justify-center text-rosegold-300 mb-3 bg-burgundy-900/40">
                <ShieldCheck size={26} />
              </div>

              <span className="text-[11px] uppercase tracking-[0.25em] text-rosegold-300 font-sans">
                Security Assurance · Step 2 of 2
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl text-ivory-50 tracking-[0.04em] mt-3 font-normal">
                Confirm Your Presence
              </h2>

              <p className="font-sans text-xs text-blush-200/80 max-w-xs mt-2 leading-relaxed">
                Enter the 6-digit verification code from your authenticator app.
              </p>

              <form onSubmit={handleTotpSubmit} className="w-full mt-6 space-y-4">
                <input
                  type="text"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => {
                    setMfaCode(e.target.value.replace(/\D/g, ''));
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="000000"
                  disabled={isLoading}
                  autoComplete="one-time-code"
                  autoFocus
                  className="w-full py-4 px-6 rounded-2xl bg-wine-950/90 border border-rosegold-400/40 text-ivory-50 text-center tracking-[0.5em] text-xl font-mono focus:outline-none focus:border-rosegold-400 focus:ring-2 focus:ring-rosegold-400/30 transition-all placeholder:text-ivory-50/30"
                />

                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="text-xs text-rose-300 bg-crimson-600/20 border border-crimson-600/40 py-2.5 px-4 rounded-xl font-sans tracking-[0.05em]"
                    >
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoading || mfaCode.length !== 6}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-crimson-600 via-rose-700 to-burgundy-900 hover:from-crimson-500 hover:to-rose-800 text-ivory-50 text-xs uppercase tracking-[0.28em] font-sans transition-all duration-300 shadow-crimson-glow flex items-center justify-center space-x-2.5 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? <span>Verifying...</span> : <span>Unlock Memories</span>}
                </button>

                {hasWebAuthn && (
                  <button
                    type="button"
                    onClick={handleWebAuthnLogin}
                    disabled={isLoading}
                    className="w-full py-3 px-6 rounded-xl border border-rosegold-400/40 hover:bg-wine-900/60 text-rosegold-300 text-xs uppercase tracking-[0.2em] font-sans flex items-center justify-center space-x-2 transition-all mt-2"
                  >
                    <Key size={14} />
                    <span>Use Passkey / Touch ID</span>
                  </button>
                )}

                <div className="pt-3 flex justify-between text-[11px] text-ivory-50/50">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('recovery');
                      setErrorMsg('');
                    }}
                    className="hover:text-rosegold-300 transition-colors"
                  >
                    Use recovery code
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('credentials');
                      setErrorMsg('');
                    }}
                    className="hover:text-rosegold-300 transition-colors"
                  >
                    ← Back
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            /* Single-Use Recovery Code View */
            <motion.div
              key="recovery-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full border border-rosegold-400/50 flex items-center justify-center text-rosegold-300 mb-3 bg-burgundy-900/40">
                <Key size={24} />
              </div>

              <h2 className="font-serif text-2xl text-ivory-50 tracking-[0.04em] mt-2 font-normal">
                Account Recovery
              </h2>

              <p className="font-sans text-xs text-blush-200/80 max-w-xs mt-2 leading-relaxed">
                Enter one of your single-use recovery codes in format XXXX-XXXX-XXXX.
              </p>

              <form onSubmit={handleRecoverySubmit} className="w-full mt-6 space-y-4">
                <input
                  type="text"
                  value={recoveryCode}
                  onChange={(e) => {
                    setRecoveryCode(e.target.value.toUpperCase());
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="XXXX-XXXX-XXXX"
                  disabled={isLoading}
                  autoFocus
                  className="w-full py-3.5 px-5 rounded-2xl bg-wine-950/90 border border-rosegold-400/40 text-ivory-50 text-center tracking-[0.25em] text-sm font-mono focus:outline-none focus:border-rosegold-400 focus:ring-2 focus:ring-rosegold-400/30 transition-all placeholder:text-ivory-50/30"
                />

                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="text-xs text-rose-300 bg-crimson-600/20 border border-crimson-600/40 py-2.5 px-4 rounded-xl font-sans tracking-[0.05em]"
                    >
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoading || !recoveryCode.trim()}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-crimson-600 via-rose-700 to-burgundy-900 hover:from-crimson-500 hover:to-rose-800 text-ivory-50 text-xs uppercase tracking-[0.28em] font-sans transition-all duration-300 shadow-crimson-glow flex items-center justify-center space-x-2.5 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? <span>Verifying Code...</span> : <span>Redeem & Access</span>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('mfa');
                    setErrorMsg('');
                  }}
                  className="text-[11px] text-ivory-50/50 hover:text-rosegold-300 transition-colors pt-2 block mx-auto"
                >
                  ← Back to Authenticator
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
