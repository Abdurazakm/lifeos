/**
 * LifeOS Lite - Shared Data Contracts & Validation Limits
 * Based on LifeOS_Lite_React_MVP_Plan.md Section 7
 */

export const PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

export const PRIORITY_WEIGHTS = {
  high: 3,
  medium: 2,
  low: 1
};

export const LIMITS = {
  MIN_TASKS: 1,
  MAX_TASKS: 6, // 3 recommended for demo, up to 6 supported
  MIN_TASK_MINUTES: 5,
  MAX_TASK_MINUTES: 120,
  MIN_AVAILABLE_MINUTES: 0,
  MAX_AVAILABLE_MINUTES: 240,
  MAX_TITLE_LENGTH: 120,
  XP_PER_TASK: 25
};

export const STORAGE_KEY = 'lifeos-lite-v1';

/**
 * Validate a task object
 */
export function validateTask(task) {
  if (!task || typeof task !== 'object') return 'Invalid task object';
  if (!task.id || typeof task.id !== 'string') return 'Task must have a valid ID';
  if (!task.title || typeof task.title !== 'string' || !task.title.trim()) {
    return 'Task title cannot be empty';
  }
  if (task.title.length > LIMITS.MAX_TITLE_LENGTH) {
    return `Title exceeds ${LIMITS.MAX_TITLE_LENGTH} characters`;
  }
  const mins = Number(task.minutes);
  if (isNaN(mins) || mins < LIMITS.MIN_TASK_MINUTES || mins > LIMITS.MAX_TASK_MINUTES) {
    return `Duration must be between ${LIMITS.MIN_TASK_MINUTES} and ${LIMITS.MAX_TASK_MINUTES} minutes`;
  }
  if (![PRIORITIES.HIGH, PRIORITIES.MEDIUM, PRIORITIES.LOW].includes(task.priority)) {
    return 'Priority must be high, medium, or low';
  }
  return null;
}
