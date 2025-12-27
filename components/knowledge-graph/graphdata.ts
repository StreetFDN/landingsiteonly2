// FILE: components/knowledge-graph/graphdata.ts
import { GraphData, GraphNode, GraphEdge } from './types';

// Comprehensive Robotics Projects Research Database
// Based on real robotics ecosystem data

const nodes: GraphNode[] = [
  // Companies - Humanoid Robotics
  {
    id: 'opendroids',
    label: 'OpenDroids',
    type: 'company',
    description: 'Humanoid robotics company building at the frontier of AI-powered robots',
    color: '#00bfff',
    size: 1.5,
    metadata: {
      founded: 2024,
      sector: 'Humanoid Robotics',
      stage: 'Early Stage',
      funding: '$2M+'
    }
  },
  {
    id: 'figure-ai',
    label: 'Figure AI',
    type: 'company',
    description: 'Developing general-purpose humanoid robots for commercial applications',
    color: '#4169e1',
    size: 1.8,
    metadata: {
      founded: 2022,
      sector: 'Humanoid Robotics',
      stage: 'Series B',
      funding: '$754M'
    }
  },
  {
    id: '1x-technologies',
    label: '1X Technologies',
    type: 'company',
    description: 'Norwegian humanoid robotics company, creators of EVE and NEO',
    color: '#6495ed',
    size: 1.6,
    metadata: {
      founded: 2014,
      sector: 'Humanoid Robotics',
      stage: 'Series B',
      funding: '$125M'
    }
  },
  {
    id: 'apptronik',
    label: 'Apptronik',
    type: 'company',
    description: 'Building Apollo, a general-purpose humanoid robot for logistics',
    color: '#1e90ff',
    size: 1.4,
    metadata: {
      founded: 2016,
      sector: 'Humanoid Robotics',
      stage: 'Series A',
      funding: '$63M'
    }
  },
  
  // Companies - Industrial & Logistics
  {
    id: 'boston-dynamics',
    label: 'Boston Dynamics',
    type: 'company',
    description: 'Pioneering robotics company known for Spot, Atlas, and Stretch',
    color: '#ff6347',
    size: 2.0,
    metadata: {
      founded: 1992,
      sector: 'Industrial Robotics',
      stage: 'Mature',
      owner: 'Hyundai'
    }
  },
  {
    id: 'agility-robotics',
    label: 'Agility Robotics',
    type: 'company',
    description: 'Creator of Digit, a bipedal robot for logistics and delivery',
    color: '#ff7f50',
    size: 1.7,
    metadata: {
      founded: 2015,
      sector: 'Logistics Robotics',
      stage: 'Series B',
      funding: '$178M'
    }
  },
  {
    id: 'sanctuary-ai',
    label: 'Sanctuary AI',
    type: 'company',
    description: 'Developing Phoenix, a general-purpose humanoid with human-like hands',
    color: '#da70d6',
    size: 1.5,
    metadata: {
      founded: 2018,
      sector: 'Humanoid Robotics',
      stage: 'Series A',
      funding: '$140M'
    }
  },
  
  // Companies - AI & Software
  {
    id: 'covariant',
    label: 'Covariant',
    type: 'company',
    description: 'AI platform for robotic manipulation and warehouse automation',
    color: '#9370db',
    size: 1.6,
    metadata: {
      founded: 2017,
      sector: 'Robotics AI',
      stage: 'Series C',
      funding: '$222M'
    }
  },
  {
    id: 'skild-ai',
    label: 'Skild AI',
    type: 'company',
    description: 'Foundation models for robotics and embodied AI',
    color: '#8a2be2',
    size: 1.4,
    metadata: {
      founded: 2023,
      sector: 'Robotics AI',
      stage: 'Seed',
      funding: '$300M'
    }
  },
  {
    id: 'physical-intelligence',
    label: 'Physical Intelligence',
    type: 'company',
    description: 'General-purpose AI for robots to interact with the physical world',
    color: '#ba55d3',
    size: 1.5,
    metadata: {
      founded: 2023,
      sector: 'Robotics AI',
      stage: 'Seed',
      funding: '$400M'
    }
  },
  
  // Investors
  {
    id: 'street-labs',
    label: 'Street Labs',
    type: 'investor',
    description: 'Early-stage venture capital focused on deep tech and robotics',
    color: '#ff8c00',
    size: 1.3,
    metadata: {
      type: 'Venture Capital',
      focus: 'Deep Tech, Robotics, AI'
    }
  },
  {
    id: 'openai',
    label: 'OpenAI',
    type: 'investor',
    description: 'AI research lab investing in robotics and embodied intelligence',
    color: '#00d4aa',
    size: 1.9,
    metadata: {
      type: 'Strategic Investor',
      focus: 'AI, Robotics'
    }
  },
  {
    id: 'amazon',
    label: 'Amazon',
    type: 'investor',
    description: 'Major investor in logistics and warehouse robotics',
    color: '#ff9900',
    size: 1.8,
    metadata: {
      type: 'Strategic Investor',
      focus: 'Logistics, Automation'
    }
  },
  {
    id: 'microsoft',
    label: 'Microsoft',
    type: 'investor',
    description: 'Investing in humanoid robotics and AI platforms',
    color: '#00a4ef',
    size: 1.7,
    metadata: {
      type: 'Strategic Investor',
      focus: 'AI, Cloud, Robotics'
    }
  },
  {
    id: 'nvidia',
    label: 'NVIDIA',
    type: 'investor',
    description: 'GPU maker investing heavily in robotics AI and simulation',
    color: '#76b900',
    size: 1.8,
    metadata: {
      type: 'Strategic Investor',
      focus: 'AI Computing, Simulation'
    }
  },
  {
    id: 'khosla',
    label: 'Khosla Ventures',
    type: 'investor',
    description: 'Leading VC firm with deep robotics portfolio',
    color: '#ffa500',
    size: 1.4,
    metadata: {
      type: 'Venture Capital',
      focus: 'Deep Tech, Climate, Robotics'
    }
  },
  {
    id: 'lux-capital',
    label: 'Lux Capital',
    type: 'investor',
    description: 'Science-focused VC investing in breakthrough robotics',
    color: '#ff6b6b',
    size: 1.3,
    metadata: {
      type: 'Venture Capital',
      focus: 'Science, Deep Tech'
    }
  },
  
  // Founders
  {
    id: 'pieter-abbeel',
    label: 'Pieter Abbeel',
    type: 'founder',
    description: 'Berkeley professor, co-founded Covariant and Skild AI',
    color: '#ffd700',
    size: 1.2,
    metadata: {
      background: 'UC Berkeley',
      expertise: 'Reinforcement Learning, Robotics'
    }
  },
  {
    id: 'brett-adcock',
    label: 'Brett Adcock',
    type: 'founder',
    description: 'Serial entrepreneur, founded Figure AI',
    color: '#ffec8b',
    size: 1.3,
    metadata: {
      background: 'Archer Aviation, Vettery',
      expertise: 'Startups, Hardware'
    }
  },
  {
    id: 'bernt-bornich',
    label: 'Bernt Børnich',
    type: 'founder',
    description: 'CEO of 1X Technologies',
    color: '#f0e68c',
    size: 1.1,
    metadata: {
      background: 'Halodi Robotics',
      expertise: 'Humanoid Robotics'
    }
  },
  {
    id: 'damion-shelton',
    label: 'Damion Shelton',
    type: 'founder',
    description: 'CEO of Agility Robotics',
    color: '#eee8aa',
    size: 1.1,
    metadata: {
      background: 'Ottobock, CMU',
      expertise: 'Bipedal Robotics'
    }
  },
  {
    id: 'geordie-rose',
    label: 'Geordie Rose',
    type: 'founder',
    description: 'Co-founder of Sanctuary AI and D-Wave',
    color: '#fafad2',
    size: 1.2,
    metadata: {
      background: 'D-Wave, Quantum Computing',
      expertise: 'AI, Physics'
    }
  },
  
  // Technologies
  {
    id: 'llm-robotics',
    label: 'LLM-based Control',
    type: 'technology',
    description: 'Using large language models for robot control and reasoning',
    color: '#00ff7f',
    size: 1.4,
    metadata: {
      category: 'AI/ML',
      maturity: 'Emerging'
    }
  },
  {
    id: 'sim2real',
    label: 'Sim-to-Real Transfer',
    type: 'technology',
    description: 'Training robots in simulation and deploying to real world',
    color: '#00fa9a',
    size: 1.3,
    metadata: {
      category: 'AI/ML',
      maturity: 'Established'
    }
  },
  {
    id: 'dexterous-manipulation',
    label: 'Dexterous Manipulation',
    type: 'technology',
    description: 'Human-like hand dexterity for complex object manipulation',
    color: '#90ee90',
    size: 1.2,
    metadata: {
      category: 'Hardware',
      maturity: 'Developing'
    }
  },
  {
    id: 'bipedal-locomotion',
    label: 'Bipedal Locomotion',
    type: 'technology',
    description: 'Two-legged walking and balance for humanoid robots',
    color: '#98fb98',
    size: 1.3,
    metadata: {
      category: 'Hardware',
      maturity: 'Established'
    }
  },
  {
    id: 'vision-transformers',
    label: 'Vision Transformers',
    type: 'technology',
    description: 'Advanced computer vision for robot perception',
    color: '#7fffd4',
    size: 1.1,
    metadata: {
      category: 'AI/ML',
      maturity: 'Established'
    }
  },
  {
    id: 'isaac-sim',
    label: 'NVIDIA Isaac',
    type: 'technology',
    description: 'GPU-accelerated robotics simulation platform',
    color: '#66cdaa',
    size: 1.2,
    metadata: {
      category: 'Platform',
      maturity: 'Established'
    }
  },
  
  // Locations
  {
    id: 'san-francisco',
    label: 'San Francisco',
    type: 'location',
    description: 'Major hub for robotics and AI startups',
    color: '#ff69b4',
    size: 1.6,
    metadata: {
      country: 'USA',
      companies: 15
    }
  },
  {
    id: 'boston',
    label: 'Boston',
    type: 'location',
    description: 'Historic robotics hub, home to Boston Dynamics',
    color: '#ff1493',
    size: 1.4,
    metadata: {
      country: 'USA',
      companies: 8
    }
  },
  {
    id: 'vancouver',
    label: 'Vancouver',
    type: 'location',
    description: 'Emerging robotics cluster in Canada',
    color: '#db7093',
    size: 1.2,
    metadata: {
      country: 'Canada',
      companies: 4
    }
  },
  {
    id: 'oslo',
    label: 'Oslo',
    type: 'location',
    description: 'Norwegian robotics hub',
    color: '#ffb6c1',
    size: 1.1,
    metadata: {
      country: 'Norway',
      companies: 2
    }
  },
];

const edges: GraphEdge[] = [
  // Investment Relationships
  { id: 'e1', source: 'street-labs', target: 'opendroids', type: 'investment', strength: 0.9 },
  { id: 'e2', source: 'openai', target: 'figure-ai', type: 'investment', strength: 0.8 },
  { id: 'e3', source: 'openai', target: '1x-technologies', type: 'investment', strength: 0.8 },
  { id: 'e4', source: 'microsoft', target: 'figure-ai', type: 'investment', strength: 0.7 },
  { id: 'e5', source: 'nvidia', target: 'figure-ai', type: 'investment', strength: 0.7 },
  { id: 'e6', source: 'amazon', target: 'agility-robotics', type: 'investment', strength: 0.9 },
  { id: 'e7', source: 'khosla', target: 'covariant', type: 'investment', strength: 0.8 },
  { id: 'e8', source: 'lux-capital', target: 'physical-intelligence', type: 'investment', strength: 0.8 },
  { id: 'e9', source: 'khosla', target: 'skild-ai', type: 'investment', strength: 0.7 },
  { id: 'e10', source: 'lux-capital', target: 'sanctuary-ai', type: 'investment', strength: 0.7 },
  
  // Founder Relationships
  { id: 'f1', source: 'brett-adcock', target: 'figure-ai', type: 'founded', strength: 1.0 },
  { id: 'f2', source: 'pieter-abbeel', target: 'covariant', type: 'founded', strength: 1.0 },
  { id: 'f3', source: 'pieter-abbeel', target: 'skild-ai', type: 'founded', strength: 1.0 },
  { id: 'f4', source: 'bernt-bornich', target: '1x-technologies', type: 'founded', strength: 1.0 },
  { id: 'f5', source: 'damion-shelton', target: 'agility-robotics', type: 'founded', strength: 1.0 },
  { id: 'f6', source: 'geordie-rose', target: 'sanctuary-ai', type: 'founded', strength: 1.0 },
  
  // Geographic Relationships
  { id: 'g1', source: 'opendroids', target: 'san-francisco', type: 'geographic', strength: 0.6 },
  { id: 'g2', source: 'figure-ai', target: 'san-francisco', type: 'geographic', strength: 0.6 },
  { id: 'g3', source: 'physical-intelligence', target: 'san-francisco', type: 'geographic', strength: 0.6 },
  { id: 'g4', source: 'covariant', target: 'san-francisco', type: 'geographic', strength: 0.6 },
  { id: 'g5', source: 'boston-dynamics', target: 'boston', type: 'geographic', strength: 0.6 },
  { id: 'g6', source: 'agility-robotics', target: 'boston', type: 'geographic', strength: 0.6 },
  { id: 'g7', source: 'sanctuary-ai', target: 'vancouver', type: 'geographic', strength: 0.6 },
  { id: 'g8', source: '1x-technologies', target: 'oslo', type: 'geographic', strength: 0.6 },
  
  // Technology Relationships
  { id: 't1', source: 'figure-ai', target: 'llm-robotics', type: 'technology', strength: 0.7 },
  { id: 't2', source: 'physical-intelligence', target: 'llm-robotics', type: 'technology', strength: 0.8 },
  { id: 't3', source: 'covariant', target: 'vision-transformers', type: 'technology', strength: 0.8 },
  { id: 't4', source: 'skild-ai', target: 'sim2real', type: 'technology', strength: 0.9 },
  { id: 't5', source: 'boston-dynamics', target: 'bipedal-locomotion', type: 'technology', strength: 0.9 },
  { id: 't6', source: 'agility-robotics', target: 'bipedal-locomotion', type: 'technology', strength: 0.9 },
  { id: 't7', source: '1x-technologies', target: 'bipedal-locomotion', type: 'technology', strength: 0.8 },
  { id: 't8', source: 'sanctuary-ai', target: 'dexterous-manipulation', type: 'technology', strength: 0.9 },
  { id: 't9', source: 'figure-ai', target: 'dexterous-manipulation', type: 'technology', strength: 0.7 },
  { id: 't10', source: 'nvidia', target: 'isaac-sim', type: 'technology', strength: 1.0 },
  { id: 't11', source: 'figure-ai', target: 'isaac-sim', type: 'technology', strength: 0.6 },
  { id: 't12', source: 'opendroids', target: 'isaac-sim', type: 'technology', strength: 0.6 },
];

export const graphData: GraphData = {
  nodes,
  edges,
};

// Helper to get node color by type
export const getNodeColorByType = (type: string): string => {
  const colors: Record<string, string> = {
    company: '#00bfff',
    investor: '#ff8c00',
    founder: '#ffd700',
    technology: '#00ff7f',
    location: '#ff69b4',
  };
  return colors[type] || '#888888';
};

// Helper to get edge color by type
export const getEdgeColorByType = (type: string): string => {
  const colors: Record<string, string> = {
    investment: '#ff8c00',
    founded: '#ffd700',
    geographic: '#ff69b4',
    technology: '#00ff7f',
  };
  return colors[type] || '#666666';
};
