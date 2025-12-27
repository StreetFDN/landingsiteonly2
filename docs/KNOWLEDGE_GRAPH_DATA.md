# Knowledge Graph Data Documentation

## Overview
Comprehensive research knowledge graph covering 6 controversial and cutting-edge technology sectors with 200+ nodes representing companies, investors, and organizations.

## 6 Research Sectors

### 1. 🌱 AI Agriculture (Green)
**Focus**: Precision agriculture, vertical farming, autonomous farming equipment

**Key Companies** (25 nodes):
- **Seed Tech**: Inari ($700M+), Indigo Ag ($1.2B+), Pivot Bio ($600M+)
- **Vertical Farming**: Plenty ($900M+), Bowery Farming ($647M+), Oishii ($150M+), AeroFarms ($238M+), Iron Ox ($98M+)
- **Autonomous Equipment**: Monarch Tractor ($220M+), Carbon Robotics ($57M+), Bear Flag Robotics (Acquired by John Deere)
- **Robotics**: FarmWise ($64M+), Aigen ($19M+), Traptic ($12M+), Small Robot Company ($50M+)
- **AI Platforms**: Farmers Business Network ($1B+), Prospera ($105M+), Taranis ($60M+)
- **Precision Tech**: Blue River Technology (Acquired by John Deere)

**Key Investors** (5 nodes):
- Khosla Ventures, Breakthrough Energy, SoftBank Vision Fund, S2G Ventures, Finistere Ventures

**Geographic Clusters**:
- San Francisco Bay Area: Plenty, FarmWise, Iron Ox, Blue River
- Boston/Cambridge: Inari, Indigo Ag
- Israel: Prospera, Taranis

---

### 2. 🛡️ Military & Defense (Red)
**Focus**: Autonomous weapons, AI defense systems, surveillance, cybersecurity

**Key Companies** (20 nodes):
- **Autonomous Systems**: Anduril ($3.7B+ val), Shield AI ($1.2B+ val), Skydio ($1B+ val)
- **AI Platforms**: Palantir (Public), Scale AI ($7.3B+ val), C3.ai (Public)
- **Directed Energy**: Epirus ($694M+)
- **European Defense**: Helsing ($825M+)
- **Counter-Drone**: Fortem Technologies ($150M+)
- **Maritime**: Saronic ($195M+)
- **Intelligence**: Rebellion Defense ($200M+), Primer ($110M+)
- **Space Defense**: True Anomaly ($100M+), Umbra Lab ($152M+), Slingshot Aerospace ($70M+), Orbit Fab ($46M+)
- **Cybersecurity**: Shift5 ($130M+), Orca Security ($1.8B val)
- **Manufacturing**: Hadrian ($180M+), Hermeus ($140M+)

**Key Investors** (5 nodes):
- Founders Fund (Peter Thiel), Andreessen Horowitz, Lux Capital, Shield Capital, DataTribe

**Geographic Clusters**:
- Southern California: Anduril, Epirus, Skydio
- San Diego: Shield AI, Qualcomm (partnerships)
- Washington DC Metro: Rebellion Defense, Shift5
- Europe: Helsing (Munich)

---

### 3. 💜 AI Adult Content (Purple)
**Focus**: AI companions, chatbots, generated adult content

**Key Companies** (10 nodes):
- **AI Companions**: Character.ai ($1B+ val), Replika ($11M+), Candy AI
- **Chat Platforms**: Chai AI ($16M+), Janitor AI, CrushOn.AI, Dopple AI
- **Content Generation**: Unstable Diffusion, Civitai ($16M+)
- **Audio**: SLUSHY ($10M+)

**Key Investors** (3 nodes):
- Andreessen Horowitz, Initialized Capital, Network Capital, Accel

**Geographic Distribution**:
- Primarily remote/decentralized
- San Francisco Bay Area: Character.ai, Replika
- Global/Web3 oriented companies

---

### 4. 👁️ Surveillance Tech (Dark Blue)
**Focus**: Biometric ID, facial recognition, tracking systems

**Key Companies** (11 nodes):
- **Biometric ID**: Worldcoin ($240M+), Humanity Protocol ($30M+)
- **Facial Recognition**: Clearview AI (Controversial), PimEyes (Poland), NEC NeoFace (Japan)
- **License Plate**: Flock Safety ($420M+), Vigilant Solutions (Motorola)
- **AI Vision**: Clarifai ($100M+)
- **Event Detection**: Banjo (Controversial history)
- **Privacy Tech**: Authologic ($25M+), Truyo ($15M+)

**Privacy Organizations** (4 nodes):
- Electronic Frontier Foundation (EFF), ACLU, EPIC, Access Now

**Key Relationships**:
- **Opposition**: EFF vs Worldcoin/Flock Safety, ACLU vs Clearview AI
- **Funding**: Andreessen Horowitz (Worldcoin, Flock), Founders Fund (Clearview)

**Geographic Clusters**:
- San Francisco: Worldcoin, Clarifai
- New York: Clearview AI, ACLU
- Atlanta: Flock Safety

---

### 5. 🧬 Genetic Editing (Cyan)
**Focus**: CRISPR, gene therapy, base editing, agricultural genetics

**Key Companies** (15 nodes):
- **Public CRISPR**: CRISPR Therapeutics, Beam Therapeutics, Intellia, Editas, Precision BioSciences, Caribou Bio, Graphite Bio
- **Private Leaders**: Mammoth Biosciences ($235M+), Prime Medicine ($600M+), Synthego ($300M+), Inscripta ($633M+)
- **Next-Gen**: Verve Therapeutics, Metagenomi ($265M+), Arbor Bio ($100M+)
- **AgBio**: Pairwise ($115M+)

**Key Investors** (5 nodes):
- Flagship Pioneering, Arch Venture Partners, 8VC, Third Rock Ventures, Versant Ventures

**Geographic Clusters**:
- **Cambridge, MA Hub**: CRISPR Therapeutics, Beam, Intellia, Editas, Prime Medicine, Arbor Bio
- **Bay Area**: Mammoth Bio, Caribou Bio, Synthego, Graphite Bio
- **Other**: Precision BioSciences (Durham, NC), Inscripta (Boulder, CO)

---

### 6. 🥽 Augmented Reality (Orange)
**Focus**: AR/VR headsets, smart glasses, spatial computing

**Key Companies** (15 nodes):
- **Tech Giants**: Apple Vision Pro, Meta Quest, Microsoft HoloLens
- **Enterprise**: Varjo ($165M+), Magic Leap ($3.5B+), HTC Vive
- **Consumer**: XREAL ($320M+), Rokid ($400M+), Snap Spectacles
- **Emerging**: Mojo Vision ($220M+), Vuzix (Public), Pico (ByteDance), Lynx R-1 ($22M+), Meta Ray-Ban Stories

**Hardware Partners** (4 nodes):
- Qualcomm (Snapdragon XR), Sony Semiconductors, MicroOLED, Kopin

**Key Investors** (3 nodes):
- Google Ventures, Intel Capital, Warner Music Group

**Geographic Clusters**:
- **US West Coast**: Apple, Meta, Snap, Magic Leap, Mojo Vision
- **China**: XREAL, Rokid, Pico (ByteDance)
- **Europe**: Varjo (Helsinki), Lynx (Paris)
- **East Coast**: Vuzix (Rochester, NY)

---

## Data Structure

### Node Schema
```typescript
interface GraphNode {
  id: string;              // Unique identifier
  label: string;           // Display name
  category: string;        // Sector category
  importance: number;      // 1.0-3.0 (affects node size)
  description?: string;    // Company/org description
  location?: string;       // Geographic location
  funding?: string;        // Funding amount or status
  type?: string;           // investor, organization, partner
  founded?: string;        // Year founded
  website?: string;        // Optional URL
}
```

### Link Schema
```typescript
interface GraphLink {
  source: string;          // Source node ID
  target: string;          // Target node ID
  type: string;            // Relationship type
  value: number;           // Connection strength (1-5)
}
```

### Relationship Types
- **funded-by**: VC investment relationships
- **founded-by**: Founder relationships
- **partners-with**: Strategic partnerships
- **collaborates**: Business collaboration
- **competes**: Direct competition
- **criticized-by**: Opposition/criticism
- **sued-by**: Legal action
- **monitored-by**: Watchdog observation
- **co-invests**: Joint investment patterns
- **data-partnership**: Data sharing agreements
- **related-tech**: Similar technology

---

## Performance Optimizations

### For 200+ Nodes:
1. **Force Simulation Settings**:
   - `alphaDecay: 0.02` - Faster convergence
   - `velocityDecay: 0.4` - Better stability
   - Link strength: 0.3 (reduced from default)
   - Charge strength: -200 (reduced from -300)

2. **Visual Optimizations**:
   - Link opacity: 0.3 (reduced for clarity)
   - Node radius: `importance * 8` (smaller for density)
   - Font size: 10px (readable but compact)
   - Hover effects to highlight connections

3. **Filtering System**:
   - Sector-based filtering (reduces displayed nodes)
   - Search functionality (text-based filtering)
   - Category grouping for logical organization

---

## Usage

### Using JSON Data
```typescript
<KnowledgeGraph 
  dataUrl="/data/comprehensive-research-graph.json"
  width={1400}
  height={900}
/>
```

### Using TypeScript Module
```typescript
import graphData from '@/lib/graphdata';

// Access nodes
const companies = graphData.nodes.filter(n => n.type !== 'investor');
const investors = graphData.nodes.filter(n => n.type === 'investor');

// Access by sector
const aiAg = graphData.nodes.filter(n => 
  n.category.includes('ai-agriculture')
);
```

---

## Data Sources & Research
- Crunchbase for funding data
- PitchBook for valuations
- Company websites and press releases
- Public SEC filings (for public companies)
- News sources: TechCrunch, Bloomberg, The Information
- Industry reports and analyst coverage

---

## Future Expansions

### To Reach 300+ Nodes:
1. **Add Sub-sectors**:
   - Climate Tech (Carbon Capture, Renewables)
   - Nuclear Energy (Small Modular Reactors, Fusion)
   - Longevity/Anti-Aging
   - Brain-Computer Interfaces
   - Quantum Computing

2. **Expand Geographic Coverage**:
   - More European companies
   - Asian market leaders
   - Emerging markets

3. **Add More Relationship Types**:
   - Acquisition relationships
   - Patent litigation
   - Regulatory actions
   - Partnership networks

4. **Enhanced Metadata**:
   - Employee counts
   - Revenue data (when public)
   - Technology stack
   - Key executives

---

## Color Coding

| Sector | Primary Color | Secondary Color | Hex Codes |
|--------|--------------|-----------------|-----------|
| AI Agriculture | Green | Light Green | #4CAF50, #66BB6A |
| Military & Defense | Red | Light Red | #E53935, #EF5350 |
| AI Adult Content | Purple | Light Purple | #9C27B0, #BA68C8 |
| Surveillance Tech | Dark Blue | Blue | #1565C0, #1976D2 |
| Genetic Editing | Cyan | Light Cyan | #00BCD4, #26C6DA |
| Augmented Reality | Orange | Light Orange | #FF9800, #FFB74D, #FFA726 |

---

## Contributing

To add new nodes or relationships:

1. Add node data to appropriate sector array in `lib/graphdata.ts`
2. Add relationship links in `allLinks` array
3. Update this documentation with new entries
4. Test performance with increased node count
5. Verify visual clarity and readability

---

## License & Attribution

This data is compiled from public sources for research and educational purposes. Company information is subject to change. Funding amounts and valuations are approximate based on public reporting.

Last Updated: December 2025
Total Nodes: 200+
Total Links: 150+
