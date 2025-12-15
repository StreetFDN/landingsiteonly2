// FILE: components/city/startupsConfig.ts
import type { Startup } from "./types";

export const startups: Startup[] = [
  {
    id: "street",
    name: "Street Labs",
    district: "hq",
    gridPosition: [6, 6], 
    color: "#00b3ff", 
    link: "https://street.app",
    highlight: true,
    modelKey: "building-skyscraper-a",
    rotation: 0,
    description: "Building the ecosystem where founders go to accelerate their radical changes in the world.",
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
    description: "Data Marketplace where everyday citizens earn money for their content. Enabling a whole new job category in third world countries: The data seller.", 
  },
  {
    id: "opendroids", 
    name: "OpenDroids", 
    district: "robotics",
    gridPosition: [7, 5], 
    color: "#8b5cff", 
    link: "https://opendroids.com",
    modelKey: "building-skyscraper-c", 
    rotation: 0,
    description: "Robotics Company out of San Francisco building at the frontier of humanoids.",
  },
  {
    id: "noice", 
    name: "Noice", 
    district: "experimental",
    gridPosition: [5, 7], 
    color: "#ff0055", 
    link: "https://noice.so",
    modelKey: "building-skyscraper-d", 
    rotation: Math.PI, 
    scale: 0.7, // RESIZED: Made smaller
    description: "Accelerator and Launchpad on Base where you can IPO from your desk. Backed by Coinbase and other cool angels.",
  },
  {
    id: "starfun", // NEW: StarFun
    name: "StarFun", 
    district: "gaming",
    gridPosition: [7, 7], 
    color: "#fbbf24", // Gold/Yellow
    link: "star.fun",
    modelKey: "building-skyscraper-e", 
    rotation: -Math.PI / 2, 
    scale: 0.75, // Smaller skyscraper
    description: "Imagine if Twitch, Kickstarter and the NASDAQ had a baby. A fundraising platform where founders raise capital in live, public token sales.",
  },
];
