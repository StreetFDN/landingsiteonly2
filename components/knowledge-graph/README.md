# 3D Knowledge Graph Visualization

A stunning 3D interactive knowledge graph visualization for exploring the robotics ecosystem, built with Next.js, Three.js, and React Three Fiber.

## 🌟 Features

### Visual Features
- **3D Force-Directed Layout**: Physics-based graph layout using custom force simulation
- **Premium Visual Effects**: Bloom, vignette, and post-processing effects
- **Dynamic Node Types**: 5 different node shapes (cube, octahedron, sphere, tetrahedron, cone)
- **Animated Edges**: Color-coded connections with dynamic opacity
- **Glow Effects**: Nodes emit light and have ambient glow
- **Dark Background**: Professional dark theme with stars
- **Smooth Animations**: Pulsing selected nodes and smooth transitions

### Interactive Features
- **Node Selection**: Click any node to view detailed information
- **Camera Controls**: 
  - Rotate: Drag with mouse
  - Zoom: Scroll wheel
  - Pan: Right-click and drag
  - Auto-rotate: Subtle automatic rotation
- **Filtering**: Toggle visibility of node types (companies, investors, founders, technologies, locations)
- **Reset View**: Return camera to initial position
- **Hover Effects**: Nodes highlight and show labels on hover

### Data Features
- **Comprehensive Dataset**: 40+ nodes covering the robotics ecosystem
- **Multiple Edge Types**: 
  - Investment relationships
  - Founder connections
  - Geographic clusters
  - Technology relationships
- **Rich Metadata**: Each node includes detailed information
- **Real Data**: Based on actual robotics companies and relationships

## 📁 File Structure

```
components/knowledge-graph/
├── types.ts                  # TypeScript type definitions
├── graphdata.ts              # Comprehensive robotics dataset
├── forcesimulation.ts        # Physics-based force simulation
├── graph3d.tsx               # Main 3D graph component
├── graphnode.tsx             # Individual node component
├── graphedge.tsx             # Edge rendering component
├── graphcontrols.tsx         # Filter controls UI
├── detailpanel.tsx           # Node detail sidebar
├── legend.tsx                # Legend for node/edge types
├── graphstats.tsx            # Statistics panel
└── README.md                 # This file

app/knowledge-graph/
└── page.tsx                  # Main page component
```

## 🎨 Node Types

| Type | Shape | Color | Description |
|------|-------|-------|-------------|
| Company | Cube | Blue (#00bfff) | Robotics companies |
| Investor | Octahedron | Orange (#ff8c00) | Venture capital firms |
| Founder | Sphere | Gold (#ffd700) | Company founders |
| Technology | Tetrahedron | Green (#00ff7f) | Key technologies |
| Location | Cone | Pink (#ff69b4) | Geographic hubs |

## 🔗 Edge Types

| Type | Color | Description |
|------|-------|-------------|
| Investment | Orange (#ff8c00) | Investor → Company |
| Founded | Gold (#ffd700) | Founder → Company |
| Geographic | Pink (#ff69b4) | Company → Location |
| Technology | Green (#00ff7f) | Company → Technology |

## 🚀 Usage

### Basic Implementation

The knowledge graph is automatically available at `/knowledge-graph` route.

### Customizing the Dataset

Edit `components/knowledge-graph/graphdata.ts` to add or modify nodes and edges:

```typescript
const nodes: GraphNode[] = [
  {
    id: 'my-company',
    label: 'My Company',
    type: 'company',
    description: 'Description here',
    color: '#00bfff',
    size: 1.5,
    metadata: {
      founded: 2024,
      sector: 'Robotics',
    }
  },
  // ... more nodes
];

const edges: GraphEdge[] = [
  {
    id: 'e1',
    source: 'investor-id',
    target: 'company-id',
    type: 'investment',
    strength: 0.9,
  },
  // ... more edges
];
```

### Adjusting Force Simulation

Modify simulation parameters in `components/knowledge-graph/graph3d.tsx`:

```typescript
const simulation = new ForceSimulation(
  nodes,
  edges,
  {
    repulsionStrength: 120,      // Node repulsion (higher = more spread)
    attractionStrength: 0.08,    // Edge attraction (higher = tighter)
    centeringForce: 0.008,       // Pull toward center
    damping: 0.85,               // Velocity damping (lower = more bouncy)
    minDistance: 4,              // Minimum node separation
    maxDistance: 60,             // Maximum edge length
  }
);
```

### Customizing Visual Effects

Edit post-processing in `app/knowledge-graph/page.tsx`:

```typescript
<EffectComposer>
  <Bloom
    intensity={0.5}              // Glow intensity
    luminanceThreshold={0.2}     // Brightness threshold
    luminanceSmoothing={0.9}     // Smoothness
    height={300}                 // Quality
  />
  <Vignette 
    eskil={false} 
    offset={0.1}                 // Edge darkening start
    darkness={0.5}               // Edge darkness amount
  />
</EffectComposer>
```

## 🎯 Performance Optimization

### Already Implemented
- Memoized geometry and materials
- Efficient force simulation (runs once on mount)
- Conditional rendering based on filters
- Optimized re-renders using React best practices
- GPU-accelerated rendering via WebGL

### Tips for Large Datasets
1. **Limit visible nodes**: Use filters to show subsets
2. **Reduce simulation iterations**: Lower from 400 to 200-300
3. **Simplify geometries**: Use lower polygon counts
4. **Disable auto-rotate**: Set `autoRotate={false}` in OrbitControls
5. **Reduce post-processing**: Lower bloom quality or disable effects

## 🔧 Technical Details

### Force Simulation Algorithm

The custom force simulation implements:

1. **Repulsion Force**: Nodes push each other away (inverse square law)
2. **Attraction Force**: Connected nodes pull together (linear with distance)
3. **Centering Force**: Gentle pull toward origin
4. **Damping**: Velocity reduction for stability
5. **Distance Constraints**: Min/max bounds for forces

### Rendering Pipeline

1. React component lifecycle
2. Force simulation calculates positions
3. Three.js renders 3D scene
4. Post-processing applies effects
5. React Three Fiber manages updates

### State Management

- `selectedNode`: Currently selected node
- `activeFilters`: Set of visible node types
- `cameraResetTrigger`: Counter to trigger camera reset
- `isLoading`: Loading state

## 🎨 Styling Guide

### Matching Existing Codebase

The knowledge graph follows the same design patterns as `/city`:

- Dark backgrounds (#0a0a0a)
- Glass morphism UI (backdrop-blur + transparency)
- Premium effects (bloom, glow, vignette)
- Consistent navbar and typography
- Smooth animations and transitions

### Color Palette

```css
/* Background */
--bg-primary: #0a0a0a;
--bg-overlay: rgba(0, 0, 0, 0.4);

/* UI Elements */
--glass-bg: rgba(255, 255, 255, 0.1);
--glass-border: rgba(255, 255, 255, 0.2);
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.7);
--text-muted: rgba(255, 255, 255, 0.5);

/* Node Colors */
--company: #00bfff;
--investor: #ff8c00;
--founder: #ffd700;
--technology: #00ff7f;
--location: #ff69b4;
```

## 📊 Dataset Statistics

Current dataset includes:
- **40+ nodes** across 5 categories
- **40+ edges** across 4 relationship types
- **Real companies**: Figure AI, Boston Dynamics, 1X Technologies, etc.
- **Major investors**: OpenAI, Microsoft, NVIDIA, Amazon, etc.
- **Key technologies**: LLM-based control, Sim-to-Real, Bipedal locomotion
- **Global hubs**: San Francisco, Boston, Vancouver, Oslo

## 🐛 Troubleshooting

### Graph doesn't render
- Check browser console for errors
- Ensure WebGL is supported and enabled
- Try disabling hardware acceleration

### Performance issues
- Reduce node count or filter categories
- Lower post-processing quality
- Disable auto-rotate
- Reduce simulation iterations

### Nodes overlap
- Increase `repulsionStrength`
- Increase `minDistance`
- Run more simulation iterations

### Edges too tight/loose
- Adjust `attractionStrength`
- Modify edge `strength` values
- Change `maxDistance`

## 🚀 Future Enhancements

Potential improvements:
- [ ] Search functionality
- [ ] Graph analytics (centrality, clustering)
- [ ] Time-based filtering (show evolution over time)
- [ ] Export to image/video
- [ ] Share specific views (URL parameters)
- [ ] Mobile optimization
- [ ] VR mode
- [ ] Real-time data updates
- [ ] Community detection visualization
- [ ] Path finding between nodes

## 📝 License

Part of the Street Labs landing site. All rights reserved.

## 🙏 Credits

Built with:
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [React Three Drei](https://github.com/pmndrs/drei)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

Inspired by:
- Network visualization research
- Force-directed graph algorithms
- Modern 3D web experiences
