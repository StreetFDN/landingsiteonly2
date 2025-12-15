import { Startup } from "./types";

export const startups: Startup[] = [
  {
    id: "street-labs",
    name: "Street Labs",
    description: "Building the ecosystem where founders go to accelerate their radical changes in the world.",
    gridPosition: [6, 6], 
    color: "#ff8c00",
    link: "https://street.app",
    stats: {
      founded: "2025",
      employees: "10-50",
      stage: "Seed"
    }
  },
  {
    id: "opendroids",
    name: "OpenDroids",
    description: "Robotics Company out of San Francisco building at the frontier of humanoids.",
    gridPosition: [10, 8], 
    color: "#00bfff", 
    link: "https://opendroids.com",
    stats: {
      founded: "2024",
      employees: "1-10",
      stage: "Seed"
    }
  },
  {
    id: "starfun",
    name: "StarFun",
    description: "Imagine if Twitch, Kickstarter and the NASDAQ had a baby. A fundraising platform where founders raise capital in live, public token sales.",
    gridPosition: [6, 2], 
    color: "#ffd700", 
    link: "https://star.fun",
    stats: {
      founded: "2025",
      employees: "10-20",
      stage: "Pre-Seed"
    }
  },
  {
    id: "kled-ai",
    name: "Kled AI",
    description: "Data Marketplace where everyday citizens earn money for their content. Enabling a whole new job category in third world countries: The data seller.",
    gridPosition: [7, 10], 
    color: "#9932cc",
    link: "https://kled.ai",
    stats: {
      founded: "2024",
      employees: "5-15",
      stage: "Seed"
    }
  },
  {
    id: "noice",
    name: "Noice",
    description: "Accelerator and Launchpad on Base where you can IPO from your desk. Backed by Coinbase and other cool angels.",
    gridPosition: [3, 7], 
    color: "#ff4500", 
    link: "https://noice.so",
    stats: {
      founded: "2024",
      employees: "1-10",
      stage: "Pre-Seed"
    }
  }
];
