import { prisma } from "@/lib/prisma";

export async function GET() {
  const plans = await prisma.testPlan.findMany({ include: { links: true, project: true }, orderBy: { createdAt: "desc" } });
  return Response.json(plans);
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await prisma.testPlan.create({
    data: {
      projectId: body.projectId,
      title: body.title,
      description: body.description,
      status: body.status || "DRAFT",
      priority: body.priority || "MEDIUM",
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      links: body.testCaseIds?.length ? { create: body.testCaseIds.map((id: string) => ({ testCaseId: id })) } : undefined,
    },
  });
  await prisma.activityLog.create({ data: { type: "TEST_PLAN_CREATED", message: `Test plan ${created.title} created`, actor: "system" } });
  return Response.json(created);
}
