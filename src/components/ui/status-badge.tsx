type Kind = "project" | "plan" | "execution" | "priority";

const map: Record<Kind, Record<string, string>> = {
  project: {
    ACTIVE: "bg-emerald-50 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-400",
    COMPLETED: "bg-emerald-50 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-400",
    ON_HOLD: "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-400",
  },
  plan: {
    DRAFT: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
    ACTIVE: "bg-emerald-50 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-400",
    COMPLETED: "bg-emerald-50 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-400",
    IN_PROGRESS: "bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-400",
    PENDING: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
  },
  execution: {
    PASSED: "bg-emerald-50 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-400",
    FAILED: "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-400",
    BLOCKED: "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-400",
    SKIPPED: "bg-cyan-50 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-400",
    NOT_RUN: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
    PENDING: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
    IN_PROGRESS: "bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-400",
  },
  priority: {
    CRITICAL: "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-400",
    HIGH: "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-400",
    MEDIUM: "bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-400",
    LOW: "bg-emerald-50 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-400",
  },
};

export function StatusBadge({ kind, value }: { kind: Kind; value: string }) {
  const color = map[kind][value] || "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400";
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>{value.replaceAll("_", " ")}</span>;
}
