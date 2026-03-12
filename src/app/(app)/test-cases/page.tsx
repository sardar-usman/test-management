"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

type Project = { id: string; name: string };
type ExecutionStatus = "PASSED" | "FAILED" | "BLOCKED" | "NOT_RUN" | "SKIPPED";
type TestCase = {
  id: string;
  testCaseId: string;
  title: string;
  priority: string;
  status: string;
  executionStatus: ExecutionStatus;
  assignedTo?: string;
  tags: string[];
};

type ExecutionDialogState = {
  id: string;
  title: string;
  executionStatus: "PASSED" | "FAILED" | "BLOCKED";
  evidenceUrl: string;
  comments: string;
};

const inputClass = "input-field";

export default function TestCasesPage() {
  const [items, setItems] = useState<TestCase[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [selected, setSelected] = useState<string[]>([]);
  const [executionDialog, setExecutionDialog] = useState<ExecutionDialogState | null>(null);
  const [submittingExecution, setSubmittingExecution] = useState(false);

  async function load() {
    try {
      const [casesRes, projectsRes] = await Promise.all([fetch("/api/test-cases"), fetch("/api/projects")]);
      if (!casesRes.ok || !projectsRes.ok) throw new Error("Failed to load test data");

      const [cases, prjs] = await Promise.all([casesRes.json(), projectsRes.json()]);
      setItems(cases);
      setProjects(prjs);
      if (prjs[0] && !projectId) setProjectId(prjs[0].id);
    } catch {
      toast.error("Could not load test cases/projects. Please refresh.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!executionDialog) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submittingExecution) setExecutionDialog(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [executionDialog, submittingExecution]);

  async function createCase() {
    if (!title.trim()) return toast.error("Title required");

    try {
      const response = await fetch("/api/test-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, projectId, steps: [{ action: "Open app", expectedResult: "App opens" }] }),
      });

      if (!response.ok) throw new Error("Create failed");

      setTitle("");
      toast.success("Test case created");
      load();
    } catch {
      toast.error("Could not create test case.");
    }
  }

  async function duplicate(id: string) {
    try {
      const response = await fetch(`/api/test-cases/${id}`, { method: "POST" });
      if (!response.ok) throw new Error("Duplicate failed");
      toast.success("Test case duplicated");
      load();
    } catch {
      toast.error("Could not duplicate test case.");
    }
  }

  function openExecutionDialog(tc: TestCase, executionStatus: "PASSED" | "FAILED" | "BLOCKED") {
    setExecutionDialog({
      id: tc.id,
      title: `${tc.testCaseId} · ${tc.title}`,
      executionStatus,
      evidenceUrl: "",
      comments: "",
    });
  }

  async function submitExecution() {
    if (!executionDialog) return;

    const url = executionDialog.evidenceUrl.trim();
    if (url) {
      try {
        const parsed = new URL(url);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error("Invalid protocol");
      } catch {
        toast.error("Please enter a valid evidence URL (http/https).");
        return;
      }
    }

    setSubmittingExecution(true);
    try {
      const response = await fetch(`/api/test-cases/${executionDialog.id}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          executionStatus: executionDialog.executionStatus,
          actualResult: executionDialog.executionStatus,
          comments: executionDialog.comments || "Updated from UI",
          evidenceUrl: url,
        }),
      });

      if (!response.ok) throw new Error("Execution update failed");

      toast.success(`Execution set to ${executionDialog.executionStatus}`);
      setExecutionDialog(null);
      load();
    } catch {
      toast.error("Could not save execution status.");
    } finally {
      setSubmittingExecution(false);
    }
  }

  async function bulkUpdate(newStatus: string) {
    if (selected.length === 0) return toast.error("Select at least one case");

    try {
      const response = await fetch("/api/test-cases", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selected, executionStatus: newStatus }),
      });

      if (!response.ok) throw new Error("Bulk update failed");

      toast.success("Bulk status updated");
      setSelected([]);
      load();
    } catch {
      toast.error("Could not apply bulk status update.");
    }
  }

  const filtered = useMemo(
    () =>
      items.filter(
        (tc) =>
          `${tc.testCaseId} ${tc.title}`.toLowerCase().includes(query.toLowerCase()) &&
          (priority === "ALL" || tc.priority === priority) &&
          (status === "ALL" || tc.executionStatus === status)
      ),
    [items, query, priority, status]
  );

  function statusButtonClass(current: string, target: "PASSED" | "FAILED" | "BLOCKED") {
    return current === target
      ? "px-2.5 py-1 text-xs ring-2 ring-offset-1 ring-[var(--ring)] opacity-90"
      : "px-2.5 py-1 text-xs opacity-95";
  }

  return (
    <>
      <div className="space-y-5">
        <AppHeader title="Test Cases" />

        <Card className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <input className={inputClass} placeholder="Test case title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <select className={inputClass} value={projectId} onChange={(e) => setProjectId(e.target.value)}>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <Button variant="create" onClick={createCase}>Create</Button>
            <Link className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--text-body)] hover:bg-[var(--surface-2)]" href="/api/test-cases/export">
              Export CSV
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            <input className={inputClass} placeholder="Search ID/title" value={query} onChange={(e) => setQuery(e.target.value)} />
            <select className={inputClass} value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="ALL">All Priority</option>
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
              <option>CRITICAL</option>
            </select>
            <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="ALL">All Execution</option>
              <option>NOT_RUN</option>
              <option>PASSED</option>
              <option>FAILED</option>
              <option>BLOCKED</option>
              <option>SKIPPED</option>
            </select>
            <Button variant="pass" onClick={() => bulkUpdate("PASSED")}>Bulk → Passed</Button>
            <Button variant="fail" onClick={() => bulkUpdate("FAILED")}>Bulk → Failed</Button>
          </div>
        </Card>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <Card>
              <p className="text-sm muted-text">No test cases match your filter.</p>
            </Card>
          ) : (
            filtered.map((tc) => (
              <Card key={tc.id}>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={selected.includes(tc.id)}
                      onChange={(e) => setSelected((prev) => (e.target.checked ? [...prev, tc.id] : prev.filter((x) => x !== tc.id)))}
                    />
                    {tc.testCaseId} · {tc.title}
                  </label>

                  <div className="flex flex-wrap items-center gap-1">
                    <Button variant="duplicate" className="px-2.5 py-1 text-xs" onClick={() => duplicate(tc.id)}>Duplicate</Button>
                    <Button variant="pass" className={statusButtonClass(tc.executionStatus, "PASSED")} onClick={() => openExecutionDialog(tc, "PASSED")}>
                      {tc.executionStatus === "PASSED" ? "✓ Passed" : "Pass"}
                    </Button>
                    <Button variant="fail" className={statusButtonClass(tc.executionStatus, "FAILED")} onClick={() => openExecutionDialog(tc, "FAILED")}>
                      {tc.executionStatus === "FAILED" ? "✓ Failed" : "Fail"}
                    </Button>
                    <Button variant="blocked" className={statusButtonClass(tc.executionStatus, "BLOCKED")} onClick={() => openExecutionDialog(tc, "BLOCKED")}>
                      {tc.executionStatus === "BLOCKED" ? "✓ Blocked" : "Block"}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-sm">
                  <StatusBadge kind="priority" value={tc.priority} />
                  <StatusBadge kind="plan" value={tc.status} />
                  <StatusBadge kind="execution" value={tc.executionStatus} />
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {executionDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">Update Execution Status</h3>
                <p className="mt-1 text-sm subtle-text">{executionDialog.title}</p>
              </div>
              <button
                className="rounded-md px-2 py-1 text-sm subtle-text hover:bg-[var(--surface-2)]"
                onClick={() => setExecutionDialog(null)}
                type="button"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide muted-text">Execution Status</label>
                <select
                  className="input-field w-full"
                  value={executionDialog.executionStatus}
                  onChange={(e) =>
                    setExecutionDialog((prev) =>
                      prev ? { ...prev, executionStatus: e.target.value as "PASSED" | "FAILED" | "BLOCKED" } : prev
                    )
                  }
                >
                  <option value="PASSED">PASSED</option>
                  <option value="FAILED">FAILED</option>
                  <option value="BLOCKED">BLOCKED</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide muted-text">Evidence URL (optional)</label>
                <input
                  type="url"
                  className="input-field w-full"
                  placeholder="https://..."
                  value={executionDialog.evidenceUrl}
                  onChange={(e) => setExecutionDialog((prev) => (prev ? { ...prev, evidenceUrl: e.target.value } : prev))}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide muted-text">Comments (optional)</label>
                <textarea
                  className="input-field min-h-24 w-full"
                  placeholder="Add notes about this execution result"
                  value={executionDialog.comments}
                  onChange={(e) => setExecutionDialog((prev) => (prev ? { ...prev, comments: e.target.value } : prev))}
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setExecutionDialog(null)} disabled={submittingExecution}>Cancel</Button>
              <Button variant="primary" onClick={submitExecution} disabled={submittingExecution}>
                {submittingExecution ? "Saving..." : "Save Status"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
