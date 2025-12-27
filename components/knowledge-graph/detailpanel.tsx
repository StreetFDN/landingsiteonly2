// FILE: components/knowledge-graph/detailpanel.tsx
'use client';

import { X, ExternalLink } from 'lucide-react';
import { GraphNode } from './types';

interface DetailPanelProps {
  node: GraphNode | null;
  onClose: () => void;
}

export function DetailPanel({ node, onClose }: DetailPanelProps) {
  if (!node) return null;

  const typeColors: Record<string, string> = {
    company: '#00bfff',
    investor: '#ff8c00',
    founder: '#ffd700',
    technology: '#00ff7f',
    location: '#ff69b4',
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 w-96 animate-in slide-in-from-left duration-300">
      <div className="bg-black/60 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div
          className="p-5 border-b border-white/10"
          style={{
            background: `linear-gradient(135deg, ${typeColors[node.type]}15 0%, transparent 100%)`,
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: node.color || typeColors[node.type] }}
                />
                <span className="text-white/60 text-xs uppercase tracking-wider font-semibold">
                  {node.type}
                </span>
              </div>
              <h3 className="text-white text-xl font-bold">{node.label}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Description */}
          {node.description && (
            <div>
              <p className="text-white/80 text-sm leading-relaxed">{node.description}</p>
            </div>
          )}

          {/* Metadata */}
          {node.metadata && Object.keys(node.metadata).length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-3">
                Details
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(node.metadata).map(([key, value]) => (
                  <div key={key} className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="text-white/50 text-xs mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-white text-sm font-medium">{String(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Link (if company) */}
          {node.type === 'company' && node.metadata?.link && (
            <a
              href={node.metadata.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors group"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="group-hover:underline">Visit Website</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
