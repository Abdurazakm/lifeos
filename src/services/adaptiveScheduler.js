/**
 * LifeOS Adaptive Scheduling Engine
 * "Life doesn't follow your schedule. Your schedule should adapt to your life."
 * 
 * Heuristic knapsack-inspired optimizer that dynamically resequences, resizes,
 * buffers, or defers tasks based on real-time time constraints, priority, and biometric/energy levels.
 */

// Helper to format minutes into HH:MM time string
export function minutesToTimeString(totalMinutes) {
  const normMinutes = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
  const hours = Math.floor(normMinutes / 60);
  const mins = normMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Helper to convert "HH:MM" to minutes from midnight
export function timeStringToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

// Get next nearest 5-minute increment for clean start time
export function getRoundedCurrentTime(now = new Date()) {
  const mins = now.getMinutes();
  const roundedMins = Math.ceil(mins / 5) * 5;
  const newDate = new Date(now);
  newDate.setMinutes(roundedMins);
  newDate.setSeconds(0);
  return `${String(newDate.getHours()).padStart(2, '0')}:${String(newDate.getMinutes()).padStart(2, '0')}`;
}

/**
 * Main Adaptive Scheduling Algorithm
 * 
 * @param {Object} params
 * @param {Array} params.tasks - Full list of tasks
 * @param {number} params.availableMinutes - How many minutes the user has left today
 * @param {string} params.energyLevel - 'high' | 'medium' | 'low'
 * @param {number} params.bufferMinutes - Buffer time between tasks (e.g. 5, 10, 15)
 * @param {string} [params.startTime] - Start time in "HH:MM" format
 * @returns {Object} Revised schedule, deferred tasks, timeline blocks, and rationale
 */
export function generateAdaptiveSchedule({
  tasks = [],
  availableMinutes = 120,
  energyLevel = 'medium',
  bufferMinutes = 10,
  startTime = null
}) {
  const effectiveStartTimeStr = startTime || getRoundedCurrentTime();
  const startMinute = timeStringToMinutes(effectiveStartTimeStr);

  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks = tasks.filter(t => !t.completed);

  if (pendingTasks.length === 0) {
    return {
      status: 'ALL_COMPLETED',
      revisedTasks: tasks,
      scheduledBlocks: [],
      deferredTasks: [],
      stats: {
        originalPendingMinutes: 0,
        availableMinutes,
        usedMinutes: 0,
        savedMinutes: 0,
        keptCount: 0,
        deferredCount: 0
      },
      rationale: "All tasks for today are already completed! Take time to rest and recharge."
    };
  }

  const originalPendingMinutes = pendingTasks.reduce((sum, t) => sum + (Number(t.duration) || 30), 0);

  // Energy alignment multiplier matrix
  const energyWeights = {
    low: { low: 1.5, medium: 1.0, high: 0.5 },
    medium: { low: 1.0, medium: 1.3, high: 1.1 },
    high: { low: 0.7, medium: 1.1, high: 1.6 }
  };

  const priorityScores = {
    high: 100,
    medium: 50,
    low: 20
  };

  // Score each task based on Priority, Duration, Energy Alignment, and Goal linkage
  const scoredTasks = pendingTasks.map(task => {
    const pScore = priorityScores[task.priority] || 40;
    const taskEnergy = task.energyRequired || 'medium';
    const energyMult = (energyWeights[energyLevel] && energyWeights[energyLevel][taskEnergy]) || 1.0;
    const duration = Math.max(10, Number(task.duration) || 30);
    const goalBonus = task.goalId ? 15 : 0;

    // Density ratio: higher score for high value per minute
    const compositeScore = ((pScore * energyMult) + goalBonus) / Math.sqrt(duration);

    return {
      ...task,
      duration,
      compositeScore,
      energyFactor: energyMult
    };
  });

  // Sort descending by composite score
  scoredTasks.sort((a, b) => b.compositeScore - a.compositeScore);

  let currentClock = startMinute;
  let remainingBudget = availableMinutes;
  const keptTasks = [];
  const deferredTasks = [];
  const timelineBlocks = [];

  for (let i = 0; i < scoredTasks.length; i++) {
    const task = scoredTasks[i];
    const neededTime = task.duration + (keptTasks.length > 0 ? bufferMinutes : 0);

    // If task fits within remaining available budget
    if (task.duration <= remainingBudget) {
      // If adding a buffer before this task
      if (keptTasks.length > 0 && bufferMinutes > 0) {
        timelineBlocks.push({
          type: 'buffer',
          title: energyLevel === 'low' ? 'Recharge & Hydration Breather' : 'Context Switching Buffer',
          duration: bufferMinutes,
          start: minutesToTimeString(currentClock),
          end: minutesToTimeString(currentClock + bufferMinutes),
          color: 'slate'
        });
        currentClock += bufferMinutes;
        remainingBudget -= bufferMinutes;
      }

      const taskStart = currentClock;
      const taskEnd = taskStart + task.duration;

      const scheduledTask = {
        ...task,
        startTime: minutesToTimeString(taskStart),
        endTime: minutesToTimeString(taskEnd),
        overdue: false,
        rescheduled: true,
        rescheduledReason: `Adapted for ${energyLevel} energy window (${task.duration}m block)`
      };

      keptTasks.push(scheduledTask);
      timelineBlocks.push({
        type: 'task',
        task: scheduledTask,
        title: scheduledTask.title,
        duration: scheduledTask.duration,
        start: scheduledTask.startTime,
        end: scheduledTask.endTime,
        priority: scheduledTask.priority,
        category: scheduledTask.category
      });

      currentClock = taskEnd;
      remainingBudget -= task.duration;
    } else {
      // Task cannot fit within the available time budget: defer gracefully to tomorrow
      const deferredReason = task.priority === 'low'
        ? `Deferred to protect high-impact goals during constrained ${availableMinutes}m window.`
        : `Rescheduled to tomorrow morning (09:30) to prevent cognitive fatigue.`;

      deferredTasks.push({
        ...task,
        deferred: true,
        deferredReason,
        suggestedNextDate: 'Tomorrow Morning',
        overdue: false
      });
    }
  }

  // Combine completed tasks + kept tasks + deferred tasks
  const revisedTasks = [
    ...completedTasks,
    ...keptTasks,
    ...deferredTasks.map(d => ({
      ...d,
      startTime: '--:--',
      endTime: '--:--',
      overdue: false
    }))
  ];

  const totalUsedMinutes = availableMinutes - remainingBudget;
  const savedMinutes = Math.max(0, originalPendingMinutes - totalUsedMinutes);

  // Generate constructive, empowering rationale narrative
  let rationale = '';
  if (deferredTasks.length === 0) {
    rationale = `All ${keptTasks.length} pending tasks successfully fitted into your remaining ${availableMinutes}m window with ${bufferMinutes}m buffer intervals. Perfect execution pace.`;
  } else {
    rationale = `LifeOS trimmed overload: Protected ${keptTasks.length} high-impact priorities and deferred ${deferredTasks.length} secondary tasks to tomorrow. Saved ${savedMinutes} minutes to safeguard your energy.`;
  }

  return {
    status: 'OPTIMIZED',
    effectiveStartTime: effectiveStartTimeStr,
    revisedTasks,
    keptTasks,
    deferredTasks,
    timelineBlocks,
    stats: {
      originalPendingMinutes,
      availableMinutes,
      usedMinutes: totalUsedMinutes,
      savedMinutes,
      keptCount: keptTasks.length,
      deferredCount: deferredTasks.length,
      energyAlignmentPercent: Math.round(
        keptTasks.reduce((acc, t) => acc + (t.energyFactor || 1), 0) / Math.max(1, keptTasks.length) * 80
      )
    },
    rationale
  };
}
