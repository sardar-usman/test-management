import { prisma } from "@/lib/prisma";

export async function GET() {
  const logs = await prisma.activityLog.findMany({ orderBy: { createdAt: "desc" }, take: 30 });
  return Response.json(logs);
}
