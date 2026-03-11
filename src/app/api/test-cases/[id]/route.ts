import { prisma } from "@/lib/prisma";

async function nextTestCaseId() {
  const count = await prisma.testCase.count();
  return `TC-${String(count + 1).padStart(3, "0")}`;
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.testCase.findUnique({ where: { id }, include: { steps: true, executions: true } });
  return Response.json(item);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const updated = await prisma.testCase.update({ where: { id }, data: body });
  return Response.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.testCase.delete({ where: { id } });
  return Response.json({ ok: true });
}

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const original = await prisma.testCase.findUnique({ where: { id }, include: { steps: true } });
  if (!original) return new Response("Not Found", { status: 404 });

  const copyId = await nextTestCaseId();
  const copy = await prisma.testCase.create({
    data: {
      projectId: original.projectId,
      testCaseId: copyId,
      title: `${original.title} (Copy)`,
      summary: original.summary,
      preconditions: original.preconditions,
      priority: original.priority,
      status: original.status,
      executionStatus: "NOT_RUN",
      assignedTo: original.assignedTo,
      tags: original.tags,
      createdBy: original.createdBy,
      steps: { create: original.steps.map((s) => ({ stepNo: s.stepNo, action: s.action, expectedResult: s.expectedResult })) },
    },
  });

  return Response.json(copy);
}
