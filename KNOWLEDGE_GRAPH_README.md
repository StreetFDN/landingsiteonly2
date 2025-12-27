# 3D Knowledge Graph Visualization

A professional 3D knowledge graph visualization showcasing the robotics industry ecosystem using Three.js.

## Features

✨ **Premium Design**
- Dark background aesthetic with gradient lighting
- Colorful nodes representing robotics companies
- Smooth animations and transitions
- Professional color scheme with purple-pink gradient accents

🎮 **Interactive Controls**
- **Drag** to rotate the graph in 3D space
- **Scroll** to zoom in/out
- **Click** nodes to view detailed information
- **Auto-rotation** when not interacting

📊 **Data Visualization**
- 12 leading robotics companies
- 21 relationship connections
- Real-time stats display
- Connection visualization with detail cards

🎨 **Visual Effects**
- Animated node glow effects
- Particle background system
- Dynamic lighting (ambient, directional, point lights)
- Fog effect for depth perception
- Hover scaling on nodes

## Usage

### Standalone HTML Version

Access the standalone version at:
```
/knowledge-graph.html
```

This version requires no build process and can be opened directly in a browser.

### Next.js Component Version

Navigate to:
```
/knowledge-graph
```

Or import the component:
```tsx
import KnowledgeGraph from '@/components/KnowledgeGraph';

function MyPage() {
  return <KnowledgeGraph />;
}
```

## File Structure

```
public/
├── knowledge-graph.html       # Standalone HTML page
├── css/
│   └── knowledge-graph.css    # Styling
└── js/
    └── knowledge-graph.js     # 3D graph logic

components/
├── KnowledgeGraph.tsx         # Next.js component
└── KnowledgeGraph.module.css  # Component styles

app/
└── knowledge-graph/
    └── page.tsx               # Next.js page
```

## Technologies

- **Three.js** (r128) - 3D rendering engine
- **React/Next.js** - UI framework (component version)
- **TypeScript** - Type safety
- **CSS3** - Styling and animations

## Robotics Companies Featured

1. **Tesla** - Automotive & AI Robotics
2. **Boston Dynamics** - Advanced Robotics
3. **NVIDIA** - AI & Computing Platform
4. **ABB Robotics** - Industrial Automation
5. **KUKA** - Industrial Robotics
6. **Universal Robots** - Collaborative Robots
7. **FANUC** - Industrial Automation
8. **iRobot** - Consumer Robotics
9. **Intuitive Surgical** - Medical Robotics
10. **DJI** - Aerial Robotics
11. **Waymo** - Autonomous Vehicles
12. **Amazon Robotics** - Warehouse Automation

## Customization

### Adding New Nodes

Edit the `graphData` object in `knowledge-graph.js` or `KnowledgeGraph.tsx`:

```javascript
const graphData = {
  nodes: [
    {
      id: 13,
      name: "Your Company",
      category: "Your Category",
      description: "Your description here",
      color: "#hexcolor"
    },
    // ... more nodes
  ],
  edges: [
    { source: 13, target: 3, relationship: "Partnership Type" },
    // ... more edges
  ]
};
```

### Customizing Colors

Update the color scheme in the CSS files:
- Primary: `#6366f1` (Indigo)
- Secondary: `#a855f7` (Purple)
- Accent: `#ec4899` (Pink)

### Adjusting Graph Layout

Modify the positioning logic in the `createGraph()` function:

```javascript
const angle = (index / graphData.nodes.length) * Math.PI * 2;
const radius = 25; // Adjust radius
const height = (Math.random() - 0.5) * 20; // Adjust height spread
```

## Performance

- Optimized for 60 FPS on modern browsers
- Efficient rendering with Three.js
- Responsive design for mobile and desktop
- Automatic quality scaling based on device capabilities

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

### Standalone Version
- Three.js CDN (included via script tag)

### Next.js Version
Add to `package.json`:
```json
{
  "dependencies": {
    "three": "^0.128.0",
    "@types/three": "^0.128.0"
  }
}
```

Run:
```bash
npm install three @types/three
```

## License

MIT License - Feel free to use and modify for your projects.

## Credits

Developed for the Street Foundation robotics database visualization.
