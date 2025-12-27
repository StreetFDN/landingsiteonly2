// FILE: components/knowledge-graph/graphdata.ts
import { GraphData, GraphNode, GraphEdge } from './types';

// MULTI-SECTOR KNOWLEDGE GRAPH
// 7 Sectors: Robotics, Nuclear, Defense, Biotech, Crypto, Space, AI

// ==================== SECTOR COLOR SCHEME ====================
const SECTOR_COLORS = {
  robotics: { primary: '#00bfff', secondary: '#4169e1' },
  nuclear: { primary: '#00ff00', secondary: '#32cd32' },
  defense: { primary: '#ff0000', secondary: '#dc143c' },
  biotech: { primary: '#9370db', secondary: '#8a2be2' },
  crypto: { primary: '#ffa500', secondary: '#ff8c00' },
  space: { primary: '#00ffff', secondary: '#00ced1' },
  ai: { primary: '#ff1493', secondary: '#c71585' }
};

const nodes: GraphNode[] = [
  // ==================== ROBOTICS SECTOR ====================
  {
    id: 'opendroids',
    label: 'OpenDroids',
    type: 'company',
    sector: 'robotics',
    description: 'Humanoid robotics company building AI-powered robots',
    color: '#00bfff',
    size: 1.5,
    metadata: { founded: 2024, funding: '$2M+', stage: 'Early' }
  },
  {
    id: 'figure-ai',
    label: 'Figure AI',
    type: 'company',
    sector: 'robotics',
    description: 'General-purpose humanoid robots for commercial applications',
    color: '#4169e1',
    size: 1.8,
    metadata: { founded: 2022, funding: '$754M', stage: 'Series B' }
  },
  {
    id: '1x-tech',
    label: '1X Technologies',
    type: 'company',
    sector: 'robotics',
    description: 'Norwegian humanoid robotics (EVE, NEO)',
    color: '#1e90ff',
    size: 1.6,
    metadata: { founded: 2014, funding: '$125M' }
  },
  {
    id: 'boston-dynamics',
    label: 'Boston Dynamics',
    type: 'company',
    sector: 'robotics',
    description: 'Pioneering robotics: Spot, Atlas, Stretch',
    color: '#5f9ea0',
    size: 2.0,
    metadata: { founded: 1992, owner: 'Hyundai' }
  },

  // ==================== NUCLEAR SECTOR ====================
  {
    id: 'terrapower',
    label: 'TerraPower',
    type: 'company',
    sector: 'nuclear',
    description: 'Next-gen nuclear reactor technology (Bill Gates)',
    color: '#00ff00',
    size: 1.9,
    metadata: { founded: 2008, funding: '$1B+', type: 'SMR' }
  },
  {
    id: 'nuscale',
    label: 'NuScale Power',
    type: 'company',
    sector: 'nuclear',
    description: 'Small modular reactor technology leader',
    color: '#32cd32',
    size: 1.7,
    metadata: { founded: 2007, status: 'Public', type: 'SMR' }
  },
  {
    id: 'oklo',
    label: 'Oklo',
    type: 'company',
    sector: 'nuclear',
    description: 'Advanced fission microreactors',
    color: '#7fff00',
    size: 1.5,
    metadata: { founded: 2013, funding: '$306M', type: 'Microreactor' }
  },
  {
    id: 'x-energy',
    label: 'X-energy',
    type: 'company',
    sector: 'nuclear',
    description: 'High-temperature gas-cooled reactors',
    color: '#90ee90',
    size: 1.6,
    metadata: { founded: 2009, funding: '$500M+' }
  },

  // ==================== DEFENSE SECTOR ====================
  {
    id: 'anduril',
    label: 'Anduril Industries',
    type: 'company',
    sector: 'defense',
    description: 'AI-powered defense systems and autonomous weapons',
    color: '#ff0000',
    size: 2.1,
    metadata: { founded: 2017, funding: '$3.8B', valuation: '$14B' }
  },
  {
    id: 'palantir',
    label: 'Palantir',
    type: 'company',
    sector: 'defense',
    description: 'Data analytics for defense and intelligence',
    color: '#dc143c',
    size: 2.2,
    metadata: { founded: 2003, status: 'Public', market_cap: '$60B+' }
  },
  {
    id: 'shield-ai',
    label: 'Shield AI',
    type: 'company',
    sector: 'defense',
    description: 'AI pilots for military drones',
    color: '#ff6347',
    size: 1.6,
    metadata: { founded: 2015, funding: '$575M' }
  },
  {
    id: 'scale-ai-defense',
    label: 'Scale AI (Defense)',
    type: 'company',
    sector: 'defense',
    description: 'AI training data for defense applications',
    color: '#cd5c5c',
    size: 1.5,
    metadata: { founded: 2016, funding: '$600M+' }
  },

  // ==================== BIOTECH SECTOR ====================
  {
    id: 'crispr-therapeutics',
    label: 'CRISPR Therapeutics',
    type: 'company',
    sector: 'biotech',
    description: 'Gene editing therapies (Nobel Prize tech)',
    color: '#9370db',
    size: 2.0,
    metadata: { founded: 2013, status: 'Public', market_cap: '$4B+' }
  },
  {
    id: 'moderna',
    label: 'Moderna',
    type: 'company',
    sector: 'biotech',
    description: 'mRNA therapeutics platform',
    color: '#8a2be2',
    size: 2.3,
    metadata: { founded: 2010, status: 'Public', market_cap: '$30B+' }
  },
  {
    id: 'recursion',
    label: 'Recursion Pharma',
    type: 'company',
    sector: 'biotech',
    description: 'AI-powered drug discovery',
    color: '#9932cc',
    size: 1.7,
    metadata: { founded: 2013, status: 'Public' }
  },
  {
    id: 'ginkgo-bioworks',
    label: 'Ginkgo Bioworks',
    type: 'company',
    sector: 'biotech',
    description: 'Synthetic biology platform',
    color: '#ba55d3',
    size: 1.8,
    metadata: { founded: 2008, status: 'Public' }
  },

  // ==================== CRYPTO/WEB3 SECTOR ====================
  {
    id: 'coinbase',
    label: 'Coinbase',
    type: 'company',
    sector: 'crypto',
    description: 'Leading cryptocurrency exchange',
    color: '#ffa500',
    size: 2.4,
    metadata: { founded: 2012, status: 'Public', market_cap: '$50B+' }
  },
  {
    id: 'circle',
    label: 'Circle',
    type: 'company',
    sector: 'crypto',
    description: 'USDC stablecoin issuer',
    color: '#ff8c00',
    size: 1.9,
    metadata: { founded: 2013, valuation: '$9B' }
  },
  {
    id: 'chainalysis',
    label: 'Chainalysis',
    type: 'company',
    sector: 'crypto',
    description: 'Blockchain analytics and compliance',
    color: '#ffd700',
    size: 1.6,
    metadata: { founded: 2014, funding: '$366M' }
  },
  {
    id: 'alchemy',
    label: 'Alchemy',
    type: 'company',
    sector: 'crypto',
    description: 'Web3 development platform',
    color: '#ffb90f',
    size: 1.7,
    metadata: { founded: 2017, valuation: '$10.2B' }
  },

  // ==================== SPACE SECTOR ====================
  {
    id: 'spacex',
    label: 'SpaceX',
    type: 'company',
    sector: 'space',
    description: 'Reusable rockets and Starship',
    color: '#00ffff',
    size: 2.5,
    metadata: { founded: 2002, valuation: '$180B', launches: '300+' }
  },
  {
    id: 'rocket-lab',
    label: 'Rocket Lab',
    type: 'company',
    sector: 'space',
    description: 'Small satellite launch provider',
    color: '#00ced1',
    size: 1.7,
    metadata: { founded: 2006, status: 'Public' }
  },
  {
    id: 'planet-labs',
    label: 'Planet Labs',
    type: 'company',
    sector: 'space',
    description: 'Earth imaging satellite constellation',
    color: '#40e0d0',
    size: 1.6,
    metadata: { founded: 2010, status: 'Public' }
  },
  {
    id: 'axiom-space',
    label: 'Axiom Space',
    type: 'company',
    sector: 'space',
    description: 'Commercial space station',
    color: '#48d1cc',
    size: 1.8,
    metadata: { founded: 2016, funding: '$505M' }
  },

  // ==================== AI/AGI SECTOR ====================
  {
    id: 'openai',
    label: 'OpenAI',
    type: 'company',
    sector: 'ai',
    description: 'ChatGPT, GPT-4, AGI research leader',
    color: '#ff1493',
    size: 2.6,
    metadata: { founded: 2015, valuation: '$157B', model: 'GPT-4' }
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    type: 'company',
    sector: 'ai',
    description: 'Claude AI, AI safety focused',
    color: '#c71585',
    size: 2.1,
    metadata: { founded: 2021, funding: '$7.3B' }
  },
  {
    id: 'cohere',
    label: 'Cohere',
    type: 'company',
    sector: 'ai',
    description: 'Enterprise AI language models',
    color: '#db7093',
    size: 1.5,
    metadata: { founded: 2019, funding: '$445M' }
  },
  {
    id: 'perplexity',
    label: 'Perplexity AI',
    type: 'company',
    sector: 'ai',
    description: 'AI-powered search engine',
    color: '#ff69b4',
    size: 1.4,
    metadata: { founded: 2022, valuation: '$9B' }
  },

  // ==================== CROSS-SECTOR INVESTORS ====================
  {
    id: 'a16z',
    label: 'Andreessen Horowitz',
    type: 'investor',
    sector: 'crypto',
    description: 'Leading VC with $42B AUM',
    color: '#ff4500',
    size: 2.0,
    metadata: { founded: 2009, aum: '$42B', focus: 'Crypto, AI, Bio' }
  },
  {
    id: 'founders-fund',
    label: 'Founders Fund',
    type: 'investor',
    sector: 'space',
    description: 'Peter Thiel\'s deep tech VC',
    color: '#ff6347',
    size: 1.8,
    metadata: { founded: 2005, focus: 'Space, Defense, Bio' }
  },
  {
    id: 'lux-capital',
    label: 'Lux Capital',
    type: 'investor',
    sector: 'biotech',
    description: 'Science and deep tech VC',
    color: '#ff7f50',
    size: 1.6,
    metadata: { founded: 2000, focus: 'Bio, Nuclear, Space' }
  },
  {
    id: 'breakthrough-energy',
    label: 'Breakthrough Energy',
    type: 'investor',
    sector: 'nuclear',
    description: 'Bill Gates climate tech fund',
    color: '#2e8b57',
    size: 1.9,
    metadata: { founded: 2015, focus: 'Nuclear, Clean Energy' }
  },
  {
    id: 'sequoia',
    label: 'Sequoia Capital',
    type: 'investor',
    sector: 'ai',
    description: 'Legendary VC firm',
    color: '#ff1493',
    size: 2.1,
    metadata: { founded: 1972, aum: '$85B' }
  },

  // ==================== KEY FOUNDERS ====================
  {
    id: 'elon-musk',
    label: 'Elon Musk',
    type: 'founder',
    sector: 'space',
    description: 'SpaceX, Tesla, Neuralink founder',
    color: '#00ffff',
    size: 1.8,
    metadata: { companies: 'SpaceX, Tesla, Neuralink, X' }
  },
  {
    id: 'sam-altman',
    label: 'Sam Altman',
    type: 'founder',
    sector: 'ai',
    description: 'OpenAI CEO, Y Combinator',
    color: '#ff1493',
    size: 1.7,
    metadata: { role: 'OpenAI CEO' }
  },
  {
    id: 'palmer-luckey',
    label: 'Palmer Luckey',
    type: 'founder',
    sector: 'defense',
    description: 'Anduril founder, Oculus creator',
    color: '#ff0000',
    size: 1.6,
    metadata: { previous: 'Oculus VR' }
  },
  {
    id: 'bill-gates',
    label: 'Bill Gates',
    type: 'founder',
    sector: 'nuclear',
    description: 'Microsoft, TerraPower, Breakthrough Energy',
    color: '#00ff00',
    size: 1.9,
    metadata: { focus: 'Nuclear, Climate' }
  },

  // ==================== KEY TECHNOLOGIES ====================
  {
    id: 'llm-tech',
    label: 'Large Language Models',
    type: 'technology',
    sector: 'ai',
    description: 'Transformer-based AI models',
    color: '#ff1493',
    size: 1.5,
    metadata: { category: 'AI/ML' }
  },
  {
    id: 'smr-tech',
    label: 'Small Modular Reactors',
    type: 'technology',
    sector: 'nuclear',
    description: 'Next-gen nuclear reactor design',
    color: '#00ff00',
    size: 1.4,
    metadata: { category: 'Energy' }
  },
  {
    id: 'crispr-tech',
    label: 'CRISPR Gene Editing',
    type: 'technology',
    sector: 'biotech',
    description: 'Precise DNA modification tool',
    color: '#9370db',
    size: 1.6,
    metadata: { category: 'Biotech' }
  },
  {
    id: 'reusable-rockets',
    label: 'Reusable Rockets',
    type: 'technology',
    sector: 'space',
    description: 'Dramatically reduced launch costs',
    color: '#00ffff',
    size: 1.5,
    metadata: { category: 'Aerospace' }
  },
  {
    id: 'autonomous-systems',
    label: 'Autonomous Systems',
    type: 'technology',
    sector: 'defense',
    description: 'AI-powered military platforms',
    color: '#ff0000',
    size: 1.3,
    metadata: { category: 'Defense' }
  },
  {
    id: 'blockchain',
    label: 'Blockchain',
    type: 'technology',
    sector: 'crypto',
    description: 'Distributed ledger technology',
    color: '#ffa500',
    size: 1.4,
    metadata: { category: 'Web3' }
  },

  // ==================== MAJOR HUBS ====================
  {
    id: 'sf-bay',
    label: 'San Francisco Bay Area',
    type: 'location',
    sector: 'ai',
    description: 'Global tech & AI capital',
    color: '#ff69b4',
    size: 2.0,
    metadata: { country: 'USA', companies: '50+' }
  },
  {
    id: 'dc-area',
    label: 'Washington DC',
    type: 'location',
    sector: 'defense',
    description: 'Defense tech hub',
    color: '#ff1493',
    size: 1.6,
    metadata: { country: 'USA', companies: '25+' }
  },
  {
    id: 'boston',
    label: 'Boston',
    type: 'location',
    sector: 'biotech',
    description: 'Biotech & robotics cluster',
    color: '#db7093',
    size: 1.7,
    metadata: { country: 'USA', companies: '30+' }
  },
  {
    id: 'la',
    label: 'Los Angeles',
    type: 'location',
    sector: 'space',
    description: 'Aerospace & space hub',
    color: '#00ced1',
    size: 1.5,
    metadata: { country: 'USA', companies: '20+' }
  },
];

const edges: GraphEdge[] = [
  // ==================== ROBOTICS INVESTMENTS ====================
  { id: 'e1', source: 'openai', target: 'figure-ai', type: 'investment', strength: 0.9 },
  { id: 'e2', source: 'openai', target: '1x-tech', type: 'investment', strength: 0.8 },
  
  // ==================== NUCLEAR INVESTMENTS ====================
  { id: 'n1', source: 'breakthrough-energy', target: 'terrapower', type: 'investment', strength: 1.0 },
  { id: 'n2', source: 'breakthrough-energy', target: 'oklo', type: 'investment', strength: 0.7 },
  { id: 'n3', source: 'bill-gates', target: 'terrapower', type: 'founded', strength: 1.0 },
  
  // ==================== DEFENSE INVESTMENTS ====================
  { id: 'd1', source: 'founders-fund', target: 'anduril', type: 'investment', strength: 0.9 },
  { id: 'd2', source: 'founders-fund', target: 'palantir', type: 'investment', strength: 0.8 },
  { id: 'd3', source: 'palmer-luckey', target: 'anduril', type: 'founded', strength: 1.0 },
  { id: 'd4', source: 'a16z', target: 'shield-ai', type: 'investment', strength: 0.7 },
  
  // ==================== BIOTECH INVESTMENTS ====================
  { id: 'b1', source: 'lux-capital', target: 'recursion', type: 'investment', strength: 0.8 },
  { id: 'b2', source: 'a16z', target: 'moderna', type: 'investment', strength: 0.7 },
  { id: 'b3', source: 'founders-fund', target: 'crispr-therapeutics', type: 'investment', strength: 0.8 },
  
  // ==================== CRYPTO INVESTMENTS ====================
  { id: 'c1', source: 'a16z', target: 'coinbase', type: 'investment', strength: 0.9 },
  { id: 'c2', source: 'a16z', target: 'alchemy', type: 'investment', strength: 0.8 },
  { id: 'c3', source: 'founders-fund', target: 'circle', type: 'investment', strength: 0.7 },
  
  // ==================== SPACE INVESTMENTS ====================
  { id: 's1', source: 'founders-fund', target: 'spacex', type: 'investment', strength: 1.0 },
  { id: 's2', source: 'elon-musk', target: 'spacex', type: 'founded', strength: 1.0 },
  { id: 's3', source: 'founders-fund', target: 'planet-labs', type: 'investment', strength: 0.7 },
  { id: 's4', source: 'lux-capital', target: 'axiom-space', type: 'investment', strength: 0.6 },
  
  // ==================== AI INVESTMENTS ====================
  { id: 'ai1', source: 'sequoia', target: 'openai', type: 'investment', strength: 0.9 },
  { id: 'ai2', source: 'sam-altman', target: 'openai', type: 'founded', strength: 1.0 },
  { id: 'ai3', source: 'a16z', target: 'anthropic', type: 'investment', strength: 0.8 },
  { id: 'ai4', source: 'sequoia', target: 'perplexity', type: 'investment', strength: 0.7 },
  
  // ==================== TECHNOLOGY RELATIONSHIPS ====================
  { id: 't1', source: 'openai', target: 'llm-tech', type: 'technology', strength: 1.0 },
  { id: 't2', source: 'anthropic', target: 'llm-tech', type: 'technology', strength: 0.9 },
  { id: 't3', source: 'figure-ai', target: 'llm-tech', type: 'technology', strength: 0.7 },
  { id: 't4', source: 'terrapower', target: 'smr-tech', type: 'technology', strength: 1.0 },
  { id: 't5', source: 'nuscale', target: 'smr-tech', type: 'technology', strength: 1.0 },
  { id: 't6', source: 'crispr-therapeutics', target: 'crispr-tech', type: 'technology', strength: 1.0 },
  { id: 't7', source: 'spacex', target: 'reusable-rockets', type: 'technology', strength: 1.0 },
  { id: 't8', source: 'anduril', target: 'autonomous-systems', type: 'technology', strength: 0.9 },
  { id: 't9', source: 'coinbase', target: 'blockchain', type: 'technology', strength: 0.8 },
  
  // ==================== GEOGRAPHIC RELATIONSHIPS ====================
  { id: 'g1', source: 'openai', target: 'sf-bay', type: 'geographic', strength: 0.6 },
  { id: 'g2', source: 'anthropic', target: 'sf-bay', type: 'geographic', strength: 0.6 },
  { id: 'g3', source: 'figure-ai', target: 'sf-bay', type: 'geographic', strength: 0.6 },
  { id: 'g4', source: 'coinbase', target: 'sf-bay', type: 'geographic', strength: 0.6 },
  { id: 'g5', source: 'anduril', target: 'dc-area', type: 'geographic', strength: 0.6 },
  { id: 'g6', source: 'palantir', target: 'dc-area', type: 'geographic', strength: 0.6 },
  { id: 'g7', source: 'moderna', target: 'boston', type: 'geographic', strength: 0.6 },
  { id: 'g8', source: 'boston-dynamics', target: 'boston', type: 'geographic', strength: 0.6 },
  { id: 'g9', source: 'spacex', target: 'la', type: 'geographic', strength: 0.6 },
  { id: 'g10', source: 'rocket-lab', target: 'la', type: 'geographic', strength: 0.6 },
  
  // ==================== CROSS-SECTOR SYNERGIES ====================
  { id: 'x1', source: 'openai', target: 'anduril', type: 'partnership', strength: 0.5 },
  { id: 'x2', source: 'spacex', target: 'shield-ai', type: 'partnership', strength: 0.4 },
  { id: 'x3', source: 'recursion', target: 'openai', type: 'partnership', strength: 0.6 },
];

export const graphData: GraphData = {
  nodes,
  edges,
};

// ==================== HELPER FUNCTIONS ====================

export const getSectorColor = (sector: string): string => {
  const colors: Record<string, string> = {
    robotics: '#00bfff',
    nuclear: '#00ff00',
    defense: '#ff0000',
    biotech: '#9370db',
    crypto: '#ffa500',
    space: '#00ffff',
    ai: '#ff1493',
  };
  return colors[sector] || '#888888';
};

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

export const getEdgeColorByType = (type: string): string => {
  const colors: Record<string, string> = {
    investment: '#ff8c00',
    founded: '#ffd700',
    geographic: '#ff69b4',
    technology: '#00ff7f',
    partnership: '#00bfff',
    acquisition: '#ff0000',
  };
  return colors[type] || '#666666';
};

export const SECTOR_LABELS: Record<string, string> = {
  robotics: 'Robotics',
  nuclear: 'Nuclear Energy',
  defense: 'Defense Tech',
  biotech: 'Biotechnology',
  crypto: 'Crypto/Web3',
  space: 'Space Tech',
  ai: 'AI/AGI',
};

// Stats by sector
export const getNodesBySector = (sector: string) => 
  nodes.filter(n => n.sector === sector);

export const getAllSectors = () => 
  Array.from(new Set(nodes.map(n => n.sector)));
