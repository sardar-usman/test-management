type Kind = "project" | "plan" | "execution" | "priority";

const map: Record<Kind, Record<string, string>> = {
  project: {
    ACTIVE: "bg-blue-500 text-white",
    COMPLETED: "bg-green-600 text-white",
    ON_HOLD: "bg-amber-500 text-white",
  },
  plan: {
    DRAFT: "border border-zinc-400 bg-white text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200",
    ACTIVE: "bg-blue-500 text-white",
    COMPLETED: "bg-green-600 text-white",
    IN_PROGRESS: "bg-blue-500 text-white",
    PENDING: "bg-zinc-400 text-white",
  },
  execution: {
    PASSED: "bg-green-600 text-white",
    FAILED: "bg-red-600 text-white",
    BLOCKED: "bg-amber-500 text-white",
    SKIPPED: "bg-yellow-400 text-zinc-900",
    NOT_RUN: "bg-zinc-400 text-white",
    PENDING: "bg-zinc-400 text-white",
    IN_PROGRESS: "bg-blue-500 text-white",
  },
  priority: {
    CRITICAL: "bg-red-600 text-white",
    HIGH: "bg-amber-500 text-white",
    MEDIUM: "bg-yellow-400 text-zinc-900",
    LOW: "bg-green-600 text-white",
  },
};

export function StatusBadge({ kind, value }: { kind: Kind; value: string }) {
  const color = map[kind][value] || "bg-zinc-400 text-white";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>{value.replaceAll("_", " ")}</span>;
}
