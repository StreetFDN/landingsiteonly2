"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import styles from './KnowledgeGraph.module.css';

// ============================================================================
// TypeScript Interfaces
// ============================================================================

interface Node {
  id: number;
  name: string;
  category: string;
  description: string;
  color: string;
}

interface Edge {
  source: number;
  target: number;
  relationship: string;
}

interface Connection {
  name: string;
  relationship: string;
  color: string;
}

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

interface ThreeJsResources {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  nodeObjects: THREE.Mesh[];
  edgeObjects: THREE.Line[];
  animationId: number;
  raycaster: THREE.Raycaster;
  particles: THREE.Points;
}

interface MouseState {
  vector: THREE.Vector2;
  isDragging: boolean;
  previousPosition: { x: number; y: number };
}

interface RotationState {
  x: number;
  y: number;
}

// ============================================================================
// Graph Data
// ============================================================================

const graphData: GraphData = {
  nodes: [
    {
      id: 1,
      name: "Tesla",
      category: "Automotive & AI Robotics",
      description: "Leading electric vehicle manufacturer developing advanced autopilot systems, humanoid robots (Optimus), and AI-driven manufacturing automation.",
      color: "#e74c3c"
    },
    {
      id: 2,
      name: "Boston Dynamics",
      category: "Advanced Robotics",
      description: "Pioneering advanced robotics with dynamic mobility systems. Known for Spot (quadruped robot), Atlas (humanoid), and Stretch (logistics robot).",
      color: "#3498db"
    },
    {
      id: 3,
      name: "NVIDIA",
      category: "AI & Computing",
      description: "Leader in GPU computing and AI platforms. Provides Isaac robotics platform, Omniverse simulation, and Jetson edge AI computing for robotics.",
      color: "#76b900"
    },
    {
      id: 4,
      name: "ABB Robotics",
      category: "Industrial Automation",
      description: "Global leader in industrial robots and automation solutions. Specializes in collaborative robots, machine automation, and smart manufacturing systems.",
      color: "#ff6b6b"
    },
    {
      id: 5,
      name: "KUKA",
      category: "Industrial Robotics",
      description: "German robotics company providing intelligent automation solutions for industries including automotive, electronics, and logistics.",
      color: "#f39c12"
    },
    {
      id: 6,
      name: "Universal Robots",
      category: "Collaborative Robots",
      description: "Pioneer in collaborative robot arms (cobots) designed to work alongside humans safely. Focus on flexible, easy-to-program automation.",
      color: "#1abc9c"
    },
    {
      id: 7,
      name: "FANUC",
      category: "Industrial Automation",
      description: "Japanese robotics giant specializing in CNC systems, industrial robots, and factory automation with AI-enhanced capabilities.",
      color: "#e67e22"
    },
    {
      id: 8,
      name: "iRobot",
      category: "Consumer Robotics",
      description: "Consumer robotics company famous for Roomba vacuum robots and developing home automation solutions with advanced navigation.",
      color: "#9b59b6"
    },
    {
      id: 9,
      name: "Intuitive Surgical",
      category: "Medical Robotics",
      description: "Leader in robotic-assisted minimally invasive surgery with the da Vinci Surgical System, transforming healthcare worldwide.",
      color: "#16a085"
    },
    {
      id: 10,
      name: "DJI",
      category: "Aerial Robotics",
      description: "World leader in drone technology and aerial imaging systems for consumer, enterprise, and agricultural applications.",
      color: "#2980b9"
    },
    {
      id: 11,
      name: "Waymo",
      category: "Autonomous Vehicles",
      description: "Alphabet's self-driving technology company developing autonomous vehicle systems with advanced sensor fusion and AI.",
      color: "#27ae60"
    },
    {
      id: 12,
      name: "Amazon Robotics",
      category: "Warehouse Automation",
      description: "Develops mobile robots, automated storage systems, and AI-powered logistics solutions for Amazon's fulfillment centers.",
      color: "#ff9800"
    }
  ],
  edges: [
    { source: 1, target: 3, relationship: "AI Partnership" },
    { source: 1, target: 11, relationship: "Autonomous Tech" },
    { source: 2, target: 3, relationship: "AI Computing" },
    { source: 2, target: 4, relationship: "Industrial Collab" },
    { source: 3, target: 4, relationship: "AI Integration" },
    { source: 3, target: 5, relationship: "Smart Manufacturing" },
    { source: 3, target: 6, relationship: "Vision Systems" },
    { source: 3, target: 11, relationship: "Autonomous Driving" },
    { source: 4, target: 5, relationship: "Industry Standards" },
    { source: 4, target: 7, relationship: "Automation Tech" },
    { source: 5, target: 7, relationship: "Manufacturing" },
    { source: 6, target: 4, relationship: "Collaborative Robots" },
    { source: 6, target: 7, relationship: "Cobot Technology" },
    { source: 8, target: 12, relationship: "Consumer Robotics" },
    { source: 9, target: 3, relationship: "Medical AI" },
    { source: 10, target: 3, relationship: "Computer Vision" },
    { source: 11, target: 3, relationship: "AI Platform" },
    { source: 12, target: 3, relationship: "Logistics AI" },
    { source: 12, target: 6, relationship: "Warehouse Automation" },
    { source: 1, target: 2, relationship: "Robotics Innovation" },
    { source: 2, target: 12, relationship: "Logistics Robots" }
  ]
};

// ============================================================================
// Main Component
// ============================================================================

export default function KnowledgeGraph() {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<ThreeJsResources | null>(null);
  const mouseStateRef = useRef<MouseState>({
    vector: new THREE.Vector2(),
    isDragging: false,
    previousPosition: { x: 0, y: 0 }
  });
  const rotationRef = useRef<RotationState>({ x: 0, y: 0 });
  const mountedRef = useRef<boolean>(true);
  const nodePositionsRef = useRef<THREE.Vector3[]>([]);

  // State
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean>(true);

  // ============================================================================
  // WebGL Support Check
  // ============================================================================

  const checkWebGLSupport = useCallback((): boolean => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  }, []);

  // ============================================================================
  // Initialize Three.js Scene
  // ============================================================================

  const initializeScene = useCallback(() => {
    if (!containerRef.current) {
      throw new Error('Container ref is not available');
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e27, 0.0015);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 10, 50);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x6366f1, 0.8);
    mainLight.position.set(10, 20, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0xa855f7, 0.6, 100);
    fillLight.position.set(-20, 10, -20);
    scene.add(fillLight);

    const accentLight = new THREE.PointLight(0xec4899, 0.5, 100);
    accentLight.position.set(20, -10, 20);
    scene.add(accentLight);

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();

    // Create nodes and edges
    const { nodeObjects, edgeObjects } = createGraph(scene);

    // Create particles
    const particles = createParticles(scene);

    return {
      scene,
      camera,
      renderer,
      nodeObjects,
      edgeObjects,
      raycaster,
      particles,
      animationId: 0
    };
  }, []);

  // ============================================================================
  // Create Graph Nodes and Edges
  // ============================================================================

  const createGraph = useCallback((scene: THREE.Scene) => {
    const nodeObjects: THREE.Mesh[] = [];
    const edgeObjects: THREE.Line[] = [];

    // Create nodes
    graphData.nodes.forEach((node, index) => {
      try {
        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
          color: node.color,
          emissive: node.color,
          emissiveIntensity: 0.3,
          shininess: 100,
          specular: 0xffffff
        });
        const sphere = new THREE.Mesh(geometry, material);

        // Calculate position
        const angle = (index / graphData.nodes.length) * Math.PI * 2;
        const radius = 25;
        const height = (Math.sin(index * 1.5) * 0.5) * 20; // More deterministic height
        
        const position = new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        );

        sphere.position.copy(position);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        sphere.userData = node;

        // Store original position
        nodePositionsRef.current[index] = position.clone();

        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(2, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.2,
          side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        sphere.add(glow);

        scene.add(sphere);
        nodeObjects.push(sphere);
      } catch (err) {
        console.error(`Error creating node ${node.name}:`, err);
      }
    });

    // Create edges
    graphData.edges.forEach(edge => {
      try {
        const sourceNode = nodeObjects[edge.source - 1];
        const targetNode = nodeObjects[edge.target - 1];

        if (!sourceNode || !targetNode) {
          console.warn(`Missing node for edge: ${edge.source} -> ${edge.target}`);
          return;
        }

        const points = [sourceNode.position.clone(), targetNode.position.clone()];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.3
        });
        const line = new THREE.Line(geometry, material);
        
        scene.add(line);
        edgeObjects.push(line);
      } catch (err) {
        console.error(`Error creating edge ${edge.source} -> ${edge.target}:`, err);
      }
    });

    return { nodeObjects, edgeObjects };
  }, []);

  // ============================================================================
  // Create Particle System
  // ============================================================================

  const createParticles = useCallback((scene: THREE.Scene): THREE.Points => {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    return particlesMesh;
  }, []);

  // ============================================================================
  // Update Graph Rotation
  // ============================================================================

  const updateRotation = useCallback(() => {
    const resources = resourcesRef.current;
    if (!resources) return;

    const { nodeObjects, edgeObjects } = resources;
    const rotation = rotationRef.current;

    nodeObjects.forEach((node, index) => {
      const originalPos = nodePositionsRef.current[index];
      if (!originalPos) return;

      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);

      // Apply rotation
      let x = originalPos.x * cosY - originalPos.z * sinY;
      let z = originalPos.x * sinY + originalPos.z * cosY;
      let y = originalPos.y * cosX - z * sinX;
      z = originalPos.y * sinX + z * cosX;

      node.position.set(x, y, z);
    });

    // Update edges
    edgeObjects.forEach((edge, index) => {
      const edgeData = graphData.edges[index];
      if (!edgeData) return;

      const sourceNode = nodeObjects[edgeData.source - 1];
      const targetNode = nodeObjects[edgeData.target - 1];

      if (sourceNode && targetNode) {
        const points = [sourceNode.position.clone(), targetNode.position.clone()];
        edge.geometry.setFromPoints(points);
      }
    });
  }, []);

  // ============================================================================
  // Animation Loop
  // ============================================================================

  const animate = useCallback(() => {
    if (!mountedRef.current) return;

    const resources = resourcesRef.current;
    if (!resources) return;

    resources.animationId = requestAnimationFrame(animate);

    const { scene, camera, renderer, nodeObjects } = resources;
    const mouseState = mouseStateRef.current;

    // Auto-rotation when not dragging
    if (!mouseState.isDragging) {
      rotationRef.current.y += 0.001;
    }

    updateRotation();

    // Animate node glow
    const time = Date.now() * 0.001;
    nodeObjects.forEach((node, index) => {
      const glow = node.children[0] as THREE.Mesh;
      if (glow) {
        const scale = 1 + Math.sin(time * 2 + index) * 0.1;
        glow.scale.set(scale, scale, scale);
      }
    });

    renderer.render(scene, camera);
  }, [updateRotation]);

  // ============================================================================
  // Event Handlers
  // ============================================================================

  const handleMouseDown = useCallback((e: MouseEvent | TouchEvent) => {
    const mouseState = mouseStateRef.current;
    mouseState.isDragging = true;

    if (e instanceof MouseEvent) {
      mouseState.previousPosition = { x: e.clientX, y: e.clientY };
    } else if (e.touches.length > 0) {
      mouseState.previousPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    const container = containerRef.current;
    const resources = resourcesRef.current;
    const mouseState = mouseStateRef.current;
    
    if (!container || !resources) return;

    let clientX: number, clientY: number;

    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      return;
    }

    // Update mouse position for raycasting
    const rect = container.getBoundingClientRect();
    mouseState.vector.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouseState.vector.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    // Handle dragging
    if (mouseState.isDragging) {
      const deltaX = clientX - mouseState.previousPosition.x;
      const deltaY = clientY - mouseState.previousPosition.y;

      rotationRef.current.y += deltaX * 0.005;
      rotationRef.current.x += deltaY * 0.005;

      // Clamp vertical rotation
      rotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.x));

      mouseState.previousPosition = { x: clientX, y: clientY };
    }

    // Hover effect
    const { raycaster, camera, nodeObjects } = resources;
    raycaster.setFromCamera(mouseState.vector, camera);
    const intersects = raycaster.intersectObjects(nodeObjects);

    nodeObjects.forEach(node => node.scale.set(1, 1, 1));

    if (intersects.length > 0) {
      intersects[0].object.scale.set(1.3, 1.3, 1.3);
      container.style.cursor = 'pointer';
    } else {
      container.style.cursor = 'grab';
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseStateRef.current.isDragging = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  }, []);

  const handleClick = useCallback((e: MouseEvent | TouchEvent) => {
    const resources = resourcesRef.current;
    const mouseState = mouseStateRef.current;
    
    if (!resources) return;

    const { raycaster, camera, nodeObjects } = resources;
    raycaster.setFromCamera(mouseState.vector, camera);
    const intersects = raycaster.intersectObjects(nodeObjects);

    if (intersects.length > 0) {
      const clickedNode = intersects[0].object.userData as Node;
      setSelectedNode(clickedNode);

      // Find connections
      const conns = graphData.edges
        .filter(edge => edge.source === clickedNode.id || edge.target === clickedNode.id)
        .map(edge => {
          const connectedNodeId = edge.source === clickedNode.id ? edge.target : edge.source;
          const connectedNode = graphData.nodes.find(n => n.id === connectedNodeId);
          return connectedNode ? {
            name: connectedNode.name,
            relationship: edge.relationship,
            color: connectedNode.color
          } : null;
        })
        .filter((conn): conn is Connection => conn !== null);
      
      setConnections(conns);
    }
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const resources = resourcesRef.current;
    if (!resources) return;

    const { camera } = resources;
    camera.position.z += e.deltaY * 0.05;
    camera.position.z = Math.max(20, Math.min(100, camera.position.z));
  }, []);

  const handleResize = useCallback(() => {
    const container = containerRef.current;
    const resources = resourcesRef.current;
    
    if (!container || !resources) return;

    const { camera, renderer } = resources;
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }, []);

  // ============================================================================
  // Cleanup Function
  // ============================================================================

  const cleanup = useCallback(() => {
    const resources = resourcesRef.current;
    if (!resources) return;

    const { scene, renderer, nodeObjects, edgeObjects, particles, animationId } = resources;

    // Cancel animation
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    // Dispose geometries and materials
    nodeObjects.forEach(node => {
      if (node.geometry) node.geometry.dispose();
      if (node.material) {
        if (Array.isArray(node.material)) {
          node.material.forEach(mat => mat.dispose());
        } else {
          node.material.dispose();
        }
      }
      node.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
    });

    edgeObjects.forEach(edge => {
      if (edge.geometry) edge.geometry.dispose();
      if (edge.material) {
        if (Array.isArray(edge.material)) {
          edge.material.forEach(mat => mat.dispose());
        } else {
          edge.material.dispose();
        }
      }
    });

    if (particles) {
      if (particles.geometry) particles.geometry.dispose();
      if (particles.material) {
        if (Array.isArray(particles.material)) {
          particles.material.forEach(mat => mat.dispose());
        } else {
          particles.material.dispose();
        }
      }
    }

    // Clear scene
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }

    // Dispose renderer
    renderer.dispose();

    // Remove DOM element
    if (containerRef.current && renderer.domElement && renderer.domElement.parentNode === containerRef.current) {
      containerRef.current.removeChild(renderer.domElement);
    }

    resourcesRef.current = null;
  }, []);

  // ============================================================================
  // Main Effect
  // ============================================================================

  useEffect(() => {
    mountedRef.current = true;

    // Check WebGL support
    if (!checkWebGLSupport()) {
      setIsWebGLSupported(false);
      setIsLoading(false);
      setError('WebGL is not supported in your browser. Please use a modern browser with WebGL support.');
      return;
    }

    try {
      // Initialize scene
      const resources = initializeScene();
      resourcesRef.current = resources;

      // Setup event listeners
      const canvas = resources.renderer.domElement;
      
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('click', handleClick);
      canvas.addEventListener('wheel', handleWheel, { passive: false });

      // Touch events for mobile
      canvas.addEventListener('touchstart', handleMouseDown, { passive: true });
      canvas.addEventListener('touchmove', handleMouseMove, { passive: true });
      canvas.addEventListener('touchend', handleMouseUp, { passive: true });

      window.addEventListener('resize', handleResize);

      // Start animation
      animate();

      // Loading complete
      setTimeout(() => {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }, 1500);

      // Cleanup
      return () => {
        mountedRef.current = false;

        const canvas = resourcesRef.current?.renderer.domElement;
        if (canvas) {
          canvas.removeEventListener('mousedown', handleMouseDown);
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseup', handleMouseUp);
          canvas.removeEventListener('click', handleClick);
          canvas.removeEventListener('wheel', handleWheel);
          canvas.removeEventListener('touchstart', handleMouseDown);
          canvas.removeEventListener('touchmove', handleMouseMove);
          canvas.removeEventListener('touchend', handleMouseUp);
        }

        window.removeEventListener('resize', handleResize);

        cleanup();
      };
    } catch (err) {
      console.error('Error initializing Knowledge Graph:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize 3D visualization');
      setIsLoading(false);
    }
  }, [
    checkWebGLSupport,
    initializeScene,
    animate,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleClick,
    handleWheel,
    handleResize,
    cleanup
  ]);

  // ============================================================================
  // Render
  // ============================================================================

  if (!isWebGLSupported) {
    return (
      <div className={styles.container}>
        <div className={styles.errorScreen}>
          <h2>WebGL Not Supported</h2>
          <p>{error}</p>
          <p>Please try using a modern browser like Chrome, Firefox, Safari, or Edge.</p>
        </div>
      </div>
    );
  }

  if (error && !isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.errorScreen}>
          <h2>Error Loading Knowledge Graph</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} role="application" aria-label="3D Knowledge Graph Visualization">
      {isLoading && (
        <div className={styles.loadingScreen} role="status" aria-live="polite">
          <div className={styles.loader} aria-hidden="true"></div>
          <p>Loading Knowledge Graph...</p>
        </div>
      )}

      <div className={styles.infoOverlay}>
        <h1>Robotics Industry Knowledge Graph</h1>
        <p>Explore connections between leading robotics companies</p>
        <div className={styles.controlsHint} role="note">
          <span>🖱️ Drag to rotate</span>
          <span>🔍 Scroll to zoom</span>
          <span>👆 Click nodes for details</span>
        </div>
      </div>

      {selectedNode && (
        <div 
          className={styles.nodeDetailCard} 
          role="dialog" 
          aria-labelledby="node-title"
          aria-describedby="node-description"
        >
          <button 
            className={styles.closeBtn} 
            onClick={() => setSelectedNode(null)}
            aria-label="Close details"
          >
            ×
          </button>
          <h2 id="node-title">{selectedNode.name}</h2>
          <p className={styles.nodeCategory}>{selectedNode.category}</p>
          <p id="node-description" className={styles.nodeDescription}>
            {selectedNode.description}
          </p>
          {connections.length > 0 && (
            <div className={styles.nodeConnections}>
              <h3>Connections ({connections.length})</h3>
              <div role="list">
                {connections.map((conn, idx) => (
                  <div 
                    key={idx} 
                    className={styles.connectionItem}
                    style={{ borderLeftColor: conn.color }}
                    role="listitem"
                  >
                    <strong>{conn.name}</strong>
                    <br />
                    <small>{conn.relationship}</small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.stats} role="status" aria-label="Graph statistics">
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Companies</span>
          <span className={styles.statValue}>{graphData.nodes.length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Connections</span>
          <span className={styles.statValue}>{graphData.edges.length}</span>
        </div>
      </div>

      <div 
        ref={containerRef} 
        className={styles.graphCanvas}
        aria-label="Interactive 3D graph canvas"
      />
    </div>
  );
}
