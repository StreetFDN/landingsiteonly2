# Knowledge Graph - Quick Start Guide

## 🎯 What Is It?

The 3D Knowledge Graph is an interactive visualization that maps the robotics ecosystem, showing connections between companies, investors, founders, technologies, and geographic locations.

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

### Understanding the Visualization

#### Node Shapes = Entity Types

- **🟦 Cube** = Company (e.g., OpenDroids, Figure AI)
- **🟧 Octahedron** = Investor (e.g., Street Labs, OpenAI)
- **🟨 Sphere** = Founder (e.g., Pieter Abbeel)
- **🟩 Tetrahedron** = Technology (e.g., LLM Control)
- **🟪 Cone** = Location (e.g., San Francisco)

#### Edge Colors = Relationship Types

- **Orange Line** = Investment (Investor → Company)
- **Gold Line** = Founded (Founder → Company)
- **Pink Line** = Geographic (Company → Location)
- **Green Line** = Technology (Company → Technology)

## 🎨 Interface Elements

### Top Left - Statistics Panel
Shows real-time counts:
- Total nodes visible
- Total connections
- Number of categories

### Top Right - Filter Controls
Toggle visibility by node type:
- Companies
- Investors
- Founders
- Technologies
- Locations

### Bottom Left - Detail Panel (on selection)
Displays:
- Entity name and type
- Description
- Metadata (funding, sector, etc.)
- External links (for companies)

### Bottom Right - Legend
Quick reference for:
- Node shapes
- Edge colors

### Bottom Center - Instructions
Always-visible help text for controls

## 💡 Tips & Tricks

### Exploring the Graph

1. **Start with Overview**: Let the graph settle after loading (takes ~2 seconds)
2. **Auto-Rotate**: The graph slowly rotates automatically - drag to take manual control
3. **Zoom Smart**: Get close to see details, zoom out for big picture
4. **Follow Connections**: Selected nodes highlight their connections

### Filtering

1. **Focus on Categories**: Disable categories you don't need
2. **Find Patterns**: Enable only 2-3 types to see specific relationships
3. **Companies + Investors**: See funding relationships
4. **Companies + Technologies**: See tech adoption patterns
5. **Companies + Locations**: See geographic clusters

### Finding Specific Information

**To find investment relationships:**
1. Filter to show only Companies + Investors
2. Look for orange connections
3. Click nodes for funding details

**To explore technology adoption:**
1. Filter to show Companies + Technologies
2. Look for green connections
3. Click tech nodes to see who uses them

**To see geographic clusters:**
1. Filter to show Companies + Locations
2. Pink connections show where companies are based
3. Click location nodes to see all local companies

### Performance Tips

**If the graph feels slow:**
1. Use filters to show fewer nodes
2. Disable auto-rotate (edit page.tsx)
3. Close other browser tabs
4. Use Chrome/Edge (best WebGL performance)

## 🔍 Dataset Overview

### Current Data Includes

**Companies (10):**
- OpenDroids, Figure AI, 1X Technologies
- Boston Dynamics, Agility Robotics
- Sanctuary AI, Covariant
- Skild AI, Physical Intelligence
- Apptronik

**Investors (7):**
- Street Labs, OpenAI, Microsoft
- Amazon, NVIDIA
- Khosla Ventures, Lux Capital

**Founders (5):**
- Brett Adcock (Figure AI)
- Pieter Abbeel (Covariant, Skild AI)
- Geordie Rose (Sanctuary AI)
- And more...

**Technologies (6):**
- LLM-based Control
- Sim-to-Real Transfer
- Dexterous Manipulation
- Bipedal Locomotion
- Vision Transformers
- NVIDIA Isaac

**Locations (4):**
- San Francisco (15+ companies)
- Boston (8+ companies)
- Vancouver (4+ companies)
- Oslo (2+ companies)

## 🎓 Learning Use Cases

### For Investors
- **See funding landscape**: Who's investing in what?
- **Find co-investors**: Which VCs invest together?
- **Track geography**: Where are robotics hubs?
- **Tech trends**: Which technologies are most adopted?

### For Founders
- **Find investors**: Who invests in your category?
- **Research competitors**: What tech do they use?
- **Identify hubs**: Where to locate your company?
- **Network mapping**: Who knows who?

### For Researchers
- **Ecosystem mapping**: Full robotics landscape
- **Relationship analysis**: How entities connect
- **Technology adoption**: What tech is popular?
- **Geographic distribution**: Regional clusters

## 🛠️ Customization

Want to add your own data? Edit `components/knowledge-graph/graphdata.ts`:

```typescript
const nodes: GraphNode[] = [
  {
    id: 'my-company',
    label: 'My Amazing Robotics Company',
    type: 'company',
    description: 'We build awesome robots',
    color: '#00bfff',
    size: 1.5,
    metadata: {
      founded: 2024,
      sector: 'Humanoid Robotics',
      funding: '$5M'
    }
  },
  // Add more nodes...
];

const edges: GraphEdge[] = [
  {
    id: 'e1',
    source: 'street-labs',
    target: 'my-company',
    type: 'investment',
    strength: 0.9
  },
  // Add more edges...
];
```

## 🐛 Troubleshooting

### Graph Doesn't Load
- **Check console**: Press F12 to see errors
- **Refresh page**: Sometimes WebGL needs a restart
- **Try different browser**: Chrome/Edge work best
- **Update drivers**: Ensure graphics drivers are current

### Performance Issues
- **Reduce filters**: Show fewer node types
- **Close other apps**: Free up GPU resources
- **Lower quality**: Edit postprocessing settings
- **Check GPU usage**: Use Task Manager

### Nodes Overlap Too Much
- Edit `components/knowledge-graph/graph3d.tsx`
- Increase `repulsionStrength` to spread nodes
- Increase `minDistance` for more space

### Connections Too Loose/Tight
- Edit `components/knowledge-graph/graph3d.tsx`
- Adjust `attractionStrength` for edge tension
- Modify `maxDistance` for connection limits

## 📊 Advanced Features

### Physics Simulation
The graph uses a custom force-directed algorithm:
- **Repulsion**: Nodes push each other away
- **Attraction**: Connected nodes pull together
- **Centering**: Keeps graph centered
- **Damping**: Stabilizes movement

Runs for ~400 iterations at startup, then static.

### Visual Effects
- **Bloom**: Glowing nodes and edges
- **Vignette**: Subtle edge darkening
- **Fog**: Depth perception
- **Stars**: Atmospheric background
- **Ambient Light**: Soft illumination
- **Point Lights**: Colored accent lighting

## 🔮 Future Ideas

Potential enhancements:
- [ ] Search bar to find specific nodes
- [ ] Timeline filter (show graph evolution)
- [ ] Path finding (shortest path between nodes)
- [ ] Community detection (automatic clustering)
- [ ] Export to image/PDF
- [ ] Share specific views via URL
- [ ] Mobile touch controls
- [ ] VR mode
- [ ] Real-time data updates
- [ ] Node importance metrics

## 📞 Support

Questions? Check:
1. Main README: `README.md`
2. Component docs: `components/knowledge-graph/README.md`
3. Code comments in source files
4. GitHub Issues

## 🎉 Have Fun Exploring!

The knowledge graph is designed to be intuitive and fun. Don't be afraid to click around, zoom in/out, and explore connections. The worst that can happen is you need to click "Reset View"!

**Happy exploring! 🚀**
