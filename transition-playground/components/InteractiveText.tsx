'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface InteractiveTextProps {
  onTransitionStart: () => void;
  transitionPhase?: 'idle' | 'entering' | 'separating' | 'revealing' | 'complete';
}

export const InteractiveText = ({ 
  onTransitionStart, 
  transitionPhase = 'idle' 
}: InteractiveTextProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (transitionPhase === 'complete') return null;

  return (
    <motion.button
      className="fixed z-[1100] cursor-pointer"
      style={{
        top: '44%',
        left: '45%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-lcd), "LCD Solid", "VT323", monospace',
        fontSize: 'clamp(1.2rem, 2.2vw, 2.0rem)',
        fontWeight: 'normal',
        color: '#00ff00',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0.5rem 1rem',
        textShadow: `
          0 0 5px #00ff00,
          0 0 10px #00ff00,
          0 0 15px rgba(0, 255, 0, 0.5)
        `,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: '1.2',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: transitionPhase === 'idle' ? 1 : 0,
        y: transitionPhase === 'idle' ? 0 : 20
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ 
        scale: 1.05,
        textShadow: `
          0 0 10px #00ff00,
          0 0 20px #00ff00,
          0 0 30px rgba(0, 255, 0, 0.8)
        `
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onTransitionStart}
    >
      {/* Pulsing animation for visibility */}
      <motion.span
        animate={{
          opacity: [1, 0.7, 1],
          scale: [1, 1.02, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut'
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span>Network</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          City
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
            >
              →
            </motion.span>
          )}
        </span>
      </motion.span>
    </motion.button>
  );
};

