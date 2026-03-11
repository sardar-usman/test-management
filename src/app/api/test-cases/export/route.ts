import { prisma } from "@/lib/prisma";

function escapeCsv(v: string) {
  return `"${(v || "").replace(/"/g, '""')}"`;
}

export async function GET() {
  const rows = await prisma.testCase.findMany({ include: { project: true } });
  const header = ["testCaseId", "title", "priority", "status", "executionStatus", "assignedTo", "projectName"];
  const body = rows.map((r) => [
    escapeCsv(r.testCaseId),
    escapeCsv(r.title),
    escapeCsv(r.priority),
    escapeCsv(r.status),
    escapeCsv(r.executionStatus),
    escapeCsv(r.assignedTo || ""),
    escapeCsv(r.project?.name || ""),
  ].join(","));

  const csv = `${header.join(",")}\n${body.join("\n")}`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="test-cases.csv"',
    },
  });
}
