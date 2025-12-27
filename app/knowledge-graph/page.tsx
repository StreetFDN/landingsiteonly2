// FILE: app/knowledge-graph/page.tsx
'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Loader, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Graph3D } from '@/components/knowledge-graph/graph3d';
import { GraphControls } from '@/components/knowledge-graph/graphcontrols';
import { DetailPanel } from '@/components/knowledge-graph/detailpanel';
import { Legend } from '@/components/knowledge-graph/legend';
import { GraphStats } from '@/components/knowledge-graph/graphstats';
import { graphData } from '@/components/knowledge-graph/graphdata';
import { GraphNode, NodeType } from '@/components/knowledge-graph/types';
import { Loader2 } from 'lucide-react';

// Navbar Component
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 py-6 transition-all bg-transparent pointer-events-none">
    <div className="max-w-[1100px] mx-auto px-8 flex justify-between items-center pointer-events-auto">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <a href="/">
          <img
            src="/street-logo.png"
            alt="Street"
            className="h-8 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1) opacity(0.9)' }}
          />
        </a>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 mr-2">
          <a
            href="/scouting"
            className="text-sm font-medium transition-colors font-sans text-gray-200 hover:text-gray-300"
          >
            Scouting
          </a>
          <a
            href="/web3"
            className="text-sm font-medium transition-colors font-sans text-gray-200 hover:text-gray-300"
          >
            Research
          </a>
          <a
            href="/city"
            className="text-sm font-medium transition-colors font-sans text-gray-200 hover:text-gray-300"
          >
            Network City
          </a>
          <a
            href="/knowledge-graph"
            className="group flex items-center gap-2 text-sm font-medium transition-colors font-sans text-gray-200 hover:text-gray-300"
          >
            Knowledge Graph
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm bg-gray-300/20 text-gray-200">
              New
            </span>
          </a>
        </div>

        <button className="backdrop-blur-md px-6 py-2.5 rounded-full text-xs font-bold hover:scale-105 transition-all shadow-sm flex items-center gap-2 font-sans bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20">
          Launch App
        </button>
      </div>
    </div>
  </nav>
);

// Camera Controller Component
function CameraController({ resetTrigger }: { resetTrigger: number }) {
  const controlsRef = useRef<any>(null);
  const prevTrigger = useRef(0);

  useEffect(() => {
    if (resetTrigger !== prevTrigger.current && resetTrigger > 0 && controlsRef.current) {
      prevTrigger.current = resetTrigger;
      
      // Reset camera position
      controlsRef.current.reset();
    }
  }, [resetTrigger]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan
      enableZoom
      enableRotate
      autoRotate
      autoRotateSpeed={0.3}
      minDistance={15}
      maxDistance={100}
      dampingFactor={0.05}
    />
  );
}

// Main Page Component
export default function KnowledgeGraphPage() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<NodeType>>(
    new Set(['company', 'investor', 'founder', 'technology', 'location'])
  );
  const [cameraResetTrigger, setCameraResetTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter data based on active filters
  const filteredData = {
    nodes: graphData.nodes.filter((node) => activeFilters.has(node.type)),
    edges: graphData.edges.filter((edge) => {
      const sourceNode = graphData.nodes.find((n) => n.id === edge.source);
      const targetNode = graphData.nodes.find((n) => n.id === edge.target);
      return (
        sourceNode &&
        targetNode &&
        activeFilters.has(sourceNode.type) &&
        activeFilters.has(targetNode.type)
      );
    }),
  };

  const handleFilterToggle = (type: NodeType) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(type)) {
        newFilters.delete(type);
      } else {
        newFilters.add(type);
      }
      return newFilters;
    });
    // Clear selection when filters change
    setSelectedNode(null);
  };

  const handleResetView = () => {
    setCameraResetTrigger((prev) => prev + 1);
    setSelectedNode(null);
  };

  const handleNodeSelect = (node: GraphNode | null) => {
    setSelectedNode(node);
  };

  return (
    <div className="w-screen h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-10 flex flex-col items-center gap-6 max-w-sm w-full mx-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/30 blur-xl rounded-full"></div>
              <Loader2 className="w-10 h-10 text-blue-400 animate-spin relative z-10" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-semibold text-white font-sans">
                Building Knowledge Graph
              </h3>
              <p className="text-sm font-medium text-gray-400 font-mono">
                Initializing visualization...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      {/* Title Section */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none">
        <h1 className="text-white text-4xl font-bold mb-2">
          Robotics Knowledge Graph
        </h1>
        <p className="text-white/60 text-sm">
          Explore the interconnected world of robotics companies, investors, and technologies
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas
        dpr={[1, 2]}
        shadows
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 30, 120]} />

        <PerspectiveCamera makeDefault position={[40, 30, 40]} fov={60} />

        <Suspense fallback={null}>
          <Graph3D
            data={filteredData}
            onNodeSelect={handleNodeSelect}
            selectedNode={selectedNode}
          />

          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              height={300}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
          </EffectComposer>
        </Suspense>

        <CameraController resetTrigger={cameraResetTrigger} />
      </Canvas>

      {/* UI Overlays */}
      <GraphStats data={filteredData} />
      <GraphControls
        activeFilters={activeFilters}
        onFilterToggle={handleFilterToggle}
        onResetView={handleResetView}
      />
      <Legend />
      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />

      {/* Instructions */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-lg">
          <p className="text-white/70 text-xs text-center">
            <span className="font-semibold">Click</span> nodes to view details •{' '}
            <span className="font-semibold">Drag</span> to rotate •{' '}
            <span className="font-semibold">Scroll</span> to zoom
          </p>
        </div>
      </div>

      <Loader />
    </div>
  );
}
