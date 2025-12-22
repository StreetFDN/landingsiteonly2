'use client';

import { Sun, Moon, RotateCcw } from 'lucide-react';
import { TimeMode } from '../effects/environmentcontroller';

interface EnvironmentControlsProps {
  mode: TimeMode;
  onModeChange: (mode: TimeMode) => void;
  onCameraReset?: () => void;
}

export const EnvironmentControls = ({ mode, onModeChange, onCameraReset }: EnvironmentControlsProps) => {
  return (
    <div className="fixed top-20 left-8 z-[100] flex flex-col gap-2">
      <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-3 shadow-xl flex flex-col gap-2">
        <button
          onClick={() => onModeChange('day')}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300
            ${mode === 'day' 
              ? 'bg-blue-100/90 text-blue-700 shadow-lg scale-105 ring-2 ring-blue-200/50' 
              : 'bg-white/50 text-slate-600 hover:bg-white/80 hover:scale-105'
            }
          `}
        >
          <Sun className="w-4 h-4" />
          <span className="text-xs font-bold">Day</span>
        </button>
        
        <button
          onClick={() => onModeChange('night')}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300
            ${mode === 'night' 
              ? 'bg-blue-100/90 text-blue-700 shadow-lg scale-105 ring-2 ring-blue-200/50' 
              : 'bg-white/50 text-slate-600 hover:bg-white/80 hover:scale-105'
            }
          `}
        >
          <Moon className="w-4 h-4" />
          <span className="text-xs font-bold">Night</span>
        </button>
        
        {onCameraReset && (
          <button
            onClick={onCameraReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 bg-white/50 text-slate-600 hover:bg-white/80 hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-xs font-bold">Reset Camera</span>
          </button>
        )}
      </div>
    </div>
  );
};

