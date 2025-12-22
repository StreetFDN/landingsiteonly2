// FILE: components/city/assets/Buildings.tsx
'use client';

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

const BUILDING_FILES = {
  "building-skyscraper-a": "/models/buildings/building-skyscraper-a.glb",
  "building-skyscraper-b": "/models/buildings/building-skyscraper-b.glb",
  "building-skyscraper-c": "/models/buildings/building-skyscraper-c.glb",
  "building-skyscraper-d": "/models/buildings/building-skyscraper-d.glb",
  "building-skyscraper-e": "/models/buildings/building-skyscraper-e.glb",
  "building-b": "/models/buildings/low-detail-building-b.glb",
  "building-c": "/models/buildings/low-detail-building-c.glb",
  "building-e": "/models/buildings/low-detail-building-e.glb",
};

Object.values(BUILDING_FILES).forEach(path => {
  try { useGLTF.preload(path); } catch(e) {}
});

interface BuildingModelProps {
  modelKey: string;
  color: string;
  hovered: boolean;
  scale?: number; // Added scale prop
  isNight?: boolean; // NEW: Night mode prop
}

export const BuildingModel = ({ modelKey, color, hovered, scale = 1, isNight = false }: BuildingModelProps) => {
  // @ts-ignore
  const path = BUILDING_FILES[modelKey] || BUILDING_FILES["building-skyscraper-a"];
  const { scene } = useGLTF(path);
  
  const clone = useMemo(() => {
    const c = scene.clone();
    
    // Simple setup - just ensure shadows work
    c.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    // Apply the passed scale, defaulting to 1
    c.scale.set(scale, scale, scale); 
    
    return c;
  }, [scene, scale]);

  return <primitive object={clone} />;
};
