'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
// @ts-ignore - FBXLoader types may not be available in all three.js versions
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';
import { CloudTypeConfig, CloudConfig } from './BackgroundCloudAnimation';

interface CloudSceneProps {
  transitionPhase?: 'idle' | 'entering' | 'separating' | 'revealing' | 'complete';
  cloudSpeed?: number;
  cloudConfig?: CloudConfig;
  spawnDistance?: number; // Z distance where clouds spawn
  recycleDistance?: number; // Z distance where clouds are recycled
}

interface CloudInstance {
  mesh: THREE.Group | null;
  x: number;
  y: number;
  z: number;  // Z position (negative = far, positive = near/forward)
  baseY: number;
  speedZ: number;  // Forward speed toward camera
  type: 'cloud1' | 'cloud2' | 'cloud3' | 'cloud4';
  config: CloudTypeConfig;
}

/**
 * 3D Cloud Scene using FBX models
 */
export const CloudScene = ({
  transitionPhase = 'idle',
  cloudSpeed = 1.0,
  cloudConfig = {
    cloud1: { size: 1.0, forwardSpeed: 1.0, verticalOffset: 0, xScatterRange: 3, zScatterRange: 5, count: 3 },
    cloud2: { size: 1.0, forwardSpeed: 1.0, verticalOffset: 0, xScatterRange: 3, zScatterRange: 5, count: 3 },
    cloud3: { size: 1.0, forwardSpeed: 1.0, verticalOffset: 0, xScatterRange: 3, zScatterRange: 5, count: 3 },
    cloud4: { size: 1.0, forwardSpeed: 1.0, verticalOffset: 0, xScatterRange: 3, zScatterRange: 5, count: 3 },
  },
  spawnDistance = -35,
  recycleDistance = 5,
}: CloudSceneProps) => {
  const { viewport, camera } = useThree();
  const [clouds, setClouds] = useState<CloudInstance[]>([]);
  const [loadedModels, setLoadedModels] = useState<{
    cloud1: THREE.Group | null;
    cloud2: THREE.Group | null;
    cloud3: THREE.Group | null;
    cloud4: THREE.Group | null;
  }>({
    cloud1: null,
    cloud2: null,
    cloud3: null,
    cloud4: null,
  });
  const groupRef = useRef<THREE.Group>(null);

  // Load all FBX models
  useEffect(() => {
    const loader = new FBXLoader();
    const models = ['Cloud_1', 'Cloud_2', 'Cloud_3', 'Cloud_4'];
    const promises = models.map((modelName, index) => {
      return new Promise<{ type: 'cloud1' | 'cloud2' | 'cloud3' | 'cloud4'; model: THREE.Group }>((resolve, reject) => {
        loader.load(
          `/models/clouds/${modelName}.fbx`,
          (object: THREE.Group) => {
            // Center and normalize the model
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            
            object.position.sub(center);
            object.scale.multiplyScalar(1 / maxDim); // Normalize to unit size
            
            resolve({
              type: `cloud${index + 1}` as 'cloud1' | 'cloud2' | 'cloud3' | 'cloud4',
              model: object,
            });
          },
          undefined,
          (error: Error) => {
            console.error(`Failed to load ${modelName}:`, error);
            reject(error);
          }
        );
      });
    });

    Promise.all(promises).then((results: Array<{ type: 'cloud1' | 'cloud2' | 'cloud3' | 'cloud4'; model: THREE.Group }>) => {
      const loaded: any = {};
      results.forEach(({ type, model }: { type: 'cloud1' | 'cloud2' | 'cloud3' | 'cloud4'; model: THREE.Group }) => {
        loaded[type] = model;
      });
      setLoadedModels(loaded);
    });
  }, []);

  // Initialize clouds when models are loaded
  useEffect(() => {
    if (!loadedModels.cloud1 || !loadedModels.cloud2 || !loadedModels.cloud3 || !loadedModels.cloud4) return;

    const newClouds: CloudInstance[] = [];
    const types: Array<'cloud1' | 'cloud2' | 'cloud3' | 'cloud4'> = ['cloud1', 'cloud2', 'cloud3', 'cloud4'];
    
    // Calculate total cloud count from config
    const totalCloudCount = types.reduce((sum, type) => sum + cloudConfig[type].count, 0);
    
    let globalCloudIndex = 0;
    
    types.forEach((type) => {
      const config = cloudConfig[type];
      const count = config.count;
      
      for (let i = 0; i < count; i++) {
        // Distribute clouds randomly across viewport Y-axis
        const viewportHeight = viewport.height * 2;
        
        // Apply X-axis scatter within defined range
        const xOffset = (Math.random() - 0.5) * 2 * config.xScatterRange; // Random between [-xScatterRange, +xScatterRange]
        
        // Apply Z-axis scatter within defined range around spawn distance
        const zOffset = (Math.random() - 0.5) * 2 * config.zScatterRange; // Random between [-zScatterRange, +zScatterRange]
        const startZ = spawnDistance + zOffset; // Spawn at spawnDistance ± zScatterRange
        
        // Apply vertical offset from config (positive = up, negative = down)
        const baseY = (Math.random() - 0.5) * viewportHeight + config.verticalOffset;
        
        newClouds.push({
          mesh: null,
          x: xOffset, // Scattered X position within defined range
          y: baseY, // Random Y position + vertical offset
          z: startZ, // Scattered Z position around spawn distance
          baseY: baseY,
          speedZ: (2 + Math.random() * 3) * cloudSpeed * config.forwardSpeed, // Forward motion speed
          type,
          config,
        });
        
        globalCloudIndex++;
      }
    });

    setClouds(newClouds);
  }, [loadedModels, cloudSpeed, cloudConfig, viewport.width, viewport.height, spawnDistance]);

  // Animation loop - forward motion only
  useFrame((state, delta) => {
    if (!groupRef.current || transitionPhase === 'complete') return;

    const viewportWidth = viewport.width * 2;
    const viewportHeight = viewport.height * 2;

    setClouds((prevClouds) => {
      return prevClouds.map((cloud) => {
        if (!cloud.mesh) return cloud;

        let newX = cloud.x;
        let newY = cloud.y;
        let newZ = cloud.z;
        let newSpeedZ = cloud.speedZ;
        let newBaseY = cloud.baseY;

        // Update position based on transition phase
        if (transitionPhase === 'separating') {
          // During separation, speed up forward motion
          newSpeedZ = cloud.speedZ * 1.5;
          newZ = cloud.z + newSpeedZ * delta;
        } else {
          // Normal forward motion
          newZ = cloud.z + cloud.speedZ * delta;
        }

        // Recycle cloud when it passes recycle distance
        if (newZ > recycleDistance) {
          // Cloud has passed recycle point - send it back to spawn distance with scatter
          const zOffset = (Math.random() - 0.5) * 2 * cloud.config.zScatterRange;
          newZ = spawnDistance + zOffset;
          // Reset X position with scatter range
          newX = (Math.random() - 0.5) * 2 * cloud.config.xScatterRange;
          // Reset Y position with vertical offset
          newBaseY = (Math.random() - 0.5) * viewportHeight + cloud.config.verticalOffset;
          newY = newBaseY;
        }

        // Calculate scale based on Z position (perspective effect)
        // Clouds closer to camera (less negative Z) appear larger
        const baseScale = cloud.config.size;
        const distanceRange = Math.abs(spawnDistance - recycleDistance); // Total distance range
        // Scale from 0.3x (far/spawn) to 1.0x (close/recycle) as cloud moves toward camera
        // Map Z from [spawnDistance, recycleDistance] to scale [0.3, 1.0]
        const normalizedZ = (newZ - spawnDistance) / distanceRange; // 0 at spawn, 1 at recycle
        const scale = baseScale * (0.3 + 0.7 * Math.max(0, Math.min(1, normalizedZ)));

        // Update mesh position and scale
        cloud.mesh.position.set(newX, newY, newZ);
        cloud.mesh.scale.set(scale, scale, scale);

        return {
          ...cloud,
          x: newX,
          y: newY,
          z: newZ,
          baseY: newBaseY,
          speedZ: newSpeedZ,
        };
      });
    });
  });

  return (
    <>
      {/* Ambient light for clouds */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      <group ref={groupRef}>
        {clouds.map((cloud, index) => {
          const model = loadedModels[cloud.type];
          if (!model) return null;

          return (
            <CloudInstance
              key={index}
              model={model}
              cloud={cloud}
              setMesh={(mesh) => {
                const updatedClouds = [...clouds];
                updatedClouds[index].mesh = mesh;
                setClouds(updatedClouds);
              }}
            />
          );
        })}
      </group>
    </>
  );
};

interface CloudInstanceProps {
  model: THREE.Group;
  cloud: CloudInstance;
  setMesh: (mesh: THREE.Group) => void;
}

const CloudInstance = ({ model, cloud, setMesh }: CloudInstanceProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const clonedModelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (meshRef.current && model && !clonedModelRef.current) {
      // Clone the model once
      clonedModelRef.current = model.clone();
      
      // Apply cloud-specific scale
      clonedModelRef.current.scale.set(
        cloud.config.size, 
        cloud.config.size, 
        cloud.config.size
      );
      
      // Add to group
      meshRef.current.add(clonedModelRef.current);
      
      setMesh(meshRef.current);
    }
  }, [model, cloud.config.size, setMesh]);

  // Position and scale are updated in parent component's useFrame
  // This component just maintains the mesh reference
  useFrame(() => {
    if (clonedModelRef.current && meshRef.current) {
      // Scale will be updated by parent based on Z position (perspective)
      // Position is also updated by parent
    }
  });

  return <group ref={meshRef} />;
};

