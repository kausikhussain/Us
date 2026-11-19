import React from 'react';
import Link from 'next/link';
import { Monogram } from '@/components/ui/Monogram';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-wine-950 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-full max-w-md bg-wine-990/90 border border-rosegold-400/40 rounded-3xl p-10 shadow-luxury-lg">
        <Monogram size={56} />
        <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.1em] text-ivory-50 uppercase mt-6">
          Lost in Time
        </h2>
        <p className="font-serif italic text-base text-blush-200 mt-3">
          &ldquo;Some paths lead nowhere, but every road in our hearts leads back to you.&rdquo;
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-7 py-3 rounded-full bg-crimson-600 hover:bg-crimson-700 text-ivory-50 text-xs uppercase tracking-[0.25em] transition-all shadow-crimson-glow"
        >
          Return to Our Story
        </Link>
      </div>
    </div>
  );
}
