type Kind = "project" | "plan" | "execution" | "priority";

const map: Record<Kind, Record<string, string>> = {
  project: {
    ACTIVE: "bg-indigo-600 text-white",
    COMPLETED: "bg-emerald-600 text-white",
    ON_HOLD: "bg-amber-600 text-white",
  },
  plan: {
    DRAFT: "border border-zinc-800 bg-white text-zinc-800",
    ACTIVE: "bg-indigo-600 text-white",
    COMPLETED: "bg-emerald-600 text-white",
    IN_PROGRESS: "bg-indigo-600 text-white",
    PENDING: "bg-zinc-700 text-white",
  },
  execution: {
    PASSED: "bg-emerald-600 text-white",
    FAILED: "bg-rose-600 text-white",
    BLOCKED: "bg-amber-600 text-white",
    SKIPPED: "bg-teal-600 text-white",
    NOT_RUN: "bg-zinc-700 text-white",
    PENDING: "bg-zinc-700 text-white",
    IN_PROGRESS: "bg-indigo-600 text-white",
  },
  priority: {
    CRITICAL: "bg-rose-600 text-white",
    HIGH: "bg-amber-600 text-white",
    MEDIUM: "bg-indigo-600 text-white",
    LOW: "bg-teal-600 text-white",
  },
};

export function StatusBadge({ kind, value }: { kind: Kind; value: string }) {
  const color = map[kind][value] || "bg-zinc-700 text-white";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>{value.replaceAll("_", " ")}</span>;
}
