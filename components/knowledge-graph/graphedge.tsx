// FILE: components/knowledge-graph/graphedge.tsx
'use client';

import { useMemo } from 'react';
import { GraphEdge as GraphEdgeType, GraphNode } from './types';
import * as THREE from 'three';
import { getEdgeColorByType } from './graphdata';

interface GraphEdgeProps {
  edge: GraphEdgeType;
  sourceNode: GraphNode;
  targetNode: GraphNode;
  selectedNodeId: string | null;
}

export function GraphEdge({ edge, sourceNode, targetNode, selectedNodeId }: GraphEdgeProps) {
  const sourcePos = sourceNode.position || [0, 0, 0];
  const targetPos = targetNode.position || [0, 0, 0];
  
  // Determine if edge should be highlighted
  const isHighlighted = 
    selectedNodeId === sourceNode.id || 
    selectedNodeId === targetNode.id;

  // Create line geometry
  const points = useMemo(() => {
    return [
      new THREE.Vector3(sourcePos[0], sourcePos[1], sourcePos[2]),
      new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]),
    ];
  }, [sourcePos, targetPos]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  const color = getEdgeColorByType(edge.type);
  const opacity = isHighlighted ? 0.6 : 0.2;
  const lineWidth = isHighlighted ? 3 : 1.5;

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        linewidth={lineWidth}
      />
    </line>
  );
}
