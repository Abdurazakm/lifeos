# LifeOS Lite ⚡
> *"Life doesn't follow your schedule. Your schedule should adapt to your life."*  
> **Tagline:** *Make a plan. Keep moving.*

LifeOS Lite is a modern, responsive, adaptive productivity web application built for hackathons. Unlike traditional task managers that punish schedule changes with red overdue badges, LifeOS Lite features **Recover my day** — an adaptive engine that immediately reorganizes your day when unexpected interruptions occur.

---

## 🌟 The Core Problem & Solution

* **The Problem:** Making an ideal morning plan is easy, but keeping it useful when the day goes off-track is hard. Traditional apps cause guilt, overload, and abandonment when plans break.
* **The Solution:** LifeOS Lite exposes schedule tradeoffs directly:  
  **`30 minutes planned · 20 minutes saved for later`**  
  Completed work stays completed, high-priority work fits into your realistic time window, and non-critical work is saved for later without guilt.

---

## 🎨 Color System

| Role | Color | Hex Code | Symbolic Meaning |
| :--- | :--- | :--- | :--- |
| **Canvas & Surfaces** | Deep Ocean | `#102A43` / `#0a1a2b` | Stability and trust |
| **Focus & Actions** | Sky Blue | `#38BDF8` | Clarity and focus (*Plan my day*) |
| **Signature Recovery** | Sunrise Gold | `#FBBF24` | Ambition and opportunity (*Recover my day*, XP) |
| **Typography & Icons** | Soft White | `#F8FAFC` | Simplicity and clarity |
| **Momentum & Balance** | Teal | `#2DD4BF` | Balance and growth (Checkmarks, progress) |

---

## 🚀 Key Features

1. **Signature Feature: "Recover My Day"**
   - Woke up late? Meeting ran long? Enter your actual remaining time and click **Recover my day**.
   - Automatically prioritizes high-impact tasks and defers overflow tasks to **Saved for later**.

2. **Priority-First Whole-Task Scheduling**
   - High, medium, and low priority tiers are enforced strictly in deterministic code.
   - Relative timeline sequence blocks (*Next 30 minutes*, *+30m to +50m*).
   - Hard capacity invariant: scheduled time never exceeds available budget.

3. **Progress & Gamification**
   - +25 XP awarded per completed mission.
   - Reopening and recompleting tasks calculates XP accurately without duplicate credits.
   - Zero-dependency canvas confetti celebrations on milestones.

4. **Saved for Later (No-Guilt Postponement)**
   - Unfinished tasks that exceed current capacity remain visible and unpunished.
   - Increases user psychological safety and focus on what can realistically be done now.

5. **Local-First & Modular AI Architecture**
   - Works 100% offline via a pure JavaScript deterministic scheduler (`src/lib/scheduler.js`).
   - Pluggable serverless endpoint (`api/plan.mjs`) supporting OpenAI Structured Outputs ranking with automatic fallback.

6. **Full Session Persistence**
   - All tasks, completion statuses, available time, and latest plans persist in `localStorage` under `lifeos-lite-v1`.
   - Survives browser refreshes and tab reopens.

7. **One-Click Demo Reset**
   - **Load sample day** button resets the app to the exact 3-task presentation state at any moment.

---

## ⏱️ 2-Minute-45-Second Demo Script

| Time | Action | What to Say / Highlight |
| :--- | :--- | :--- |
| **0:00–0:20** | Open Dashboard | *"Making a plan is easy. Keeping it useful when the day changes is harder. LifeOS Lite helps you choose a realistic next step."* |
| **0:20–0:40** | Click **Load sample day** | *"Here is a student with an assignment (30m, High), revision (20m, Medium), and group reply (10m, Low). Total: 60 minutes."* |
| **0:40–1:00** | Click **Plan my day** | *"The app schedules work into the 60-minute budget. The high-priority assignment is scheduled first."* |
| **1:00–1:20** | Complete **Reply to project group** | *"Fast-forwarding: the student replies to their group. Progress updates immediately: 1/3 missions completed and 25 XP."* |
| **1:20–1:40** | Set time to **30 minutes** | *"An unexpected meeting happens. Only 30 minutes remain, with 50 minutes of unfinished work."* |
| **1:40–2:10** | Click **Recover my day** | *"Recovery keeps the 30-minute assignment and saves the 20-minute revision for later. The tradeoff is clear: 30m planned · 20m saved for later."* |
| **2:10–2:30** | Complete assignment & refresh | *"Progress becomes 2/3 and XP becomes 50. Refreshing the browser proves the state and revised plan are preserved."* |
| **2:30–2:45** | Close on recovery panel | *"LifeOS Lite turns schedule disruption into clear, guilt-free momentum in one responsive screen."* |

---

## 📁 Project Structure

```
vibecode/
├── api/
│   └── plan.mjs               # Serverless planning & AI endpoint (Node.js runtime)
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Brand header, engine badge, sample day reset
│   │   ├── ProgressSummary.jsx # Missions counter, XP display, progress bar
│   │   ├── GoalForm.jsx        # Planning controls, budget slider, add mission input
│   │   ├── TaskList.jsx        # Mission cards, checkboxes, priority pills, delete
│   │   ├── PlanPanel.jsx       # Scheduled timeline sequence, rationale card
│   │   ├── RecoveryPanel.jsx   # "Plot twist?" card, tradeoff metrics, recover CTA
│   │   └── SavedForLater.jsx   # Visible deferred task list
│   ├── hooks/
│   │   └── useLifeOS.js        # Canonical state, localStorage sync, plan/recover
│   ├── lib/
│   │   ├── contracts.js        # Data shapes, priority weights, validation rules
│   │   ├── demo.js             # 3-task presentation dataset
│   │   └── scheduler.js        # Priority-first whole-task scheduling engine
│   ├── utils/
│   │   └── confetti.js         # Zero-dependency canvas celebratory confetti
│   ├── App.jsx                 # Two-column responsive layout container
│   ├── index.css               # Tailwind CSS v4 setup & theme variables
│   └── main.jsx                # React DOM entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ Tech Stack

* **Framework:** React 19
* **Bundler:** Vite
* **Styling:** Tailwind CSS v4
* **Icons:** Lucide React
* **Persistence:** `localStorage` (`lifeos-lite-v1`)

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Smoke Test
```bash
npm run build
npm run preview
```

### 4. Optional: Configure AI Server Credentials
Create a `.env` file in the root directory if deploying the serverless endpoint:
```dotenv
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```
*(If no API key is set, the application automatically uses the native deterministic local planner without any configuration).*

---

## 📜 License
MIT License. Built for hackathon demonstration.
