import { createDefaultPlan, normalizeHistoryItem } from "./domainLogic";

const KEYS = {
  gymPlan: "lm_gym_plan_v2",
  gymHistory: "lm_gym_history",
  healthHistory: "lm_health_history",
  careerHistory: "lm_career_history",
};

function safeRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadInitialState() {
  const planRaw = safeRead(KEYS.gymPlan, null);
  const gymPlan = Array.isArray(planRaw) && planRaw.length ? planRaw : createDefaultPlan();

  const gymHistory = safeRead(KEYS.gymHistory, []).map(normalizeHistoryItem);
  const healthHistory = safeRead(KEYS.healthHistory, []).map(normalizeHistoryItem);
  const careerHistory = safeRead(KEYS.careerHistory, []).map(normalizeHistoryItem);

  // Legacy compatibility from earlier single-file key variants.
  const legacyGym = safeRead("lm_gym_history_v1", []);
  if (!gymHistory.length && legacyGym.length) {
    legacyGym.forEach((h) => gymHistory.push(normalizeHistoryItem(h)));
  }

  return { gymPlan, gymHistory, healthHistory, careerHistory };
}

export function persistState(next) {
  safeWrite(KEYS.gymPlan, next.gymPlan);
  safeWrite(KEYS.gymHistory, next.gymHistory);
  safeWrite(KEYS.healthHistory, next.healthHistory);
  safeWrite(KEYS.careerHistory, next.careerHistory);
}
