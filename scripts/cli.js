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

import orchestrator from '../lib/orchestrator.js';
import {
    activateAutoMode,
    deactivateAutoMode,
    getAutoModeState,
    recordTurn,
} from '../lib/auto_mode_state.js';

const scripts = {
    sync: path.join(rootDir, 'scripts', 'sync_skills.cjs'),
    validate: path.join(rootDir, 'scripts', 'validator.cjs'),
    harden: path.join(rootDir, 'scripts', 'mega_hardener.cjs'),
    doctor: path.join(rootDir, 'scripts', 'doctor.cjs'),
    'index-skills': path.join(rootDir, 'scripts', 'index_skills.cjs')
};

async function runAuto(prompt) {
    await orchestrator.init();
    const bestSkills = await orchestrator.getBestSkill(prompt);
    const topSkill = bestSkills[0];
    const modeState = await recordTurn({ skillName: topSkill?.name || 'unknown', prompt });

    console.log('\nTop skills for your task:');
    bestSkills.forEach((skill, index) => {
        console.log(`${index + 1}. ${skill.name} (Score: ${skill.score.toFixed(4)})`);
        console.log(`   Description: ${skill.description}`);
    });

    console.log('\n[Auto-Skills Status]');
    console.log(`Mode: ${modeState.active ? 'active' : 'inactive'}`);
    console.log(`Prefix: [Auto-Skills: ${modeState.activeSkill} + caveman | escalation:${modeState.escalationOn ? 'on' : 'off'}]`);
    console.log(`Turn: ${modeState.turnCount}`);
}

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
  sync           Synchronize all agent harnesses with directory symlinks
  validate       Check skill completeness and harness synchronization
  harden         Apply "Mega-Hardening" to skill markdown files
  doctor         Run system diagnostics to check "Beast Mode" dependencies
  index-skills   Create the semantic index for all skills
  auto "<prompt>" Find the best skill for a given task prompt
  /auto-skills        Activate persistent AI skill orchestration (AI mode)
  /stop-auto-skills   Deactivate persistent AI skill orchestration
  auto-status         Show current auto mode state
  verify <harness>    Verify local Mega-Skills wiring for a harness
  help           Show this help message

Example:
  npx mega-skills index-skills
  npx mega-skills auto "create a new react component"
    `);
}

switch (command) {
    case 'auto':
    case '/auto-skill':
        const prompt = args.slice(1).join(' ');
        if (!prompt) {
            console.error('Please provide a prompt for the "auto" command.');
            showHelp();
            process.exit(1);
        }
        runAuto(prompt);
        break;
    case '/auto-skills':
        if (args.length === 1) {
            activateAutoMode().then(() => {
                console.log('[Auto-Skills: Activating persistent mode + caveman lock]');
            });
            break;
        }
        runAuto(args.slice(1).join(' '));
        break;
    case '/stop-auto-skills':
        deactivateAutoMode().then(() => {
            console.log('[Auto-Skills: Deactivating. Returning to manual mode.]');
        });
        break;
    case 'auto-status':
        getAutoModeState().then((state) => {
            console.log(JSON.stringify(state, null, 2));
        });
        break;
    case 'verify':
        const verifyHarness = args[1] || 'generic';
        const verifyScript = path.join(rootDir, 'scripts', 'verify_harness.js');
        const verifyResult = spawnSync('node', [verifyScript, verifyHarness], { stdio: 'inherit' });
        if (verifyResult.status !== 0) process.exit(verifyResult.status);
        break;
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
