# Knowledge Graph API Reference

## Component API

### KnowledgeGraph Component

```tsx
import KnowledgeGraph from '@/components/KnowledgeGraph';

<KnowledgeGraph />
```

**Props:** None (currently uses internal data)

**Future Props (Planned):**
```tsx
interface KnowledgeGraphProps {
  data?: GraphData;           // Custom graph data
  theme?: 'dark' | 'light';   // Theme variant
  autoRotate?: boolean;       // Enable/disable auto-rotation
  height?: string;            // Container height
  width?: string;             // Container width
  onNodeClick?: (node: Node) => void;  // Node click callback
}
```

## Data Structure

### GraphData Type

```typescript
interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

interface Node {
  id: number;
  name: string;
  category: string;
  description: string;
  color: string;
}

interface Edge {
  source: number;  // Source node ID
  target: number;  // Target node ID
  relationship: string;
}
```

### Example Data

```json
{
  "nodes": [
    {
      "id": 1,
      "name": "Company Name",
      "category": "Industry Category",
      "description": "Detailed description",
      "color": "#hexcolor"
    }
  ],
  "edges": [
    {
      "source": 1,
      "target": 2,
      "relationship": "Partnership Type"
    }
  ]
}
```

## Standalone Functions

### Core Functions

#### `init()`
Initializes the Three.js scene, camera, renderer, and all graph elements.

```javascript
function init()
```

#### `createGraph()`
Creates all nodes and edges based on `graphData`.

```javascript
function createGraph()
```

#### `animate()`
Main animation loop - updates node animations and renders scene.

```javascript
function animate()
```

### Interaction Functions

#### `onNodeClick(event)`
Handles node click events and displays detail card.

```javascript
function onNodeClick(event: MouseEvent)
```

#### `showNodeDetail(node)`
Displays the node detail card with company information.

```javascript
function showNodeDetail(node: Node)
```

#### `closeNodeDetail()`
Closes the node detail card.

```javascript
function closeNodeDetail()
```

#### `onMouseMove(event)`
Handles node hover effects and cursor changes.

```javascript
function onMouseMove(event: MouseEvent)
```

## Three.js Objects

### Scene Elements

**Camera:**
```javascript
camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 50;
camera.position.y = 10;
```

**Lighting:**
```javascript
// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);

// Main Directional Light
const mainLight = new THREE.DirectionalLight(0x6366f1, 0.8);

// Fill Point Light
const fillLight = new THREE.PointLight(0xa855f7, 0.6, 100);

// Accent Point Light
const accentLight = new THREE.PointLight(0xec4899, 0.5, 100);
```

**Fog:**
```javascript
scene.fog = new THREE.FogExp2(0x0a0e27, 0.0015);
```

### Node Creation

```javascript
// Node Geometry
const geometry = new THREE.SphereGeometry(1.5, 32, 32);

// Node Material
const material = new THREE.MeshPhongMaterial({
  color: node.color,
  emissive: node.color,
  emissiveIntensity: 0.3,
  shininess: 100,
  specular: 0xffffff
});

// Glow Effect
const glowGeometry = new THREE.SphereGeometry(2, 32, 32);
const glowMaterial = new THREE.MeshBasicMaterial({
  color: node.color,
  transparent: true,
  opacity: 0.2
});
```

### Edge Creation

```javascript
const points = [sourcePosition, targetPosition];
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({
  color: 0x6366f1,
  transparent: true,
  opacity: 0.3
});
const line = new THREE.Line(geometry, material);
```

## CSS Classes

### Standalone Version

```css
#graph-canvas          /* Main canvas element */
#loading-screen        /* Loading overlay */
#info-overlay          /* Header information */
#node-detail-card      /* Node detail sidebar */
#stats                 /* Statistics panel */
.loader                /* Loading spinner */
.controls-hint         /* Control instructions */
.close-btn             /* Close button */
.connection-item       /* Connection list item */
.stat-item             /* Individual stat */
```

### Component Version (CSS Modules)

```css
.container             /* Main container */
.graphCanvas           /* Canvas wrapper */
.loadingScreen         /* Loading overlay */
.infoOverlay           /* Header information */
.nodeDetailCard        /* Node detail sidebar */
.stats                 /* Statistics panel */
.loader                /* Loading spinner */
.controlsHint          /* Control instructions */
.closeBtn              /* Close button */
.connectionItem        /* Connection list item */
.statItem              /* Individual stat */
```

## Events

### Mouse Events

```javascript
// Canvas click - select node
canvas.addEventListener('click', onNodeClick);

// Mouse move - hover effect
canvas.addEventListener('mousemove', onMouseMove);

// Mouse down/up - drag to rotate
canvas.addEventListener('mousedown', startDrag);
canvas.addEventListener('mouseup', endDrag);

// Wheel - zoom
canvas.addEventListener('wheel', onZoom);
```

### Window Events

```javascript
// Resize - update camera and renderer
window.addEventListener('resize', onWindowResize);
```

## Customization Methods

### Change Node Positions

```javascript
// Circular layout
const angle = (index / totalNodes) * Math.PI * 2;
const radius = 25;
node.position.x = Math.cos(angle) * radius;
node.position.z = Math.sin(angle) * radius;

// Grid layout
node.position.x = (index % cols) * spacing;
node.position.z = Math.floor(index / cols) * spacing;

// Random layout
node.position.x = Math.random() * spread - spread / 2;
node.position.z = Math.random() * spread - spread / 2;
```

### Change Colors

```javascript
// Node colors
const colors = {
  primary: '#6366f1',
  secondary: '#a855f7',
  accent: '#ec4899'
};

// Edge colors
const edgeMaterial = new THREE.LineBasicMaterial({
  color: colors.primary
});
```

### Adjust Animation

```javascript
// Auto-rotation speed
rotation.y += 0.001;  // Slower
rotation.y += 0.005;  // Faster

// Glow animation
const scale = 1 + Math.sin(time + index) * amplitude;
glow.scale.set(scale, scale, scale);
```

## Performance Optimization

### Reduce Particles

```javascript
// Default: 1000
const particlesCount = 500;  // Better performance
```

### Lower Geometry Quality

```javascript
// Default: (1.5, 32, 32)
const geometry = new THREE.SphereGeometry(1.5, 16, 16);  // Faster
```

### Limit Rendering

```javascript
// Only render when needed
if (isDirty) {
  renderer.render(scene, camera);
  isDirty = false;
}
```

## Debug Mode

Add debug helpers:

```javascript
// Axes helper
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

// Grid helper
const gridHelper = new THREE.GridHelper(100, 10);
scene.add(gridHelper);

// Stats.js for FPS
import Stats from 'stats.js';
const stats = new Stats();
document.body.appendChild(stats.dom);
```

## Testing

### Unit Tests

```typescript
describe('KnowledgeGraph', () => {
  it('renders without crashing', () => {
    render(<KnowledgeGraph />);
  });

  it('displays correct number of nodes', () => {
    const { container } = render(<KnowledgeGraph />);
    expect(container.querySelector('.stats')).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
it('opens detail card on node click', async () => {
  render(<KnowledgeGraph />);
  
  // Wait for initialization
  await waitFor(() => {
    const canvas = screen.getByRole('img');
    fireEvent.click(canvas);
  });
  
  expect(screen.getByText(/connections/i)).toBeInTheDocument();
});
```

## Browser APIs Used

- **WebGL** - 3D rendering
- **Canvas** - Drawing surface
- **requestAnimationFrame** - Smooth animations
- **Mouse Events** - User interaction
- **Wheel Event** - Zooming
- **Resize Observer** - Responsive layout

## Dependencies

### Required

- `three` (^0.182.0) - 3D library
- `@types/three` (^0.182.0) - TypeScript types

### Optional

- `react` (19.2.0) - For component version
- `next` - For Next.js integration

## Browser Support Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| WebGL 2.0 | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |
| Canvas | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |
| ES6 | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |

## License

MIT License - See LICENSE file for details.

---

**Documentation Version:** 1.0.0  
**Last Updated:** 2025-12-27  
**Maintained by:** Street Foundation
