/**
 * LifeOS Gamification & Progress Engine
 * Manages XP, dynamic leveling, resilience bonuses, and streak mechanics.
 */

export const LEVELS = [
  { level: 1, title: 'Novice Starter', minXp: 0, maxXp: 400, icon: '🌱' },
  { level: 2, title: 'Habit Builder', minXp: 401, maxXp: 900, icon: '⚡' },
  { level: 3, title: 'Focus Practitioner', minXp: 901, maxXp: 1500, icon: '🎯' },
  { level: 4, title: 'Focus Architect', minXp: 1501, maxXp: 2300, icon: '🏛️' },
  { level: 5, title: 'Time Alchemist', minXp: 2301, maxXp: 3300, icon: '🔮' },
  { level: 6, title: 'Master of Momentum', minXp: 3301, maxXp: 5000, icon: '👑' }
];

export const GamificationService = {
  /**
   * Determine user level metadata from total XP
   */
  getLevelInfo(totalXp) {
    const currentLevel = LEVELS.slice().reverse().find(lvl => totalXp >= lvl.minXp) || LEVELS[0];
    const nextLevel = LEVELS.find(lvl => lvl.level === currentLevel.level + 1) || null;

    const levelMin = currentLevel.minXp;
    const levelMax = nextLevel ? nextLevel.minXp : currentLevel.maxXp;
    const progressInLevel = Math.max(0, totalXp - levelMin);
    const requiredInLevel = Math.max(1, levelMax - levelMin);
    const percent = Math.min(100, Math.round((progressInLevel / requiredInLevel) * 100));

    return {
      currentLevel: currentLevel.level,
      title: currentLevel.title,
      icon: currentLevel.icon,
      xp: totalXp,
      levelMin,
      levelMax,
      percentToNextLevel: percent,
      xpRemaining: nextLevel ? Math.max(0, nextLevel.minXp - totalXp) : 0,
      isMaxLevel: !nextLevel
    };
  },

  /**
   * Calculate XP earned for a task
   */
  calculateTaskXp(task) {
    let base = 25;
    if (task.priority === 'high') base = 50;
    else if (task.priority === 'medium') base = 35;
    else base = 20;

    // Bonus for long deep work sessions
    if (task.duration >= 60) base += 15;
    if (task.goalId) base += 10;

    return base;
  },

  /**
   * Resilience bonus for using Recovery Mode
   */
  RECOVERY_MODE_XP: 75,
  MILESTONE_XP: 60,
  GOAL_COMPLETE_XP: 150,

  /**
   * Award XP and check for level-up
   */
  awardXp(currentUser, amount, reason = 'Action completed') {
    const prevLevel = this.getLevelInfo(currentUser.xp);
    const newXp = (currentUser.xp || 0) + amount;
    const newLevel = this.getLevelInfo(newXp);

    const leveledUp = newLevel.currentLevel > prevLevel.currentLevel;

    return {
      updatedUser: {
        ...currentUser,
        xp: newXp,
        level: newLevel.currentLevel,
        levelTitle: newLevel.title
      },
      amount,
      reason,
      leveledUp,
      newLevel
    };
  }
};
