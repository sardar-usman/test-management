type Kind = "project" | "plan" | "execution" | "priority";

const map: Record<Kind, Record<string, string>> = {
  project: {
    ACTIVE: "bg-emerald-50 text-emerald-700",
    COMPLETED: "bg-emerald-50 text-emerald-700",
    ON_HOLD: "bg-amber-50 text-amber-700",
  },
  plan: {
    DRAFT: "bg-zinc-100 text-zinc-600",
    ACTIVE: "bg-emerald-50 text-emerald-700",
    COMPLETED: "bg-emerald-50 text-emerald-700",
    IN_PROGRESS: "bg-indigo-50 text-indigo-700",
    PENDING: "bg-zinc-100 text-zinc-600",
  },
  execution: {
    PASSED: "bg-emerald-50 text-emerald-700",
    FAILED: "bg-rose-50 text-rose-700",
    BLOCKED: "bg-amber-50 text-amber-700",
    SKIPPED: "bg-teal-50 text-teal-700",
    NOT_RUN: "bg-zinc-100 text-zinc-600",
    PENDING: "bg-zinc-100 text-zinc-600",
    IN_PROGRESS: "bg-indigo-50 text-indigo-700",
  },
  priority: {
    CRITICAL: "bg-rose-50 text-rose-700",
    HIGH: "bg-amber-50 text-amber-700",
    MEDIUM: "bg-indigo-50 text-indigo-700",
    LOW: "bg-teal-50 text-teal-700",
  },
};

export function StatusBadge({ kind, value }: { kind: Kind; value: string }) {
  const light = map[kind][value] || "bg-zinc-100 text-zinc-600";
  const dark = "dark:bg-zinc-700 dark:text-zinc-100";
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${light} ${dark}`}>{value.replaceAll("_", " ")}</span>;
}
