// FILE: components/knowledge-graph/graphcontrols.tsx
'use client';

import { Filter, Zap, Globe, Users, Building2, Lightbulb } from 'lucide-react';
import { NodeType } from './types';

interface GraphControlsProps {
  activeFilters: Set<NodeType>;
  onFilterToggle: (type: NodeType) => void;
  onResetView: () => void;
}

const nodeTypes: { type: NodeType; label: string; icon: any; color: string }[] = [
  { type: 'company', label: 'Companies', icon: Building2, color: '#00bfff' },
  { type: 'investor', label: 'Investors', icon: Users, color: '#ff8c00' },
  { type: 'founder', label: 'Founders', icon: Users, color: '#ffd700' },
  { type: 'technology', label: 'Technologies', icon: Lightbulb, color: '#00ff7f' },
  { type: 'location', label: 'Locations', icon: Globe, color: '#ff69b4' },
];

export function GraphControls({ activeFilters, onFilterToggle, onResetView }: GraphControlsProps) {
  return (
    <div className="fixed top-24 right-8 z-40 space-y-3">
      {/* Filter Panel */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-white/80" />
          <span className="text-white/80 text-sm font-semibold">Filters</span>
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
