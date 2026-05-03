import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import os from 'os';
import path from 'path';

const STATE_DIR = path.join(os.homedir(), '.mega-skills');
const STATE_FILE = path.join(STATE_DIR, 'auto-mode-state.json');
const LOCK_FILE = path.join(STATE_DIR, 'auto-mode-state.lock');
const LOCK_TIMEOUT_MS = 5000;
const LOCK_RETRY_MS = 50;

const DEFAULT_STATE = {
  active: false,
  turnCount: 0,
  activeSkill: null,
  cavemanLocked: true,
  escalationOn: false,
  updatedAt: null,
};

/**
 * Persists the auto-mode state with an updated timestamp.
 * @param {object} state - State payload to write.
 * @returns {Promise<object>} Persisted state including updatedAt.
 */
async function saveState(state) {
  await mkdir(STATE_DIR, { recursive: true });
  const next = { ...state, updatedAt: new Date().toISOString() };
  await writeFile(STATE_FILE, JSON.stringify(next, null, 2));
  return next;
}

/**
 * Loads persisted auto-mode state or returns defaults when unavailable.
 * @returns {Promise<object>} Current state merged with defaults.
 */
async function loadState() {
  try {
    const raw = await readFile(STATE_FILE, 'utf-8');
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

/**
 * Determines whether the orchestration stack should escalate for a turn.
 * @param {number} turnCount - Current conversation turn count.
 * @param {string} [prompt=''] - Prompt text used for heuristic hints.
 * @returns {boolean} True when escalation should be enabled.
 */
export function shouldEscalate(turnCount, prompt = '') {
  const multiStepHints = /(then|after that|next|step by step|plan|roadmap|multi-step|refactor|migrate)/i;
  return turnCount > 8 || multiStepHints.test(prompt);
}

/**
 * Activates persistent auto mode and resets counters.
 * @returns {Promise<object>} Updated persisted state.
 */
export async function activateAutoMode() {
  return saveState({ ...DEFAULT_STATE, active: true, cavemanLocked: true, turnCount: 0 });
}

/**
 * Deactivates persistent auto mode while preserving default lock behavior.
 * @returns {Promise<object>} Updated persisted state.
 */
export async function deactivateAutoMode() {
  return saveState({ ...DEFAULT_STATE, active: false, cavemanLocked: true });
}

/**
 * Returns the current auto-mode state.
 * @returns {Promise<object>} Current state.
 */
export async function getAutoModeState() {
  return loadState();
}

/**
 * Acquires an exclusive lock around state read-modify-write operations.
 * @template T
 * @param {() => Promise<T>} fn - Operation to execute while holding lock.
 * @returns {Promise<T>} Result of the locked operation.
 */
async function withLock(fn) {
  await mkdir(STATE_DIR, { recursive: true });
  const deadline = Date.now() + LOCK_TIMEOUT_MS;

  while (existsSync(LOCK_FILE)) {
    const lockContents = readFileSync(LOCK_FILE, 'utf-8');
    const [, ts = '0'] = lockContents.split(':');
    const lockAge = Date.now() - Number(ts);
    if (lockAge > LOCK_TIMEOUT_MS) {
      unlinkSync(LOCK_FILE);
      continue;
    }
    if (Date.now() > deadline) {
      throw new Error('Timed out waiting for auto mode state lock');
    }
    await new Promise((resolve) => setTimeout(resolve, LOCK_RETRY_MS));
  }

  writeFileSync(LOCK_FILE, `${process.pid}:${Date.now()}`);
  try {
    return await fn();
  } finally {
    if (existsSync(LOCK_FILE)) {
      unlinkSync(LOCK_FILE);
    }
  }
}

/**
 * Records a turn and updates skill/escalation fields without toggling active state.
 * @param {object} options - Turn payload.
 * @param {string} options.skillName - Selected skill name for this turn.
 * @param {string} options.prompt - User prompt text.
 * @returns {Promise<object>} Updated persisted state.
 */
export async function recordTurn({ skillName, prompt }) {
  return withLock(async () => {
    const prev = await loadState();
    const turnCount = prev.turnCount + 1;
    const escalationOn = shouldEscalate(turnCount, prompt);
    const next = {
      ...prev,
      turnCount,
      cavemanLocked: true,
      activeSkill: skillName,
      escalationOn,
    };
    return saveState(next);
  });
}

/**
 * Sets the auto-mode state explicitly.
 * @param {object} state - Partial state to persist.
 * @returns {Promise<object>} Updated persisted state.
 */
export async function setAutoModeState(state) {
  return saveState({ ...DEFAULT_STATE, ...state });
}
