# Knowledge Graph API Documentation

## Table of Contents

1. [Overview](#overview)
2. [JavaScript API Reference](#javascript-api-reference)
3. [React Component API](#react-component-api)
4. [Data Structure Documentation](#data-structure-documentation)
5. [Customization Options](#customization-options)
6. [Event Handlers and Callbacks](#event-handlers-and-callbacks)
7. [Performance Optimization](#performance-optimization)
8. [Browser Compatibility](#browser-compatibility)
9. [Integration Examples](#integration-examples)

---

## Overview

The Knowledge Graph visualization library provides an interactive, force-directed graph for displaying and exploring interconnected data. It supports both standalone JavaScript and React implementations, offering rich customization, responsive design, and performance optimization for large datasets.

### Key Features

- **Force-directed graph layout** using D3.js
- **Interactive nodes and edges** with hover and click events
- **Responsive canvas rendering** for optimal performance
- **Customizable styling** for nodes, edges, and labels
- **Zoom and pan controls** with touch support
- **Dynamic data updates** without full re-render
- **Search and filter capabilities**
- **Multiple layout algorithms**
- **Export functionality** (PNG, SVG, JSON)

### Installation

```bash
# NPM
npm install @streetfdn/knowledge-graph

# Yarn
yarn add @streetfdn/knowledge-graph

# CDN (Standalone)
<script src="https://unpkg.com/@streetfdn/knowledge-graph@latest/dist/knowledge-graph.min.js"></script>
```

---

## JavaScript API Reference

### KnowledgeGraph Class

The main class for creating and managing knowledge graph visualizations in vanilla JavaScript.

#### Constructor

```javascript
const graph = new KnowledgeGraph(container, options);
```

**Parameters:**

- `container` (string | HTMLElement): CSS selector or DOM element to render the graph
- `options` (Object): Configuration options (see [Customization Options](#customization-options))

**Returns:** KnowledgeGraph instance

#### Methods

##### `setData(data)`

Sets or updates the graph data.

```javascript
graph.setData({
  nodes: [
    { id: 'node1', label: 'Node 1', group: 'A' },
    { id: 'node2', label: 'Node 2', group: 'B' }
  ],
  edges: [
    { source: 'node1', target: 'node2', weight: 1 }
  ]
});
```

**Parameters:**
- `data` (Object): Graph data structure (see [Data Structure Documentation](#data-structure-documentation))

**Returns:** void

---

##### `addNode(node)`

Adds a single node to the graph.

```javascript
graph.addNode({ 
  id: 'node3', 
  label: 'New Node', 
  group: 'C',
  x: 100,
  y: 100
});
```

**Parameters:**
- `node` (Object): Node object with id, label, and optional properties

**Returns:** void

---

##### `addEdge(edge)`

Adds a single edge to the graph.

```javascript
graph.addEdge({ 
  source: 'node1', 
  target: 'node3', 
  weight: 2,
  label: 'connects'
});
```

**Parameters:**
- `edge` (Object): Edge object with source and target node IDs

**Returns:** void

---

##### `removeNode(nodeId)`

Removes a node and all connected edges.

```javascript
graph.removeNode('node3');
```

**Parameters:**
- `nodeId` (string): ID of the node to remove

**Returns:** void

---

##### `removeEdge(sourceId, targetId)`

Removes an edge between two nodes.

```javascript
graph.removeEdge('node1', 'node2');
```

**Parameters:**
- `sourceId` (string): Source node ID
- `targetId` (string): Target node ID

**Returns:** void

---

##### `updateNode(nodeId, properties)`

Updates properties of an existing node.

```javascript
graph.updateNode('node1', { 
  label: 'Updated Label',
  color: '#ff6b6b',
  size: 15
});
```

**Parameters:**
- `nodeId` (string): ID of the node to update
- `properties` (Object): Properties to update

**Returns:** void

---

##### `getNode(nodeId)`

Retrieves a node by its ID.

```javascript
const node = graph.getNode('node1');
console.log(node.label); // 'Updated Label'
```

**Parameters:**
- `nodeId` (string): ID of the node

**Returns:** Object | null

---

##### `getNeighbors(nodeId)`

Gets all nodes connected to a specific node.

```javascript
const neighbors = graph.getNeighbors('node1');
// Returns array of connected node objects
```

**Parameters:**
- `nodeId` (string): ID of the node

**Returns:** Array<Object>

---

##### `highlightNode(nodeId, highlight)`

Highlights or unhighlights a node.

```javascript
graph.highlightNode('node1', true);
// Later...
graph.highlightNode('node1', false);
```

**Parameters:**
- `nodeId` (string): ID of the node
- `highlight` (boolean): Whether to highlight (true) or unhighlight (false)

**Returns:** void

---

##### `focusNode(nodeId, duration)`

Centers and zooms the view on a specific node.

```javascript
graph.focusNode('node1', 1000); // 1 second animation
```

**Parameters:**
- `nodeId` (string): ID of the node
- `duration` (number, optional): Animation duration in milliseconds (default: 500)

**Returns:** void

---

##### `search(query)`

Searches for nodes matching a query string.

```javascript
const results = graph.search('Node');
// Returns array of matching nodes
```

**Parameters:**
- `query` (string): Search query

**Returns:** Array<Object>

---

##### `filter(filterFn)`

Filters visible nodes based on a predicate function.

```javascript
graph.filter(node => node.group === 'A');
```

**Parameters:**
- `filterFn` (Function): Filter function that returns true for visible nodes

**Returns:** void

---

##### `clearFilter()`

Removes all filters and shows all nodes.

```javascript
graph.clearFilter();
```

**Returns:** void

---

##### `setLayout(layoutType, options)`

Changes the graph layout algorithm.

```javascript
graph.setLayout('force', { 
  strength: -300,
  distance: 100
});
```

**Parameters:**
- `layoutType` (string): Layout type ('force', 'circular', 'hierarchical', 'radial')
- `options` (Object, optional): Layout-specific options

**Returns:** void

---

##### `zoom(scale, duration)`

Programmatically zooms the graph.

```javascript
graph.zoom(1.5, 500); // Zoom to 150% over 500ms
```

**Parameters:**
- `scale` (number): Zoom scale (1.0 = 100%)
- `duration` (number, optional): Animation duration in milliseconds

**Returns:** void

---

##### `resetView(duration)`

Resets zoom and pan to fit all nodes.

```javascript
graph.resetView(1000);
```

**Parameters:**
- `duration` (number, optional): Animation duration in milliseconds (default: 500)

**Returns:** void

---

##### `exportPNG(filename, options)`

Exports the graph as a PNG image.

```javascript
graph.exportPNG('knowledge-graph.png', {
  backgroundColor: '#ffffff',
  scale: 2
});
```

**Parameters:**
- `filename` (string): Name of the downloaded file
- `options` (Object, optional): Export options
  - `backgroundColor` (string): Background color (default: transparent)
  - `scale` (number): Resolution scale (default: 1)

**Returns:** void

---

##### `exportSVG(filename)`

Exports the graph as an SVG image.

```javascript
graph.exportSVG('knowledge-graph.svg');
```

**Parameters:**
- `filename` (string): Name of the downloaded file

**Returns:** void

---

##### `exportJSON(filename)`

Exports the graph data as JSON.

```javascript
graph.exportJSON('knowledge-graph-data.json');
```

**Parameters:**
- `filename` (string): Name of the downloaded file

**Returns:** void

---

##### `on(eventName, handler)`

Registers an event listener.

```javascript
graph.on('nodeClick', (node) => {
  console.log('Clicked:', node.label);
});
```

**Parameters:**
- `eventName` (string): Event name (see [Event Handlers](#event-handlers-and-callbacks))
- `handler` (Function): Event handler function

**Returns:** Function (unsubscribe function)

---

##### `off(eventName, handler)`

Removes an event listener.

```javascript
const handler = (node) => console.log(node);
graph.on('nodeClick', handler);
graph.off('nodeClick', handler);
```

**Parameters:**
- `eventName` (string): Event name
- `handler` (Function): Handler function to remove

**Returns:** void

---

##### `destroy()`

Destroys the graph instance and cleans up resources.

```javascript
graph.destroy();
```

**Returns:** void

---

## React Component API

### KnowledgeGraphReact Component

React component wrapper for the knowledge graph.

#### Props

```typescript
interface KnowledgeGraphProps {
  // Data
  data: GraphData;
  
  // Dimensions
  width?: number | string;
  height?: number | string;
  
  // Styling
  theme?: 'light' | 'dark' | Theme;
  className?: string;
  style?: React.CSSProperties;
  
  // Behavior
  interactive?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableDrag?: boolean;
  
  // Layout
  layout?: 'force' | 'circular' | 'hierarchical' | 'radial';
  layoutOptions?: LayoutOptions;
  
  // Rendering
  renderNode?: (node: Node, context: CanvasRenderingContext2D) => void;
  renderEdge?: (edge: Edge, context: CanvasRenderingContext2D) => void;
  
  // Events
  onNodeClick?: (node: Node, event: MouseEvent) => void;
  onNodeHover?: (node: Node | null, event: MouseEvent) => void;
  onEdgeClick?: (edge: Edge, event: MouseEvent) => void;
  onEdgeHover?: (edge: Edge | null, event: MouseEvent) => void;
  onZoom?: (scale: number) => void;
  onPan?: (x: number, y: number) => void;
  onReady?: (graph: KnowledgeGraph) => void;
  
  // Performance
  maxNodes?: number;
  simplifyEdges?: boolean;
  useWebGL?: boolean;
}
```

#### Usage Example

```jsx
import { KnowledgeGraphReact } from '@streetfdn/knowledge-graph';

function MyComponent() {
  const [data, setData] = useState({
    nodes: [
      { id: '1', label: 'Node 1', group: 'A' },
      { id: '2', label: 'Node 2', group: 'B' }
    ],
    edges: [
      { source: '1', target: '2' }
    ]
  });

  const handleNodeClick = (node) => {
    console.log('Clicked:', node.label);
  };

  return (
    <KnowledgeGraphReact
      data={data}
      width="100%"
      height={600}
      theme="dark"
      layout="force"
      onNodeClick={handleNodeClick}
      enableZoom
      enablePan
    />
  );
}
```

#### Hooks

##### `useKnowledgeGraph()`

React hook to access the graph instance imperatively.

```jsx
import { useKnowledgeGraph } from '@streetfdn/knowledge-graph';

function MyComponent() {
  const graphRef = useRef();

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.focusNode('node1');
    }
  }, []);

  return (
    <KnowledgeGraphReact
      data={data}
      ref={graphRef}
    />
  );
}
```

---

## Data Structure Documentation

### GraphData

The main data structure for the knowledge graph.

```typescript
interface GraphData {
  nodes: Node[];
  edges: Edge[];
}
```

### Node

Represents a node in the graph.

```typescript
interface Node {
  // Required
  id: string;
  label: string;
  
  // Visual Properties
  group?: string;
  color?: string;
  size?: number;
  shape?: 'circle' | 'square' | 'diamond' | 'triangle';
  icon?: string;
  image?: string;
  
  // Position (can be set for fixed positioning)
  x?: number;
  y?: number;
  fx?: number; // Fixed x position
  fy?: number; // Fixed y position
  
  // Metadata
  metadata?: Record<string, any>;
  
  // Styling
  borderColor?: string;
  borderWidth?: number;
  opacity?: number;
  
  // Behavior
  fixed?: boolean;
  hidden?: boolean;
  selectable?: boolean;
  
  // Custom properties
  [key: string]: any;
}
```

### Edge

Represents a connection between two nodes.

```typescript
interface Edge {
  // Required
  source: string; // Node ID
  target: string; // Node ID
  
  // Visual Properties
  label?: string;
  color?: string;
  width?: number;
  style?: 'solid' | 'dashed' | 'dotted';
  
  // Directional
  directed?: boolean;
  arrowSize?: number;
  
  // Weight (affects layout)
  weight?: number;
  strength?: number;
  distance?: number;
  
  // Metadata
  metadata?: Record<string, any>;
  
  // Styling
  opacity?: number;
  curvature?: number;
  
  // Behavior
  hidden?: boolean;
  
  // Custom properties
  [key: string]: any;
}
```

### Example Data

```javascript
const sampleData = {
  nodes: [
    {
      id: 'central',
      label: 'Central Hub',
      group: 'core',
      size: 20,
      color: '#ff6b6b',
      shape: 'circle',
      fx: 400,
      fy: 300,
      metadata: {
        importance: 'high',
        category: 'hub'
      }
    },
    {
      id: 'satellite1',
      label: 'Satellite A',
      group: 'periphery',
      size: 12,
      color: '#4ecdc4',
      shape: 'square',
      image: '/icons/satellite.png'
    },
    {
      id: 'satellite2',
      label: 'Satellite B',
      group: 'periphery',
      size: 12,
      color: '#45b7d1',
      shape: 'diamond'
    }
  ],
  edges: [
    {
      source: 'central',
      target: 'satellite1',
      label: 'primary link',
      weight: 2,
      width: 3,
      color: '#95a5a6',
      directed: true,
      style: 'solid'
    },
    {
      source: 'central',
      target: 'satellite2',
      label: 'secondary link',
      weight: 1,
      width: 2,
      color: '#95a5a6',
      directed: true,
      style: 'dashed'
    }
  ]
};
```

---

## Customization Options

### Configuration Object

Full configuration options for the KnowledgeGraph constructor or React component.

```typescript
interface KnowledgeGraphOptions {
  // Canvas & Rendering
  width?: number | string; // Default: container width
  height?: number | string; // Default: container height
  backgroundColor?: string; // Default: '#ffffff'
  
  // Node Defaults
  node?: {
    size?: number; // Default: 10
    color?: string; // Default: '#69b3a2'
    borderColor?: string; // Default: '#fff'
    borderWidth?: number; // Default: 2
    opacity?: number; // Default: 1
    labelColor?: string; // Default: '#333'
    labelSize?: number; // Default: 12
    labelFont?: string; // Default: 'Arial, sans-serif'
    showLabels?: boolean; // Default: true
    shape?: 'circle' | 'square' | 'diamond' | 'triangle'; // Default: 'circle'
  };
  
  // Edge Defaults
  edge?: {
    width?: number; // Default: 1
    color?: string; // Default: '#999'
    opacity?: number; // Default: 0.6
    labelColor?: string; // Default: '#666'
    labelSize?: number; // Default: 10
    showLabels?: boolean; // Default: false
    showArrows?: boolean; // Default: true
    arrowSize?: number; // Default: 6
    curvature?: number; // Default: 0
    style?: 'solid' | 'dashed' | 'dotted'; // Default: 'solid'
  };
  
  // Layout Configuration
  layout?: {
    type?: 'force' | 'circular' | 'hierarchical' | 'radial'; // Default: 'force'
    iterations?: number; // Default: 300
    
    // Force layout options
    force?: {
      strength?: number; // Default: -300
      distance?: number; // Default: 100
      centerForce?: number; // Default: 0.1
      collisionRadius?: number; // Default: node.size * 2
      alphaDecay?: number; // Default: 0.0228
    };
    
    // Circular layout options
    circular?: {
      radius?: number; // Default: auto
      startAngle?: number; // Default: 0
      sortBy?: string | ((a: Node, b: Node) => number);
    };
    
    // Hierarchical layout options
    hierarchical?: {
      direction?: 'TB' | 'BT' | 'LR' | 'RL'; // Default: 'TB'
      levelSeparation?: number; // Default: 150
      nodeSeparation?: number; // Default: 100
      treeSpacing?: number; // Default: 200
    };
    
    // Radial layout options
    radial?: {
      centerNode?: string; // Node ID
      radius?: number; // Default: auto
    };
  };
  
  // Interaction
  interaction?: {
    draggable?: boolean; // Default: true
    zoomable?: boolean; // Default: true
    pannable?: boolean; // Default: true
    selectable?: boolean; // Default: true
    multiSelect?: boolean; // Default: false
    hoverEnabled?: boolean; // Default: true
    clickToSelect?: boolean; // Default: true
    doubleClickZoom?: boolean; // Default: true
    mouseWheelZoom?: boolean; // Default: true
    touchZoom?: boolean; // Default: true
    minZoom?: number; // Default: 0.1
    maxZoom?: number; // Default: 10
  };
  
  // Animation
  animation?: {
    duration?: number; // Default: 500 (ms)
    easing?: 'linear' | 'easeInOut' | 'easeIn' | 'easeOut'; // Default: 'easeInOut'
    enabled?: boolean; // Default: true
  };
  
  // Performance
  performance?: {
    maxNodes?: number; // Default: 10000
    renderThrottle?: number; // Default: 16 (ms)
    simplifyEdgesThreshold?: number; // Default: 1000 nodes
    useQuadtree?: boolean; // Default: true
    useSpatialIndex?: boolean; // Default: true
    webglFallback?: boolean; // Default: true
  };
  
  // Highlighting
  highlight?: {
    nodeColor?: string; // Default: '#ffd93d'
    nodeBorderColor?: string; // Default: '#ff6b6b'
    edgeColor?: string; // Default: '#ff6b6b'
    opacity?: number; // Default: 1
    neighborOpacity?: number; // Default: 0.6
    otherOpacity?: number; // Default: 0.2
  };
  
  // Tooltips
  tooltip?: {
    enabled?: boolean; // Default: true
    template?: (node: Node | Edge) => string;
    backgroundColor?: string; // Default: '#333'
    textColor?: string; // Default: '#fff'
    borderRadius?: number; // Default: 4
    padding?: number; // Default: 8
    offset?: { x: number; y: number }; // Default: { x: 10, y: 10 }
  };
  
  // Controls
  controls?: {
    zoomButtons?: boolean; // Default: true
    resetButton?: boolean; // Default: true
    fullscreenButton?: boolean; // Default: false
    exportButton?: boolean; // Default: false
    searchBox?: boolean; // Default: false
    legendPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    showLegend?: boolean; // Default: false
  };
}
```

### Theme System

Predefined themes for quick styling.

```javascript
// Light Theme (Default)
const lightTheme = {
  backgroundColor: '#ffffff',
  node: { color: '#69b3a2', labelColor: '#333' },
  edge: { color: '#999' }
};

// Dark Theme
const darkTheme = {
  backgroundColor: '#1a1a1a',
  node: { color: '#4ecdc4', labelColor: '#fff', borderColor: '#2a2a2a' },
  edge: { color: '#666' }
};

// Usage
const graph = new KnowledgeGraph('#container', {
  theme: 'dark'
});

// Or custom theme
const graph = new KnowledgeGraph('#container', {
  backgroundColor: '#0a0e27',
  node: {
    color: '#00d9ff',
    labelColor: '#fff'
  },
  edge: {
    color: '#334155'
  }
});
```

---

## Event Handlers and Callbacks

### Available Events

#### Node Events

##### `nodeClick`

Fired when a node is clicked.

```javascript
graph.on('nodeClick', (node, event) => {
  console.log('Node clicked:', node.label);
  console.log('Mouse position:', event.clientX, event.clientY);
});
```

**Callback Parameters:**
- `node` (Object): The clicked node
- `event` (MouseEvent): Original mouse event

---

##### `nodeDoubleClick`

Fired when a node is double-clicked.

```javascript
graph.on('nodeDoubleClick', (node, event) => {
  console.log('Node double-clicked:', node.label);
});
```

---

##### `nodeRightClick`

Fired when a node is right-clicked.

```javascript
graph.on('nodeRightClick', (node, event) => {
  event.preventDefault();
  console.log('Show context menu for:', node.label);
});
```

---

##### `nodeHover`

Fired when mouse enters or leaves a node.

```javascript
graph.on('nodeHover', (node, event) => {
  if (node) {
    console.log('Hovering over:', node.label);
  } else {
    console.log('No longer hovering');
  }
});
```

---

##### `nodeDragStart`

Fired when node dragging starts.

```javascript
graph.on('nodeDragStart', (node, event) => {
  console.log('Started dragging:', node.label);
});
```

---

##### `nodeDrag`

Fired during node dragging.

```javascript
graph.on('nodeDrag', (node, event) => {
  console.log('Dragging to:', node.x, node.y);
});
```

---

##### `nodeDragEnd`

Fired when node dragging ends.

```javascript
graph.on('nodeDragEnd', (node, event) => {
  console.log('Stopped dragging:', node.label);
});
```

---

#### Edge Events

##### `edgeClick`

Fired when an edge is clicked.

```javascript
graph.on('edgeClick', (edge, event) => {
  console.log('Edge clicked:', edge.source, '->', edge.target);
});
```

---

##### `edgeHover`

Fired when mouse enters or leaves an edge.

```javascript
graph.on('edgeHover', (edge, event) => {
  if (edge) {
    console.log('Hovering over edge');
  }
});
```

---

#### View Events

##### `zoom`

Fired when the view is zoomed.

```javascript
graph.on('zoom', (scale) => {
  console.log('Current zoom level:', scale);
});
```

**Callback Parameters:**
- `scale` (number): Current zoom scale

---

##### `pan`

Fired when the view is panned.

```javascript
graph.on('pan', (x, y) => {
  console.log('Current pan position:', x, y);
});
```

**Callback Parameters:**
- `x` (number): X offset
- `y` (number): Y offset

---

#### Lifecycle Events

##### `ready`

Fired when the graph is fully initialized.

```javascript
graph.on('ready', () => {
  console.log('Graph is ready');
  graph.focusNode('centralNode');
});
```

---

##### `renderComplete`

Fired after each render cycle.

```javascript
graph.on('renderComplete', () => {
  console.log('Render complete');
});
```

---

##### `layoutStart`

Fired when layout calculation starts.

```javascript
graph.on('layoutStart', () => {
  console.log('Computing layout...');
});
```

---

##### `layoutEnd`

Fired when layout calculation completes.

```javascript
graph.on('layoutEnd', () => {
  console.log('Layout complete');
});
```

---

##### `dataUpdate`

Fired when graph data changes.

```javascript
graph.on('dataUpdate', (data) => {
  console.log('Data updated:', data.nodes.length, 'nodes');
});
```

---

### Event Handling Best Practices

#### Debouncing Events

```javascript
import debounce from 'lodash/debounce';

const handleZoom = debounce((scale) => {
  console.log('Zoom settled at:', scale);
}, 200);

graph.on('zoom', handleZoom);
```

#### Cleaning Up Event Listeners

```javascript
// Store unsubscribe function
const unsubscribe = graph.on('nodeClick', handleNodeClick);

// Later, remove listener
unsubscribe();

// Or
graph.off('nodeClick', handleNodeClick);

// Remove all listeners for an event
graph.removeAllListeners('nodeClick');

// Remove all listeners
graph.removeAllListeners();
```

#### React Event Handling

```jsx
function MyGraph() {
  const handleNodeClick = useCallback((node) => {
    console.log('Clicked:', node.label);
  }, []);

  return (
    <KnowledgeGraphReact
      data={data}
      onNodeClick={handleNodeClick}
    />
  );
}
```

---

## Performance Optimization

### Large Datasets

#### 1. Progressive Loading

Load data in chunks to prevent UI blocking.

```javascript
async function loadLargeGraph(graph, dataUrl) {
  const response = await fetch(dataUrl);
  const fullData = await response.json();
  
  const chunkSize = 100;
  
  // Add nodes in chunks
  for (let i = 0; i < fullData.nodes.length; i += chunkSize) {
    const chunk = fullData.nodes.slice(i, i + chunkSize);
    chunk.forEach(node => graph.addNode(node));
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  
  // Add edges in chunks
  for (let i = 0; i < fullData.edges.length; i += chunkSize) {
    const chunk = fullData.edges.slice(i, i + chunkSize);
    chunk.forEach(edge => graph.addEdge(edge));
    await new Promise(resolve => setTimeout(resolve, 10));
  }
}
```

#### 2. Level of Detail (LOD)

Simplify rendering based on zoom level.

```javascript
const graph = new KnowledgeGraph('#container', {
  performance: {
    maxNodes: 5000,
    simplifyEdgesThreshold: 1000
  },
  node: {
    showLabels: false // Enable dynamically based on zoom
  }
});

graph.on('zoom', (scale) => {
  if (scale > 1.5) {
    graph.updateOptions({ node: { showLabels: true } });
  } else {
    graph.updateOptions({ node: { showLabels: false } });
  }
});
```

#### 3. Spatial Indexing

Enable spatial indexing for faster collision detection.

```javascript
const graph = new KnowledgeGraph('#container', {
  performance: {
    useQuadtree: true,
    useSpatialIndex: true
  }
});
```

#### 4. Edge Simplification

Reduce edge complexity for large graphs.

```javascript
const graph = new KnowledgeGraph('#container', {
  performance: {
    simplifyEdgesThreshold: 500
  },
  edge: {
    curvature: 0 // Straight edges are faster
  }
});
```

### Memory Management

#### Cleanup on Component Unmount

```jsx
function MyGraph({ data }) {
  const graphRef = useRef();

  useEffect(() => {
    return () => {
      if (graphRef.current) {
        graphRef.current.destroy();
      }
    };
  }, []);

  return <KnowledgeGraphReact ref={graphRef} data={data} />;
}
```

#### Limit History for Undo/Redo

```javascript
const graph = new KnowledgeGraph('#container', {
  history: {
    maxStates: 20 // Limit undo history
  }
});
```

### Rendering Optimization

#### Request Animation Frame Throttling

```javascript
const graph = new KnowledgeGraph('#container', {
  performance: {
    renderThrottle: 16 // ~60fps
  }
});
```

#### WebGL Acceleration

For very large graphs (10,000+ nodes), use WebGL rendering.

```javascript
const graph = new KnowledgeGraph('#container', {
  performance: {
    useWebGL: true,
    webglFallback: true // Fall back to Canvas2D if WebGL unavailable
  }
});
```

### Best Practices Checklist

- ✅ Use `maxNodes` to cap the dataset size
- ✅ Enable spatial indexing for large graphs
- ✅ Simplify edges when node count > 1000
- ✅ Disable labels at low zoom levels
- ✅ Use progressive loading for initial render
- ✅ Debounce expensive event handlers
- ✅ Clean up instances on unmount
- ✅ Use WebGL for 10,000+ nodes
- ✅ Throttle render cycles to 60fps
- ✅ Avoid deep cloning of large datasets

---

## Browser Compatibility

### Supported Browsers

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| Opera | 76+ | Full support |
| Safari iOS | 14+ | Touch events supported |
| Chrome Android | 90+ | Touch events supported |

### Required Browser Features

- **Canvas API** (required)
- **ES6+ JavaScript** (required)
- **WebGL** (optional, for large graphs)
- **ResizeObserver** (optional, for responsive sizing)
- **IntersectionObserver** (optional, for visibility optimization)

### Polyfills

For older browser support, include these polyfills:

```html
<!-- For IE11 and older browsers -->
<script src="https://cdn.jsdelivr.net/npm/@babel/polyfill@7/dist/polyfill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/resize-observer-polyfill@1/dist/ResizeObserver.js"></script>
```

### Feature Detection

```javascript
// Check Canvas support
const hasCanvas = !!document.createElement('canvas').getContext;

// Check WebGL support
function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

// Initialize with fallback
const graph = new KnowledgeGraph('#container', {
  performance: {
    useWebGL: hasWebGL(),
    webglFallback: true
  }
});
```

### Mobile Considerations

#### Touch Events

Touch events are automatically supported on mobile devices.

```javascript
const graph = new KnowledgeGraph('#container', {
  interaction: {
    touchZoom: true,
    draggable: true
  }
});
```

#### Viewport Meta Tag

Ensure proper mobile rendering:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

#### Performance on Mobile

```javascript
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const graph = new KnowledgeGraph('#container', {
  performance: {
    maxNodes: isMobile ? 500 : 5000,
    renderThrottle: isMobile ? 32 : 16
  },
  node: {
    showLabels: !isMobile
  }
});
```

---

## Integration Examples

### Example 1: Basic Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>Knowledge Graph Example</title>
  <style>
    #graph-container {
      width: 100%;
      height: 600px;
      border: 1px solid #ddd;
    }
  </style>
</head>
<body>
  <div id="graph-container"></div>
  
  <script src="https://unpkg.com/@streetfdn/knowledge-graph/dist/knowledge-graph.min.js"></script>
  <script>
    const data = {
      nodes: [
        { id: '1', label: 'Topic A', group: 'science' },
        { id: '2', label: 'Topic B', group: 'technology' },
        { id: '3', label: 'Topic C', group: 'science' }
      ],
      edges: [
        { source: '1', target: '2' },
        { source: '2', target: '3' }
      ]
    };

    const graph = new KnowledgeGraph('#graph-container', {
      layout: { type: 'force' },
      node: { size: 12 }
    });

    graph.setData(data);

    graph.on('nodeClick', (node) => {
      alert('Clicked: ' + node.label);
    });
  </script>
</body>
</html>
```

### Example 2: React with TypeScript

```tsx
import React, { useState, useCallback } from 'react';
import { KnowledgeGraphReact, GraphData, Node } from '@streetfdn/knowledge-graph';

interface Props {
  initialData: GraphData;
}

const KnowledgeGraphDemo: React.FC<Props> = ({ initialData }) => {
  const [data, setData] = useState<GraphData>(initialData);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeClick = useCallback((node: Node) => {
    setSelectedNode(node);
    console.log('Selected:', node);
  }, []);

  const handleAddNode = useCallback(() => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      label: `New Node ${data.nodes.length + 1}`,
      group: 'new'
    };

    setData(prev => ({
      nodes: [...prev.nodes, newNode],
      edges: prev.edges
    }));
  }, [data.nodes.length]);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={handleAddNode}>Add Node</button>
        {selectedNode && (
          <span style={{ marginLeft: 20 }}>
            Selected: {selectedNode.label}
          </span>
        )}
      </div>

      <KnowledgeGraphReact
        data={data}
        width="100%"
        height={600}
        theme="light"
        layout="force"
        onNodeClick={handleNodeClick}
        enableZoom
        enablePan
        node={{
          size: 10,
          showLabels: true
        }}
      />
    </div>
  );
};

export default KnowledgeGraphDemo;
```

### Example 3: Dynamic Data Loading

```javascript
import { KnowledgeGraph } from '@streetfdn/knowledge-graph';

class DynamicKnowledgeGraph {
  constructor(container) {
    this.graph = new KnowledgeGraph(container, {
      layout: { type: 'force' }
    });

    this.graph.on('nodeClick', this.handleNodeClick.bind(this));
  }

  async loadInitialData() {
    const response = await fetch('/api/graph/initial');
    const data = await response.json();
    this.graph.setData(data);
  }

  async handleNodeClick(node) {
    // Load neighbors for clicked node
    const response = await fetch(`/api/graph/neighbors/${node.id}`);
    const { nodes, edges } = await response.json();

    // Add new nodes and edges
    nodes.forEach(n => {
      if (!this.graph.getNode(n.id)) {
        this.graph.addNode(n);
      }
    });

    edges.forEach(e => this.graph.addEdge(e));

    // Focus on clicked node
    this.graph.focusNode(node.id, 1000);
  }

  destroy() {
    this.graph.destroy();
  }
}

// Usage
const dynamicGraph = new DynamicKnowledgeGraph('#container');
dynamicGraph.loadInitialData();
```

### Example 4: Filtering and Search

```javascript
import { KnowledgeGraph } from '@streetfdn/knowledge-graph';

const graph = new KnowledgeGraph('#container');
graph.setData(largeDataset);

// Search functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  
  if (query) {
    const results = graph.search(query);
    
    // Highlight matching nodes
    results.forEach(node => {
      graph.highlightNode(node.id, true);
    });
    
    // Filter to show only matching nodes and their neighbors
    const relevantNodeIds = new Set();
    results.forEach(node => {
      relevantNodeIds.add(node.id);
      graph.getNeighbors(node.id).forEach(neighbor => {
        relevantNodeIds.add(neighbor.id);
      });
    });
    
    graph.filter(node => relevantNodeIds.has(node.id));
  } else {
    graph.clearFilter();
  }
});

// Group filter
const groupFilter = document.getElementById('group-select');
groupFilter.addEventListener('change', (e) => {
  const selectedGroup = e.target.value;
  
  if (selectedGroup === 'all') {
    graph.clearFilter();
  } else {
    graph.filter(node => node.group === selectedGroup);
  }
});
```

### Example 5: Custom Rendering

```javascript
import { KnowledgeGraph } from '@streetfdn/knowledge-graph';

const graph = new KnowledgeGraph('#container', {
  renderNode: (node, ctx) => {
    // Custom node rendering
    ctx.save();
    
    // Draw hexagon
    const sides = 6;
    const radius = node.size || 10;
    
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides;
      const x = node.x + radius * Math.cos(angle);
      const y = node.y + radius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    
    ctx.fillStyle = node.color || '#69b3a2';
    ctx.fill();
    ctx.strokeStyle = node.borderColor || '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw label
    if (node.label) {
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y + radius + 15);
    }
    
    ctx.restore();
  },
  
  renderEdge: (edge, ctx, sourceNode, targetNode) => {
    // Custom edge rendering with gradient
    ctx.save();
    
    const gradient = ctx.createLinearGradient(
      sourceNode.x, sourceNode.y,
      targetNode.x, targetNode.y
    );
    gradient.addColorStop(0, sourceNode.color || '#999');
    gradient.addColorStop(1, targetNode.color || '#999');
    
    ctx.beginPath();
    ctx.moveTo(sourceNode.x, sourceNode.y);
    ctx.lineTo(targetNode.x, targetNode.y);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = edge.width || 1;
    ctx.stroke();
    
    ctx.restore();
  }
});
```

### Example 6: Integration with D3.js

```javascript
import * as d3 from 'd3';
import { KnowledgeGraph } from '@streetfdn/knowledge-graph';

// Use D3 for data processing, Knowledge Graph for visualization
d3.json('/data/network.json').then(rawData => {
  // Process data with D3
  const nodes = rawData.nodes.map(d => ({
    ...d,
    id: d.id.toString(),
    size: d.value ? Math.sqrt(d.value) * 2 : 10,
    color: d3.schemeCategory10[d.group % 10]
  }));

  const edges = rawData.links.map(d => ({
    source: d.source.toString(),
    target: d.target.toString(),
    weight: d.value || 1
  }));

  // Visualize with Knowledge Graph
  const graph = new KnowledgeGraph('#container');
  graph.setData({ nodes, edges });
});
```

### Example 7: Server-Side Rendering (Next.js)

```tsx
// components/KnowledgeGraphSSR.tsx
import dynamic from 'next/dynamic';
import { GraphData } from '@streetfdn/knowledge-graph';

// Dynamically import to prevent SSR issues
const KnowledgeGraphReact = dynamic(
  () => import('@streetfdn/knowledge-graph').then(mod => mod.KnowledgeGraphReact),
  { ssr: false }
);

interface Props {
  data: GraphData;
}

export default function KnowledgeGraphSSR({ data }: Props) {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <KnowledgeGraphReact
        data={data}
        width="100%"
        height="100%"
        theme="light"
      />
    </div>
  );
}

// pages/graph.tsx
import { GetServerSideProps } from 'next';
import KnowledgeGraphSSR from '../components/KnowledgeGraphSSR';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.example.com/graph-data');
  const data = await res.json();

  return {
    props: { data }
  };
};

export default function GraphPage({ data }) {
  return (
    <main>
      <h1>Knowledge Graph</h1>
      <KnowledgeGraphSSR data={data} />
    </main>
  );
}
```

---

## Advanced Topics

### Custom Layout Algorithms

Implement custom layout algorithms by extending the base layout class.

```javascript
class CustomLayout {
  constructor(options) {
    this.options = options;
  }

  calculate(nodes, edges) {
    // Your custom layout logic
    return nodes.map((node, i) => ({
      ...node,
      x: Math.cos(i * 2 * Math.PI / nodes.length) * 200,
      y: Math.sin(i * 2 * Math.PI / nodes.length) * 200
    }));
  }
}

graph.registerLayout('custom', CustomLayout);
graph.setLayout('custom', { /* options */ });
```

### Plugin System

Extend functionality with plugins.

```javascript
// Example plugin: Minimap
class MinimapPlugin {
  constructor(graph, options) {
    this.graph = graph;
    this.options = options;
    this.init();
  }

  init() {
    // Create minimap canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = 150;
    this.canvas.height = 150;
    this.canvas.style.position = 'absolute';
    this.canvas.style.bottom = '10px';
    this.canvas.style.right = '10px';
    this.canvas.style.border = '1px solid #ccc';
    
    this.graph.container.appendChild(this.canvas);
    
    // Listen to graph updates
    this.graph.on('renderComplete', () => this.render());
  }

  render() {
    const ctx = this.canvas.getContext('2d');
    // Render minimap...
  }

  destroy() {
    this.canvas.remove();
  }
}

// Register plugin
graph.use(MinimapPlugin, { /* options */ });
```

---

## Support and Resources

### Documentation

- **API Reference**: https://docs.streetfdn.org/knowledge-graph/api
- **Examples**: https://docs.streetfdn.org/knowledge-graph/examples
- **Tutorials**: https://docs.streetfdn.org/knowledge-graph/tutorials

### Community

- **GitHub**: https://github.com/StreetFDN/knowledge-graph
- **Discord**: https://discord.gg/streetfdn
- **Stack Overflow**: Tag with `street-knowledge-graph`

### Contributing

Contributions are welcome! See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### License

MIT License - see [LICENSE](../LICENSE) for details.

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Maintained by**: Street Foundation
