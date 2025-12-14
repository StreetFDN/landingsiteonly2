// FILE: components/city/effects/Atmosphere.tsx
'use client';

import { Cloud } from "@react-three/drei";

export const Atmosphere = () => {
  return (
    <group>
      {/* 1. High Altitude Clouds (The layer we fly through) */}
      <Cloud 
        position={[-10, 50, -10]} 
        opacity={0.5} 
        speed={0.2} 
        width={20} 
        depth={5} 
        segments={20} 
      />
      
      {/* 2. Lower Atmosphere (Mist near the ground) */}
      <Cloud 
        position={[0, -5, 0]} 
        opacity={0.3} 
        speed={0.1} 
        width={30} 
        depth={10} 
        segments={10} 
        color="#e0f2fe"
      />
    </group>
  );
};