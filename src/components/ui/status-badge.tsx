type Kind = "project" | "plan" | "execution" | "priority";

const map: Record<Kind, Record<string, string>> = {
  project: {
    ACTIVE: "[background:var(--success-soft)] [color:var(--success)]",
    COMPLETED: "[background:var(--success-soft)] [color:var(--success)]",
    ON_HOLD: "[background:var(--warning-soft)] [color:var(--warning)]",
  },
  plan: {
    DRAFT: "[background:var(--surface-3)] [color:var(--text-secondary)]",
    ACTIVE: "[background:var(--success-soft)] [color:var(--success)]",
    COMPLETED: "[background:var(--success-soft)] [color:var(--success)]",
    IN_PROGRESS: "[background:var(--accent-soft)] [color:var(--accent)]",
    PENDING: "[background:var(--surface-3)] [color:var(--text-secondary)]",
  },
  execution: {
    PASSED: "[background:var(--success-soft)] [color:var(--success)]",
    FAILED: "[background:var(--danger-soft)] [color:var(--danger)]",
    BLOCKED: "[background:var(--warning-soft)] [color:var(--warning)]",
    SKIPPED: "[background:var(--info-soft)] [color:var(--info)]",
    NOT_RUN: "[background:var(--surface-3)] [color:var(--text-secondary)]",
    PENDING: "[background:var(--surface-3)] [color:var(--text-secondary)]",
    IN_PROGRESS: "[background:var(--accent-soft)] [color:var(--accent)]",
  },
  priority: {
    CRITICAL: "[background:var(--danger-soft)] [color:var(--danger)]",
    HIGH: "[background:var(--warning-soft)] [color:var(--warning)]",
    MEDIUM: "[background:var(--accent-soft)] [color:var(--accent)]",
    LOW: "[background:var(--success-soft)] [color:var(--success)]",
  },
};

export function StatusBadge({ kind, value }: { kind: Kind; value: string }) {
  const color = map[kind][value] || "[background:var(--surface-3)] [color:var(--text-secondary)]";
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>{value.replaceAll("_", " ")}</span>;
}
