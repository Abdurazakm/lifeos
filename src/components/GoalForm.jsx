import React, { useState } from 'react';
import { Plus, Clock, Play, AlertCircle } from 'lucide-react';
import { LIMITS } from '../lib/contracts';

export default function GoalForm({
  availableMinutes,
  onUpdateAvailableMinutes,
  onAddTask,
  onPlanDay,
  isLoading,
  canAddMore
}) {
  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState(25);
  const [priority, setPriority] = useState('medium');
  const [formError, setFormError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError('Please enter a task title');
      return;
    }

    const mins = Number(minutes);
    if (isNaN(mins) || mins < LIMITS.MIN_TASK_MINUTES || mins > LIMITS.MAX_TASK_MINUTES) {
      setFormError(`Duration must be between ${LIMITS.MIN_TASK_MINUTES} and ${LIMITS.MAX_TASK_MINUTES} minutes`);
      return;
    }

    const success = onAddTask({ title, minutes: mins, priority });
    if (success) {
      setTitle('');
      setMinutes(25);
      setPriority('medium');
    }
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 font-mono">
          <Clock className="w-4 h-4 text-cyan-400" />
          Planning Controls
        </h2>
        <span className="text-xs text-slate-400 font-mono">
          Budget: {availableMinutes}m
        </span>
      </div>

      {/* Available Time Budget Control */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex justify-between">
          <span>Available Time Today</span>
          <span className="text-cyan-400 font-bold">{availableMinutes} minutes</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={LIMITS.MIN_AVAILABLE_MINUTES}
            max={LIMITS.MAX_AVAILABLE_MINUTES}
            step={5}
            value={availableMinutes}
            onChange={(e) => onUpdateAvailableMinutes(Number(e.target.value))}
            className="flex-1 accent-cyan-400 h-2 bg-slate-900 rounded-lg cursor-pointer"
          />
          <input
            type="number"
            min={LIMITS.MIN_AVAILABLE_MINUTES}
            max={LIMITS.MAX_AVAILABLE_MINUTES}
            value={availableMinutes}
            onChange={(e) => onUpdateAvailableMinutes(Math.max(0, Math.min(240, Number(e.target.value) || 0)))}
            className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-center text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>
        {/* Quick Budget Presets */}
        <div className="flex gap-1.5 pt-1">
          {[30, 45, 60, 90, 120].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onUpdateAvailableMinutes(preset)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition cursor-pointer ${
                availableMinutes === preset
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {preset}m
            </button>
          ))}
        </div>
      </div>

      {/* Add New Mission Input */}
      {canAddMore ? (
        <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-slate-700/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Add Actionable Mission
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              (up to 3-6 missions)
            </span>
          </div>

          {formError && (
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-mono">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="space-y-2.5">
            <input
              type="text"
              placeholder="e.g. Finish assignment due today"
              value={title}
              maxLength={LIMITS.MAX_TITLE_LENGTH}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />

            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="number"
                  min={LIMITS.MIN_TASK_MINUTES}
                  max={LIMITS.MAX_TASK_MINUTES}
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-12 bg-transparent text-xs font-mono text-slate-100 focus:outline-none"
                />
                <span className="text-xs text-slate-400 font-mono">mins</span>
              </div>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
              >
                <option value="high">Priority: High</option>
                <option value="medium">Priority: Medium</option>
                <option value="low">Priority: Low</option>
              </select>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-xs text-slate-400 font-mono text-center">
          Maximum of {LIMITS.MAX_TASKS} missions reached for focused execution.
        </div>
      )}

      {/* Plan My Day Action CTA */}
      <div className="pt-2">
        <button
          onClick={onPlanDay}
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{isLoading ? 'Making room for what matters…' : 'Plan my day'}</span>
        </button>
      </div>
    </div>
  );
}
