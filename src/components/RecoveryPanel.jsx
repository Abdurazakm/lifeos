import React from 'react';
import { Zap, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { LIMITS } from '../lib/contracts';

export default function RecoveryPanel({
  recoveryMinutes,
  onUpdateRecoveryMinutes,
  onRecoverDay,
  scheduledMinutes,
  savedForLaterMinutes,
  isLoading
}) {
  return (
    <div className="bg-gradient-to-b from-slate-800/90 to-amber-950/20 border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-4 relative overflow-hidden">
      {/* Decorative subtle ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-base font-bold text-amber-400 font-mono flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-amber-400" />
              Plot twist? Adjust the plan.
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Life doesn't follow your schedule. Your schedule should adapt to your life.
          </p>
        </div>
      </div>

      {/* Tradeoff Spotlight Card */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-cyan-400 font-bold">{scheduledMinutes}m planned</span>
          <span className="text-slate-500">·</span>
          <span className="text-amber-400 font-bold">{savedForLaterMinutes}m saved for later</span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Tradeoff visible immediately
        </span>
      </div>

      {/* New Available Time Budget Input */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex justify-between">
          <span>Realistic Remaining Time</span>
          <span className="text-amber-400 font-bold">{recoveryMinutes} minutes left</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={LIMITS.MIN_AVAILABLE_MINUTES}
            max={LIMITS.MAX_AVAILABLE_MINUTES}
            step={5}
            value={recoveryMinutes}
            onChange={(e) => onUpdateRecoveryMinutes(Number(e.target.value))}
            className="flex-1 accent-amber-400 h-2 bg-slate-900 rounded-lg cursor-pointer"
          />
          <input
            type="number"
            min={LIMITS.MIN_AVAILABLE_MINUTES}
            max={LIMITS.MAX_AVAILABLE_MINUTES}
            value={recoveryMinutes}
            onChange={(e) => onUpdateRecoveryMinutes(Math.max(0, Math.min(240, Number(e.target.value) || 0)))}
            className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-center text-slate-100 focus:outline-none focus:border-amber-400"
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
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
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
          className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer disabled:opacity-50"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>{isLoading ? 'Making room for what matters…' : 'Recover my day'}</span>
        </button>
      </div>
    </div>
  );
}
