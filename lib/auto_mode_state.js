import { mkdir, readFile, writeFile } from 'fs/promises';
import os from 'os';
import path from 'path';

const STATE_DIR = path.join(os.homedir(), '.mega-skills');
const STATE_FILE = path.join(STATE_DIR, 'auto-mode-state.json');

const DEFAULT_STATE = {
  active: false,
  turnCount: 0,
  activeSkill: null,
  cavemanLocked: true,
  escalationOn: false,
  updatedAt: null,
};

async function saveState(state) {
  await mkdir(STATE_DIR, { recursive: true });
  const next = { ...state, updatedAt: new Date().toISOString() };
  await writeFile(STATE_FILE, JSON.stringify(next, null, 2));
  return next;
}

async function loadState() {
  try {
    const raw = await readFile(STATE_FILE, 'utf-8');
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function shouldEscalate(turnCount, prompt = '') {
  const multiStepHints = /(then|after that|next|step by step|plan|roadmap|multi-step|refactor|migrate)/i;
  return turnCount > 8 || multiStepHints.test(prompt);
}

export async function activateAutoMode() {
  return saveState({ ...DEFAULT_STATE, active: true, cavemanLocked: true, turnCount: 0 });
}

export async function deactivateAutoMode() {
  return saveState({ ...DEFAULT_STATE, active: false, cavemanLocked: true });
}

export async function getAutoModeState() {
  return loadState();
}

export async function recordTurn({ skillName, prompt }) {
  const prev = await loadState();
  const turnCount = prev.turnCount + 1;
  const escalationOn = shouldEscalate(turnCount, prompt);
  const next = {
    ...prev,
    active: true,
    turnCount,
    cavemanLocked: true,
    activeSkill: skillName,
    escalationOn,
  };
  return saveState(next);
}


export async function setAutoModeState(state) {
  return saveState({ ...DEFAULT_STATE, ...state });
}
