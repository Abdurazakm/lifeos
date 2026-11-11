import { useState, useEffect, useCallback, useMemo } from 'react';
import { STORAGE_KEY, LIMITS } from '../lib/contracts';
import { SAMPLE_TASKS, SAMPLE_AVAILABLE_MINUTES } from '../lib/demo';
import { scheduleTasks } from '../lib/scheduler';

export function useLifeOS() {
  // State initialization
  const [tasks, setTasks] = useState([]);
  const [availableMinutes, setAvailableMinutes] = useState(SAMPLE_AVAILABLE_MINUTES);
  const [recoveryMinutes, setRecoveryMinutes] = useState(30);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [planningSource, setPlanningSource] = useState('local'); // 'local' | 'ai-assisted'
  const [isSampleDay, setIsSampleDay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load state from localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.tasks) && parsed.tasks.length > 0) {
          setTasks(parsed.tasks);
          setAvailableMinutes(Number(parsed.availableMinutes) ?? SAMPLE_AVAILABLE_MINUTES);
          setRecoveryMinutes(Number(parsed.recoveryMinutes) ?? 30);
          setCurrentPlan(parsed.currentPlan || null);
          setPlanningSource(parsed.planningSource || 'local');
          setIsSampleDay(Boolean(parsed.isSampleDay));
          setIsInitialized(true);
          return;
        }
      }
    } catch (e) {
      console.warn('[LifeOS] Failed to read localStorage, initializing sample day:', e);
    }

    // Default to sample day if no saved state
    setTasks(SAMPLE_TASKS);
    setAvailableMinutes(SAMPLE_AVAILABLE_MINUTES);
    setRecoveryMinutes(30);
    setIsSampleDay(true);
    // Initial deterministic plan for sample day
    const initialPlan = scheduleTasks({
      tasks: SAMPLE_TASKS,
      availableMinutes: SAMPLE_AVAILABLE_MINUTES,
      source: 'local'
    });
    setCurrentPlan(initialPlan);
    setIsInitialized(true);
  }, []);

  // Save state to localStorage whenever critical state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      const payload = {
        tasks,
        availableMinutes,
        recoveryMinutes,
        currentPlan,
        planningSource,
        isSampleDay,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('[LifeOS] Could not write to localStorage:', e);
    }
  }, [tasks, availableMinutes, recoveryMinutes, currentPlan, planningSource, isSampleDay, isInitialized]);

  // Derived progress and XP according to Section 7
  const completedCount = useMemo(() => tasks.filter(t => t.completed).length, [tasks]);
  const xp = useMemo(() => completedCount * LIMITS.XP_PER_TASK, [completedCount]);
  const progress = useMemo(() => tasks.length === 0 ? 0 : completedCount / tasks.length, [tasks.length, completedCount]);

  // Total unfinished workload in minutes
  const unfinishedMinutes = useMemo(() => {
    return tasks.filter(t => !t.completed).reduce((sum, t) => sum + (Number(t.minutes) || 0), 0);
  }, [tasks]);

  // Planned tasks derived from currentPlan
  const plannedTasks = useMemo(() => {
    if (!currentPlan || !Array.isArray(currentPlan.scheduled)) return [];
    return currentPlan.scheduled.map(item => {
      const task = tasks.find(t => t.id === item.taskId);
      return {
        ...task,
        startMinute: item.startMinute,
        endMinute: item.endMinute
      };
    }).filter(Boolean);
  }, [currentPlan, tasks]);

  // Deferred tasks derived from currentPlan
  const deferredTasks = useMemo(() => {
    if (!currentPlan || !Array.isArray(currentPlan.deferredTaskIds)) return [];
    return currentPlan.deferredTaskIds.map(id => tasks.find(t => t.id === id)).filter(Boolean);
  }, [currentPlan, tasks]);

  // Total scheduled minutes and saved for later minutes
  const scheduledMinutes = useMemo(() => {
    return plannedTasks.reduce((sum, t) => sum + (Number(t.minutes) || 0), 0);
  }, [plannedTasks]);

  const savedForLaterMinutes = useMemo(() => {
    return deferredTasks.reduce((sum, t) => sum + (Number(t.minutes) || 0), 0);
  }, [deferredTasks]);

  // Reset to exact Sample Day
  const loadSampleDay = useCallback(() => {
    setTasks(SAMPLE_TASKS);
    setAvailableMinutes(SAMPLE_AVAILABLE_MINUTES);
    setRecoveryMinutes(30);
    setIsSampleDay(true);
    const plan = scheduleTasks({
      tasks: SAMPLE_TASKS,
      availableMinutes: SAMPLE_AVAILABLE_MINUTES,
      source: 'local'
    });
    setCurrentPlan(plan);
    setPlanningSource('local');
    setStatusMessage({ type: 'info', text: 'Sample day loaded (60m budget, 3 tasks).' });
  }, []);

  // Toggle completion of a task
  const toggleTaskCompletion = useCallback((taskId) => {
    setTasks(prev => {
      const next = prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
      return next;
    });
    setIsSampleDay(false);
  }, []);

  // Add a new task (up to LIMITS.MAX_TASKS)
  const addTask = useCallback((taskData) => {
    if (tasks.length >= LIMITS.MAX_TASKS) {
      setStatusMessage({ type: 'warning', text: `Maximum of ${LIMITS.MAX_TASKS} missions allowed for focused execution.` });
      return false;
    }
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskData.title.trim(),
      minutes: Number(taskData.minutes) || 20,
      priority: taskData.priority || 'medium',
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    setIsSampleDay(false);
    return true;
  }, [tasks.length]);

  // Delete a task
  const deleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    // Remove from current plan if present
    setCurrentPlan(prev => {
      if (!prev) return null;
      return {
        ...prev,
        scheduled: prev.scheduled ? prev.scheduled.filter(s => s.taskId !== taskId) : [],
        deferredTaskIds: prev.deferredTaskIds ? prev.deferredTaskIds.filter(id => id !== taskId) : []
      };
    });
    setIsSampleDay(false);
  }, []);

  // Core Planning / Recovery Trigger
  const generatePlan = useCallback(async (mode = 'plan', customBudget = null) => {
    const budget = customBudget !== null ? customBudget : availableMinutes;
    setIsLoading(true);
    setStatusMessage(null);

    const pending = tasks.filter(t => !t.completed);

    // If no pending tasks, return zero-state immediately
    if (pending.length === 0) {
      const emptyPlan = {
        scheduled: [],
        deferredTaskIds: [],
        rationale: "All missions are complete! Great job today.",
        source: 'local'
      };
      setCurrentPlan(emptyPlan);
      setPlanningSource('local');
      setIsLoading(false);
      return;
    }

    try {
      // Attempt server endpoint /api/plan with 12s client timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          availableMinutes: budget,
          tasks
        }),
        signal: controller.signal
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (res && res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.scheduled)) {
          setCurrentPlan(data);
          setPlanningSource(data.source || 'ai-assisted');
          setIsLoading(false);
          setStatusMessage({
            type: 'success',
            text: mode === 'recover' 
              ? `Day recovered! ${data.scheduled.length} planned, ${data.deferredTaskIds?.length || 0} saved for later.`
              : 'Day planned successfully.'
          });
          return;
        }
      }
    } catch (err) {
      console.warn('[LifeOS] API plan failed or unreachable, switching to local planner:', err);
    }

    // Graceful fallback to pure deterministic local scheduler
    const localPlan = scheduleTasks({
      tasks,
      availableMinutes: budget,
      source: 'local'
    });

    setCurrentPlan(localPlan);
    setPlanningSource('local');
    setIsLoading(false);
    setStatusMessage({
      type: 'info',
      text: mode === 'recover'
        ? `Recovered via Local Planner: ${localPlan.scheduled.length} planned · ${localPlan.deferredTaskIds.length} saved for later.`
        : 'Schedule built with Local Planner.'
    });
  }, [tasks, availableMinutes]);

  // Dedicated Recovery Mode trigger
  const recoverMyDay = useCallback((newBudget) => {
    const budget = Number(newBudget);
    setAvailableMinutes(budget);
    setRecoveryMinutes(budget);
    generatePlan('recover', budget);
  }, [generatePlan]);

  return {
    tasks,
    availableMinutes,
    setAvailableMinutes,
    recoveryMinutes,
    setRecoveryMinutes,
    currentPlan,
    planningSource,
    isSampleDay,
    isLoading,
    statusMessage,
    setStatusMessage,
    completedCount,
    xp,
    progress,
    unfinishedMinutes,
    plannedTasks,
    deferredTasks,
    scheduledMinutes,
    savedForLaterMinutes,
    loadSampleDay,
    toggleTaskCompletion,
    addTask,
    deleteTask,
    generatePlan,
    recoverMyDay
  };
}
