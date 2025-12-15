// FILE: app/city/page.tsx
'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Loader } from '@react-three/drei';
import { FutureCity } from '@/components/city/futurecity';
import { DetailPanel } from '@/components/city/detailpanel';
import { Startup } from '@/components/city/types';

// --- NAVBAR COMPONENT (Copied from Scouting Page) ---
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 py-6 transition-all bg-transparent pointer-events-none">
      <div className="max-w-[1100px] mx-auto px-8 flex justify-between items-center pointer-events-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
              <a href="/">
                  {/* Ensure this file exists in /public. If you only have .jpg, change this to .jpg */}
                  <img src="/street-logo.png" alt="Street" className="h-8 w-auto object-contain invert" />
              </a>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center gap-6">
              
              {/* NAV LINKS */}
              <div className="hidden md:flex items-center gap-8 mr-2">
                  <a href="/scouting" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans">Scouting</a>
                  <a href="/web3" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans">Research</a>
                  <a href="/city" className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors font-sans">
                      Network City
                      <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">New</span>
                  </a>
              </div>

             

              <button 
                  className="bg-slate-900/5 backdrop-blur-md border border-slate-900/10 text-slate-900 px-6 py-2.5 rounded-full text-xs font-bold hover:bg-slate-900/10 hover:scale-105 transition-all shadow-sm flex items-center gap-2 font-sans"
              >
                  Launch App
              </button>
          </div>
      </div>
  </nav>
);

// --- MAIN PAGE ---
export default function CityPage() {
  const [selected, setSelected] = useState<Startup | null>(null);

  return (
    <div className="w-screen h-screen bg-[#f2f4f7] relative overflow-hidden">
      
      {/* 1. ADD NAVBAR HERE (It sits on top of the Canvas via z-index) */}
      <Navbar />

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [25, 25, 25], fov: 35 }} 
        shadows
        className="w-full h-full"
      >
        <color attach="background" args={['#f2f4f7']} />
        
        {/* Clear Day Fog */}
        <fog attach="fog" args={['#f2f4f7', 10, 120]} />

        <Suspense fallback={null}>
          <FutureCity 
            selected={selected} 
            onSelect={setSelected} 
            introFinished={true} 
          />
          <Environment preset="city" blur={0.5} background={false} />
        </Suspense>

        <OrbitControls 
          makeDefault 
          enabled={!selected} 
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={10}
          maxDistance={80}
          dampingFactor={0.05}
          target={[0, 0, 0]}
        />
      </Canvas>
      
      {selected && (
        <DetailPanel startup={selected} onClose={() => setSelected(null)} />
      )}
      
      <Loader />
    </div>
  );
}
