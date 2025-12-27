// FILE: components/knowledge-graph/graph3d.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { GraphNode } from './graphnode';
import { GraphEdge } from './graphedge';
import { ForceSimulation } from './forcesimulation';
import { GraphData, GraphNode as GraphNodeType } from './types';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

interface Graph3DProps {
  data: GraphData;
  onNodeSelect: (node: GraphNodeType | null) => void;
  selectedNode: GraphNodeType | null;
}

export function Graph3D({ data, onNodeSelect, selectedNode }: Graph3DProps) {
  const [simulatedNodes, setSimulatedNodes] = useState<GraphNodeType[]>(data.nodes);
  const [isSimulating, setIsSimulating] = useState(true);

  // Run force simulation
  useEffect(() => {
    const simulation = new ForceSimulation(
      JSON.parse(JSON.stringify(data.nodes)), // Deep clone
      data.edges,
      {
        repulsionStrength: 120,
        attractionStrength: 0.08,
        centeringForce: 0.008,
        damping: 0.85,
        minDistance: 4,
        maxDistance: 60,
      }
    );

    simulation.start(400, () => {
      setIsSimulating(false);
    });

    // Update positions periodically during simulation
    const interval = setInterval(() => {
      setSimulatedNodes([...simulation.getNodes()]);
    }, 50);

    return () => {
      simulation.stop();
      clearInterval(interval);
    };
  }, [data]);

  // Create node lookup map
  const nodeMap = useMemo(() => {
    const map = new Map<string, GraphNodeType>();
    simulatedNodes.forEach(node => map.set(node.id, node));
    return map;
  }, [simulatedNodes]);

  return (
    <group>
      {/* Background stars */}
      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Ambient glow */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4169e1" />
      <pointLight position={[0, 0, 20]} intensity={0.3} color="#ff69b4" />

      {/* Edges */}
      {data.edges.map((edge) => {
        const sourceNode = nodeMap.get(edge.source);
        const targetNode = nodeMap.get(edge.target);
        
        if (!sourceNode || !targetNode) return null;
        
        return (
          <GraphEdge
            key={edge.id}
            edge={edge}
            sourceNode={sourceNode}
            targetNode={targetNode}
            selectedNodeId={selectedNode?.id || null}
          />
        );
      })}

      {/* Nodes */}
      {simulatedNodes.map((node) => (
        <GraphNode
          key={node.id}
          node={node}
          isSelected={selectedNode?.id === node.id}
          onSelect={onNodeSelect}
        />
      ))}

      {/* Loading indicator (subtle) */}
      {isSimulating && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
        </mesh>
      )}
    </group>
  );
}
