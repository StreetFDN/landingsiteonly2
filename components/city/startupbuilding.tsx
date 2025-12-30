// FILE: components/city/StartupBuilding.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Startup } from './types';
import { BuildingModel } from './assets/buildings';

interface StartupBuildingProps {
  startup: Startup;
  position: [number, number, number];
  onSelect: (startup: Startup) => void;
  visible?: boolean;
  isNight?: boolean;
  allBuildingRefs?: React.RefObject<THREE.Group | null>[];
  onRegisterRef?: (id: string, ref: React.RefObject<THREE.Group | null>) => void;
}

// Building height offsets - adjustments per building model to align name tags with roof
// OpenDroids (building-skyscraper-c) uses formula: (scale || 1) * 3 + 1 = 4.0 ✓
// This offset is added to the base formula to account for different building model heights
// Negative values lower the name tag, positive values raise it
// Goal: Name tags should hover slightly above the roof
const BUILDING_HEIGHT_OFFSETS: Record<string, number> = {
  "building-skyscraper-a": -0.8, // Street Labs - perfect ✓
  "building-skyscraper-b": 0.8, // Kled AI - raise slightly to hover above roof
  "building-skyscraper-c": 0, // OpenDroids - reference building, offset is 0
  "building-skyscraper-d": 0.9, // Noice - raise slightly to hover above roof
  "building-skyscraper-e": 0.15, // StarFun - raise slightly to hover above roof
};

export const StartupBuilding = ({ startup, position, onSelect, visible = true, isNight = false, allBuildingRefs = [], onRegisterRef, nameTagFadeIn = false, nameTagFadeInRef }: StartupBuildingProps) => {
  const [hovered, setHover] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const buildingMeshRef = useRef<THREE.Group | null>(null);
  const [targetScale, setTargetScale] = useState(1);
  const nameTagDivRef = useRef<HTMLDivElement>(null);

  // Register this building's ref with the parent for occlusion
  useEffect(() => {
    if (onRegisterRef) {
      onRegisterRef(startup.id, buildingMeshRef);
    }
  }, [startup.id, onRegisterRef]);

  // Track if name tag has ever been faded in (once true, always stay visible)
  const hasFadedInRef = useRef(false);
  
  // Update name tag fade-in via direct DOM manipulation and ref polling
  // Using useFrame to poll the ref value avoids React rerenders entirely
  // This completely decouples the name tag animation from React's render cycle
  // Always enforce visibility state - once faded in, name tags stay visible permanently
  useFrame(() => {
    if (nameTagDivRef.current) {
      const element = nameTagDivRef.current;
      // Use ref if provided, otherwise fall back to prop
      const currentValue = nameTagFadeInRef?.current ?? nameTagFadeIn;
      
      // Once faded in, always stay visible (even if ref becomes false temporarily)
      if (currentValue) {
        hasFadedInRef.current = true;
      }
      
      const shouldBeVisible = hasFadedInRef.current || currentValue;
      
      // Always enforce the correct visibility state (prevents reset on hover re-renders)
      // Check classList directly to ensure state is correct every frame
      const hasVisibleClasses = element.classList.contains('opacity-100') && element.classList.contains('translate-y-0');
      const hasHiddenClasses = element.classList.contains('opacity-0') && element.classList.contains('-translate-y-4');
      
      if (shouldBeVisible && !hasVisibleClasses) {
        element.classList.remove('opacity-0', '-translate-y-4');
        element.classList.add('opacity-100', 'translate-y-0');
      } else if (!shouldBeVisible && !hasHiddenClasses) {
        element.classList.remove('opacity-100', 'translate-y-0');
        element.classList.add('opacity-0', '-translate-y-4');
      }
    }
  });

  // Building hover scale animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 10);
      groupRef.current.scale.setScalar(s);
    }
  });

  // Calculate name tag position using OpenDroids' working formula
  // Base formula: (scale || 1) * 3 + 1
  // Add building-specific offset to account for different model heights
  const basePosition = (startup.scale || 1) * 3 + 1;
  const heightOffset = BUILDING_HEIGHT_OFFSETS[startup.modelKey] || 0;
  const nameTagY = basePosition + heightOffset;

  return (
    <group 
      ref={groupRef}
      position={position} 
      rotation={[0, startup.rotation, 0]}
      onClick={(e) => {
        // Prevent interaction during intro if not visible
        if (!visible) return;
        e.stopPropagation();
        onSelect(startup);
      }}
      onPointerOver={(e) => {
        if (!visible) return;
        e.stopPropagation();
        setHover(true);
        setTargetScale(1.05);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        if (!visible) return;
        e.stopPropagation();
        setHover(false);
        setTargetScale(1);
        document.body.style.cursor = 'auto';
      }}
    >
      <group ref={buildingMeshRef}>
        <BuildingModel 
          modelKey={startup.modelKey} 
          color={startup.color} 
          hovered={hovered} 
          scale={startup.scale}
          isNight={isNight}
        />
      </group>
      
      {/* Name tag - fade in from above after cloud animation */}
      {visible && (
        <Html 
            position={[0, nameTagY, 0]} 
            center 
            distanceFactor={15}
            zIndexRange={[500, 0]}
        >
            <div 
              className={`
                px-3 py-1.5 rounded-full backdrop-blur-md border border-white/40 shadow-lg
                flex items-center gap-2
                ${hovered ? 'bg-white/90' : 'bg-white/60'}
                name-tag-fade-in
              `}
              style={{
                opacity: 'var(--name-tag-opacity, 0)',
                transform: `translateY(var(--name-tag-translate-y, -1rem)) scale(${hovered ? '1.1' : '1'})`,
                transition: 'opacity 0.6s ease-out, transform 0.3s ease-out'
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: startup.color }} />
              <span className="text-xs font-bold text-slate-800 whitespace-nowrap">{startup.name}</span>
            </div>
        </Html>
      )}
    </group>
  );
};
