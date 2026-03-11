"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { Card } from "@/components/ui/card";

type Project = { id: string; name: string };
type TestCase = {
  id: string;
  testCaseId: string;
  title: string;
  priority: string;
  status: string;
  executionStatus: string;
  assignedTo?: string;
  tags: string[];
};

export default function TestCasesPage() {
  const [items, setItems] = useState<TestCase[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [selected, setSelected] = useState<string[]>([]);

  async function load() {
    const [cases, prjs] = await Promise.all([
      fetch("/api/test-cases").then((r) => r.json()),
      fetch("/api/projects").then((r) => r.json()),
    ]);
    setItems(cases);
    setProjects(prjs);
    if (prjs[0] && !projectId) setProjectId(prjs[0].id);
  }

  useEffect(() => {
    load();
  }, []);

  async function createCase() {
    if (!title.trim()) return toast.error("Title required");
    await fetch("/api/test-cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, projectId, steps: [{ action: "Open app", expectedResult: "App opens" }] }),
    });
    setTitle("");
    toast.success("Test case created");
    load();
  }

  async function duplicate(id: string) {
    await fetch(`/api/test-cases/${id}`, { method: "POST" });
    toast.success("Test case duplicated");
    load();
  }

  async function execute(id: string, executionStatus: string) {
    const evidenceUrl = prompt("Optional evidence URL (screenshot/video link):") || "";
    await fetch(`/api/test-cases/${id}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ executionStatus, actualResult: executionStatus, comments: "Updated from UI", evidenceUrl }),
    });
    toast.success(`Execution set to ${executionStatus}`);
    load();
  }

  async function bulkUpdate(newStatus: string) {
    if (selected.length === 0) return toast.error("Select at least one case");
    await fetch("/api/test-cases", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selected, executionStatus: newStatus }),
    });
    toast.success("Bulk status updated");
    setSelected([]);
    load();
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

  return (
    <div className="space-y-5">
      <AppHeader title="Test Cases" />

      <Card className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <input
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none ring-blue-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Test case title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900" onClick={createCase}>
            Create
          </button>
          <a className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm dark:border-slate-700" href="/api/test-cases/export">
            Export CSV
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none ring-blue-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Search ID/title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="ALL">All Priority</option>
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
            <option>CRITICAL</option>
          </select>
          <select className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ALL">All Execution</option>
            <option>NOT_RUN</option>
            <option>PASSED</option>
            <option>FAILED</option>
            <option>BLOCKED</option>
            <option>SKIPPED</option>
          </select>
          <button className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm dark:border-slate-700" onClick={() => bulkUpdate("PASSED")}>
            Bulk → Passed
          </button>
          <button className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm dark:border-slate-700" onClick={() => bulkUpdate("FAILED")}>
            Bulk → Failed
          </button>
        </div>
      </Card>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <p className="text-sm text-slate-500">No test cases match your filter.</p>
          </Card>
        ) : (
          filtered.map((tc) => (
            <Card key={tc.id}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={selected.includes(tc.id)}
                    onChange={(e) =>
                      setSelected((prev) => (e.target.checked ? [...prev, tc.id] : prev.filter((x) => x !== tc.id)))
                    }
                  />
                  {tc.testCaseId} · {tc.title}
                </label>

                <div className="flex flex-wrap gap-1">
                  <button className="rounded-lg border px-2.5 py-1 text-xs" onClick={() => duplicate(tc.id)}>
                    Duplicate
                  </button>
                  <button className="rounded-lg border px-2.5 py-1 text-xs" onClick={() => execute(tc.id, "PASSED")}>
                    Pass
                  </button>
                  <button className="rounded-lg border px-2.5 py-1 text-xs" onClick={() => execute(tc.id, "FAILED")}>
                    Fail
                  </button>
                  <button className="rounded-lg border px-2.5 py-1 text-xs" onClick={() => execute(tc.id, "BLOCKED")}>
                    Block
                  </button>
                </div>
              </div>

              <div className="text-sm text-slate-500">
                {tc.priority} · {tc.status} · {tc.executionStatus}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
