import React from 'react';
import { RotateCcw, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';

export default function Header({
  isSampleDay,
  planningSource,
  onResetSample,
  isLoading
}) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 font-mono font-black text-xl text-slate-950">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-slate-100 font-mono">
                LifeOS <span className="text-cyan-400 font-sans font-semibold text-sm">Lite</span>
              </h1>
              {/* Engine Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border">
                {planningSource === 'ai-assisted' ? (
                  <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    AI-assisted
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-cyan-300 bg-cyan-500/10 border-cyan-500/30">
                    <Cpu className="w-3 h-3 text-cyan-400" />
                    Local planner
                  </span>
                )}
              </div>
              {isSampleDay && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Sample day
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Make a plan. Keep moving.
            </p>
          </div>
        </div>

        {/* Demo Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onResetSample}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition cursor-pointer disabled:opacity-50"
            title="Reset to 3-task demonstration scenario"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Load sample day</span>
          </button>
        </div>
      </div>
    </header>
  );
}
