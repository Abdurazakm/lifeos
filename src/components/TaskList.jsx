import React from 'react';
import { CheckCircle2, Circle, Clock, Trash2, ListTodo } from 'lucide-react';

export default function TaskList({
  tasks,
  onToggleCompletion,
  onDeleteTask,
  isLoading
}) {
  return (
    <div className="bg-[#102A43] border border-[#1f4569] rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-[#1f4569]/60 pb-3">
        <h2 className="text-base font-bold text-[#F8FAFC] flex items-center gap-2 font-mono">
          <ListTodo className="w-4 h-4 text-[#38BDF8]" />
          Today's Missions
        </h2>
        <span className="text-xs text-[#94A3B8] font-mono">
          {tasks.length} total
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="py-8 text-center text-[#94A3B8] text-sm font-mono">
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
                    ? 'bg-[#0a1a2b]/60 border-[#1f4569]/40 opacity-75'
                    : 'bg-[#0a1a2b] border-[#1f4569] hover:border-[#38BDF8]/60'
                }`}
              >
                {/* Left: Checkbox & Title */}
                <div
                  onClick={() => !isLoading && onToggleCompletion(task.id)}
                  className="flex items-center gap-3 flex-1 cursor-pointer select-none"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] shrink-0 transition" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#94A3B8] hover:text-[#38BDF8] shrink-0 transition" />
                  )}
                  <div className="min-w-0 pr-2">
                    <p
                      className={`text-sm font-medium leading-snug break-words ${
                        isDone ? 'line-through text-[#94A3B8]' : 'text-[#F8FAFC]'
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>
                </div>

                {/* Right: Badges & Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Duration Pill */}
                  <span className="flex items-center gap-1 text-xs font-mono text-[#F8FAFC] bg-[#143250] px-2 py-0.5 rounded-md border border-[#1f4569]">
                    <Clock className="w-3 h-3 text-[#38BDF8]" />
                    {task.minutes}m
                  </span>

                  {/* Priority Tag */}
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

                  {/* Delete Button */}
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    disabled={isLoading}
                    className="p-1 text-[#94A3B8] hover:text-red-400 transition cursor-pointer disabled:opacity-50"
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
