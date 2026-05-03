#!/usr/bin/env node

import {
  activateAutoMode,
  deactivateAutoMode,
  getAutoModeState,
  recordTurn,
  setAutoModeState,
} from '../lib/auto_mode_state.js';

function pct(n, d) {
  return d === 0 ? 0 : Number(((n / d) * 100).toFixed(2));
}

async function run() {
  const originalState = await getAutoModeState();

  const results = [];
  const issues = [];
  let totalTurns = 0;
  let cavemanLockTurns = 0;
  let escalationExpectedTurns = 0;
  let escalationCorrectTurns = 0;

  try {
    await deactivateAutoMode();
    await activateAutoMode();

    const scenarios = [
      {
        name: 'short_single_task',
        prompts: ['create a button component', 'add hover style', 'ship it'],
      },
      {
        name: 'long_multistep',
        prompts: [
          'build auth flow',
          'then add login form validation',
          'after that add password reset',
          'next write test plan',
          'then implement tests',
          'refactor session handling',
          'migrate token storage',
          'create rollout plan',
          'execute step by step migration',
          'final review',
        ],
      },
    ];

    for (const scenario of scenarios) {
      let scenarioEscalations = 0;
      for (const prompt of scenario.prompts) {
        const state = await recordTurn({ skillName: 'auto-skills', prompt });
        totalTurns += 1;

        if (state.cavemanLocked) cavemanLockTurns += 1;

        const expectedEscalation = state.turnCount > 8 || /(then|after that|next|step by step|plan|roadmap|multi-step|refactor|migrate)/i.test(prompt);
        if (expectedEscalation) escalationExpectedTurns += 1;
        if (state.escalationOn === expectedEscalation) escalationCorrectTurns += 1;
        if (state.escalationOn) scenarioEscalations += 1;
      }

      results.push({
        scenario: scenario.name,
        turns: scenario.prompts.length,
        escalationsObserved: scenarioEscalations,
      });
    }

    const metrics = {
      totalTurns,
      cavemanLockAdherencePct: pct(cavemanLockTurns, totalTurns),
      escalationAccuracyPct: pct(escalationCorrectTurns, totalTurns),
      escalationExpectedTurns,
      scenarios: results,
    };

    if (metrics.cavemanLockAdherencePct < 100) {
      issues.push('caveman lock adherence below 100%');
    }
    if (metrics.escalationAccuracyPct < 100) {
      issues.push('escalation heuristic accuracy below 100% for deterministic test prompts');
    }

    console.log(JSON.stringify({ ok: issues.length === 0, metrics, issues }, null, 2));
    process.exitCode = issues.length === 0 ? 0 : 1;
  } finally {
    await setAutoModeState(originalState);
  }
}

run();
