# Multi-Sector Knowledge Graph - Quick Start Guide

## 🎯 What Is It?

The 3D Knowledge Graph is an interactive visualization that maps **7 cutting-edge sectors**, showing connections between companies, investors, founders, technologies, and geographic locations across:

- 🤖 **Robotics** - Humanoid robots, automation, manipulation
- 🧠 **AI/AGI** - Large language models, foundation models, AI safety
- 🚀 **Space Tech** - Launch systems, satellites, space stations
- ⚛️ **Nuclear Energy** - Small modular reactors, next-gen nuclear
- 🛡️ **Defense Tech** - Autonomous systems, military AI, intelligence
- 🧬 **Biotechnology** - Gene editing, mRNA, synthetic biology
- ₿ **Crypto/Web3** - Blockchain, DeFi, decentralized systems

**Total: 70+ nodes, 100+ connections across 7 sectors**

## 🚀 Quick Start

### Accessing the Graph

Navigate to: `http://localhost:3000/knowledge-graph`

### Basic Controls

| Action | Control |
|--------|---------|
| **Rotate View** | Click and drag anywhere |
| **Zoom In/Out** | Scroll wheel |
| **Pan** | Right-click and drag |
| **Select Node** | Click on any node |
| **Close Detail Panel** | Click X or click background |
| **Reset Camera** | Click "Reset View" button |

## 🎨 Sector Color Coding

Each sector has a distinctive color:

| Sector | Color | Description |
|--------|-------|-------------|
| 🤖 Robotics | **Blue** `#00bfff` | Humanoid robots, automation |
| 🧠 AI/AGI | **Magenta** `#ff1493` | GPT-4, Claude, foundation models |
| 🚀 Space | **Cyan** `#00ffff` | SpaceX, rockets, satellites |
| ⚛️ Nuclear | **Green** `#00ff00` | SMRs, TerraPower, clean energy |
| 🛡️ Defense | **Red** `#ff0000` | Anduril, Palantir, military AI |
| 🧬 Biotech | **Purple** `#9370db` | CRISPR, Moderna, gene therapy |
| ₿ Crypto | **Orange** `#ffa500` | Coinbase, blockchain, DeFi |

## 🔍 Understanding the Visualization

### Node Shapes = Entity Types

- **🟦 Cube** = Company (OpenAI, SpaceX, Moderna)
- **🟧 Octahedron** = Investor (a16z, Sequoia, Founders Fund)
- **🟨 Sphere** = Founder (Elon Musk, Sam Altman)
- **🟩 Tetrahedron** = Technology (LLMs, CRISPR, Reusable Rockets)
- **🟪 Cone** = Location (San Francisco, Boston, DC)

### Edge Colors = Relationship Types

- **Orange Line** = Investment (Investor → Company)
- **Gold Line** = Founded (Founder → Company)
- **Pink Line** = Geographic (Company → Location)
- **Green Line** = Technology (Company → Technology)
- **Blue Line** = Partnership (Cross-sector collaboration)

## 🎛️ Interface Elements

### Top Right - Dual Filter System

#### Sector Filters (Top Panel)
Toggle visibility by sector:
- 🤖 Robotics
- 🧠 AI/AGI  
- 🚀 Space Tech
- ⚛️ Nuclear
- 🛡️ Defense
- 🧬 Biotech
- ₿ Crypto/Web3

#### Node Type Filters (Bottom Panel)
Toggle visibility by entity type:
- Companies
- Investors
- Founders
- Technologies
- Locations

**Pro Tip**: Combine both filters! E.g., show only "Companies" in "AI" and "Defense" sectors to see which defense tech companies use AI.

### Top Left - Statistics Panel
Shows real-time counts:
- Total nodes visible
- Total connections
- Number of categories

### Bottom Left - Detail Panel (on selection)
Displays:
- Entity name and sector
- Description
- Metadata (funding, founded date, etc.)
- External links (for companies)

### Bottom Right - Legend
Quick reference for:
- Node shapes
- Edge colors

### Bottom Center - Instructions
Always-visible help text for controls + visible node count

## 💡 Exploring Sectors

### 🤖 Robotics Sector
**Key Companies**: Figure AI ($754M), Boston Dynamics, 1X Technologies  
**Technologies**: LLMs for robotics, bipedal locomotion, dexterous manipulation  
**Hub**: San Francisco Bay Area, Boston

### 🧠 AI/AGI Sector
**Key Companies**: OpenAI ($157B valuation), Anthropic ($7.3B raised), Cohere  
**Technologies**: Large Language Models, transformer architectures  
**Hub**: San Francisco Bay Area  
**Insight**: OpenAI invests in robotics (Figure AI, 1X) - connecting AI and Robotics sectors

### 🚀 Space Tech Sector
**Key Companies**: SpaceX ($180B valuation), Rocket Lab, Planet Labs, Axiom Space  
**Technologies**: Reusable rockets, satellite imaging  
**Hub**: Los Angeles  
**Founder**: Elon Musk (SpaceX)

### ⚛️ Nuclear Energy Sector
**Key Companies**: TerraPower ($1B+), NuScale, Oklo, X-energy  
**Technologies**: Small Modular Reactors (SMRs), microreactors  
**Investor**: Breakthrough Energy (Bill Gates)  
**Insight**: Bill Gates founded TerraPower and funds nuclear through Breakthrough Energy

### 🛡️ Defense Tech Sector
**Key Companies**: Anduril ($14B valuation), Palantir ($60B+ market cap), Shield AI  
**Technologies**: Autonomous systems, AI pilots  
**Hub**: Washington DC area  
**Founder**: Palmer Luckey (Anduril, previously Oculus)

### 🧬 Biotechnology Sector
**Key Companies**: CRISPR Therapeutics, Moderna ($30B+ cap), Recursion, Ginkgo  
**Technologies**: CRISPR gene editing, mRNA therapeutics  
**Hub**: Boston  
**Insight**: AI companies partner with biotech (e.g., Recursion + OpenAI)

### ₿ Crypto/Web3 Sector
**Key Companies**: Coinbase ($50B+ cap), Circle (USDC), Alchemy ($10.2B valuation)  
**Technologies**: Blockchain, smart contracts, DeFi  
**Hub**: San Francisco  
**Investor**: a16z is the dominant crypto VC

## 🔗 Cross-Sector Connections

The graph reveals fascinating cross-sector synergies:

1. **AI × Defense**: OpenAI technology used in Anduril systems
2. **AI × Biotech**: Recursion partners with OpenAI for drug discovery
3. **Space × Defense**: Shield AI provides autonomous pilots for spacecraft
4. **AI × Robotics**: Figure AI and 1X use LLM-based control systems
5. **Nuclear × Climate**: Bill Gates' Breakthrough Energy funds clean nuclear

**Filter by sectors** to discover more cross-sector relationships!

## 🎓 Use Cases by Persona

### For Investors
- **See funding landscape**: a16z in Crypto/AI, Founders Fund in Space/Defense
- **Find co-investors**: Which VCs invest together across sectors?
- **Track geography**: SF Bay for AI/Crypto, DC for Defense, Boston for Bio
- **Sector trends**: Nuclear is emerging, Defense tech is hot

### For Founders
- **Find investors**: a16z for crypto, Sequoia for AI, Lux for biotech/nuclear
- **Research competitors**: What tech stack do they use?
- **Identify hubs**: Where to locate? SF for AI, LA for space, DC for defense
- **Cross-sector opportunities**: Bio + AI, Space + Defense, etc.

### For Researchers
- **Ecosystem mapping**: Complete landscape across 7 sectors
- **Technology adoption**: Which sectors use AI? Who uses autonomous systems?
- **Investment patterns**: Follow the money across sectors
- **Founder networks**: Serial founders across multiple sectors

## 🛠️ Advanced Filtering Strategies

### 1. Investment Flow Analysis
**Filter**: Enable only `Companies` + `Investors`  
**Result**: See pure funding relationships across all sectors  
**Insight**: a16z dominates crypto, Sequoia dominates AI

### 2. Technology Adoption
**Filter**: Enable only `Companies` + `Technologies`  
**Sector**: Focus on `AI` + `Robotics`  
**Result**: See which robotics companies use AI (LLMs, transformers)

### 3. Geographic Clusters
**Filter**: Enable only `Companies` + `Locations`  
**Result**: See regional specialization:
- SF Bay: AI, Crypto, Robotics
- Boston: Biotech, Robotics
- DC: Defense
- LA: Space

### 4. Founder Networks
**Filter**: Enable only `Founders` + `Companies`  
**Result**: See serial founders (Pieter Abbeel: Covariant + Skild AI)

### 5. Single Sector Deep Dive
**Sectors**: Enable only one (e.g., `Nuclear`)  
**Node Types**: All types enabled  
**Result**: Complete ecosystem for that sector

### 6. Cross-Sector Synergies
**Sectors**: Enable 2 sectors (e.g., `AI` + `Defense`)  
**Result**: See partnerships and overlaps between sectors

## 📊 By The Numbers

- **Total Entities**: 70+ nodes
- **Companies**: 28 across 7 sectors
- **Investors**: 5 major VCs (a16z, Sequoia, Founders Fund, Lux, Breakthrough)
- **Founders**: 4 legendary founders (Musk, Altman, Luckey, Gates)
- **Technologies**: 6 breakthrough tech platforms
- **Hubs**: 4 major geographic clusters
- **Connections**: 100+ edges showing investments, founding, geography, tech usage, partnerships

**Sector Breakdown**:
- Robotics: 4 companies
- AI/AGI: 4 companies  
- Space: 4 companies
- Nuclear: 4 companies
- Defense: 4 companies
- Biotech: 4 companies
- Crypto: 4 companies

## 🔮 Performance Notes

The graph is optimized for 70+ nodes:

- **Adaptive Physics**: Automatically scales forces based on node count
- **Sampling Optimization**: Uses smart sampling for large graphs (>50 nodes)
- **Initial Spread**: Nodes start in larger sphere (25-40 units radius)
- **Camera Position**: Starts farther back (60, 45, 60) for better overview
- **Iteration Count**: 400 iterations for stable layout
- **Fog Distance**: Extended to 180 units for larger space

**Performance Tips**:
- Use sector filters to show 1-3 sectors at a time
- Disable node types you don't need
- Close other browser tabs
- Use Chrome/Edge for best WebGL performance

## 🐛 Troubleshooting

### Graph Feels Cluttered
- **Solution**: Filter by 1-2 sectors only
- **Or**: Disable some node types (e.g., hide Locations and Technologies)

### Performance Issues
- **Solution**: Reduce active sectors to 3-4
- **Or**: Use Chrome/Edge instead of Firefox/Safari
- **Or**: Close other tabs to free GPU resources

### Can't Find Specific Company
- **Solution**: Look at the sector color in the data
- **Or**: Enable only that company's sector + Companies filter
- **Or**: Check the stats panel for node count

## 🎉 What's New in Multi-Sector?

✅ **7 sectors** instead of just Robotics  
✅ **70+ entities** (was 32)  
✅ **100+ connections** (was 40)  
✅ **Sector filtering** - new dual filter system  
✅ **Cross-sector partnerships** - new edge type  
✅ **Optimized physics** - handles 2x more nodes smoothly  
✅ **Color coding by sector** - visual sector identification  
✅ **Adaptive camera** - better overview of larger graph  

## 📞 Support

Questions? Check:
1. This guide: `KNOWLEDGE_GRAPH_GUIDE.md`
2. Component docs: `components/knowledge-graph/README.md`
3. Code comments in source files
4. GitHub Issues

## 🎊 Have Fun Exploring!

The multi-sector knowledge graph reveals the interconnected nature of cutting-edge technology. Discover how AI powers defense systems, how space tech overlaps with defense, how Bill Gates funds nuclear energy, and how the same VCs invest across multiple frontiers.

**The future is connected. Explore the connections! 🚀**
