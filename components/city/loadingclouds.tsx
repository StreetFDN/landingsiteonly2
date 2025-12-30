'use client';

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

export interface LoadingCloudsHandle {
  leftCloudRef: React.RefObject<THREE.Group | null>;
  rightCloudRef: React.RefObject<THREE.Group | null>;
}

interface LoadingCloudsProps {
  leftCloudX?: number;
  leftCloudY?: number;
  leftCloudZ?: number;
  rightCloudX?: number;
  rightCloudY?: number;
  rightCloudZ?: number;
  leftCloudSize?: number;
  rightCloudSize?: number;
  cloudRotation?: number;
  animationSpeed?: number;
  startStatic?: boolean; // If true, clouds stay static until startAnimation is true
  startAnimation?: boolean; // When true, starts the animation (only used if startStatic is true)
  onReady?: () => void; // Called when clouds are loaded and ready
  onComplete?: () => void;
}

export const LoadingClouds = forwardRef<LoadingCloudsHandle, LoadingCloudsProps>(({
  leftCloudX = -5,
  leftCloudY = 0,
  leftCloudZ = 0,
  rightCloudX = 5,
  rightCloudY = 0,
  rightCloudZ = 0,
  leftCloudSize = 2.0,
  rightCloudSize = 2.0,
  cloudRotation = 0,
  animationSpeed = 3.0,
  startStatic = false,
  startAnimation = false,
  onReady,
  onComplete
}, ref) => {
  const { viewport, camera } = useThree();
  const [leftCloud, setLeftCloud] = useState<THREE.Group | null>(null);
  const [rightCloud, setRightCloud] = useState<THREE.Group | null>(null);
  const [cloudModel, setCloudModel] = useState<THREE.Group | null>(null);
  const leftGroupRef = useRef<THREE.Group>(null);
  const rightGroupRef = useRef<THREE.Group>(null);
  const assemblyGroupRef = useRef<THREE.Group>(null);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const [opacity, setOpacity] = useState(0);
  const fadeInDuration = 200; // Fast fade-in (200ms)

  // Expose cloud group refs to parent
  useImperativeHandle<LoadingCloudsHandle, LoadingCloudsHandle>(ref, (): LoadingCloudsHandle => {
    return {
      leftCloudRef: leftGroupRef as React.RefObject<THREE.Group | null>,
      rightCloudRef: rightGroupRef as React.RefObject<THREE.Group | null>,
    };
  });

  // Load cloud model immediately on mount
  useEffect(() => {
    const loader = new FBXLoader();
    loader.load(
      '/models/clouds/Cloud_1.fbx',
      (object) => {
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        object.position.sub(center);
        object.scale.multiplyScalar(1 / maxDim);
        
        setCloudModel(object);
      },
      (progress) => {
        // Progress callback - can be used for loading indicator if needed
      },
      (error) => {
        console.error('Failed to load cloud model:', error);
      }
    );
  }, []);

  // Create cloud instances when model is loaded
  useEffect(() => {
    if (cloudModel) {
      const left = cloudModel.clone();
      const right = cloudModel.clone();
      
      // Make clouds white and set up opacity for fade-in
      // Removed renderOrder and depthWrite - no longer needed since name tags fade in with CSS
      left.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.color.set(0xffffff);
                  mat.emissive.set(0xffffff);
                  mat.emissiveIntensity = 0.5;
                  mat.transparent = true;
                  mat.opacity = 0;
                  mat.depthTest = true;
                }
              });
            } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.color.set(0xffffff);
              mesh.material.emissive.set(0xffffff);
              mesh.material.emissiveIntensity = 0.5;
              mesh.material.transparent = true;
              mesh.material.opacity = 0;
              mesh.material.depthTest = true;
            }
          }
        }
      });
      
      right.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.color.set(0xffffff);
                  mat.emissive.set(0xffffff);
                  mat.emissiveIntensity = 0.5;
                  mat.transparent = true;
                  mat.opacity = 0;
                  mat.depthTest = true;
                }
              });
            } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.color.set(0xffffff);
              mesh.material.emissive.set(0xffffff);
              mesh.material.emissiveIntensity = 0.5;
              mesh.material.transparent = true;
              mesh.material.opacity = 0;
              mesh.material.depthTest = true;
            }
          }
        }
      });
      
      setLeftCloud(left);
      setRightCloud(right);
      
      // Start fade-in animation
      const fadeStartTime = Date.now();
      const fadeIn = () => {
        const elapsed = Date.now() - fadeStartTime;
        const progress = Math.min(1, elapsed / fadeInDuration);
        setOpacity(progress);
        
        // Update material opacity directly
        left.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((mat) => {
                  if (mat instanceof THREE.MeshStandardMaterial && mat.opacity !== undefined) {
                    mat.opacity = progress;
                  }
                });
              } else if (mesh.material instanceof THREE.MeshStandardMaterial && mesh.material.opacity !== undefined) {
                mesh.material.opacity = progress;
              }
            }
          }
        });
        
        right.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((mat) => {
                  if (mat instanceof THREE.MeshStandardMaterial && mat.opacity !== undefined) {
                    mat.opacity = progress;
                  }
                });
              } else if (mesh.material instanceof THREE.MeshStandardMaterial && mesh.material.opacity !== undefined) {
                mesh.material.opacity = progress;
              }
            }
          }
        });
        
        if (progress < 1) {
          requestAnimationFrame(fadeIn);
        } else {
          // Notify parent that clouds are ready after fade-in completes
          if (onReady) {
            onReady();
          }
        }
      };
      
      requestAnimationFrame(fadeIn);
    }
  }, [cloudModel, onReady]);

  useFrame((state) => {
    if (!leftGroupRef.current || !rightGroupRef.current || completedRef.current) return;
    
    // If startStatic is true, don't start animation until startAnimation is true
    if (startStatic && !startAnimation && startTimeRef.current === null) {
      // Keep clouds in initial position
      leftGroupRef.current.position.set(leftCloudX, leftCloudY, leftCloudZ);
      rightGroupRef.current.position.set(rightCloudX, rightCloudY, rightCloudZ);
      return;
    }
    
    // Start animation when startAnimation becomes true
    if (startStatic && startAnimation && startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }
    
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }
    
    const elapsed = state.clock.elapsedTime - startTimeRef.current;
    const progress = Math.min(1, elapsed * animationSpeed);
    
    // Calculate viewport bounds (viewport is in normalized units, multiply by 2 for world units)
    const viewportWidth = viewport.width * 2;
    
    // Left cloud moves left (negative X) - move far enough to be completely off screen
    const leftTargetX = leftCloudX - viewportWidth * 2;
    const leftCurrentX = leftCloudX + (leftTargetX - leftCloudX) * progress;
    
    // Right cloud moves right (positive X) - move far enough to be completely off screen
    const rightTargetX = rightCloudX + viewportWidth * 2;
    const rightCurrentX = rightCloudX + (rightTargetX - rightCloudX) * progress;
    
    // Update positions
    leftGroupRef.current.position.set(leftCurrentX, leftCloudY, leftCloudZ);
    rightGroupRef.current.position.set(rightCurrentX, rightCloudY, rightCloudZ);
    
    // Check if clouds are out of view and complete
    if (progress >= 1 && !completedRef.current) {
      completedRef.current = true;
      if (onComplete) {
        onComplete();
      }
    }
  });

  // Hide clouds when animation completes instead of unmounting to prevent depth buffer changes
  const isVisible = !completedRef.current;

  if (!leftCloud || !rightCloud) return null;

  return (
    <group ref={assemblyGroupRef} rotation={[0, cloudRotation, 0]} visible={isVisible}>
      <group 
        ref={leftGroupRef} 
        position={[leftCloudX, leftCloudY, leftCloudZ]}
      >
        <primitive object={leftCloud} scale={leftCloudSize} />
      </group>
      <group 
        ref={rightGroupRef} 
        position={[rightCloudX, rightCloudY, rightCloudZ]}
      >
        <primitive object={rightCloud} scale={rightCloudSize} />
      </group>
    </group>
  );
});

