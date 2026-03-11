import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card } from "@/components/ui/card";

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id }, include: { testPlans: true, testCases: true } });
  if (!project) return <div>Project not found.</div>;

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ href: "/projects", label: "Projects" }, { label: project.name }]} />
      <AppHeader title={project.name} />

      <Card>
        <p className="text-sm text-slate-500">Description</p>
        <p className="mt-2">{project.description || "No description yet."}</p>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <p className="text-sm text-slate-500">Test Plans</p>
          <p className="mt-2 text-3xl font-bold">{project.testPlans.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Test Cases</p>
          <p className="mt-2 text-3xl font-bold">{project.testCases.length}</p>
        </Card>
      </div>
    </div>
  );
}
