'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MonogramProps {
  size?: number;
  className?: string;
  drawAnimation?: boolean;
}

export const Monogram: React.FC<MonogramProps> = ({
  size = 48,
  className = '',
  drawAnimation = false,
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
        {/* Outer Fine Rose-Gold Filigree Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#rg-gradient)"
          strokeWidth="1"
          strokeDasharray="4 2"
          className="opacity-70"
        />
        {/* Inner Solid Luxury Border */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#rg-gradient)"
          strokeWidth="1.25"
        />

        {/* Monogram Typography K · S */}
        <text
          x="35"
          y="56"
          fontFamily="var(--font-cormorant), 'Playfair Display', serif"
          fontSize="30"
          fontWeight="300"
          fill="url(#gold-light)"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ letterSpacing: '0.05em' }}
        >
          K
        </text>

        {/* Central Interlocking Rose Petal / Heart Accent */}
        <path
          d="M 50 44 C 48 40, 44 40, 44 45 C 44 50, 50 56, 50 56 C 50 56, 56 50, 56 45 C 56 40, 52 40, 50 44 Z"
          fill="#B83250"
          className="opacity-80"
        />

        <text
          x="65"
          y="56"
          fontFamily="var(--font-cormorant), 'Playfair Display', serif"
          fontSize="30"
          fontWeight="300"
          fill="url(#gold-light)"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ letterSpacing: '0.05em' }}
        >
          S
        </text>

        {/* Gradients */}
        <defs>
          <linearGradient id="rg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9F6" />
            <stop offset="50%" stopColor="#C99A83" />
            <stop offset="100%" stopColor="#E8BBC7" />
          </linearGradient>
          <linearGradient id="gold-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#EAD8CB" />
            <stop offset="100%" stopColor="#C99A83" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
