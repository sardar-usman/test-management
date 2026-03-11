type Kind = "project" | "plan" | "execution" | "priority";

const map: Record<Kind, Record<string, string>> = {
  project: {
    ACTIVE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    COMPLETED: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    ON_HOLD: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  },
  plan: {
    DRAFT: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
    ACTIVE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    COMPLETED: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  },
  execution: {
    PASSED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    FAILED: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
    BLOCKED: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    SKIPPED: "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
    NOT_RUN: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
  },
  priority: {
    LOW: "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
    MEDIUM: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
    HIGH: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    CRITICAL: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  },
};

export function StatusBadge({ kind, value }: { kind: Kind; value: string }) {
  const color = map[kind][value] || "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>{value.replaceAll("_", " ")}</span>;
}
