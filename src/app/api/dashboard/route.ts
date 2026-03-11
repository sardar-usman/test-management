import { prisma } from "@/lib/prisma";

export async function GET() {
  const [projectsCount, testCases] = await Promise.all([
    prisma.project.count(),
    prisma.testCase.findMany({ select: { executionStatus: true, status: true } }),
  ]);

  const byExecution = { PASSED: 0, FAILED: 0, BLOCKED: 0, SKIPPED: 0, NOT_RUN: 0 } as Record<string, number>;
  const byStatus = { DRAFT: 0, READY: 0, IN_PROGRESS: 0 } as Record<string, number>;

  for (const tc of testCases) {
    byExecution[tc.executionStatus] = (byExecution[tc.executionStatus] || 0) + 1;
    byStatus[tc.status] = (byStatus[tc.status] || 0) + 1;
  }

  const total = testCases.length || 1;
  const passRate = Math.round(((byExecution.PASSED || 0) / total) * 100);

  return Response.json({ projectsCount, totalCases: testCases.length, byExecution, byStatus, passRate });
}
