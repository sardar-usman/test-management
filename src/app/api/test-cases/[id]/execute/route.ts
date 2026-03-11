import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const execution = await prisma.testExecution.create({
    data: {
      testCaseId: id,
      executionStatus: body.executionStatus,
      actualResult: body.actualResult,
      comments: body.comments,
      evidenceUrl: body.evidenceUrl,
      executedBy: body.executedBy || "team@sprintsynergy.com",
    },
  });
  await prisma.testCase.update({ where: { id }, data: { executionStatus: body.executionStatus } });
  await prisma.activityLog.create({ data: { type: "TEST_EXECUTED", message: `Test case executed as ${body.executionStatus}`, actor: body.executedBy || "team@sprintsynergy.com" } });
  return Response.json(execution);
}
