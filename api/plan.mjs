/**
 * LifeOS Lite - Planning & Recovery Server Endpoint
 * Implements Section 8 of LifeOS_Lite_React_MVP_Plan.md
 */

import { scheduleTasks } from '../src/lib/scheduler.js';

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { mode = 'plan', availableMinutes = 60, tasks = [] } = req.body || {};

    // Validate inputs
    if (!Array.isArray(tasks)) {
      return res.status(400).json({ error: 'Tasks must be an array' });
    }

    const budget = Math.max(0, Number(availableMinutes) || 0);
    const pendingTasks = tasks.filter(t => !t.completed);

    // Fast path: no pending tasks
    if (pendingTasks.length === 0) {
      return res.status(200).json({
        scheduled: [],
        deferredTaskIds: [],
        rationale: tasks.length > 0
          ? "All missions are complete! Great work today."
          : "No tasks to schedule.",
        source: 'local'
      });
    }

    // Fast path: zero budget
    if (budget === 0) {
      return res.status(200).json({
        scheduled: [],
        deferredTaskIds: pendingTasks.map(t => t.id),
        rationale: "Zero minutes available. All pending tasks have been saved for later.",
        source: 'local'
      });
    }

    // Try AI ranking if OPENAI_API_KEY is present
    let aiRanking = null;
    let source = 'local';

    if (process.env.OPENAI_API_KEY) {
      try {
        const { default: OpenAI } = await import('openai');
        const client = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
          timeout: 8000,
          maxRetries: 0
        });

        const prompt = `Rank these unfinished tasks for a ${budget}-minute session. Respect priority (high > medium > low).
Tasks: ${JSON.stringify(pendingTasks.map(t => ({ id: t.id, title: t.title, priority: t.priority, minutes: t.minutes })))}
Return JSON with { "orderedTaskIds": ["id1", "id2"], "rationale": "one sentence explaining the first priority" }`;

        const response = await client.chat.completions.create({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          max_tokens: 250,
          temperature: 0.2
        });

        const parsed = JSON.parse(response.choices[0].message.content);
        if (Array.isArray(parsed.orderedTaskIds) && parsed.rationale) {
          // Verify all IDs are present and valid
          const pendingIds = new Set(pendingTasks.map(t => t.id));
          const hasAllIds = parsed.orderedTaskIds.every(id => pendingIds.has(id));
          if (hasAllIds && parsed.orderedTaskIds.length === pendingTasks.length) {
            aiRanking = parsed;
            source = 'ai-assisted';
          }
        }
      } catch (aiErr) {
        // Graceful fallback to local planner
        console.warn('[LifeOS Server] AI ranking unavailable, falling back to local planner:', aiErr.message);
      }
    }

    // Deterministic scheduling with or without AI ranking
    const result = scheduleTasks({
      tasks,
      availableMinutes: budget,
      orderedTaskIds: aiRanking?.orderedTaskIds || null,
      rationale: aiRanking?.rationale || null,
      source
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('[LifeOS Server Error]:', error);
    return res.status(500).json({ error: 'Internal server error while planning schedule' });
  }
}
