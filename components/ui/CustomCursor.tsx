'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'read' | 'play' | 'view' | 'unlock'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Determine state by target element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor]');
      if (interactive) {
        const type = interactive.getAttribute('data-cursor') as 'read' | 'play' | 'view' | 'unlock' | null;
        setCursorState(type || 'hover');
      } else if (target.closest('button, a, input')) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  const isExpanded = cursorState !== 'default';

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Central Precision Rose-Gold Dot */}
      <motion.div
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
          scale: isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.08, ease: 'linear' }}
        className="w-1.5 h-1.5 bg-rosegold-400 rounded-full"
      />

      {/* Trailing Lagging Halo */}
      <motion.div
        animate={{
          x: mousePos.x - (isExpanded ? 36 : 16),
          y: mousePos.y - (isExpanded ? 36 : 16),
          width: isExpanded ? 72 : 32,
          height: isExpanded ? 72 : 32,
          borderColor: cursorState === 'read' ? '#B83250' : '#C99A83',
          backgroundColor: isExpanded ? 'rgba(86, 27, 49, 0.45)' : 'rgba(201, 154, 131, 0.08)',
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-full border backdrop-blur-[2px] flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-ivory-50 font-serif"
      >
        {isExpanded && cursorState !== 'hover' && (
          <span className="capitalize">{cursorState}</span>
        )}
      </motion.div>
    </div>
  );
};
