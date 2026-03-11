import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(projects);
}

const ProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "COMPLETED", "ON_HOLD"]).optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const parsed = ProjectSchema.safeParse(await req.json());
  if (!parsed.success) return new Response("Invalid payload", { status: 400 });
  const body = parsed.data;
  const created = await prisma.project.create({
    data: {
      name: body.name,
      description: body.description,
      status: body.status || "ACTIVE",
      createdBy: session.user.email || "unknown",
    },
  });
  await prisma.activityLog.create({
    data: {
      type: "PROJECT_CREATED",
      message: `Project ${created.name} created`,
      actor: session.user.email || "unknown",
    },
  });
  return Response.json(created);
}
