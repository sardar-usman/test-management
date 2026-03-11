import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id }, include: { testPlans: true, testCases: true } });
  if (!project) return <div>Project not found.</div>;

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ href: "/projects", label: "Projects" }, { label: project.name }]} />
      <AppHeader title={project.name} />
      <p className="text-slate-600">{project.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded border p-4">Test Plans: {project.testPlans.length}</div>
        <div className="rounded border p-4">Test Cases: {project.testCases.length}</div>
      </div>
    </div>
  );
}
