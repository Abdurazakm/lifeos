// Initial seed data for LifeOS Hackathon MVP

export const INITIAL_USER = {
  name: "Alex Rivers",
  title: "Product Designer & Builder",
  level: 4,
  levelTitle: "Focus Architect",
  xp: 1840,
  xpForNextLevel: 2000,
  streak: 8,
  bestStreak: 19,
  energyLevel: "medium", // 'high' | 'medium' | 'low'
  avatar: "⚡",
  theme: "dark"
};

export const INITIAL_GOALS = [
  {
    id: "g-1",
    title: "Launch LifeOS Hackathon MVP",
    pillar: "Career",
    pillarColor: "cyan",
    deadline: "2026-11-15",
    priority: "high",
    description: "Ship an adaptive productivity dashboard with Recovery Mode for the hackathon showcase.",
    progress: 75,
    milestones: [
      { id: "m-1-1", title: "Finalize core UI & dark theme", completed: true },
      { id: "m-1-2", title: "Build pure JS adaptive scheduler", completed: true },
      { id: "m-1-3", title: "Hook up Recovery Mode modal & state", completed: true },
      { id: "m-1-4", title: "Record 2-min demo pitch video", completed: false }
    ]
  },
  {
    id: "g-2",
    title: "Run 10K in Under 50 Minutes",
    pillar: "Health",
    pillarColor: "emerald",
    deadline: "2026-12-01",
    priority: "medium",
    description: "Consistent interval training and zone-2 cardio building aerobic capacity.",
    progress: 60,
    milestones: [
      { id: "m-2-1", title: "Complete 5km base test under 24m", completed: true },
      { id: "m-2-2", title: "3x weekly tempo training block", completed: true },
      { id: "m-2-3", title: "Official 10k mock time trial", completed: false }
    ]
  },
  {
    id: "g-3",
    title: "Read 12 Deep Thinking Books",
    pillar: "Personal",
    pillarColor: "violet",
    deadline: "2026-12-31",
    priority: "low",
    description: "Read books on systems thinking, psychology, and compounding habits.",
    progress: 67,
    milestones: [
      { id: "m-3-1", title: "Read 'Thinking in Systems'", completed: true },
      { id: "m-3-2", title: "Read 'Antifragile'", completed: true },
      { id: "m-3-3", title: "Read 'The Almanack of Naval Ravikant'", completed: false }
    ]
  },
  {
    id: "g-4",
    title: "Scale Emergency Runway to 6 Months",
    pillar: "Finance",
    pillarColor: "amber",
    deadline: "2026-12-15",
    priority: "high",
    description: "Optimize high-yield savings and cut recurring unused subscriptions.",
    progress: 85,
    milestones: [
      { id: "m-4-1", title: "Audit recurring SaaS subscriptions", completed: true },
      { id: "m-4-2", title: "Automate 25% paycheck split", completed: true },
      { id: "m-4-3", title: "Hit $15k milestone liquid reserve", completed: false }
    ]
  }
];

export const INITIAL_TASKS = [
  {
    id: "t-1",
    title: "Morning review & daily intention setting",
    duration: 15, // in minutes
    priority: "medium", // 'high' | 'medium' | 'low'
    energyRequired: "low", // 'high' | 'medium' | 'low'
    category: "Mindset",
    goalId: null,
    startTime: "08:30",
    endTime: "08:45",
    completed: true,
    completedAt: "2026-11-11T08:45:00",
    xpValue: 20
  },
  {
    id: "t-2",
    title: "Deep Work: Finalize adaptive scheduling algorithm",
    duration: 90,
    priority: "high",
    energyRequired: "high",
    category: "Career",
    goalId: "g-1",
    startTime: "09:30",
    endTime: "11:00",
    completed: true,
    completedAt: "2026-11-11T11:05:00",
    xpValue: 50
  },
  {
    id: "t-3",
    title: "30-min High-Intensity Zone 2 Cardio",
    duration: 45,
    priority: "medium",
    energyRequired: "high",
    category: "Health",
    goalId: "g-2",
    startTime: "12:00",
    endTime: "12:45",
    completed: true,
    completedAt: "2026-11-11T12:40:00",
    xpValue: 35
  },
  {
    id: "t-4",
    title: "Assemble Hackathon Slide Deck & Product Demo",
    duration: 60,
    priority: "high",
    energyRequired: "high",
    category: "Career",
    goalId: "g-1",
    startTime: "14:00",
    endTime: "15:00",
    completed: false,
    overdue: true, // Marked overdue to showcase Recovery Mode!
    xpValue: 50
  },
  {
    id: "t-5",
    title: "Team sync & project architecture alignment",
    duration: 45,
    priority: "medium",
    energyRequired: "medium",
    category: "Career",
    goalId: "g-1",
    startTime: "15:15",
    endTime: "16:00",
    completed: false,
    overdue: true,
    xpValue: 30
  },
  {
    id: "t-6",
    title: "Refactor LocalStorage persistence service",
    duration: 40,
    priority: "high",
    energyRequired: "medium",
    category: "Career",
    goalId: "g-1",
    startTime: "16:15",
    endTime: "16:55",
    completed: false,
    overdue: false,
    xpValue: 40
  },
  {
    id: "t-7",
    title: "Clean desk & organize project bookmarks",
    duration: 30,
    priority: "low",
    energyRequired: "low",
    category: "Personal",
    goalId: null,
    startTime: "17:15",
    endTime: "17:45",
    completed: false,
    overdue: false,
    xpValue: 15
  },
  {
    id: "t-8",
    title: "Read Chapter 4 of 'Thinking in Systems'",
    duration: 35,
    priority: "low",
    energyRequired: "low",
    category: "Personal",
    goalId: "g-3",
    startTime: "18:00",
    endTime: "18:35",
    completed: false,
    overdue: false,
    xpValue: 20
  }
];

export const INITIAL_ACHIEVEMENTS = [
  { id: "a-1", name: "First Blood", description: "Completed your first task in LifeOS", icon: "⚔️", unlocked: true, date: "Nov 03" },
  { id: "a-2", name: "Flow State", description: "Completed a 90m Deep Work block", icon: "🧠", unlocked: true, date: "Nov 06" },
  { id: "a-3", name: "Adaptive Master", description: "Recovered a fallen schedule with Recovery Mode", icon: "⚡", unlocked: true, date: "Nov 09" },
  { id: "a-4", name: "Streak Titan", description: "Maintained a 7-day consistency streak", icon: "🔥", unlocked: true, date: "Nov 10" },
  { id: "a-5", name: "Centurion", description: "Accumulate 2,500 total XP", icon: "👑", unlocked: false, progress: 74 }
];

export const INITIAL_ACTIVITY_LOG = [
  { day: "Mon", date: "Nov 05", tasksCompleted: 6, xpEarned: 240, score: 90 },
  { day: "Tue", date: "Nov 06", tasksCompleted: 8, xpEarned: 310, score: 95 },
  { day: "Wed", date: "Nov 07", tasksCompleted: 5, xpEarned: 190, score: 82 },
  { day: "Thu", date: "Nov 08", tasksCompleted: 7, xpEarned: 280, score: 88 },
  { day: "Fri", date: "Nov 09", tasksCompleted: 8, xpEarned: 330, score: 98 },
  { day: "Sat", date: "Nov 10", tasksCompleted: 4, xpEarned: 150, score: 75 },
  { day: "Sun", date: "Nov 11", tasksCompleted: 3, xpEarned: 105, score: 68 }
];
