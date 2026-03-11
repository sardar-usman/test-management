"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";

type Project = { id: string; name: string };
type Plan = { id: string; title: string; status: string; priority: string; project: Project };

export default function TestPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [query, setQuery] = useState("");

  async function load() {
    const [ps, prjs] = await Promise.all([fetch("/api/test-plans").then((r) => r.json()), fetch("/api/projects").then((r) => r.json())]);
    setPlans(ps); setProjects(prjs); if (prjs[0] && !projectId) setProjectId(prjs[0].id);
  }
  useEffect(() => { load(); }, []);

  async function createPlan() {
    if (!title.trim() || !projectId) return toast.error("Title and project are required");
    await fetch("/api/test-plans", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, projectId }) });
    setTitle(""); toast.success("Test plan created"); load();
  }

  const filtered = useMemo(() => plans.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())), [plans, query]);

  return <div className="space-y-4"><AppHeader title="Test Plans" /><div className="flex flex-wrap gap-2"><input className="rounded border px-3 py-2" placeholder="Plan title" value={title} onChange={(e) => setTitle(e.target.value)} /><select className="rounded border px-3 py-2" value={projectId} onChange={(e) => setProjectId(e.target.value)}>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><button className="rounded bg-slate-900 px-3 py-2 text-white" onClick={createPlan}>Create</button><input className="rounded border px-3 py-2" placeholder="Search plans" value={query} onChange={(e) => setQuery(e.target.value)} /></div><div className="space-y-2">{filtered.length===0?<div className="rounded border p-5 text-sm text-slate-500">No test plans yet.</div>:filtered.map(p => <div key={p.id} className="rounded border p-3"><div className="font-semibold">{p.title}</div><div className="text-sm text-slate-500">{p.project?.name} · {p.status} · {p.priority}</div></div>)}</div></div>;
}
