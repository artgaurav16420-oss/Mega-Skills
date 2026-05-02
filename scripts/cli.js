#!/usr/bin/env node

/**
 * Mega-Skills CLI
 * 
 * A unified entry point for managing the Mega-Skills repository.
 */

import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const command = args[0] || 'help';

const scripts = {
    sync: path.join(rootDir, 'scripts', 'sync_skills.cjs'),
    validate: path.join(rootDir, 'scripts', 'validator.cjs'),
    harden: path.join(rootDir, 'scripts', 'mega_hardener.cjs'),
    doctor: path.join(rootDir, 'scripts', 'doctor.cjs')
};

function runScript(scriptPath) {
    console.log(`> mega-skills running: node ${path.relative(process.cwd(), scriptPath)}`);
    const result = spawnSync('node', [scriptPath], { stdio: 'inherit' });
    if (result.status !== 0) {
        process.exit(result.status);
    }
}

function showHelp() {
    console.log(`
Mega-Skills CLI v5.0.7-mega

Usage:
  npx mega-skills <command>

Commands:
  sync      Synchronize all agent harnesses with directory symlinks
  validate  Check skill completeness and harness synchronization
  harden    Apply "Mega-Hardening" to skill markdown files
  doctor    Run system diagnostics to check "Beast Mode" dependencies
  help      Show this help message

Example:
  npx mega-skills sync
    `);
}

switch (command) {
    case 'sync':
    case 'init':
        runScript(scripts.sync);
        break;
    case 'validate':
    case 'check':
        runScript(scripts.validate);
        break;
    case 'harden':
        runScript(scripts.harden);
        break;
    case 'doctor':
        runScript(scripts.doctor);
        break;
    case 'help':
    case '--help':
    case '-h':
        showHelp();
        break;
    default:
        console.error(`Unknown command: ${command}`);
        showHelp();
        process.exit(1);
}
