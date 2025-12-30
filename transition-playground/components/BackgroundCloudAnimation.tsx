'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CloudScene } from './CloudScene';

export interface CloudTypeConfig {
  size: number;    // Overall scale of this cloud type (default: 1.0)
  forwardSpeed: number;  // Forward motion speed toward camera (default: 1.0)
  verticalOffset: number; // Vertical (Y) position offset - positive = up, negative = down (default: 0)
  xScatterRange: number; // X-axis scatter range - clouds spawn within [-xScatterRange, +xScatterRange] (default: 3)
  zScatterRange: number; // Z-axis scatter range - clouds spawn within [spawnDistance - zScatterRange, spawnDistance + zScatterRange] (default: 5)
  count: number;   // Number of instances of this cloud type (default: 3)
}

export interface CloudConfig {
  cloud1: CloudTypeConfig;  // Cloud_1.fbx
  cloud2: CloudTypeConfig;  // Cloud_2.fbx
  cloud3: CloudTypeConfig;  // Cloud_3.fbx
  cloud4: CloudTypeConfig;  // Cloud_4.fbx
}

type TimeMode = 'day' | 'night';

interface BackgroundCloudAnimationProps {
  transitionPhase?: 'idle' | 'entering' | 'separating' | 'revealing' | 'complete';
  transitionProgress?: number; // 0 to 1, for smooth scaling animation
  cloudSpeed?: number; // Global speed multiplier
  cloudConfig?: CloudConfig; // Per-cloud-type configuration
  spawnDistance?: number; // Z distance where clouds spawn (negative = far away, default: -35)
  recycleDistance?: number; // Z distance where clouds are recycled (positive = close, default: 5)
  timeMode?: TimeMode; // Day or night mode (default: 'day')
}

/**
 * Background cloud animation using 3D FBX models
 * Renders behind the cockpit image, visible through transparent windshields
 */
export const BackgroundCloudAnimation = ({
  transitionPhase = 'idle',
  transitionProgress = 0,
  cloudSpeed = 1.0,
  cloudConfig = {
    cloud1: { size: 1.0, forwardSpeed: 1.0, verticalOffset: 0, xScatterRange: 3, zScatterRange: 5, count: 3 },
    cloud2: { size: 1.0, forwardSpeed: 1.0, verticalOffset: 0, xScatterRange: 3, zScatterRange: 5, count: 3 },
    cloud3: { size: 1.0, forwardSpeed: 1.0, verticalOffset: 0, xScatterRange: 3, zScatterRange: 5, count: 3 },
    cloud4: { size: 1.0, forwardSpeed: 1.0, verticalOffset: 0, xScatterRange: 3, zScatterRange: 5, count: 3 },
  },
  spawnDistance = -35, // Clouds spawn at Z = -35 (far away)
  recycleDistance = 5,  // Clouds are recycled at Z = 5 (close to camera)
  timeMode = 'day', // Day or night mode
}: BackgroundCloudAnimationProps) => {
  if (transitionPhase === 'complete') return null;

  // Sky colors matching Network City
  const DAY_BG_COLOR = '#d5a7b4'; // Daytime sky color (pinkish)
  const NIGHT_BG_COLOR = '#43526f'; // Nighttime sky color (dark blue-gray)
  const skyColor = timeMode === 'day' ? DAY_BG_COLOR : NIGHT_BG_COLOR;

  // Calculate smooth scale for camera movement effect based on progress (0 to 1)
  // Matches the cockpit scaling for cohesive camera movement
  const progress = Math.max(0, Math.min(1, transitionProgress));
  // Smooth easing function (ease-in-out cubic)
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  const easedProgress = easeInOutCubic(progress);
  // Scale smoothly from 1.0 to 5.0 (matching cockpit)
  const canvasScale = 1 + (easedProgress * 4);

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none"
      style={{
        transform: `scale(${canvasScale})`,
        transformOrigin: 'center center',
        transition: 'transform 0s', // Instant updates for smooth progress-based animation
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 0], // Camera at origin, clouds move toward it
          fov: 50,
          near: 0.1,
          far: 100, // Adjusted for cloud distance range
          rotation: [0, 0, 0],
        }}
        style={{ 
          background: skyColor,
          opacity: 1, // Keep fully visible - we're moving through, not fading
          transition: 'background-color 2s ease-in-out',
        }}
      >
        {/* Set background color immediately to prevent black flash */}
        <color attach="background" args={[skyColor]} />
        
        <Suspense fallback={null}>
          <CloudScene
            transitionPhase={transitionPhase}
            cloudSpeed={cloudSpeed}
            cloudConfig={cloudConfig}
            spawnDistance={spawnDistance}
            recycleDistance={recycleDistance}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
