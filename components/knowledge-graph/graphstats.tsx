// FILE: components/knowledge-graph/graphstats.tsx
'use client';

import { Network, Link, Layers } from 'lucide-react';
import { GraphData } from './types';

interface GraphStatsProps {
  data: GraphData;
}

export function GraphStats({ data }: GraphStatsProps) {
  const stats = [
    {
      icon: Network,
      label: 'Nodes',
      value: data.nodes.length,
      color: '#00bfff',
    },
    {
      icon: Link,
      label: 'Connections',
      value: data.edges.length,
      color: '#ff8c00',
    },
    {
      icon: Layers,
      label: 'Categories',
      value: new Set(data.nodes.map(n => n.type)).size,
      color: '#00ff7f',
    },
  ];

  return (
    <div className="fixed top-24 left-8 z-40">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
        <div className="space-y-3">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${color}20`, borderColor: `${color}40` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div>
                <div className="text-white text-lg font-bold">{value}</div>
                <div className="text-white/50 text-xs">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
