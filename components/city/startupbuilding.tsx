// FILE: components/city/StartupBuilding.tsx
'use client';

import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Startup } from './types';
import { BuildingModel } from './assets/buildings';

interface StartupBuildingProps {
  startup: Startup;
  position: [number, number, number];
  onSelect: (startup: Startup) => void;
  visible?: boolean; // NEW PROP
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

export const StartupBuilding = ({ startup, position, onSelect, visible = true }: StartupBuildingProps) => {
  const [hovered, setHover] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const [targetScale, setTargetScale] = useState(1);

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
      <BuildingModel 
        modelKey={startup.modelKey} 
        color={startup.color} 
        hovered={hovered} 
        scale={startup.scale} 
      />
      
      {/* ONLY RENDER LABEL IF VISIBLE */}
      {visible && (
        <Html 
            position={[0, nameTagY, 0]} 
            center 
            distanceFactor={15}
            zIndexRange={[500, 0]}
        >
            <div className={`
            px-3 py-1.5 rounded-full backdrop-blur-md border border-white/40 shadow-lg
            transition-all duration-300 flex items-center gap-2
            ${hovered ? 'bg-white/90 scale-110' : 'bg-white/60 scale-100'}
            `}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: startup.color }} />
            <span className="text-xs font-bold text-slate-800 whitespace-nowrap">{startup.name}</span>
            </div>
        </Html>
      )}
    </group>
  );
};
