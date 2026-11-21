'use client';

import React from 'react';

interface MonogramProps {
  size?: number;
  className?: string;
  drawAnimation?: boolean;
}

export const Monogram: React.FC<MonogramProps> = ({
  size = 48,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Filigree Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#kn-rg-gradient)"
          strokeWidth="1"
          strokeDasharray="4 2"
          className="opacity-70"
        />
        {/* Inner Solid Luxury Border */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#kn-rg-gradient)"
          strokeWidth="1.25"
        />

        {/* Monogram Typography: K & N */}
        {/* Letter K */}
        <text
          x="33"
          y="56"
          fontFamily="var(--font-cormorant), 'Playfair Display', Georgia, serif"
          fontSize="32"
          fontWeight="400"
          fill="url(#kn-gold-light)"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ letterSpacing: '0.02em' }}
        >
          K
        </text>

        {/* Delicate Connecting Ampersand / Rose Knot */}
        <path
          d="M 48 43 C 46 39, 42 39, 42 44 C 42 49, 50 55, 50 55 C 50 55, 58 49, 58 44 C 58 39, 54 39, 52 43 Z"
          fill="#B83250"
          className="opacity-85"
        />
        <circle
          cx="50"
          cy="58"
          r="1.5"
          fill="#C99A83"
        />

        {/* Letter N */}
        <text
          x="67"
          y="56"
          fontFamily="var(--font-cormorant), 'Playfair Display', Georgia, serif"
          fontSize="32"
          fontWeight="400"
          fill="url(#kn-gold-light)"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ letterSpacing: '0.02em' }}
        >
          N
        </text>

        {/* Gradients */}
        <defs>
          <linearGradient id="kn-rg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9F6" />
            <stop offset="50%" stopColor="#C99A83" />
            <stop offset="100%" stopColor="#E8BBC7" />
          </linearGradient>
          <linearGradient id="kn-gold-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFF9F6" />
            <stop offset="100%" stopColor="#EAD8CB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
