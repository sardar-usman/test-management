"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";

type Project = { id: string; name: string };
type TestCase = { id: string; testCaseId: string; title: string; priority: string; status: string; executionStatus: string; assignedTo?: string; tags: string[] };

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
    const [cases, prjs] = await Promise.all([fetch("/api/test-cases").then((r) => r.json()), fetch("/api/projects").then((r) => r.json())]);
    setItems(cases); setProjects(prjs); if (prjs[0] && !projectId) setProjectId(prjs[0].id);
  }
  useEffect(() => { load(); }, []);

  async function createCase() {
    if (!title.trim()) return toast.error("Title required");
    await fetch("/api/test-cases", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, projectId, steps: [{ action: "Open app", expectedResult: "App opens" }] }) });
    setTitle(""); toast.success("Test case created"); load();
  }

  async function duplicate(id: string) { await fetch(`/api/test-cases/${id}`, { method: "POST" }); toast.success("Test case duplicated"); load(); }
  async function execute(id: string, executionStatus: string) {
    const evidenceUrl = prompt("Optional evidence URL (screenshot/video link):") || "";
    await fetch(`/api/test-cases/${id}/execute`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ executionStatus, actualResult: executionStatus, comments: "Updated from UI", evidenceUrl }) });
    toast.success(`Execution set to ${executionStatus}`); load();
  }
  async function bulkUpdate(newStatus: string) {
    if (selected.length === 0) return toast.error("Select at least one case");
    await fetch("/api/test-cases", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids: selected, executionStatus: newStatus }) });
    toast.success("Bulk status updated"); setSelected([]); load();
  }

  const filtered = useMemo(() => items.filter((tc) =>
    `${tc.testCaseId} ${tc.title}`.toLowerCase().includes(query.toLowerCase()) &&
    (priority === "ALL" || tc.priority === priority) &&
    (status === "ALL" || tc.executionStatus === status)
  ), [items, query, priority, status]);

  return <div className="space-y-4"><AppHeader title="Test Cases" /><div className="flex flex-wrap gap-2"><input className="rounded border px-3 py-2" placeholder="Test case title" value={title} onChange={(e) => setTitle(e.target.value)} /><select className="rounded border px-3 py-2" value={projectId} onChange={(e) => setProjectId(e.target.value)}>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><button className="rounded bg-slate-900 px-3 py-2 text-white" onClick={createCase}>Create</button><a className="rounded border px-3 py-2" href="/api/test-cases/export">Export CSV</a></div><div className="flex flex-wrap gap-2"><input className="rounded border px-3 py-2" placeholder="Search ID/title" value={query} onChange={(e) => setQuery(e.target.value)} /><select className="rounded border px-3 py-2" value={priority} onChange={(e) => setPriority(e.target.value)}><option value="ALL">All Priority</option><option>LOW</option><option>MEDIUM</option><option>HIGH</option><option>CRITICAL</option></select><select className="rounded border px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value)}><option value="ALL">All Execution</option><option>NOT_RUN</option><option>PASSED</option><option>FAILED</option><option>BLOCKED</option><option>SKIPPED</option></select><button className="rounded border px-3 py-2" onClick={() => bulkUpdate("PASSED")}>Bulk → Passed</button><button className="rounded border px-3 py-2" onClick={() => bulkUpdate("FAILED")}>Bulk → Failed</button></div><div className="space-y-2">{filtered.length===0?<div className="rounded border p-5 text-sm text-slate-500">No test cases match your filter.</div>:filtered.map(tc => <div key={tc.id} className="rounded border p-3"><div className="mb-2 flex items-center justify-between gap-2"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={selected.includes(tc.id)} onChange={(e)=>setSelected((prev)=>e.target.checked?[...prev,tc.id]:prev.filter(x=>x!==tc.id))} />{tc.testCaseId} · {tc.title}</label><div className="flex gap-1"><button className="rounded border px-2 py-1 text-xs" onClick={()=>duplicate(tc.id)}>Duplicate</button><button className="rounded border px-2 py-1 text-xs" onClick={()=>execute(tc.id,"PASSED")}>Pass</button><button className="rounded border px-2 py-1 text-xs" onClick={()=>execute(tc.id,"FAILED")}>Fail</button><button className="rounded border px-2 py-1 text-xs" onClick={()=>execute(tc.id,"BLOCKED")}>Block</button></div></div><div className="text-sm text-slate-500">{tc.priority} · {tc.status} · {tc.executionStatus}</div></div>)}</div></div>;
}
