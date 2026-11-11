/**
 * LifeOS Modular AI Integration Service
 * 
 * Provides an adaptive reasoning layer.
 * Runs on a fast built-in heuristic engine by default for zero-friction hackathon demos,
 * while maintaining a drop-in API contract for external LLMs (e.g. Gemini, OpenAI, Claude).
 */

import { generateAdaptiveSchedule } from './adaptiveScheduler';

export const AIService = {
  /**
   * Generates an adaptive recovery plan
   * 
   * @param {Object} options
   * @param {Array} options.tasks
   * @param {number} options.availableMinutes
   * @param {string} options.energyLevel
   * @param {number} options.bufferMinutes
   * @param {boolean} [options.useExternalAI=false]
   * @param {string} [options.apiKey='']
   * @returns {Promise<Object>}
   */
  async generateRecoveryPlan({
    tasks,
    availableMinutes,
    energyLevel,
    bufferMinutes = 10,
    startTime = null,
    useExternalAI = false,
    apiKey = ''
  }) {
    // 1. Run the core deterministic adaptive scheduling algorithm
    const basePlan = generateAdaptiveSchedule({
      tasks,
      availableMinutes,
      energyLevel,
      bufferMinutes,
      startTime
    });

    // 2. If external AI is requested and API key provided, attempt LLM call
    if (useExternalAI && apiKey) {
      try {
        const externalInsight = await this.callExternalLLM({
          apiKey,
          plan: basePlan,
          energyLevel,
          availableMinutes
        });
        if (externalInsight) {
          return {
            ...basePlan,
            rationale: externalInsight.summary || basePlan.rationale,
            coachTips: externalInsight.tips || [],
            source: 'external_llm'
          };
        }
      } catch (err) {
        console.warn('[AIService] External LLM call failed, falling back to heuristic engine:', err);
      }
    }

    // 3. Fallback / Native Heuristic AI Synthesis
    const coachTips = this.generateCoachingTips(basePlan, energyLevel);

    return {
      ...basePlan,
      coachTips,
      source: 'native_heuristic_engine'
    };
  },

  /**
   * Generates actionable coaching tips based on user energy and trade-offs
   */
  generateCoachingTips(plan, energyLevel) {
    const tips = [];

    if (energyLevel === 'low') {
      tips.push('🔋 Energy is low: We prioritized lighter cognitive tasks and protected your evening recovery.');
      tips.push('💧 Drink a full glass of cold water before starting your first rescheduled block.');
    } else if (energyLevel === 'high') {
      tips.push('⚡ High energy detected: High-impact deep work blocks are scheduled upfront to maximize flow state.');
    } else {
      tips.push('⚖️ Balanced cadence: Keep buffer windows sacred to prevent afternoon attention residue.');
    }

    if (plan.deferredTasks && plan.deferredTasks.length > 0) {
      tips.push(`🛡️ ${plan.deferredTasks.length} non-essential task(s) moved to tomorrow without guilt. Focus on today's vital few.`);
    }

    return tips;
  },

  /**
   * External LLM placeholder connector (OpenAI / Anthropic / Gemini compatible)
   */
  async callExternalLLM({ apiKey, plan, energyLevel, availableMinutes }) {
    // Example plug-in endpoint for hackathon demo
    const prompt = `You are LifeOS AI Coach. The user has ${availableMinutes} minutes left today with ${energyLevel} energy.
Plan: ${plan.keptTasks.length} tasks kept, ${plan.deferredTasks.length} tasks deferred.
Generate a 2-sentence encouraging adaptation rationale and 2 quick focus tips.`;

    // Demonstration stub ready for live endpoint
    console.log('[AIService] LLM connector invoked with prompt length:', prompt.length);
    return null; // Triggers graceful native fallback
  }
};
