// FILE: components/city/assets/Nature.tsx
'use client';

import { useGLTF } from "@react-three/drei";
import { useMemo, useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CELL_SIZE } from "./roads";

// EXACT FILENAMES FROM YOUR SCREENSHOT
const NATURE_FILES = {
  tree: "/models/nature/tree.glb",
  treeDecorated: "/models/nature/tree-decorated.glb",
  treeSnowA: "/models/nature/tree-snow-a.glb",
  bench: "/models/nature/bench.glb",
  benchShort: "/models/nature/bench-short.glb",
  snowman: "/models/nature/snowman.glb",
  candyCaneRed: "/models/nature/candy-cane-red.glb",
  candyCaneGreen: "/models/nature/candy-cane-green.glb",
  presentCube: "/models/nature/present-a-cube.glb",
  presentRound: "/models/nature/present-b-round.glb",
  rocks: "/models/nature/rocks-small.glb",
  lamp: "/models/nature/lantern-hanging.glb",
};

const NATURE_KEYS = Object.keys(NATURE_FILES) as (keyof typeof NATURE_FILES)[];
const TREE_KEYS = ["tree", "treeDecorated", "treeSnowA"]; 
const PROP_KEYS = NATURE_KEYS.filter(k => !TREE_KEYS.includes(k));

interface NatureItemProps {
  modelKey: keyof typeof NATURE_FILES;
  position: [number, number, number];
  rotationY: number;
  scale: number;
}

const NatureItem = ({ modelKey, position, rotationY, scale }: NatureItemProps) => {
  const group = useRef<THREE.Group>(null);
  const isTree = String(modelKey).includes("tree");
  const offset = useMemo(() => Math.random() * 100, []);

  // Standard load
  const { scene } = useGLTF(NATURE_FILES[modelKey]);

  const clone = useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });
    return c;
  }, [scene]);

  useFrame(({ clock }) => {
    if (isTree && group.current) {
      const t = clock.getElapsedTime();
      group.current.rotation.z = Math.sin(t * 1.5 + offset) * 0.03; 
      group.current.rotation.x = Math.cos(t * 1.0 + offset) * 0.02;
    }
  });

  return (
    <group ref={group} position={position} rotation={[0, rotationY, 0]}>
      <primitive object={clone} scale={scale} />
    </group>
  );
};

export const NatureScatter = () => {
  const [items, setItems] = useState<NatureItemProps[]>([]);

  useEffect(() => {
    const newItems: NatureItemProps[] = [];
    const COUNT = 300;   
    const RANGE = 16;    

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 2 * RANGE;
      const z = (Math.random() - 0.5) * 2 * RANGE;

      const gridX = Math.round(x / CELL_SIZE);
      const gridZ = Math.round(z / CELL_SIZE);
      
      const distFromCenterX = Math.abs(x - gridX * CELL_SIZE);
      const distFromCenterZ = Math.abs(z - gridZ * CELL_SIZE);

      const inCityZone = gridX >= -2 && gridX <= 2 && gridZ >= -2 && gridZ <= 2;
      const applyTileZ = 3 * CELL_SIZE; 
      const distFromApply = Math.sqrt(x*x + (z - applyTileZ)*(z - applyTileZ));

      let valid = true;
      if (distFromApply < 4.5) valid = false;
      else if (inCityZone && (distFromCenterX < 2.2 || distFromCenterZ < 2.2)) valid = false;
      else if (!inCityZone && (distFromCenterX < 1.0 && distFromCenterZ < 1.0)) valid = false;

      if (valid) {
        const isTree = Math.random() < 0.7;
        const keyList = isTree ? TREE_KEYS : PROP_KEYS;
        // Fallback safety
        const key = (keyList.length > 0 ? keyList[Math.floor(Math.random() * keyList.length)] : "bench") as keyof typeof NATURE_FILES;
        
        let scale = 0.5; 
        if (String(key).includes("tree")) scale = 0.6 + Math.random() * 0.3; 
        else if (String(key).includes("bench")) scale = 0.4;
        else if (String(key).includes("snowman")) scale = 0.5;
        else if (String(key).includes("present")) scale = 0.35;
        else if (String(key).includes("rock")) scale = 0.4;
        else if (String(key).includes("candy")) scale = 0.4;
        else if (String(key).includes("lamp")) scale = 0.6;

        newItems.push({
          modelKey: key,
          position: [x, 0, z],
          rotationY: Math.random() * Math.PI * 2,
          scale: scale,
        });
      }
    }
    setItems(newItems);
  }, []);

  return (
    <group>
      {items.map((item, i) => <NatureItem key={i} {...item} />)}
    </group>
  );
};
