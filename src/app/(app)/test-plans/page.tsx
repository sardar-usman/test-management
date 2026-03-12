"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

type Project = { id: string; name: string };
type Plan = { id: string; title: string; status: string; priority: string; project: Project };

const inputClass = "input-field";

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
        <input className={inputClass} placeholder="Plan title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select className={inputClass} value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <Button variant="create" onClick={createPlan}>Create</Button>
        <input className={inputClass} placeholder="Search plans" value={query} onChange={(e) => setQuery(e.target.value)} />
      </Card>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 ? (
          <Card className="md:col-span-2 xl:col-span-3">
            <p className="text-sm muted-text">No test plans yet.</p>
          </Card>
        ) : (
          filtered.map((p) => (
            <Card key={p.id}>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm muted-text">{p.project?.name}</p>
              <div className="mt-2 flex gap-2">
                <StatusBadge kind="plan" value={p.status} />
                <StatusBadge kind="priority" value={p.priority} />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
