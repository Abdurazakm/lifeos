import React from 'react';
import { Zap } from 'lucide-react';
import { LIMITS } from '../lib/contracts.js';

export default function RecoveryPanel({
  recoveryMinutes,
  onUpdateRecoveryMinutes,
  onRecoverDay,
  scheduledMinutes,
  savedForLaterMinutes,
  isLoading
}) {
  return (
    <div className="bg-[#102A43] border border-[#FBBF24]/40 rounded-2xl p-5 shadow-xl space-y-4 relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FBBF24]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1f4569]/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FBBF24] animate-pulse" />
            <h2 className="text-base font-bold text-[#FBBF24] font-mono flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-[#FBBF24]" />
              Plot twist? Adjust the plan.
            </h2>
          </div>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Life doesn't follow your schedule. Your schedule should adapt to your life.
          </p>
        </div>
      </div>

      {/* Tradeoff Spotlight Card */}
      <div className="p-3.5 rounded-xl bg-[#0a1a2b] border border-[#FBBF24]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#38BDF8] font-bold">{scheduledMinutes}m planned</span>
          <span className="text-[#94A3B8]">·</span>
          <span className="text-[#FBBF24] font-bold">{savedForLaterMinutes}m saved for later</span>
        </div>
        <span className="text-[11px] text-[#2DD4BF] font-mono">
          Tradeoff visible immediately
        </span>
      </div>

      {/* New Available Time Budget Input */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-wider text-[#F8FAFC] flex justify-between">
          <span>Realistic Remaining Time</span>
          <span className="text-[#FBBF24] font-bold">{recoveryMinutes} minutes left</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={LIMITS.MIN_AVAILABLE_MINUTES}
            max={LIMITS.MAX_AVAILABLE_MINUTES}
            step={5}
            value={recoveryMinutes}
            onChange={(e) => onUpdateRecoveryMinutes(Number(e.target.value))}
            className="flex-1 accent-[#FBBF24] h-2 bg-[#0a1a2b] rounded-lg cursor-pointer"
          />
          <input
            type="number"
            min={LIMITS.MIN_AVAILABLE_MINUTES}
            max={LIMITS.MAX_AVAILABLE_MINUTES}
            value={recoveryMinutes}
            onChange={(e) => onUpdateRecoveryMinutes(Math.max(0, Math.min(240, Number(e.target.value) || 0)))}
            className="w-16 bg-[#0a1a2b] border border-[#1f4569] rounded-lg px-2.5 py-1 text-xs font-mono text-center text-[#F8FAFC] focus:outline-none focus:border-[#FBBF24]"
          />
        </div>

        {/* Quick Presets for Demo */}
        <div className="flex gap-1.5 pt-1">
          {[15, 30, 45, 60].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onUpdateRecoveryMinutes(preset)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition cursor-pointer ${
                recoveryMinutes === preset
                  ? 'bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/50 font-bold'
                  : 'bg-[#0a1a2b] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1f4569]/50'
              }`}
            >
              {preset}m
            </button>
          ))}
        </div>
      </div>

      {/* Recover Action Button */}
      <div className="pt-2">
        <button
          onClick={() => onRecoverDay(recoveryMinutes)}
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-xl bg-[#FBBF24] hover:bg-[#f59e0b] text-[#102A43] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FBBF24]/25 transition cursor-pointer disabled:opacity-50"
        >
          <Zap className="w-4 h-4 fill-[#102A43]" />
          <span>{isLoading ? 'Making room for what matters…' : 'Recover my day'}</span>
        </button>
      </div>
    </div>
  );
}
