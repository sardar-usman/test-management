"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

type Project = { id: string; name: string; description?: string; status: "ACTIVE" | "COMPLETED" | "ON_HOLD" };

const inputClass =
  "rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-500 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100";

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
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="New project name" />
        <Button variant="create" onClick={createProject}>Create</Button>
        <input className={inputClass} placeholder="Search projects" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 ? (
          <Card className="md:col-span-2 xl:col-span-3">
            <p className="text-sm text-zinc-500">No projects found. Create one to get started.</p>
          </Card>
        ) : (
          filtered.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`}>
              <Card className="h-full hover:-translate-y-0.5">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{p.name}</h3>
                  <StatusBadge kind="project" value={p.status} />
                </div>
                <p className="mt-2 text-sm text-zinc-500">{p.description || "No description yet."}</p>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
