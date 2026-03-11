import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";

export default async function ReportsPage() {
  const projects = await prisma.project.findMany({ include: { testCases: true } });

  return (
    <div className="space-y-4">
      <AppHeader title="Project Reports" />
      <div className="grid gap-3">
        {projects.map((p) => {
          const total = p.testCases.length;
          const passed = p.testCases.filter((t) => t.executionStatus === "PASSED").length;
          const failed = p.testCases.filter((t) => t.executionStatus === "FAILED").length;
          const blocked = p.testCases.filter((t) => t.executionStatus === "BLOCKED").length;
          return (
            <div key={p.id} className="rounded border p-4">
              <div className="text-lg font-semibold">{p.name}</div>
              <div className="mt-1 text-sm text-slate-500">Total: {total} · Passed: {passed} · Failed: {failed} · Blocked: {blocked}</div>
              <div className="mt-2 text-sm">Pass Rate: {total ? Math.round((passed / total) * 100) : 0}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
