// FILE: components/knowledge-graph/graphcontrols.tsx
'use client';

import { Filter, Zap, Globe, Users, Building2, Lightbulb, Layers } from 'lucide-react';
import { NodeType, Sector } from './types';

interface GraphControlsProps {
  activeFilters: Set<NodeType>;
  activeSectors: Set<Sector>;
  onFilterToggle: (type: NodeType) => void;
  onSectorToggle: (sector: Sector) => void;
  onResetView: () => void;
}

const nodeTypes: { type: NodeType; label: string; icon: any; color: string }[] = [
  { type: 'company', label: 'Companies', icon: Building2, color: '#00bfff' },
  { type: 'investor', label: 'Investors', icon: Users, color: '#ff8c00' },
  { type: 'founder', label: 'Founders', icon: Users, color: '#ffd700' },
  { type: 'technology', label: 'Technologies', icon: Lightbulb, color: '#00ff7f' },
  { type: 'location', label: 'Locations', icon: Globe, color: '#ff69b4' },
];

const sectors: { sector: Sector; label: string; color: string; emoji: string }[] = [
  { sector: 'robotics', label: 'Robotics', color: '#00bfff', emoji: '🤖' },
  { sector: 'ai', label: 'AI/AGI', color: '#ff1493', emoji: '🧠' },
  { sector: 'space', label: 'Space Tech', color: '#00ffff', emoji: '🚀' },
  { sector: 'nuclear', label: 'Nuclear', color: '#00ff00', emoji: '⚛️' },
  { sector: 'defense', label: 'Defense', color: '#ff0000', emoji: '🛡️' },
  { sector: 'biotech', label: 'Biotech', color: '#9370db', emoji: '🧬' },
  { sector: 'crypto', label: 'Crypto/Web3', color: '#ffa500', emoji: '₿' },
];

export function GraphControls({ 
  activeFilters, 
  activeSectors,
  onFilterToggle, 
  onSectorToggle,
  onResetView 
}: GraphControlsProps) {
  return (
    <div className="fixed top-24 right-8 z-40 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      {/* Sector Filter Panel */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-white/80" />
          <span className="text-white/80 text-sm font-semibold">Sectors</span>
        </div>
        
        <div className="space-y-2">
          {sectors.map(({ sector, label, color, emoji }) => {
            const isActive = activeSectors.has(sector);
            return (
              <button
                key={sector}
                onClick={() => onSectorToggle(sector)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white/20 border border-white/30'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-base">{emoji}</span>
                <span className="text-white/90 text-sm flex-1 text-left">{label}</span>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isActive ? 'bg-white border-white' : 'border-white/30'
                  }`}
                >
                  {isActive && (
                    <svg
                      className="w-3 h-3 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Node Type Filter Panel */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-white/80" />
          <span className="text-white/80 text-sm font-semibold">Node Types</span>
        </div>
        
        <div className="space-y-2">
          {nodeTypes.map(({ type, label, icon: Icon, color }) => {
            const isActive = activeFilters.has(type);
            return (
              <button
                key={type}
                onClick={() => onFilterToggle(type)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white/20 border border-white/30'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <Icon className="w-4 h-4 text-white/70" />
                <span className="text-white/90 text-sm flex-1 text-left">{label}</span>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isActive ? 'bg-white border-white' : 'border-white/30'
                  }`}
                >
                  {isActive && (
                    <svg
                      className="w-3 h-3 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset View Button */}
      <button
        onClick={onResetView}
        className="w-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 rounded-xl px-4 py-3 transition-all shadow-lg group"
      >
        <div className="flex items-center gap-2 justify-center">
          <Zap className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
          <span className="text-white/90 text-sm font-semibold">Reset View</span>
        </div>
      </button>
    </div>
  );
}
