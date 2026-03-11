import { prisma } from "@/lib/prisma";
import { z } from "zod";

async function nextTestCaseId() {
  const count = await prisma.testCase.count();
  return `TC-${String(count + 1).padStart(3, "0")}`;
}

export async function GET() {
  const testCases = await prisma.testCase.findMany({ include: { steps: true, project: true }, orderBy: { createdAt: "desc" } });
  return Response.json(testCases);
}

const TestCaseSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().optional(),
  preconditions: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  status: z.enum(["DRAFT", "READY", "IN_PROGRESS"]).optional(),
  assignedTo: z.string().optional(),
  createdBy: z.string().optional(),
  tags: z.array(z.string()).optional(),
  steps: z.array(z.object({ action: z.string(), expectedResult: z.string() })).optional(),
});

export async function POST(req: Request) {
  const parsed = TestCaseSchema.safeParse(await req.json());
  if (!parsed.success) return new Response("Invalid payload", { status: 400 });
  const body = parsed.data;
  const testCaseId = await nextTestCaseId();

  const created = await prisma.testCase.create({
    data: {
      projectId: body.projectId,
      testCaseId,
      title: body.title,
      summary: body.summary,
      preconditions: body.preconditions,
      priority: body.priority || "MEDIUM",
      status: body.status || "DRAFT",
      executionStatus: "NOT_RUN",
      assignedTo: body.assignedTo,
      tags: body.tags || [],
      createdBy: body.createdBy || "team@sprintsynergy.com",
      steps: { create: (body.steps || []).map((s: any, i: number) => ({ stepNo: i + 1, action: s.action, expectedResult: s.expectedResult })) },
    },
    include: { steps: true },
  });

  await prisma.activityLog.create({ data: { type: "TEST_CASE_CREATED", message: `${created.testCaseId} created`, actor: created.createdBy } });

  return Response.json(created);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  await prisma.testCase.updateMany({ where: { id: { in: body.ids } }, data: { status: body.status, executionStatus: body.executionStatus } });
  return Response.json({ ok: true });
}
