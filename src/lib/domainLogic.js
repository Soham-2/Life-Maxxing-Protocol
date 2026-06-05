import { toDateKey } from "./date";

export const GYM_WEEK_TEMPLATE = [
  { id: "mon_push", day: "Monday", type: "push", emoji: "🔥", label: "Push Strength" },
  { id: "tue_pull", day: "Tuesday", type: "pull", emoji: "🧲", label: "Pull Focus" },
  { id: "wed_legs", day: "Wednesday", type: "legs", emoji: "🦵", label: "Leg Day" },
  { id: "thu_rest", day: "Thursday", type: "rest", emoji: "🛌", label: "Recovery" },
  { id: "fri_push", day: "Friday", type: "push", emoji: "⚡", label: "Push Power" },
  { id: "sat_pull", day: "Saturday", type: "pull", emoji: "🏹", label: "Pull Volume" },
  { id: "sun_legs", day: "Sunday", type: "legs", emoji: "🏔", label: "Leg Endurance" },
];

export const DEFAULT_EXERCISES = {
  push: [
    { id: "bench_press", name: "Bench Press", sets: "4", reps: "6-10", rest: "90s" },
    { id: "incline_db", name: "Incline DB Press", sets: "3", reps: "8-12", rest: "90s" },
    { id: "shoulder_press", name: "Shoulder Press", sets: "3", reps: "8-12", rest: "75s" },
  ],
  pull: [
    { id: "lat_pulldown", name: "Lat Pulldown", sets: "4", reps: "8-12", rest: "90s" },
    { id: "barbell_row", name: "Barbell Row", sets: "3", reps: "6-10", rest: "90s" },
    { id: "face_pull", name: "Face Pull", sets: "3", reps: "12-15", rest: "60s" },
  ],
  legs: [
    { id: "squat", name: "Back Squat", sets: "4", reps: "5-8", rest: "120s" },
    { id: "rdl", name: "Romanian Deadlift", sets: "3", reps: "8-10", rest: "90s" },
    { id: "leg_press", name: "Leg Press", sets: "3", reps: "10-12", rest: "75s" },
  ],
};

export function createDefaultPlan() {
  return GYM_WEEK_TEMPLATE.map((day) => ({
    ...day,
    exercises: day.type === "rest" ? [] : structuredClone(DEFAULT_EXERCISES[day.type] || []),
  }));
}

export function normalizeHistoryItem(item) {
  return {
    id: item.id || Date.now(),
    date: item.date || new Date().toISOString(),
    dayId: item.dayId || "unknown",
    dayName: item.dayName || "Session",
    type: item.type || "mixed",
    label: item.label || "Workout",
    duration: Number(item.duration || 0),
    completedCount: Number(item.completedCount || 0),
    totalSets: Number(item.totalSets || 0),
  };
}

export function getWeekSummary(history) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - 7);
  return history.filter((h) => new Date(h.date) >= start).length;
}

export function getStreak(history) {
  const days = new Set(history.map((h) => toDateKey(new Date(h.date))));
  let streak = 0;
  const walk = new Date();
  while (days.has(toDateKey(walk))) {
    streak += 1;
    walk.setDate(walk.getDate() - 1);
  }
  return streak;
}

export function getDomainAccent(domain) {
  if (domain === "health") return "var(--accent-green)";
  if (domain === "career") return "var(--accent-purple)";
  return "var(--accent)";
}
