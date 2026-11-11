import React from 'react';
import { Calendar, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function PlanPanel({
  plannedTasks,
  currentPlan,
  planningSource
}) {
  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 font-mono">
          <Calendar className="w-4 h-4 text-cyan-400" />
          Today's Scheduled Sequence
        </h2>
        <span className="text-xs text-slate-400 font-mono">
          {plannedTasks.length} in plan
        </span>
      </div>

      {/* Rationale Quote Box */}
      {currentPlan?.rationale && (
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 italic leading-relaxed">
            "{currentPlan.rationale}"
          </p>
        </div>
      )}

      {plannedTasks.length === 0 ? (
        <div className="py-8 text-center text-slate-500 text-sm font-mono">
          No tasks scheduled in the current window. Click "Plan my day" or adjust available minutes.
        </div>
      ) : (
        <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-700/60">
          {plannedTasks.map((task, index) => {
            const isFirst = index === 0;
            const timeLabel = isFirst
              ? `Next ${task.minutes} minutes`
              : `+${task.startMinute}m → +${task.endMinute}m`;

            return (
              <div
                key={task.id}
                className="relative pl-8 flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-500/50 transition-all shadow-sm"
              >
                {/* Timeline node marker */}
                <div
                  className={`absolute left-2 w-3.5 h-3.5 rounded-full border-2 -translate-x-1/2 flex items-center justify-center ${
                    isFirst
                      ? 'bg-cyan-400 border-slate-900 ring-4 ring-cyan-500/20'
                      : 'bg-slate-700 border-slate-900'
                  }`}
                />

                <div className="min-w-0 pr-3">
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 mb-0.5">
                    {timeLabel}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-100 truncate">
                    {task.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      task.priority === 'high'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : task.priority === 'medium'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
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
