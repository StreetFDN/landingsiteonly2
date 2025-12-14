// FILE: app/city/page.tsx
'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Loader } from '@react-three/drei';
import { FutureCity } from '@/components/city/FutureCity';
import { DetailPanel } from '@/components/city/DetailPanel';
import { Startup } from '@/components/city/types';
import { CinematicIntro } from '@/components/city/CinematicIntro';
export default function CityPage() {
  const [selected, setSelected] = useState<Startup | null>(null);
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="w-screen h-screen bg-[#f2f4f7] relative overflow-hidden">
      
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 150, 0], fov: 35 }} // Start HIGH
        shadows
        className="w-full h-full"
      >
        <color attach="background" args={['#f2f4f7']} />
        
        {/* Start with DENSE fog (far=20), FutureCity will clear it to 120 */}
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
          // When intro finishes, set the default target to center
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