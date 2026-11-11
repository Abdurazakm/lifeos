import React from 'react';
import { RotateCcw, Sparkles, Cpu } from 'lucide-react';

export default function Header({
  isSampleDay,
  planningSource,
  onResetSample,
  isLoading
}) {
  return (
    <header className="border-b border-[#1f4569] bg-[#102A43]/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#38BDF8] to-[#2DD4BF] flex items-center justify-center shadow-lg shadow-[#38BDF8]/20 font-mono font-black text-xl text-[#102A43]">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-[#F8FAFC] font-mono">
                LifeOS <span className="text-[#38BDF8] font-sans font-semibold text-sm">Lite</span>
              </h1>
              {/* Engine Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-[#1f4569]">
                {planningSource === 'ai-assisted' ? (
                  <span className="flex items-center gap-1 text-[#2DD4BF]">
                    <Sparkles className="w-3 h-3 text-[#2DD4BF]" />
                    AI-assisted
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[#38BDF8]">
                    <Cpu className="w-3 h-3 text-[#38BDF8]" />
                    Local planner
                  </span>
                )}
              </div>
              {isSampleDay && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#FBBF24]/15 text-[#FBBF24] border border-[#FBBF24]/30">
                  Sample day
                </span>
              )}
            </div>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Make a plan. Keep moving.
            </p>
          </div>
        </div>

        {/* Demo Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onResetSample}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#F8FAFC] bg-[#143250] hover:bg-[#1a3f65] border border-[#1f4569] transition cursor-pointer disabled:opacity-50"
            title="Reset to 3-task demonstration scenario"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Load sample day</span>
          </button>
        </div>
      </div>
    </header>
  );
}
