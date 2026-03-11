"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { Card } from "@/components/ui/card";

type Project = { id: string; name: string };
type Plan = { id: string; title: string; status: string; priority: string; project: Project };

export default function TestPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [query, setQuery] = useState("");

  async function load() {
    const [ps, prjs] = await Promise.all([
      fetch("/api/test-plans").then((r) => r.json()),
      fetch("/api/projects").then((r) => r.json()),
    ]);
    setPlans(ps);
    setProjects(prjs);
    if (prjs[0] && !projectId) setProjectId(prjs[0].id);
  }

  useEffect(() => {
    load();
  }, []);

  async function createPlan() {
    if (!title.trim() || !projectId) return toast.error("Title and project are required");
    await fetch("/api/test-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, projectId }),
    });
    setTitle("");
    toast.success("Test plan created");
    load();
  }

  const filtered = useMemo(() => plans.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())), [plans, query]);

  return (
    <div className="space-y-5">
      <AppHeader title="Test Plans" />

      <Card className="flex flex-wrap gap-2">
        <input
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none ring-blue-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
          placeholder="Plan title"
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
        <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900" onClick={createPlan}>
          Create
        </button>
        <input
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none ring-blue-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
          placeholder="Search plans"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Card>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 ? (
          <Card className="md:col-span-2 xl:col-span-3">
            <p className="text-sm text-slate-500">No test plans yet.</p>
          </Card>
        ) : (
          filtered.map((p) => (
            <Card key={p.id}>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {p.project?.name} · {p.status} · {p.priority}
              </p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
