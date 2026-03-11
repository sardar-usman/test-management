"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";

type Project = { id: string; name: string; description?: string; status: "ACTIVE" | "COMPLETED" | "ON_HOLD" };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("ALL");

  async function load() { setProjects(await fetch("/api/projects").then((r) => r.json())); }
  useEffect(() => { load(); }, []);

  async function createProject() {
    if (!name.trim()) return toast.error("Project name is required");
    await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, status: "ACTIVE" }) });
    setName(""); toast.success("Project created"); load();
  }

  const filtered = useMemo(() => projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) && (status === "ALL" || p.status === status)
  ), [projects, query, status]);

  return (
    <div className="space-y-4">
      <AppHeader title="Projects" />
      <div className="flex flex-wrap gap-2">
        <input className="rounded border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" />
        <button className="rounded bg-slate-900 px-3 py-2 text-white" onClick={createProject}>Create</button>
        <input className="rounded border px-3 py-2" placeholder="Search projects" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="rounded border px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">All Status</option><option value="ACTIVE">Active</option><option value="COMPLETED">Completed</option><option value="ON_HOLD">On Hold</option>
        </select>
      </div>
      <div className="grid gap-3">
        {filtered.length === 0 ? <div className="rounded border p-5 text-sm text-slate-500">No projects found.</div> : filtered.map((p) => (
          <Link href={`/projects/${p.id}`} key={p.id} className="rounded border p-3 hover:bg-slate-50 dark:hover:bg-slate-900">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-slate-500">{p.status}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
