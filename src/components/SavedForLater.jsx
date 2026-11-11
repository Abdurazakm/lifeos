import React from 'react';
import { Bookmark, Clock, ArrowUpRight } from 'lucide-react';

export default function SavedForLater({ deferredTasks }) {
  if (!deferredTasks || deferredTasks.length === 0) {
    return null;
  }

  const totalDeferredMins = deferredTasks.reduce((sum, t) => sum + (Number(t.minutes) || 0), 0);

  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between border-b border-slate-700/40 pb-2.5">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold text-slate-200 font-mono">
            Saved for later
          </h2>
        </div>
        <span className="text-xs font-mono text-amber-400">
          {totalDeferredMins}m postponed
        </span>
      </div>

      <p className="text-xs text-slate-400">
        These missions exceeded today's available window. They remain safe and visible for your next planning session without guilt.
      </p>

      <div className="space-y-2">
        {deferredTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/50"
          >
            <div className="min-w-0 pr-2">
              <p className="text-xs font-medium text-slate-300 truncate">
                {task.title}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                <Clock className="w-3 h-3 text-slate-500" />
                {task.minutes}m
              </span>
              <span
                className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                  task.priority === 'high'
                    ? 'bg-red-500/20 text-red-400'
                    : task.priority === 'medium'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-blue-500/20 text-blue-400'
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
