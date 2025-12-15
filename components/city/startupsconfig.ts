// FILE: components/city/startupsconfig.ts
import { Startup } from "./types";

export const startups: Startup[] = [
  {
    id: "street-labs",
    name: "Street Labs",
    district: "hq", // Restored
    description: "Building the ecosystem where founders go to accelerate their radical changes in the world.",
    gridPosition: [6, 6],
    color: "#ff8c00",
    link: "https://street.app",
    modelKey: "building-skyscraper-a", // Restored
    rotation: 0, // Restored
    highlight: true,
  },
  {
    id: "opendroids",
    name: "OpenDroids",
    district: "robotics", // Restored
    description: "Robotics Company out of San Francisco building at the frontier of humanoids.",
    gridPosition: [10, 8],
    color: "#00bfff",
    link: "https://opendroids.com",
    modelKey: "building-skyscraper-c", // Restored
    rotation: 0, // Restored
  },
  {
    id: "starfun",
    name: "StarFun",
    district: "gaming", // Restored
    description: "Imagine if Twitch, Kickstarter and the NASDAQ had a baby. A fundraising platform where founders raise capital in live, public token sales.",
    gridPosition: [6, 2],
    color: "#ffd700",
    link: "https://star.fun",
    modelKey: "building-skyscraper-e", // Restored
    rotation: -Math.PI / 2, // Restored
    scale: 0.75,
  },
  {
    id: "kled-ai",
    name: "Kled AI",
    district: "data", // Restored
    description: "Data Marketplace where everyday citizens earn money for their content. Enabling a whole new job category in third world countries: The data seller.",
    gridPosition: [7, 10],
    color: "#9932cc",
    link: "https://kled.ai",
    modelKey: "building-skyscraper-b", // Restored
    rotation: Math.PI / 2, // Restored
  },
  {
    id: "noice",
    name: "Noice",
    district: "experimental", // Restored
    description: "Accelerator and Launchpad on Base where you can IPO from your desk. Backed by Coinbase and other cool angels.",
    gridPosition: [3, 7],
    color: "#ff4500",
    link: "https://noice.so",
    modelKey: "building-skyscraper-d", // Restored
    rotation: Math.PI, // Restored
    scale: 0.7,
  }
];
