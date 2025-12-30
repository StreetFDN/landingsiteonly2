'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

interface CockpitLayerProps {
  transitionPhase?: 'idle' | 'entering' | 'separating' | 'revealing' | 'complete';
  transitionProgress?: number; // 0 to 1, for smooth animation
  zoomTargetX?: number; // Percentage (0-100) for horizontal zoom target position
  zoomTargetY?: number; // Percentage (0-100) for vertical zoom target position
  finalTranslateX?: number; // Final X translation in pixels (for fine-tuning position)
  finalTranslateY?: number; // Final Y translation in pixels (for fine-tuning position)
  zoomAmount?: number; // Final scale multiplier (e.g., 5.0 = 5x zoom)
  cockpitImagePath?: string;
}

/**
 * Cockpit image overlay with zoom transition
 * Zooms into a specific target position (e.g., button/screen position)
 */
export const CockpitLayer = ({ 
  transitionPhase = 'idle',
  transitionProgress = 0,
  zoomTargetX = 45, // Default: button horizontal position
  zoomTargetY = 44, // Default: button vertical position
  finalTranslateX = -650, // Final X position adjustment (in pixels)
  finalTranslateY = -340, // Final Y position adjustment (in pixels)
  zoomAmount = 9.9, // Final zoom scale
  cockpitImagePath = '/images/cockpit-image.png'
}: CockpitLayerProps) => {
  const [imageUrl, setImageUrl] = useState(cockpitImagePath);
  
  useEffect(() => {
    setImageUrl(`${cockpitImagePath}?v=${Date.now()}`);
  }, [cockpitImagePath]);

  const actualZoomTargetX = zoomTargetX ?? 45;
  const actualZoomTargetY = zoomTargetY ?? 44;
  const actualFinalTranslateX = finalTranslateX ?? 0;
  const actualFinalTranslateY = finalTranslateY ?? 0;
  const actualZoomAmount = zoomAmount ?? 5.0;
  
  const animationValues = useMemo(() => {
    const progress = Math.max(0, Math.min(1, transitionProgress));
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    const easedProgress = easeInOutCubic(progress);
    const scale = 1 + (easedProgress * (actualZoomAmount - 1));
    const translateX = easedProgress * actualFinalTranslateX;
    const translateY = easedProgress * actualFinalTranslateY;
    return { scale, translateX, translateY, opacity: 1 };
  }, [transitionProgress, actualFinalTranslateX, actualFinalTranslateY, actualZoomAmount]);

  const transformOrigin = useMemo(() => {
    const clampedX = Math.max(0, Math.min(100, actualZoomTargetX));
    const clampedY = Math.max(0, Math.min(100, actualZoomTargetY));
    return `${clampedX}% ${clampedY}%`;
  }, [actualZoomTargetX, actualZoomTargetY]);

  return (
    <motion.div 
      className="fixed inset-0 z-[1000] pointer-events-none"
      style={{
        transformOrigin: transformOrigin,
        perspective: '1000px',
      }}
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{ 
        opacity: animationValues.opacity,
        scale: animationValues.scale,
        x: animationValues.translateX,
        y: animationValues.translateY,
      }}
      transition={{ duration: 0 }}
    >
      <img 
        src={imageUrl}
        alt="Cockpit"
        className="w-full h-full object-cover"
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
          transform: 'translateZ(0)',
        }}
      />
    </motion.div>
  );
};

