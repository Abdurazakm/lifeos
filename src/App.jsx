import React from 'react';
import { useLifeOS } from './hooks/useLifeOS';
import Header from './components/Header';
import ProgressSummary from './components/ProgressSummary';
import GoalForm from './components/GoalForm';
import TaskList from './components/TaskList';
import PlanPanel from './components/PlanPanel';
import RecoveryPanel from './components/RecoveryPanel';
import SavedForLater from './components/SavedForLater';
import { fireConfetti } from './utils/confetti';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function App() {
  const {
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
  } = useLifeOS();

  // Handle task completion with celebratory feedback
  const handleToggle = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    toggleTaskCompletion(taskId);
    if (task && !task.completed) {
      fireConfetti();
    }
  };

  // Handle recovery with celebration
  const handleRecover = (mins) => {
    recoverMyDay(mins);
    fireConfetti();
  };

  return (
    <div className="min-h-screen bg-[#0a1a2b] text-[#F8FAFC] flex flex-col antialiased selection:bg-[#38BDF8] selection:text-[#102A43] font-sans">
      {/* Top Navigation Header */}
      <Header
        isSampleDay={isSampleDay}
        planningSource={planningSource}
        onResetSample={loadSampleDay}
        isLoading={isLoading}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Status Toast Banner if present */}
        {statusMessage && (
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono transition-all duration-300 animate-slideDown ${
              statusMessage.type === 'success'
                ? 'bg-[#2DD4BF]/15 border-[#2DD4BF]/30 text-[#2DD4BF]'
                : statusMessage.type === 'warning'
                ? 'bg-[#FBBF24]/15 border-[#FBBF24]/30 text-[#FBBF24]'
                : 'bg-[#38BDF8]/15 border-[#38BDF8]/30 text-[#38BDF8]'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0" />
              ) : statusMessage.type === 'warning' ? (
                <AlertCircle className="w-4 h-4 text-[#FBBF24] shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-[#38BDF8] shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          </div>
        )}

        {/* Summary Metric Strip */}
        <ProgressSummary
          completedCount={completedCount}
          totalTasks={tasks.length}
          progress={progress}
          xp={xp}
          availableMinutes={availableMinutes}
          unfinishedMinutes={unfinishedMinutes}
        />

        {/* Two-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Column 1: Input & Task Management */}
          <div className="space-y-6">
            <GoalForm
              availableMinutes={availableMinutes}
              onUpdateAvailableMinutes={setAvailableMinutes}
              onAddTask={addTask}
              onPlanDay={() => generatePlan('plan')}
              isLoading={isLoading}
              canAddMore={tasks.length < 6}
            />

            <TaskList
              tasks={tasks}
              onToggleCompletion={handleToggle}
              onDeleteTask={deleteTask}
              isLoading={isLoading}
            />
          </div>

          {/* Column 2: Recovery & Scheduled Sequence */}
          <div className="space-y-6">
            {/* Signature Feature: Recovery Panel */}
            <RecoveryPanel
              recoveryMinutes={recoveryMinutes}
              onUpdateRecoveryMinutes={setRecoveryMinutes}
              onRecoverDay={handleRecover}
              scheduledMinutes={scheduledMinutes}
              savedForLaterMinutes={savedForLaterMinutes}
              isLoading={isLoading}
            />

            {/* Current Day's Plan Sequence */}
            <PlanPanel
              plannedTasks={plannedTasks}
              currentPlan={currentPlan}
              planningSource={planningSource}
            />

            {/* Deferred Tasks Section */}
            <SavedForLater deferredTasks={deferredTasks} />
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="border-t border-[#1f4569]/60 py-6 text-center text-xs text-[#94A3B8] font-mono">
        LifeOS Lite • "Life doesn't follow your schedule. Your schedule should adapt to your life."
      </footer>
    </div>
  );
}
