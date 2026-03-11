import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.project.count();
  if (existing > 0) return;

  const project = await prisma.project.create({
    data: {
      name: "SprintSynergy Demo Project",
      description: "Sample project for quick onboarding",
      status: "ACTIVE",
      createdBy: "link2muhammadusman@gmail.com",
    },
  });

  const tc1 = await prisma.testCase.create({
    data: {
      projectId: project.id,
      testCaseId: "TC-001",
      title: "Login with valid credentials",
      summary: "User can log in with valid credentials",
      priority: "HIGH",
      status: "READY",
      executionStatus: "NOT_RUN",
      createdBy: "team@sprintsynergy.com",
      tags: ["auth", "smoke"],
      steps: {
        create: [
          { stepNo: 1, action: "Open login page", expectedResult: "Login page is displayed" },
          { stepNo: 2, action: "Enter valid email/password and click Sign In", expectedResult: "User lands on dashboard" }
        ]
      }
    }
  });

  await prisma.testPlan.create({
    data: {
      projectId: project.id,
      title: "Authentication Regression",
      description: "Covers login flow",
      status: "ACTIVE",
      priority: "HIGH",
      links: { create: [{ testCaseId: tc1.id }] }
    }
  });

  await prisma.activityLog.createMany({
    data: [
      { type: "PROJECT_CREATED", message: "Demo project created", actor: "system" },
      { type: "TEST_CASE_CREATED", message: "TC-001 created", actor: "system" }
    ]
  });
}

main().finally(async () => prisma.$disconnect());
