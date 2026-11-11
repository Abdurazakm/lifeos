import React from 'react';
import { Bookmark, Clock } from 'lucide-react';

export default function SavedForLater({ deferredTasks }) {
  if (!deferredTasks || deferredTasks.length === 0) {
    return null;
  }

  const totalDeferredMins = deferredTasks.reduce((sum, t) => sum + (Number(t.minutes) || 0), 0);

  return (
    <div className="bg-[#102A43]/80 border border-[#1f4569] rounded-2xl p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between border-b border-[#1f4569]/60 pb-2.5">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-[#FBBF24]" />
          <h2 className="text-sm font-bold text-[#F8FAFC] font-mono">
            Saved for later
          </h2>
        </div>
        <span className="text-xs font-mono text-[#FBBF24] font-bold">
          {totalDeferredMins}m postponed
        </span>
      </div>

      <p className="text-xs text-[#94A3B8]">
        These missions exceeded today's available window. They remain safe and visible for your next planning session without guilt.
      </p>

      <div className="space-y-2">
        {deferredTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 rounded-xl bg-[#0a1a2b] border border-[#1f4569]/70"
          >
            <div className="min-w-0 pr-2">
              <p className="text-xs font-medium text-[#F8FAFC] truncate">
                {task.title}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="flex items-center gap-1 text-[11px] font-mono text-[#94A3B8] bg-[#143250] px-2 py-0.5 rounded border border-[#1f4569]">
                <Clock className="w-3 h-3 text-[#38BDF8]" />
                {task.minutes}m
              </span>
              <span
                className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                  task.priority === 'high'
                    ? 'bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/30'
                    : task.priority === 'medium'
                    ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30'
                    : 'bg-[#94A3B8]/20 text-[#94A3B8] border border-[#94A3B8]/30'
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
