#!/usr/bin/env node

import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const harness = (process.argv[2] || 'generic').toLowerCase();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');

/**
 * Runs a file existence check for a harness invariant.
 * @param {string} filePath - File path to validate.
 * @param {string} description - Human readable check description.
 * @returns {{description: string, ok: boolean, filePath: string}} Check result.
 */
function check(filePath, description) {
  return {
    description,
    ok: existsSync(filePath),
    filePath,
  };
}

/**
 * Executes harness verification checks and emits machine-readable JSON output.
 * @returns {void}
 */
function run() {
  const checks = [];
  const skillFile = path.join(packageRoot, 'skills', 'auto-skills', 'SKILL.md');
  const cliFile = path.join(packageRoot, 'scripts', 'cli.js');
  const agentsFile = path.join(packageRoot, 'AGENTS.md');

  checks.push(check(skillFile, 'Auto-Skills spec exists'));
  checks.push(check(cliFile, 'CLI entry exists'));

  if (harness === 'antigravity') {
    checks.push(check(agentsFile, 'AGENTS mapping file exists'));
  }

  let statusPrefixFound = false;
  try {
    const skill = readFileSync(skillFile, 'utf-8');
    statusPrefixFound = skill.includes('escalation:on/off');
  } catch {
    statusPrefixFound = false;
  }
  checks.push({
    description: 'Auto-Skills status prefix contract present',
    ok: statusPrefixFound,
    filePath: 'skills/auto-skills/SKILL.md',
  });

  const failed = checks.filter((c) => !c.ok);
  const result = {
    harness,
    ok: failed.length === 0,
    checks,
  };

  console.log(JSON.stringify(result, null, 2));
  process.exit(failed.length === 0 ? 0 : 1);
}

run();
