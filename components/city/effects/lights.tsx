// FILE: components/city/effects/Lights.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, DirectionalLight } from 'three';

export const Lights = () => {
  const directionalRef = useRef<DirectionalLight>(null);

  // Dynamic Shadows: Sun moves slowly in an arc
  useFrame(({ clock }) => {
    if (directionalRef.current) {
      const t = clock.getElapsedTime() * 0.05; // Slow time
      // Move sun in a wide arc
      directionalRef.current.position.x = Math.sin(t) * 40;
      directionalRef.current.position.z = Math.cos(t) * 20;
      directionalRef.current.position.y = 30 + Math.cos(t) * 10;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} color={new Color("#e0f7fa")} />

      <directionalLight 
        ref={directionalRef}
        position={[20, 40, 20]} 
        intensity={1.5} 
        color={new Color("#fffdf5")} 
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize={[2048, 2048]} // Higher res shadows
      >
        <orthographicCamera attach="shadow-camera" args={[-30, 30, 30, -30]} />
      </directionalLight>

      {/* Soft Rim Light for 3D depth */}
      <spotLight position={[-20, 10, -20]} intensity={0.5} color="#c2e6ff" />
    </>
  );
};
