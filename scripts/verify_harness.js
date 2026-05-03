#!/usr/bin/env node

import { existsSync, readFileSync } from 'fs';
import path from 'path';

const harness = (process.argv[2] || 'generic').toLowerCase();

function check(filePath, description) {
  return {
    description,
    ok: existsSync(filePath),
    filePath,
  };
}

function run() {
  const checks = [];
  checks.push(check(path.resolve('skills/auto-skills/SKILL.md'), 'Auto-Skills spec exists'));
  checks.push(check(path.resolve('scripts/cli.js'), 'CLI entry exists'));

  if (harness === 'antigravity') {
    checks.push(check(path.resolve('AGENTS.md'), 'AGENTS mapping file exists'));
  }

  let statusPrefixFound = false;
  try {
    const skill = readFileSync(path.resolve('skills/auto-skills/SKILL.md'), 'utf-8');
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
