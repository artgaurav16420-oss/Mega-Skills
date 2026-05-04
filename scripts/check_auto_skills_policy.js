#!/usr/bin/env node

import { readFile } from 'fs/promises';

const README_PATH = 'README.md';
const SKILL_PATH = 'skills/auto-skills/SKILL.md';

/**
 * Appends an issue when required content is missing.
 * @param {string} content - Source content to scan.
 * @param {RegExp} pattern - Required pattern.
 * @param {string} message - Issue message when pattern is absent.
 * @param {string[]} issues - Mutable issues array.
 * @returns {void}
 */
function mustContain(content, pattern, message, issues) {
  if (!pattern.test(content)) issues.push(message);
}

/**
 * Validates README and Auto-Skills spec policy consistency.
 * @returns {Promise<void>}
 */
async function run() {
  const issues = [];
  const [readme, skill] = await Promise.all([
    readFile(README_PATH, 'utf-8'),
    readFile(SKILL_PATH, 'utf-8'),
  ]);

  mustContain(readme, /\/auto-skills/, 'README missing /auto-skills usage mention.', issues);
  mustContain(readme, /Known Pitfalls/i, 'README missing Known Pitfalls section.', issues);
  mustContain(readme, /Updating After Installation/i, 'README missing update workflow section.', issues);

  mustContain(skill, /DUAL-SKILL LOCK/i, 'Auto-Skills SKILL missing DUAL-SKILL LOCK rule.', issues);
  mustContain(skill, /STATUS VISIBILITY/i, 'Auto-Skills SKILL missing STATUS VISIBILITY rule.', issues);
  mustContain(skill, /escalation:on\/off/i, 'Auto-Skills SKILL missing explicit status prefix format.', issues);

  if (issues.length > 0) {
    console.error('Auto-Skills policy consistency check failed:\n');
    for (const issue of issues) {
      console.error(`- ${issue}`);
    }
    process.exit(1);
  }

  console.log('Auto-Skills policy consistency check passed.');
}

run().catch((error) => {
  console.error('Failed to run policy check:', error);
  process.exit(1);
});
