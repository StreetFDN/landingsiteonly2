# Knowledge Graph Quick Start Guide

## 🚀 Getting Started

The knowledge graph visualization is now available with **200+ nodes** across **6 research sectors**:

🌱 AI Agriculture • 🛡️ Military & Defense • 💜 AI Adult Content • 👁️ Surveillance Tech • 🧬 Genetic Editing • 🥽 Augmented Reality

---

## 📍 Accessing the Graph

### Option 1: Web Interface
Navigate to: `/knowledge-graph` on your deployed site

### Option 2: Component Integration
```tsx
import KnowledgeGraph from '@/components/KnowledgeGraph';

export default function Page() {
  return (
    <KnowledgeGraph 
      dataUrl="/data/comprehensive-research-graph.json"
      width={1400}
      height={900}
    />
  );
}
```

### Option 3: TypeScript Data Import
```typescript
import { graphData, allNodes, allLinks } from '@/lib/graphdata';

// Use the data directly
console.log(`Total nodes: ${allNodes.length}`);
console.log(`Total connections: ${allLinks.length}`);

// Filter by sector
const militaryCompanies = allNodes.filter(n => 
  n.category === 'military-defense'
);

// Find specific company
const anduril = allNodes.find(n => n.id === 'anduril');
```

---

## 🎮 Interactive Controls

### Filtering
- **Sector Filter**: Use dropdown to view specific sectors
- **Search**: Type company name, location, or keywords
- **Reset**: Clear all filters to view full graph

### Navigation
- **Zoom**: Mouse wheel or pinch gesture
- **Pan**: Click and drag background
- **Node Drag**: Click and drag individual nodes
- **Hover**: Highlight connections
- **Click**: View detailed information panel

---

## 🔍 Example Queries

### Find All VCs Funding Defense Tech
```typescript
import { allNodes, allLinks } from '@/lib/graphdata';

const defenseVCs = allNodes.filter(n => 
  n.category === 'defense-vc'
);

const investments = allLinks.filter(l => 
  l.type === 'funded-by' && 
  defenseVCs.some(vc => vc.id === l.target)
);

console.log(`${defenseVCs.length} VCs made ${investments.length} investments`);
```

### Find Geographic Clusters
```typescript
const bayAreaCompanies = allNodes.filter(n => 
  n.location?.includes('San Francisco') ||
  n.location?.includes('Palo Alto') ||
  n.location?.includes('Menlo Park')
);

console.log(`${bayAreaCompanies.length} companies in Bay Area`);
```

### Analyze Competition
```typescript
const competitions = allLinks.filter(l => l.type === 'competes');
const competitors = new Set(
  competitions.flatMap(l => [l.source, l.target])
);

console.log(`${competitors.size} companies in direct competition`);
```

---

## 📊 Sector Breakdown

| Sector | Companies | Investors | Total Nodes |
|--------|-----------|-----------|-------------|
| 🌱 AI Agriculture | 20 | 5 | 25 |
| 🛡️ Military & Defense | 20 | 5 | 25 |
| 💜 AI Adult Content | 10 | 3 | 13 |
| 👁️ Surveillance Tech | 11 | 4 | 15 |
| 🧬 Genetic Editing | 15 | 5 | 20 |
| 🥽 Augmented Reality | 15 | 7 | 22 |
| **Total** | **91** | **29** | **120+** |

*Note: Additional support nodes and partners bring total to 200+*

---

## 🎨 Visual Customization

### Modify Colors
Edit `components/KnowledgeGraph.tsx`:

```typescript
const categoryColors: Record<string, string> = {
  'ai-agriculture': '#4CAF50',        // Green
  'military-defense': '#E53935',      // Red
  'ai-adult-content': '#9C27B0',      // Purple
  'surveillance-tech': '#1565C0',     // Dark Blue
  'genetic-editing': '#00BCD4',       // Cyan
  'augmented-reality': '#FF9800',     // Orange
};
```

### Adjust Node Sizes
```typescript
// In KnowledgeGraph.tsx
.attr('r', (d) => (d.importance ? d.importance * 10 : 20))
```

### Change Force Simulation
```typescript
const simulation = d3
  .forceSimulation(filteredNodes)
  .force('charge', d3.forceManyBody().strength(-300))  // Repulsion
  .force('collision', d3.forceCollide().radius(40));   // Collision
```

---

## 🔧 Performance Tips

### For Large Graphs (200+ nodes)
1. **Use sector filtering** - Reduces visible nodes
2. **Limit initial links** - Only show high-value connections
3. **Implement LOD** - Level of detail based on zoom
4. **Canvas rendering** - Switch from SVG for >500 nodes

### Optimization Settings
```typescript
.alphaDecay(0.02)      // Faster convergence
.velocityDecay(0.4)    // Better stability
```

### Memory Management
```typescript
// Stop simulation when not in view
useEffect(() => {
  return () => {
    simulation.stop();
  };
}, []);
```

---

## 📱 Mobile Responsiveness

The graph automatically adapts to screen size:

```typescript
const isMobile = window.innerWidth < 768;
const width = isMobile ? window.innerWidth : 1400;
const height = isMobile ? window.innerHeight - 200 : 900;
```

---

## 🔗 Key Relationships

### Funding Networks
```typescript
// Find top investors by portfolio size
const investorPortfolios = new Map();

allLinks
  .filter(l => l.type === 'funded-by')
  .forEach(l => {
    const count = investorPortfolios.get(l.target) || 0;
    investorPortfolios.set(l.target, count + 1);
  });

// Sort by most investments
const topInvestors = [...investorPortfolios.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);
```

### Competition Analysis
```typescript
// Find most competitive sectors
const sectorCompetition = {};

allLinks
  .filter(l => l.type === 'competes')
  .forEach(l => {
    const source = allNodes.find(n => n.id === l.source);
    const sector = source?.category || 'unknown';
    sectorCompetition[sector] = (sectorCompetition[sector] || 0) + 1;
  });
```

---

## 🚨 Controversial Sectors

### High Sensitivity Areas
- **Surveillance Tech**: Privacy concerns, civil liberties
- **Military & Defense**: Ethical AI, autonomous weapons
- **AI Adult Content**: Age verification, consent
- **Genetic Editing**: CRISPR ethics, designer babies

### Opposition Relationships
```typescript
// Find advocacy organization opposition
const oppositionLinks = allLinks.filter(l => 
  l.type === 'criticized-by' || 
  l.type === 'sued-by' ||
  l.type === 'monitored-by'
);
```

---

## 📈 Data Updates

### Adding New Companies
1. Edit `lib/graphdata.ts`
2. Add to appropriate sector array
3. Define relationships in `allLinks`
4. Update documentation

### Example Addition
```typescript
// Add new company
const newCompany: GraphNode = {
  id: "new-startup",
  label: "New Startup",
  category: "ai-agriculture",
  importance: 2.5,
  description: "Description here",
  location: "San Francisco, CA",
  funding: "50M+",
  founded: "2024"
};

// Add to array
aiAgricultureNodes.push(newCompany);

// Add relationships
allLinks.push({
  source: "new-startup",
  target: "khosla-ventures",
  type: "funded-by",
  value: 3
});
```

---

## 🐛 Troubleshooting

### Graph Not Loading
1. Check data file path in component
2. Verify JSON syntax
3. Check browser console for errors

### Performance Issues
1. Reduce node count with filtering
2. Decrease link opacity
3. Increase alpha decay rate
4. Consider WebGL rendering

### Overlap Issues
1. Increase collision radius
2. Adjust charge strength
3. Implement force boundaries

---

## 📚 Additional Resources

- [Full Data Documentation](./KNOWLEDGE_GRAPH_DATA.md)
- [Component Documentation](../KNOWLEDGE_GRAPH_README.md)
- [D3.js Force Documentation](https://d3js.org/d3-force)
- [React + D3 Best Practices](https://2019.wattenberger.com/blog/react-and-d3)

---

## 🤝 Contributing

Want to add more sectors or companies?

1. Fork the repository
2. Add data to `lib/graphdata.ts`
3. Update documentation
4. Submit pull request with research sources

### Suggested Expansions
- Climate Tech (Carbon Capture, Solar)
- Nuclear Energy (SMRs, Fusion)
- Brain-Computer Interfaces (Neuralink, etc.)
- Quantum Computing
- Longevity/Anti-Aging
- Space Infrastructure

---

## 📧 Contact

For questions or data corrections:
- Open an issue on GitHub
- Email: [your-email]
- Discord: [your-server]

---

**Last Updated**: December 2025  
**Current Node Count**: 200+  
**Sectors**: 6  
**Ready for expansion to 300+ nodes**
