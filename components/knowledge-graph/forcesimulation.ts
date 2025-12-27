// FILE: components/knowledge-graph/forcesimulation.ts
import { GraphNode, GraphEdge, ForceSimulationConfig } from './types';
import * as THREE from 'three';

export class ForceSimulation {
  private nodes: GraphNode[];
  private edges: GraphEdge[];
  private config: ForceSimulationConfig;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;

  constructor(
    nodes: GraphNode[],
    edges: GraphEdge[],
    config: Partial<ForceSimulationConfig> = {}
  ) {
    this.nodes = nodes;
    this.edges = edges;
    this.config = {
      repulsionStrength: config.repulsionStrength ?? 100,
      attractionStrength: config.attractionStrength ?? 0.05,
      centeringForce: config.centeringForce ?? 0.01,
      damping: config.damping ?? 0.9,
      minDistance: config.minDistance ?? 3,
      maxDistance: config.maxDistance ?? 50,
    };

    // Initialize positions and velocities
    this.initializePositions();
  }

  private initializePositions() {
    this.nodes.forEach((node) => {
      if (!node.position) {
        // Initialize in a sphere around origin
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 15 + Math.random() * 10;
        
        node.position = [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ];
      }
      
      if (!node.velocity) {
        node.velocity = [0, 0, 0];
      }
    });
  }

  private applyRepulsionForces() {
    const { repulsionStrength, minDistance } = this.config;

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const node1 = this.nodes[i];
        const node2 = this.nodes[j];

        const dx = node1.position![0] - node2.position![0];
        const dy = node1.position![1] - node2.position![1];
        const dz = node1.position![2] - node2.position![2];

        const distanceSquared = dx * dx + dy * dy + dz * dz;
        const distance = Math.sqrt(distanceSquared);

        if (distance < minDistance) {
          continue;
        }

        // Repulsion force decreases with distance squared
        const force = repulsionStrength / distanceSquared;
        const forceX = (dx / distance) * force;
        const forceY = (dy / distance) * force;
        const forceZ = (dz / distance) * force;

        node1.velocity![0] += forceX;
        node1.velocity![1] += forceY;
        node1.velocity![2] += forceZ;

        node2.velocity![0] -= forceX;
        node2.velocity![1] -= forceY;
        node2.velocity![2] -= forceZ;
      }
    }
  }

  private applyAttractionForces() {
    const { attractionStrength, maxDistance } = this.config;

    this.edges.forEach((edge) => {
      const source = this.nodes.find((n) => n.id === edge.source);
      const target = this.nodes.find((n) => n.id === edge.target);

      if (!source || !target) return;

      const dx = target.position![0] - source.position![0];
      const dy = target.position![1] - source.position![1];
      const dz = target.position![2] - source.position![2];

      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance > maxDistance) {
        return;
      }

      // Attraction force increases with distance
      const strength = edge.strength ?? 1.0;
      const force = distance * attractionStrength * strength;
      const forceX = (dx / distance) * force;
      const forceY = (dy / distance) * force;
      const forceZ = (dz / distance) * force;

      source.velocity![0] += forceX;
      source.velocity![1] += forceY;
      source.velocity![2] += forceZ;

      target.velocity![0] -= forceX;
      target.velocity![1] -= forceY;
      target.velocity![2] -= forceZ;
    });
  }

  private applyCenteringForce() {
    const { centeringForce } = this.config;

    this.nodes.forEach((node) => {
      // Pull nodes toward origin
      node.velocity![0] -= node.position![0] * centeringForce;
      node.velocity![1] -= node.position![1] * centeringForce;
      node.velocity![2] -= node.position![2] * centeringForce;
    });
  }

  private updatePositions() {
    const { damping } = this.config;

    this.nodes.forEach((node) => {
      // Apply damping
      node.velocity![0] *= damping;
      node.velocity![1] *= damping;
      node.velocity![2] *= damping;

      // Update position
      node.position![0] += node.velocity![0];
      node.position![1] += node.velocity![1];
      node.position![2] += node.velocity![2];
    });
  }

  private step() {
    // Reset velocities
    this.nodes.forEach((node) => {
      node.velocity = [0, 0, 0];
    });

    // Apply all forces
    this.applyRepulsionForces();
    this.applyAttractionForces();
    this.applyCenteringForce();

    // Update positions based on velocities
    this.updatePositions();
  }

  public start(iterations: number = 300, callback?: () => void) {
    this.isRunning = true;
    let count = 0;

    const animate = () => {
      if (!this.isRunning || count >= iterations) {
        this.isRunning = false;
        if (callback) callback();
        return;
      }

      this.step();
      count++;

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  public stop() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public getNodes(): GraphNode[] {
    return this.nodes;
  }

  public getEdges(): GraphEdge[] {
    return this.edges;
  }
}
