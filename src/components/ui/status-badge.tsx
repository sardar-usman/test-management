type Kind = "project" | "plan" | "execution" | "priority";

const map: Record<Kind, Record<string, string>> = {
  project: {
    ACTIVE: "bg-indigo-600 text-white dark:bg-indigo-500",
    COMPLETED: "bg-emerald-600 text-white dark:bg-emerald-500",
    ON_HOLD: "bg-amber-600 text-white dark:bg-amber-500",
  },
  plan: {
    DRAFT: "border border-zinc-800 bg-white text-zinc-800 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100",
    ACTIVE: "bg-indigo-600 text-white dark:bg-indigo-500",
    COMPLETED: "bg-emerald-600 text-white dark:bg-emerald-500",
    IN_PROGRESS: "bg-indigo-600 text-white dark:bg-indigo-500",
    PENDING: "bg-zinc-700 text-white dark:bg-zinc-500",
  },
  execution: {
    PASSED: "bg-emerald-600 text-white dark:bg-emerald-500",
    FAILED: "bg-rose-600 text-white dark:bg-rose-500",
    BLOCKED: "bg-amber-600 text-white dark:bg-amber-500",
    SKIPPED: "bg-teal-600 text-white dark:bg-teal-500",
    NOT_RUN: "bg-zinc-700 text-white dark:bg-zinc-500",
    PENDING: "bg-zinc-700 text-white dark:bg-zinc-500",
    IN_PROGRESS: "bg-indigo-600 text-white dark:bg-indigo-500",
  },
  priority: {
    CRITICAL: "bg-rose-600 text-white dark:bg-rose-500",
    HIGH: "bg-amber-600 text-white dark:bg-amber-500",
    MEDIUM: "bg-indigo-600 text-white dark:bg-indigo-500",
    LOW: "bg-teal-600 text-white dark:bg-teal-500",
  },
};

export function StatusBadge({ kind, value }: { kind: Kind; value: string }) {
  const color = map[kind][value] || "bg-zinc-700 text-white";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>{value.replaceAll("_", " ")}</span>;
}
