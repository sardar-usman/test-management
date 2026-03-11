import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";
import { Card } from "@/components/ui/card";

export default async function ReportsPage() {
  const projects = await prisma.project.findMany({ include: { testCases: true } });

  return (
    <div className="space-y-5">
      <AppHeader title="Project Reports" />
      <div className="grid gap-3 md:grid-cols-2">
        {projects.map((p) => {
          const total = p.testCases.length;
          const passed = p.testCases.filter((t) => t.executionStatus === "PASSED").length;
          const failed = p.testCases.filter((t) => t.executionStatus === "FAILED").length;
          const blocked = p.testCases.filter((t) => t.executionStatus === "BLOCKED").length;
          const passRate = total ? Math.round((passed / total) * 100) : 0;

          return (
            <Card key={p.id}>
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                Total: {total} · Passed: {passed} · Failed: {failed} · Blocked: {blocked}
              </p>
              <div className="mt-3 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${passRate}%` }} />
              </div>
              <p className="mt-2 text-sm font-medium">Pass Rate: {passRate}%</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
