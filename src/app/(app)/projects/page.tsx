"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { Card } from "@/components/ui/card";

type Project = { id: string; name: string; description?: string; status: "ACTIVE" | "COMPLETED" | "ON_HOLD" };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("ALL");

  async function load() {
    setProjects(await fetch("/api/projects").then((r) => r.json()));
  }

  useEffect(() => {
    load();
  }, []);

  async function createProject() {
    if (!name.trim()) return toast.error("Project name is required");
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, status: "ACTIVE" }),
    });
    setName("");
    toast.success("Project created");
    load();
  }

  const filtered = useMemo(
    () => projects.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) && (status === "ALL" || p.status === status)),
    [projects, query, status]
  );

  return (
    <div className="space-y-5">
      <AppHeader title="Projects" />

      <Card className="flex flex-wrap gap-2">
        <input
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none ring-blue-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New project name"
        />
        <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900" onClick={createProject}>
          Create
        </button>

        <input
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none ring-blue-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
          placeholder="Search projects"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 ? (
          <Card className="md:col-span-2 xl:col-span-3">
            <p className="text-sm text-slate-500">No projects found. Create one to get started.</p>
          </Card>
        ) : (
          filtered.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`}>
              <Card className="h-full hover:-translate-y-0.5">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{p.name}</h3>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">{p.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">{p.description || "No description yet."}</p>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
