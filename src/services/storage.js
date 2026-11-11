import {
  INITIAL_USER,
  INITIAL_GOALS,
  INITIAL_TASKS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_ACTIVITY_LOG
} from '../constants/initialData';

const KEYS = {
  USER: 'lifeos_user_v1',
  GOALS: 'lifeos_goals_v1',
  TASKS: 'lifeos_tasks_v1',
  ACHIEVEMENTS: 'lifeos_achievements_v1',
  ACTIVITY: 'lifeos_activity_v1',
  RECOVERY_HISTORY: 'lifeos_recovery_history_v1',
  SETTINGS: 'lifeos_settings_v1'
};

// Safe JSON parse helper
function safeGet(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.warn(`[LifeOS Storage] Failed to load ${key}:`, err);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`[LifeOS Storage] Failed to write ${key}:`, err);
  }
}

export const StorageService = {
  getUser() {
    return safeGet(KEYS.USER, INITIAL_USER);
  },
  saveUser(user) {
    safeSet(KEYS.USER, user);
  },

  getGoals() {
    return safeGet(KEYS.GOALS, INITIAL_GOALS);
  },
  saveGoals(goals) {
    safeSet(KEYS.GOALS, goals);
  },

  getTasks() {
    return safeGet(KEYS.TASKS, INITIAL_TASKS);
  },
  saveTasks(tasks) {
    safeSet(KEYS.TASKS, tasks);
  },

  getAchievements() {
    return safeGet(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
  },
  saveAchievements(achievements) {
    safeSet(KEYS.ACHIEVEMENTS, achievements);
  },

  getActivityLog() {
    return safeGet(KEYS.ACTIVITY, INITIAL_ACTIVITY_LOG);
  },
  saveActivityLog(log) {
    safeSet(KEYS.ACTIVITY, log);
  },

  getRecoveryHistory() {
    return safeGet(KEYS.RECOVERY_HISTORY, []);
  },
  addRecoveryRecord(record) {
    const history = safeGet(KEYS.RECOVERY_HISTORY, []);
    const updated = [record, ...history].slice(0, 20);
    safeSet(KEYS.RECOVERY_HISTORY, updated);
    return updated;
  },

  getSettings() {
    return safeGet(KEYS.SETTINGS, {
      aiEnabled: true,
      apiKey: '',
      soundEnabled: true,
      bufferMinutesDefault: 10,
      autoTriggerRecoveryPrompt: true
    });
  },
  saveSettings(settings) {
    safeSet(KEYS.SETTINGS, settings);
  },

  resetToDemoData() {
    safeSet(KEYS.USER, INITIAL_USER);
    safeSet(KEYS.GOALS, INITIAL_GOALS);
    safeSet(KEYS.TASKS, INITIAL_TASKS);
    safeSet(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
    safeSet(KEYS.ACTIVITY, INITIAL_ACTIVITY_LOG);
    safeSet(KEYS.RECOVERY_HISTORY, []);
    return {
      user: INITIAL_USER,
      goals: INITIAL_GOALS,
      tasks: INITIAL_TASKS,
      achievements: INITIAL_ACHIEVEMENTS,
      activity: INITIAL_ACTIVITY_LOG
    };
  }
};
