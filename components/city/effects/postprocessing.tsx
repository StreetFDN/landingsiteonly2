'use client';

import { EffectComposer, Bloom } from '@react-three/postprocessing';

export function PostProcessing() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={4}>
      <Bloom luminanceThreshold={0.9} intensity={0.5} mipmapBlur />
    </EffectComposer>
  );
}
