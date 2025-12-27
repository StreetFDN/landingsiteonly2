// FILE: components/knowledge-graph/legend.tsx
'use client';

import { Info } from 'lucide-react';

export function Legend() {
  const nodeTypes = [
    { shape: 'cube', label: 'Company', color: '#00bfff' },
    { shape: 'octahedron', label: 'Investor', color: '#ff8c00' },
    { shape: 'sphere', label: 'Founder', color: '#ffd700' },
    { shape: 'tetrahedron', label: 'Technology', color: '#00ff7f' },
    { shape: 'cone', label: 'Location', color: '#ff69b4' },
  ];

  const edgeTypes = [
    { label: 'Investment', color: '#ff8c00' },
    { label: 'Founded', color: '#ffd700' },
    { label: 'Geographic', color: '#ff69b4' },
    { label: 'Technology', color: '#00ff7f' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-white/80" />
          <span className="text-white/80 text-sm font-semibold">Legend</span>
        </div>

        {/* Node Types */}
        <div className="mb-4">
          <div className="text-white/50 text-xs uppercase tracking-wider mb-2">Nodes</div>
          <div className="space-y-2">
            {nodeTypes.map(({ shape, label, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-white/70 text-xs">{label}</span>
                <span className="text-white/40 text-xs ml-auto">{shape}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edge Types */}
        <div>
          <div className="text-white/50 text-xs uppercase tracking-wider mb-2">Edges</div>
          <div className="space-y-2">
            {edgeTypes.map(({ label, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-8 h-0.5"
                  style={{ backgroundColor: color }}
                />
                <span className="text-white/70 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
