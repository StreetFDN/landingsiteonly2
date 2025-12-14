// FILE: app/city/page.tsx
'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Loader } from '@react-three/drei';
import { FutureCity } from '@/components/city/futurecity';
import { DetailPanel } from '@/components/city/detailpanel';
import { Startup } from '@/components/city/types';
import { CinematicIntro } from '@/components/city/cinematicintro';

export default function CityPage() {
  const [selected, setSelected] = useState<Startup | null>(null);
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="w-screen h-screen bg-[#f2f4f7] relative overflow-hidden">
      
      {/* --- RESTORED TOP-LEFT HEADER --- */}
      <div className="absolute top-8 left-8 z-[3000] pointer-events-auto font-sans">
         {/* Link to street.app */}
         <a 
           href="https://street.app" 
           className="flex items-center gap-3 mb-3 hover:opacity-60 transition-opacity cursor-pointer group"
         >
            {/* Logo Image */}
            <img 
              src="/streetmono.png" 
              alt="Street" 
              className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" 
            />
            <span className="text-2xl font-serif text-slate-900 font-medium">Street</span>
         </a>
         
         {/* Caption */}
         <p className="text-sm text-slate-500 max-w-xs leading-relaxed font-medium">
           The epicenter of innovation is here, view what ERC-S startups managed to accomplish.
         </p>
      </div>
      {/* -------------------------------- */}

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 150, 0], fov: 35 }} 
        shadows
        className="w-full h-full"
      >
        <color attach="background" args={['#f2f4f7']} />
        
        {/* Fog logic handles the transition inside FutureCity */}
        <fog attach="fog" args={['#f2f4f7', 10, 20]} />

        <Suspense fallback={null}>
          <FutureCity 
            selected={selected} 
            onSelect={setSelected} 
            introFinished={introFinished} 
          />
          <Environment preset="city" blur={0.5} background={false} />
          
          {!introFinished && (
            <CinematicIntro onComplete={() => setIntroFinished(true)} />
          )}
        </Suspense>

        <OrbitControls 
          makeDefault 
          enabled={introFinished && !selected} 
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
