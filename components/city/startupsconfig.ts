// FILE: components/city/startupsConfig.ts
import type { Startup } from "./types";

export const startups: Startup[] = [
  {
    id: "street",
    name: "Street Labs HQ",
    district: "hq",
    gridPosition: [6, 6], 
    color: "#00b3ff", 
    link: "https://streetlabs.xyz",
    highlight: true,
    modelKey: "building-skyscraper-a",
    rotation: 0,
    description: "The core infrastructure layer for the Street Network. We provide the legal-technical bridge allowing on-chain entities to own off-chain equity compliantly.",
  },
  {
    id: "kled",
    name: "Kled AI",
    district: "data",
    gridPosition: [5, 5], 
    color: "#ff6b00", 
    link: "https://kled.ai",
    modelKey: "building-skyscraper-b",
    rotation: Math.PI / 2,
    description: "Decentralized AI inference network optimizing for low-latency visual processing. Kled utilizes Street to tokenize GPU fleet ownership.", 
  },
  {
    id: "opendroids", 
    name: "OpenDroids", 
    district: "robotics",
    gridPosition: [7, 5], 
    color: "#8b5cff", 
    link: "https://example.com/robotics",
    modelKey: "building-skyscraper-c", 
    rotation: 0,
    description: "Open source humanoid hardware platform. Token holders govern the manufacturing pipelines and IP licensing revenue.",
  },
  {
    id: "noice", 
    name: "Noice", 
    district: "experimental",
    gridPosition: [5, 7], 
    color: "#ff0055", 
    link: "https://example.com/node",
    modelKey: "building-skyscraper-d", 
    rotation: Math.PI, 
    scale: 0.7, // RESIZED: Made smaller
    description: "Next-gen noise cancellation and audio augmented reality. Validating the sonic world through cryptographic proof-of-location sensors.",
  },
  {
    id: "starfun", // NEW: StarFun
    name: "StarFun", 
    district: "gaming",
    gridPosition: [7, 7], 
    color: "#fbbf24", // Gold/Yellow
    link: "https://example.com/starfun",
    modelKey: "building-skyscraper-e", 
    rotation: -Math.PI / 2, 
    scale: 0.75, // Smaller skyscraper
    description: "The leading on-chain arcade and entertainment protocol. Using Street to seamlessly license IP and handle fiat payouts for tournament winners.",
  },
];
