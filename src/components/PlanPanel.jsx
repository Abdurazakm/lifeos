import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

export default function PlanPanel({
  plannedTasks,
  currentPlan,
  planningSource
}) {
  return (
    <div className="bg-[#102A43] border border-[#1f4569] rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-[#1f4569]/60 pb-3">
        <h2 className="text-base font-bold text-[#F8FAFC] flex items-center gap-2 font-mono">
          <Calendar className="w-4 h-4 text-[#38BDF8]" />
          Today's Scheduled Sequence
        </h2>
        <span className="text-xs text-[#94A3B8] font-mono">
          {plannedTasks.length} in plan
        </span>
      </div>

      {/* Rationale Quote Box */}
      {currentPlan?.rationale && (
        <div className="p-3.5 rounded-xl bg-[#0a1a2b] border border-[#1f4569]/80 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
          <p className="text-xs text-[#F8FAFC] italic leading-relaxed">
            "{currentPlan.rationale}"
          </p>
        </div>
      )}

      {plannedTasks.length === 0 ? (
        <div className="py-8 text-center text-[#94A3B8] text-sm font-mono">
          No tasks scheduled in the current window. Click "Plan my day" or adjust available minutes.
        </div>
      ) : (
        <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#1f4569]">
          {plannedTasks.map((task, index) => {
            const isFirst = index === 0;
            const timeLabel = isFirst
              ? `Next ${task.minutes} minutes`
              : `+${task.startMinute}m → +${task.endMinute}m`;

            return (
              <div
                key={task.id}
                className="relative pl-8 flex items-center justify-between p-3.5 rounded-xl bg-[#0a1a2b] border border-[#1f4569] hover:border-[#38BDF8]/60 transition-all shadow-sm"
              >
                {/* Timeline node marker */}
                <div
                  className={`absolute left-2 w-3.5 h-3.5 rounded-full border-2 -translate-x-1/2 flex items-center justify-center ${
                    isFirst
                      ? 'bg-[#38BDF8] border-[#102A43] ring-4 ring-[#38BDF8]/20'
                      : 'bg-[#1f4569] border-[#102A43]'
                  }`}
                />

                <div className="min-w-0 pr-3">
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#38BDF8] mb-0.5">
                    {timeLabel}
                  </span>
                  <h3 className="text-sm font-semibold text-[#F8FAFC] truncate">
                    {task.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
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
            );
          })}
        </div>
      )}
    </div>
  );
}
