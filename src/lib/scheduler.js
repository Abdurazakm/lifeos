/**
 * LifeOS Lite - Priority-First, Whole-Task Scheduler
 * Adheres strictly to Section 9 of LifeOS_Lite_React_MVP_Plan.md
 */

import { PRIORITY_WEIGHTS } from './contracts';

/**
 * Pure scheduling function usable by both browser and server.
 * 
 * @param {Object} params
 * @param {Array} params.tasks - List of task objects
 * @param {number} params.availableMinutes - Available time budget in minutes
 * @param {Array<string>} [params.orderedTaskIds] - Optional preferred order within tiers (e.g. from AI)
 * @param {string} [params.rationale] - Optional AI rationale
 * @param {string} [params.source='local'] - 'local' | 'ai-assisted'
 * @returns {Object} PlanResult
 */
export function scheduleTasks({
  tasks = [],
  availableMinutes = 60,
  orderedTaskIds = null,
  rationale = null,
  source = 'local'
}) {
  const pendingTasks = tasks.filter(t => !t.completed);
  const budget = Math.max(0, Number(availableMinutes) || 0);

  // If no unfinished tasks exist
  if (pendingTasks.length === 0) {
    return {
      scheduled: [],
      deferredTaskIds: [],
      rationale: tasks.length > 0 
        ? "All missions are complete! Fantastic work today."
        : "No tasks to plan. Add one to three missions to begin.",
      source
    };
  }

  // If available time is 0, all unfinished tasks are saved for later
  if (budget === 0) {
    return {
      scheduled: [],
      deferredTaskIds: pendingTasks.map(t => t.id),
      rationale: "Zero minutes available. All pending tasks have been saved for later.",
      source
    };
  }

  // Build ranking map if AI ordering was provided
  const orderIndexMap = new Map();
  if (Array.isArray(orderedTaskIds)) {
    orderedTaskIds.forEach((id, index) => orderIndexMap.set(id, index));
  }

  // Stable sort:
  // 1. Highest priority tier first (high > medium > low)
  // 2. AI rank or original input order within the same tier
  const sortedPending = [...pendingTasks].sort((a, b) => {
    const pWeightA = PRIORITY_WEIGHTS[a.priority] || 1;
    const pWeightB = PRIORITY_WEIGHTS[b.priority] || 1;
    if (pWeightA !== pWeightB) {
      return pWeightB - pWeightA; // Higher weight first
    }

    // Within same priority, check AI order index
    const aiRankA = orderIndexMap.has(a.id) ? orderIndexMap.get(a.id) : 999;
    const aiRankB = orderIndexMap.has(b.id) ? orderIndexMap.get(b.id) : 999;
    return aiRankA - aiRankB;
  });

  let remainingCapacity = budget;
  let runningMinute = 0;
  const scheduled = [];
  const deferredTaskIds = [];

  for (const task of sortedPending) {
    const taskMins = Math.max(1, Number(task.minutes) || 0);

    // If task fits completely within remaining capacity
    if (taskMins <= remainingCapacity) {
      scheduled.push({
        taskId: task.id,
        startMinute: runningMinute,
        endMinute: runningMinute + taskMins
      });
      runningMinute += taskMins;
      remainingCapacity -= taskMins;
    } else {
      // Cannot fit: add to saved for later
      deferredTaskIds.push(task.id);
    }
  }

  // Default rationale if none supplied by AI
  let finalRationale = rationale;
  if (!finalRationale) {
    const firstScheduled = scheduled.length > 0 
      ? tasks.find(t => t.id === scheduled[0].taskId) 
      : null;

    if (firstScheduled) {
      finalRationale = firstScheduled.priority === 'high'
        ? `Start with "${firstScheduled.title}" because it has the highest priority.`
        : `Start with "${firstScheduled.title}" to build momentum in your ${budget}-minute window.`;
    } else {
      finalRationale = `None of the pending tasks fit within the ${budget}-minute window.`;
    }
  }

  return {
    scheduled,
    deferredTaskIds,
    rationale: finalRationale,
    source
  };
}
