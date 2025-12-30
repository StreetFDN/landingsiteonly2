
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CockpitLayer } from '@/transition-playground/components/CockpitLayer';
import { InteractiveText } from '@/transition-playground/components/InteractiveText';
import { BackgroundCloudAnimation, CloudConfig } from '@/transition-playground/components/BackgroundCloudAnimation';

type TransitionPhase = 'idle' | 'entering' | 'separating' | 'revealing' | 'complete';
type TimeMode = 'day' | 'night';
const getTimeModeFromCurrentTime = (): TimeMode => {
  const hours = new Date().getHours();
  return hours >= 6 && hours < 19 ? 'day' : 'night';
};

export default function CockpitTestPage() {
  const router = useRouter();
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>('idle');
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [timeMode, setTimeMode] = useState<TimeMode>(() => getTimeModeFromCurrentTime());
  const [fadeProgress, setFadeProgress] = useState(0);
  const [cockpitVisible, setCockpitVisible] = useState(false);
  const [keepFadeVisible, setKeepFadeVisible] = useState(false);
  
  // Show cockpit instantly (no fade)
  useEffect(() => {
    setCockpitVisible(true);
  }, []);
  
  // Zoom configuration - set to undefined to use CockpitLayer defaults
  const zoomTargetX: number | undefined = undefined;
  const zoomTargetY: number | undefined = undefined;
  const finalTranslateX: number | undefined = undefined;
  const finalTranslateY: number | undefined = undefined;
  const zoomAmount: number | undefined = undefined;
  
  // Animation durations
  const transitionDuration = 1500;
  const fadeToCityDuration = 600;
  const fadeOverlayDelay = 300; // Extra time to keep fade overlay visible (covers city page initial load)
  
  // Sky colors matching Network City
  const DAY_BG_COLOR = '#d5a7b4'; // Daytime sky color (pinkish)
  const NIGHT_BG_COLOR = '#43526f'; // Nighttime sky color (dark blue-gray)
  const targetSkyColor = timeMode === 'day' ? DAY_BG_COLOR : NIGHT_BG_COLOR;
  const blankColor = '#0e1422';

  useEffect(() => {
    setTimeMode(getTimeModeFromCurrentTime());
    const interval = setInterval(() => {
      const newMode = getTimeModeFromCurrentTime();
      setTimeMode((currentMode) => newMode !== currentMode ? newMode : currentMode);
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Cloud configuration
  const cloudSpeed = 0.25;
  const spawnDistance = -10;
  const recycleDistance = 5;
  const cloudConfig: CloudConfig = {
    cloud1: { 
      size: 0.04,
      forwardSpeed: 1.0,
      verticalOffset: 0.8,
      xScatterRange: 3,
      zScatterRange: 5,
      count: 40,
    },
    cloud2: { 
      size: 0.05,
      forwardSpeed: 1.0,
      verticalOffset: 0.7,
      xScatterRange: 3,
      zScatterRange: 7,
      count: 40,
    },
    cloud3: { 
      size: 0.04,
      forwardSpeed: 1.0,
      verticalOffset: 0.6,
      xScatterRange: 3,
      zScatterRange: 6,
      count: 35,
    },
    cloud4: { 
      size: 0.05,
      forwardSpeed: 1.0,
      verticalOffset: 0.5,
      xScatterRange: 3,
      zScatterRange: 6,
      count: 40,
    },
  };

  const handleTransitionStart = () => {
    setTransitionPhase('entering');
    setTransitionProgress(0);
    setFadeProgress(0);
    
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / transitionDuration);
      setTransitionProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTransitionPhase('complete');
        setTransitionProgress(1);
        
        const fadeStartTime = Date.now();
        const fadeAnimate = () => {
          const fadeElapsed = Date.now() - fadeStartTime;
          const fadeProgressValue = Math.min(1, fadeElapsed / fadeToCityDuration);
          setFadeProgress(fadeProgressValue);
          
          if (fadeProgressValue < 1) {
            requestAnimationFrame(fadeAnimate);
          } else {
            // Keep fade overlay visible during navigation
            setKeepFadeVisible(true);
            
            // Store sky color in sessionStorage for city page to use immediately
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('transitionSkyColor', targetSkyColor);
            }
            
            // Prefetch the city page to reduce load time
            router.prefetch('/city');
            
            // Longer delay to ensure overlay stays visible during navigation
            setTimeout(() => {
              router.push('/city');
              // Keep overlay visible for additional time after navigation starts
              setTimeout(() => {
                setKeepFadeVisible(false);
              }, 1000);
            }, fadeOverlayDelay);
          }
        };
        
        requestAnimationFrame(fadeAnimate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const fadeColor = useMemo(() => {
    if (fadeProgress === 0) return blankColor;
    if (fadeProgress === 1) return targetSkyColor;
    
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };
    
    const rgb1 = hexToRgb(blankColor);
    const rgb2 = hexToRgb(targetSkyColor);
    
    if (!rgb1 || !rgb2) return blankColor;
    
    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * fadeProgress);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * fadeProgress);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * fadeProgress);
    
    return `rgb(${r}, ${g}, ${b})`;
  }, [fadeProgress, targetSkyColor, blankColor]);

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      {/* Navbar with Street Logo - matching Network City page exactly, in front of cockpit */}
      {/* Logo stays locked in place and disappears when zoom transition starts */}
      {transitionPhase === 'idle' && (
        <nav className="fixed top-0 left-0 right-0 z-[1010] py-6 transition-all bg-transparent pointer-events-none">
          <div className="max-w-[1100px] mx-auto px-8 flex justify-between items-center pointer-events-auto">
            {/* Logo - exact same as Network City page */}
            <div className="flex items-center gap-3">
              <a href="/">
                <img 
                  src="/street-logo.png" 
                  alt="Street" 
                  className={`h-8 w-auto object-contain ${timeMode === 'day' ? 'invert' : ''}`} 
                  style={timeMode === 'night' ? { filter: 'brightness(0) invert(1) opacity(0.9)' } : undefined} 
                />
              </a>
            </div>
          </div>
        </nav>
      )}

      {/* Background Cloud Animation - visible through transparent windshields */}
      {transitionPhase !== 'complete' && (
        <BackgroundCloudAnimation 
          transitionPhase={transitionPhase}
          transitionProgress={transitionProgress}
          cloudSpeed={cloudSpeed}
          cloudConfig={cloudConfig}
          spawnDistance={spawnDistance}
          recycleDistance={recycleDistance}
          timeMode={timeMode}
        />
      )}
      
      {/* Cockpit Image Layer - appears instantly (no fade) to cover windshields immediately */}
      {transitionPhase !== 'complete' && cockpitVisible && (
        <div style={{ opacity: 1 }}>
          <CockpitLayer 
            transitionPhase={transitionPhase}
            transitionProgress={transitionProgress}
            zoomTargetX={zoomTargetX}
            zoomTargetY={zoomTargetY}
            finalTranslateX={finalTranslateX}
            finalTranslateY={finalTranslateY}
            zoomAmount={zoomAmount}
          />
        </div>
      )}
      
      {/* Interactive Text Button - appears instantly with cockpit */}
      {cockpitVisible && (
        <div style={{ opacity: 1 }}>
          <InteractiveText 
            onTransitionStart={handleTransitionStart}
            transitionPhase={transitionPhase}
          />
        </div>
      )}

      {/* Fade overlay - transitions from blank color to sky color, stays visible during navigation */}
      {(transitionPhase === 'complete' || keepFadeVisible) && (
        <motion.div
          className="fixed inset-0 z-[1500]"
          style={{
            backgroundColor: fadeColor,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
        />
      )}

    </div>
  );
}

