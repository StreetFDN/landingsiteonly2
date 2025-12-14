// FILE: components/city/layout/RoadNetwork.tsx
'use client';

import { useMemo } from "react";
import { RoadSegment, RoadVariant, CELL_SIZE } from "../assets/Roads";
import { startups } from "../startupsConfig";
import { StartupBuilding } from "../StartupBuilding";
import { Traffic } from "../assets/Traffic";
import { Startup } from "../types";
import { ApplyTile } from "../assets/ApplyTile"; 

type RoadConfig = {
  id: string;
  variant: RoadVariant;
  x: number; 
  z: number;
  rot: number;
};

const H = Math.PI / 2;

const ROAD_SEGMENTS: RoadConfig[] = [
  { id: "spine-top", variant: "cross", x: 0, z: -2, rot: H },
  { id: "spine-mid-top", variant: "straight", x: 0, z: -1, rot: H },
  { id: "spine-center", variant: "straight", x: 0, z: 0, rot: H },
  { id: "spine-mid-bot", variant: "straight", x: 0, z: 1, rot: H },
  { id: "spine-bot", variant: "cross", x: 0, z: 2, rot: 0 },
  { id: "ring-tl", variant: "curve", x: -2, z: -2, rot: H },
  { id: "ring-t-l", variant: "straight", x: -1, z: -2, rot: 0 },
  { id: "ring-t-r", variant: "straight", x: 1, z: -2, rot: 0 },
  { id: "ring-tr", variant: "curve", x: 2, z: -2, rot: -0 },
  { id: "ring-r-t", variant: "straight", x: 2, z: -1, rot: H },
  { id: "ring-r-m", variant: "straight", x: 2, z: 0, rot: H },
  { id: "ring-r-b", variant: "straight", x: 2, z: 1, rot: H },
  { id: "ring-br", variant: "curve", x: 2, z: 2, rot: 3 * H },
  { id: "ring-b-r", variant: "straight", x: 1, z: 2, rot: 0 },
  { id: "ring-b-l", variant: "straight", x: -1, z: 2, rot: 0 },
  { id: "ring-bl", variant: "curve", x: -2, z: 2, rot: 2 * H  },
  { id: "ring-l-b", variant: "straight", x: -2, z: 1, rot: H },
  { id: "ring-l-m", variant: "straight", x: -2, z: 0, rot: H },
  { id: "ring-l-t", variant: "straight", x: -2, z: -1, rot: H },
];

interface RoadNetworkProps {
  onBuildingSelect: (s: Startup) => void;
  labelsVisible?: boolean; // NEW PROP
}

export const RoadNetwork = ({ onBuildingSelect, labelsVisible = true }: RoadNetworkProps) => {
  const buildings = useMemo(() => {
    return startups.map(s => {
      const x = (s.gridPosition[0] - 6) * CELL_SIZE;
      const z = (s.gridPosition[1] - 6) * CELL_SIZE;
      return (
        <StartupBuilding 
            key={s.id} 
            startup={s} 
            position={[x, 0, z]} 
            onSelect={onBuildingSelect}
            visible={labelsVisible} // PASS DOWN
        />
      );
    });
  }, [onBuildingSelect, labelsVisible]);

  return (
    <group>
      {ROAD_SEGMENTS.map((r) => (
        <RoadSegment
          key={r.id}
          variant={r.variant}
          position={[r.x * CELL_SIZE, 0, r.z * CELL_SIZE]}
          rotationY={r.rot}
        />
      ))}
      
      <Traffic />
      
      {buildings}

      <ApplyTile position={[0, 0, 3 * CELL_SIZE]} />

      <mesh position={[0, -0.1, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[22, 64]} />
        <meshStandardMaterial color="#c8e6c9" roughness={1} /> 
      </mesh>
      
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[21.5, 22, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
    </group>
  );
};