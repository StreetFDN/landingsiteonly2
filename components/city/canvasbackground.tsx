'use client';

import { useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CanvasBackgroundProps {
  color: string;
}

export const CanvasBackground = ({ color }: CanvasBackgroundProps) => {
  const { scene, gl } = useThree();
  
  useLayoutEffect(() => {
    // Set background color synchronously before first render
    const bgColor = new THREE.Color(color);
    scene.background = bgColor;
    gl.setClearColor(color, 1);
  }, [color, scene, gl]);
  
  return null;
};

