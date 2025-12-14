// FILE: components/city/StartupBuilding.tsx
'use client';

import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Startup } from './types';
import { BuildingModel } from './assets/Buildings';

interface StartupBuildingProps {
  startup: Startup;
  position: [number, number, number];
  onSelect: (startup: Startup) => void;
  visible?: boolean; // NEW PROP
}

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
            position={[0, (startup.scale || 1) * 3 + 1, 0]} 
            center 
            distanceFactor={15}
            zIndexRange={[1000, 0]}
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
