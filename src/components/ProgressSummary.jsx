import React from 'react';
import { Award, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

export default function ProgressSummary({
  completedCount,
  totalTasks,
  progress,
  xp,
  availableMinutes,
  unfinishedMinutes
}) {
  const percent = Math.round(progress * 100);

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
        {/* Completed Missions */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Missions</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">
            {completedCount} <span className="text-sm font-normal text-slate-400">/ {totalTasks}</span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            {percent}% completed
          </p>
        </div>

        {/* Experience Points (XP) */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider font-mono">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Experience</span>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {xp} <span className="text-xs font-normal text-slate-400">XP</span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            +25 XP per mission
          </p>
        </div>

        {/* Available Planning Budget */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Available Time</span>
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {availableMinutes} <span className="text-xs font-normal text-slate-400">mins</span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Active time budget
          </p>
        </div>

        {/* Unfinished Workload */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span>Pending Work</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-200">
            {unfinishedMinutes} <span className="text-xs font-normal text-slate-400">mins</span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            {totalTasks - completedCount} unfinished tasks
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 pt-4 border-t border-slate-700/60">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-mono">
          <span>Daily Progress</span>
          <span className="text-emerald-400 font-bold">{percent}%</span>
        </div>
        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-700/50">
          <div
            className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
