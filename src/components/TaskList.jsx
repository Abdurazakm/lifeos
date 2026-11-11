import React from 'react';
import { CheckCircle2, Circle, Clock, Trash2, ListTodo } from 'lucide-react';

export default function TaskList({
  tasks,
  onToggleCompletion,
  onDeleteTask,
  isLoading
}) {
  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 font-mono">
          <ListTodo className="w-4 h-4 text-cyan-400" />
          Today's Missions
        </h2>
        <span className="text-xs text-slate-400 font-mono">
          {tasks.length} total
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="py-8 text-center text-slate-500 text-sm font-mono">
          No missions entered yet. Add one above or load the sample day.
        </div>
      ) : (
        <div className="space-y-2.5">
          {tasks.map((task) => {
            const isDone = task.completed;
            return (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 ${
                  isDone
                    ? 'bg-slate-900/40 border-slate-700/40 opacity-75'
                    : 'bg-slate-900/80 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                {/* Left: Checkbox & Title */}
                <div
                  onClick={() => !isLoading && onToggleCompletion(task.id)}
                  className="flex items-center gap-3 flex-1 cursor-pointer select-none"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 transition" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400 shrink-0 transition" />
                  )}
                  <div className="min-w-0 pr-2">
                    <p
                      className={`text-sm font-medium leading-snug break-words ${
                        isDone ? 'line-through text-slate-500' : 'text-slate-100'
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>
                </div>

                {/* Right: Badges & Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Duration Pill */}
                  <span className="flex items-center gap-1 text-xs font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {task.minutes}m
                  </span>

                  {/* Priority Tag */}
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

                  {/* Delete Button */}
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    disabled={isLoading}
                    className="p-1 text-slate-500 hover:text-red-400 transition cursor-pointer disabled:opacity-50"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
