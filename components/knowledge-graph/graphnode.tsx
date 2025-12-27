// FILE: components/knowledge-graph/graphnode.tsx
'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { GraphNode as GraphNodeType } from './types';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface GraphNodeProps {
  node: GraphNodeType;
  isSelected: boolean;
  onSelect: (node: GraphNodeType) => void;
}

export function GraphNode({ node, isSelected, onSelect }: GraphNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const position = node.position || [0, 0, 0];
  const size = (node.size || 1) * 0.8;
  const baseColor = node.color || '#888888';

  // Pulsing animation for selected nodes
  useFrame(({ clock }) => {
    if (meshRef.current && isSelected) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.1;
      meshRef.current.scale.setScalar(scale);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  // Determine shape based on node type
  const getGeometry = () => {
    switch (node.type) {
      case 'company':
        return <boxGeometry args={[size, size, size]} />;
      case 'investor':
        return <octahedronGeometry args={[size * 0.6, 0]} />;
      case 'founder':
        return <sphereGeometry args={[size * 0.5, 16, 16]} />;
      case 'technology':
        return <tetrahedronGeometry args={[size * 0.6, 0]} />;
      case 'location':
        return <coneGeometry args={[size * 0.5, size * 0.8, 6]} />;
      default:
        return <sphereGeometry args={[size * 0.5, 16, 16]} />;
    }
  };

  return (
    <group position={position as [number, number, number]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        {getGeometry()}
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={hovered || isSelected ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh scale={1.3}>
        {getGeometry()}
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={hovered || isSelected ? 0.2 : 0.1}
        />
      </mesh>

      {/* Label */}
      {(hovered || isSelected) && (
        <Html
          position={[0, size * 1.5, 0]}
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 whitespace-nowrap">
            <div className="text-white font-semibold text-sm">{node.label}</div>
            <div className="text-gray-300 text-xs capitalize">{node.type}</div>
          </div>
        </Html>
      )}
    </group>
  );
}
