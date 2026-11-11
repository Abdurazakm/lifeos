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
    <div className="bg-[#102A43] border border-[#1f4569] rounded-2xl p-5 shadow-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
        {/* Completed Missions */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] uppercase tracking-wider font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
            <span>Missions</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#F8FAFC]">
            {completedCount} <span className="text-sm font-normal text-[#94A3B8]">/ {totalTasks}</span>
          </div>
          <p className="text-[11px] text-[#2DD4BF] font-mono">
            {percent}% completed
          </p>
        </div>

        {/* Experience Points (XP) */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] uppercase tracking-wider font-mono">
            <Award className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>Experience</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#FBBF24]">
            {xp} <span className="text-xs font-normal text-[#94A3B8]">XP</span>
          </div>
          <p className="text-[11px] text-[#FBBF24]/80 font-mono">
            +25 XP per mission
          </p>
        </div>

        {/* Available Planning Budget */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] uppercase tracking-wider font-mono">
            <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Available Time</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#38BDF8]">
            {availableMinutes} <span className="text-xs font-normal text-[#94A3B8]">mins</span>
          </div>
          <p className="text-[11px] text-[#38BDF8]/80 font-mono">
            Active time budget
          </p>
        </div>

        {/* Unfinished Workload */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] uppercase tracking-wider font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Pending Work</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#F8FAFC]">
            {unfinishedMinutes} <span className="text-xs font-normal text-[#94A3B8]">mins</span>
          </div>
          <p className="text-[11px] text-[#94A3B8] font-mono">
            {totalTasks - completedCount} unfinished tasks
          </p>
        </div>
      </div>

      {/* Progress Bar with Teal to Sky Blue Gradient */}
      <div className="mt-4 pt-4 border-t border-[#1f4569]/60">
        <div className="flex justify-between items-center text-xs text-[#94A3B8] mb-1.5 font-mono">
          <span>Daily Momentum</span>
          <span className="text-[#2DD4BF] font-bold">{percent}%</span>
        </div>
        <div className="w-full bg-[#0a1a2b] h-2.5 rounded-full overflow-hidden border border-[#1f4569]/50">
          <div
            className="bg-gradient-to-r from-[#2DD4BF] to-[#38BDF8] h-full rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
