import { Startup } from "./types";

export const startups: Startup[] = [
  {
    id: "street-labs",
    name: "Street Labs",
    description: "Building the ecosystem where founders go to accelerate their radical changes in the world.",
    gridPosition: [6, 6], 
    color: "#ff8c00",
    link: "https://street.app"
  },
  {
    id: "opendroids",
    name: "OpenDroids",
    description: "Robotics Company out of San Francisco building at the frontier of humanoids.",
    gridPosition: [10, 8], 
    color: "#00bfff", 
    link: "https://opendroids.com"
  },
  {
    id: "starfun",
    name: "StarFun",
    description: "Imagine if Twitch, Kickstarter and the NASDAQ had a baby. A fundraising platform where founders raise capital in live, public token sales.",
    gridPosition: [6, 2], 
    color: "#ffd700", 
    link: "https://star.fun"
  },
  {
    id: "kled-ai",
    name: "Kled AI",
    description: "Data Marketplace where everyday citizens earn money for their content. Enabling a whole new job category in third world countries: The data seller.",
    gridPosition: [7, 10], 
    color: "#9932cc",
    link: "https://kled.ai"
  },
  {
    id: "noice",
    name: "Noice",
    description: "Accelerator and Launchpad on Base where you can IPO from your desk. Backed by Coinbase and other cool angels.",
    gridPosition: [3, 7], 
    color: "#ff4500", 
    link: "https://noice.so"
  }
];
