// FILE: components/knowledge-graph/types.ts

export type NodeType = 'company' | 'investor' | 'founder' | 'technology' | 'location';
export type EdgeType = 'investment' | 'founded' | 'geographic' | 'technology' | 'partnership' | 'acquisition';
export type Sector = 'robotics' | 'nuclear' | 'defense' | 'biotech' | 'crypto' | 'space' | 'ai';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  sector: Sector;
  description?: string;
  metadata?: Record<string, any>;
  // Position will be calculated by force-directed algorithm
  position?: [number, number, number];
  velocity?: [number, number, number];
  // Visual properties
  color?: string;
  size?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  label?: string;
  strength?: number; // 0-1, affects force-directed layout
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface ForceSimulationConfig {
  repulsionStrength: number;
  attractionStrength: number;
  centeringForce: number;
  damping: number;
  minDistance: number;
  maxDistance: number;
}
