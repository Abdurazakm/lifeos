import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  LayoutDashboard, 
  ListTodo, 
  Sparkles, 
  Target, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Trash2, 
  TrendingUp, 
  Calendar, 
  SunMedium, 
  Moon, 
  Check, 
  Zap, 
  BookOpen, 
  Coffee 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review quarterly goals & roadmap', completed: true, priority: 'high', category: 'Strategy' },
    { id: 2, text: 'Deep work: 90m coding sprint', completed: false, priority: 'high', category: 'Deep Work' },
    { id: 3, text: 'Strength workout + 15m stretch', completed: true, priority: 'medium', category: 'Fitness' },
    { id: 4, text: 'Read 20 pages of Atomic Habits', completed: false, priority: 'low', category: 'Learning' },
    { id: 5, text: 'Review pull requests & sync with team', completed: false, priority: 'medium', category: 'Work' }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskCategory, setNewTaskCategory] = useState('General');

  // Habits State
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Hydration (1L)', streak: 12, target: 7, days: [true, true, true, true, true, false, false] },
    { id: 2, name: 'Read 30 mins', streak: 8, target: 7, days: [true, true, true, false, true, true, false] },
    { id: 3, name: 'Exercise & Movement', streak: 15, target: 5, days: [true, true, false, true, true, false, false] },
    { id: 4, name: '10m Mindfulness Meditation', streak: 5, target: 7, days: [true, false, true, true, true, false, false] },
    { id: 5, name: 'Zero Sugar & Whole Foods', streak: 19, target: 7, days: [true, true, true, true, true, true, false] }
  ]);

  // Pomodoro State
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState('focus'); // 'focus' | 'break'

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        if (pomodoroSeconds > 0) {
          setPomodoroSeconds(prev => prev - 1);
        } else if (pomodoroMinutes > 0) {
          setPomodoroMinutes(prev => prev - 1);
          setPomodoroSeconds(59);
        } else {
          setIsTimerRunning(false);
          if (pomodoroMode === 'focus') {
            alert('Focus session complete! Take a breather.');
            setPomodoroMode('break');
            setPomodoroMinutes(5);
            setPomodoroSeconds(0);
          } else {
            alert('Break complete! Ready to lock back in?');
            setPomodoroMode('focus');
            setPomodoroMinutes(25);
            setPomodoroSeconds(0);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, pomodoroMinutes, pomodoroSeconds, pomodoroMode]);

  const toggleTimer = () => setIsTimerRunning(prev => !prev);
  const resetTimer = (mins = 25) => {
    setIsTimerRunning(false);
    setPomodoroMinutes(mins);
    setPomodoroSeconds(0);
  };

  // Quick notes
  const [notes, setNotes] = useState([
    { id: 1, title: 'Key Insight', content: 'Focus on leverage and high-impact compounding habits rather than micro-optimizations.' },
    { id: 2, title: 'Weekly Principle', content: 'Execution beats perfection. Ship early, measure feedback, iterate.' }
  ]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // Task actions
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
      priority: newTaskPriority,
      category: newTaskCategory
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText('');
  };

  const toggleHabitDay = (habitId, dayIndex) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        const newDays = [...h.days];
        newDays[dayIndex] = !newDays[dayIndex];
        return { ...h, days: newDays };
      }
      return h;
    }));
  };

  const addNote = (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;
    setNotes([{ id: Date.now(), title: newNoteTitle.trim(), content: newNoteContent.trim() }, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const taskProgress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased selection:bg-cyan-500 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900/80 border-r border-slate-800 backdrop-blur-xl p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 font-mono font-bold text-lg text-white">
                ⚡
              </div>
              <div>
                <h1 className="font-bold tracking-tight text-lg text-white">life_OS</h1>
                <p className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  OPERATIONAL
                </p>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'tasks', label: 'Tasks & Projects', icon: ListTodo, badge: tasks.filter(t => !t.completed).length },
              { id: 'habits', label: 'Habit Matrix', icon: Target },
              { id: 'pomodoro', label: 'Focus Timer', icon: Clock },
              { id: 'notes', label: 'Notes & Journal', icon: BookOpen }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* System Status Footprint */}
        <div className="mt-8 pt-4 border-t border-slate-800/60 space-y-3">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
              <span>Today's Velocity</span>
              <span className="font-mono text-cyan-400 font-semibold">{taskProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${taskProgress}%` }}
              />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 font-mono text-center">
            life_OS v1.0.0 • Vite + React + Tailwind
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Welcome back, Commander
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Here is your daily command center and execution radar.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-right">
              <p className="text-xs text-slate-400 font-mono">LOCAL TIME</p>
              <p className="text-sm font-semibold font-mono text-cyan-400">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
              <p className="text-xs text-slate-400 font-mono">DATE</p>
              <p className="text-sm font-semibold text-slate-200">
                {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all">
                <div className="flex items-center justify-between text-slate-400 text-sm mb-2">
                  <span>Task Completion</span>
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">{completedCount}/{tasks.length}</div>
                <div className="text-xs text-cyan-400/80 mt-1 flex items-center gap-1 font-mono">
                  <TrendingUp className="w-3 h-3" /> {taskProgress}% resolved today
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all">
                <div className="flex items-center justify-between text-slate-400 text-sm mb-2">
                  <span>Habit Consistency</span>
                  <Flame className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">19 Days</div>
                <div className="text-xs text-amber-400/80 mt-1 flex items-center gap-1 font-mono">
                  🔥 Max streak active
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all">
                <div className="flex items-center justify-between text-slate-400 text-sm mb-2">
                  <span>Focus Timer</span>
                  <Zap className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {String(pomodoroMinutes).padStart(2, '0')}:{String(pomodoroSeconds).padStart(2, '0')}
                </div>
                <div className="text-xs text-indigo-400/80 mt-1 capitalize font-mono">
                  {pomodoroMode} session ({isTimerRunning ? 'Running' : 'Paused'})
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all">
                <div className="flex items-center justify-between text-slate-400 text-sm mb-2">
                  <span>Daily Energy</span>
                  <SunMedium className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400">92%</div>
                <div className="text-xs text-emerald-400/80 mt-1 font-mono">
                  Peak cognitive performance
                </div>
              </div>
            </div>

            {/* Split section: Priorities & Mini Focus */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Priority Tasks */}
              <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-cyan-400" />
                    Priority Focus Queue
                  </h3>
                  <button 
                    onClick={() => setActiveTab('tasks')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-mono transition"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {tasks.slice(0, 4).map(task => (
                    <div 
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`group flex items-center justify-between p-3.5 rounded-xl border transition cursor-pointer ${
                        task.completed 
                          ? 'bg-slate-950/40 border-slate-800/40 text-slate-500' 
                          : 'bg-slate-800/40 border-slate-700/50 hover:border-cyan-500/40 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 shrink-0 transition" />
                        )}
                        <span className={`text-sm font-medium ${task.completed ? 'line-through' : ''}`}>
                          {task.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                          {task.category}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          task.priority === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          task.priority === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Focus Panel */}
              <div className="bg-gradient-to-b from-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">Focus Capsule</span>
                    <Clock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-center py-6">
                    <div className="font-mono text-5xl font-black tracking-tight text-white drop-shadow-md">
                      {String(pomodoroMinutes).padStart(2, '0')}:{String(pomodoroSeconds).padStart(2, '0')}
                    </div>
                    <p className="text-xs text-slate-400 mt-2 font-mono uppercase tracking-widest">
                      {pomodoroMode === 'focus' ? '🎯 Deep Work Mode' : '☕ Recovery Break'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={toggleTimer}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isTimerRunning ? 'Pause Session' : 'Start Focus'}
                  </button>
                  <button 
                    onClick={() => resetTimer(25)}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="Reset to 25m"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Habits Strip */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-400" />
                  Daily Habit Consistency
                </h3>
                <span className="text-xs text-slate-400 font-mono">Week Mon - Sun</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {habits.map(habit => (
                  <div key={habit.id} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm text-slate-200">{habit.name}</span>
                      <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" /> {habit.streak}d
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      {habit.days.map((checked, i) => (
                        <button
                          key={i}
                          onClick={() => toggleHabitDay(habit.id, i)}
                          className={`w-7 h-7 rounded-lg text-xs font-mono flex items-center justify-center transition cursor-pointer ${
                            checked 
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/20' 
                              : 'bg-slate-800/50 text-slate-500 hover:bg-slate-800 border border-slate-700/40'
                          }`}
                        >
                          {daysOfWeek[i]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {/* Add Task Form */}
            <form onSubmit={addTask} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter a new objective or task..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
                <div className="flex gap-2">
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="high">Priority: High</option>
                    <option value="medium">Priority: Medium</option>
                    <option value="low">Priority: Low</option>
                  </select>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="General">General</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Deep Work">Deep Work</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Learning">Learning</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20 transition"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
            </form>

            {/* Tasks List */}
            <div className="space-y-3">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition ${
                    task.completed
                      ? 'bg-slate-950/50 border-slate-800/50 text-slate-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div 
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center gap-3.5 flex-1 cursor-pointer"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400 shrink-0 transition" />
                    )}
                    <span className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                      {task.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/60">
                      {task.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      task.priority === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      task.priority === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {task.priority}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition cursor-pointer"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habits Tab */}
        {activeTab === 'habits' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-semibold text-lg text-white mb-2">Weekly Habit Accountability Matrix</h3>
              <p className="text-sm text-slate-400 mb-6">Track consistency daily to build resilient neural pathways.</p>
              
              <div className="space-y-4">
                {habits.map(habit => (
                  <div key={habit.id} className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-slate-200">{habit.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mt-1">
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5" /> Current streak: {habit.streak} days
                        </span>
                        <span>Target: {habit.target}x / week</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {habit.days.map((checked, i) => (
                        <button
                          key={i}
                          onClick={() => toggleHabitDay(habit.id, i)}
                          className={`w-10 h-10 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center transition cursor-pointer ${
                            checked
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-md shadow-cyan-500/20'
                              : 'bg-slate-800/40 text-slate-500 hover:bg-slate-800 border border-slate-700/50'
                          }`}
                        >
                          <span>{daysOfWeek[i]}</span>
                          {checked && <Check className="w-3 h-3 text-cyan-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pomodoro Tab */}
        {activeTab === 'pomodoro' && (
          <div className="max-w-xl mx-auto space-y-6 text-center">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
              <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800 mb-8">
                <button
                  onClick={() => { setPomodoroMode('focus'); resetTimer(25); }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                    pomodoroMode === 'focus' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  FOCUS (25m)
                </button>
                <button
                  onClick={() => { setPomodoroMode('break'); resetTimer(5); }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                    pomodoroMode === 'break' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SHORT BREAK (5m)
                </button>
              </div>

              <div className="my-8">
                <div className="text-7xl md:text-8xl font-black font-mono tracking-tight text-white">
                  {String(pomodoroMinutes).padStart(2, '0')}:{String(pomodoroSeconds).padStart(2, '0')}
                </div>
                <p className="text-sm font-mono text-slate-400 mt-4 uppercase tracking-widest">
                  {isTimerRunning ? '⚡ Flow state engaged' : '⏸ Session on standby'}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={toggleTimer}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 font-semibold text-white shadow-xl shadow-cyan-500/25 flex items-center gap-2 cursor-pointer transition"
                >
                  {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isTimerRunning ? 'Pause' : 'Start Focus'}
                </button>
                <button
                  onClick={() => resetTimer(pomodoroMode === 'focus' ? 25 : 5)}
                  className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                  title="Reset timer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <form onSubmit={addNote} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
              <input
                type="text"
                placeholder="Note or Insight Title..."
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
              <textarea
                placeholder="Capture your reflection, principle, or brainstorm..."
                rows={3}
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" /> Save Note
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map(note => (
                <div key={note.id} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                  <h4 className="font-semibold text-white mb-2">{note.title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
