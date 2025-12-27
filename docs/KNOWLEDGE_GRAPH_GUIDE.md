# 3D Knowledge Graph - Quick Start Guide

## 🚀 Getting Started

### Option 1: Standalone HTML Version (No Build Required)

The fastest way to view the knowledge graph:

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   ```
   http://localhost:3000/knowledge-graph.html
   ```

That's it! The standalone version uses CDN-loaded Three.js and works immediately.

### Option 2: Next.js Component Version

Integrated into your Next.js application:

1. **Navigate to the page:**
   ```
   http://localhost:3000/knowledge-graph
   ```

2. **Or import the component in any page:**
   ```tsx
   import KnowledgeGraph from '@/components/KnowledgeGraph';

   export default function YourPage() {
     return (
       <div>
         <KnowledgeGraph />
       </div>
     );
   }
   ```

## 🎮 Controls

| Action | Control |
|--------|---------|
| **Rotate Graph** | Click and drag |
| **Zoom** | Mouse wheel / Scroll |
| **View Details** | Click on any node |
| **Close Details** | Click the X button |

## 📊 What You'll See

### Companies (12 nodes)
- Tesla
- Boston Dynamics
- NVIDIA
- ABB Robotics
- KUKA
- Universal Robots
- FANUC
- iRobot
- Intuitive Surgical
- DJI
- Waymo
- Amazon Robotics

### Connections (21 edges)
Lines representing partnerships, technology sharing, and industry collaborations.

## 🎨 Visual Features

- **Auto-rotation**: Graph slowly rotates when not being interacted with
- **Glow effects**: Nodes pulse with animated glow
- **Particle background**: 1000 particles create a space-like atmosphere
- **Dynamic lighting**: Three light sources (ambient, directional, point lights)
- **Fog effect**: Adds depth perception
- **Hover effects**: Nodes scale up when you mouse over them

## 🔧 Customization

### Change Colors

Edit the color scheme in:
- **Standalone**: `public/css/knowledge-graph.css`
- **Component**: `components/KnowledgeGraph.module.css`

Main colors:
```css
--primary: #6366f1;    /* Indigo */
--secondary: #a855f7;  /* Purple */
--accent: #ec4899;     /* Pink */
```

### Add New Companies

Edit the data in:
- **Standalone**: `public/js/knowledge-graph.js`
- **Component**: `components/KnowledgeGraph.tsx`

```javascript
const graphData = {
  nodes: [
    {
      id: 13,
      name: "New Company",
      category: "Category",
      description: "Description here",
      color: "#yourcolor"
    }
  ],
  edges: [
    { source: 13, target: 3, relationship: "Partnership" }
  ]
};
```

### Adjust Graph Layout

In the `createGraph()` function:

```javascript
// Circular layout parameters
const radius = 25;      // Distance from center
const height = 20;      // Vertical spread
const angle = ...       // Node position angle
```

### Performance Settings

```javascript
// Particle count (more = slower but prettier)
const particlesCount = 1000;

// Auto-rotation speed
rotation.y += 0.001;  // Increase for faster rotation

// Node quality
const geometry = new THREE.SphereGeometry(1.5, 32, 32);
                                          // ^^ segments (lower = faster)
```

## 📱 Responsive Design

The graph automatically adapts to:
- Desktop screens (full features)
- Tablets (optimized layout)
- Mobile phones (simplified controls, repositioned UI)

## 🐛 Troubleshooting

### Graph doesn't load
1. Check browser console for errors
2. Ensure Three.js is loaded (check Network tab)
3. Try refreshing the page

### Performance issues
1. Reduce `particlesCount` in the code
2. Lower sphere geometry segments (32 → 16)
3. Close other browser tabs

### Canvas is blank
1. Check if WebGL is supported in your browser
2. Update your graphics drivers
3. Try a different browser

## 🌐 Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

❌ Internet Explorer (not supported)

## 📦 File Structure

```
landingsiteonly2/
├── public/
│   ├── knowledge-graph.html          # Standalone page
│   ├── css/
│   │   └── knowledge-graph.css       # Styles
│   └── js/
│       └── knowledge-graph.js        # Graph logic
├── components/
│   ├── KnowledgeGraph.tsx            # React component
│   └── KnowledgeGraph.module.css     # Component styles
├── app/
│   └── knowledge-graph/
│       └── page.tsx                  # Next.js page
└── docs/
    └── KNOWLEDGE_GRAPH_GUIDE.md      # This file
```

## 💡 Tips

1. **Best viewing angle**: Start with default position, then drag to explore
2. **Finding connections**: Click a node to see all its relationships
3. **Smooth zooming**: Use scroll wheel slowly for precise zoom control
4. **Mobile tip**: Use pinch-to-zoom gesture on mobile devices

## 🎯 Use Cases

- **Presentations**: Full-screen impressive visualization
- **Documentation**: Embedded in documentation sites
- **Dashboards**: Integrated into admin panels
- **Education**: Teaching about industry relationships
- **Analysis**: Exploring company connections

## 🔗 Integration Examples

### Embed in existing page

```tsx
import KnowledgeGraph from '@/components/KnowledgeGraph';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Robotics Industry Overview</h1>
      <div style={{ height: '600px' }}>
        <KnowledgeGraph />
      </div>
    </div>
  );
}
```

### Add to modal/dialog

```tsx
const [showGraph, setShowGraph] = useState(false);

return (
  <>
    <button onClick={() => setShowGraph(true)}>
      View Knowledge Graph
    </button>
    {showGraph && (
      <Modal onClose={() => setShowGraph(false)}>
        <KnowledgeGraph />
      </Modal>
    )}
  </>
);
```

## 📈 Future Enhancements

Potential additions:
- [ ] Search functionality for nodes
- [ ] Filter by category
- [ ] Export as image/video
- [ ] VR mode support
- [ ] Real-time data updates
- [ ] Collaborative features
- [ ] Custom themes
- [ ] Animation presets

## 🤝 Contributing

To add features:
1. Edit the component/standalone files
2. Test in both versions
3. Update this documentation
4. Commit with descriptive message

## 📄 License

MIT License - Free to use and modify.

---

**Created by Street Foundation**
*Robotics Industry Database Visualization*
