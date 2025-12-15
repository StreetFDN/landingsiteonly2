// FILE: components/city/detailpanel.tsx
'use client';

import { Startup } from "./types";
import { ArrowRight, X, ExternalLink } from "lucide-react";

// 1. UPDATED MAPPING: All extensions changed to .jpg
const LOGO_MAP: Record<string, string> = {
  "street": "/street-logo.jpg",      
  "kled": "/kled-logo.jpg",          
  "starfun": "/starlogo.jpg",        
  "noice": "/noicelogo.jpg",         
  "opendroids": "/opendroidslogo.jpg" 
};

interface DetailPanelProps {
  startup: Startup;
  onClose: () => void;
}

export const DetailPanel = ({ startup, onClose }: DetailPanelProps) => {
  const logoPath = LOGO_MAP[startup.id];

  return (
    <div className="absolute right-0 top-0 h-full w-1/3 min-w-[350px] bg-white/80 backdrop-blur-xl border-l border-white/60 shadow-2xl p-8 md:p-12 flex flex-col justify-center z-50 animate-in slide-in-from-right duration-500">
      
      <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-800 transition-colors bg-white/50 p-2 rounded-full">
          <X size={24} />
      </button>

      <div className="space-y-8 mt-10">
          <div className="flex items-center gap-4">
              {/* Logo Container */}
              <div className="w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden bg-white shrink-0 border border-slate-100">
                  {logoPath ? (
                    <img 
                      src={logoPath} 
                      alt={`${startup.name} Logo`} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        // Fallback if the .jpg doesn't exist
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback Letter (Shows if image fails to load) */}
                  <div className={`w-full h-full flex items-center justify-center text-2xl font-bold text-white ${logoPath ? 'hidden' : ''}`} style={{ backgroundColor: startup.color }}>
                      {startup.name[0]}
                  </div>
              </div>

              <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                    {startup.district} District
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                    {startup.name}
                  </h2>
              </div>
          </div>

          <div className="h-px w-full bg-slate-200" />

          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              {startup.description}
          </p>

          <div className="pt-4 space-y-4">
              <button 
                  onClick={() => window.open("https://app.street.money", "_blank")} 
                  className="group w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                  Govern this SPV <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </button>
              
              <a 
                  href={startup.link} 
                  target="_blank" 
                  className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors py-2 uppercase tracking-wide"
              >
                  View Official Website <ExternalLink size={14} />
              </a>
          </div>
      </div>
    </div>
  );
};
