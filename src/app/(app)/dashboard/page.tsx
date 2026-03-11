import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { AppHeader } from "@/components/app-header";
import { DashboardCharts } from "@/components/dashboard-charts";
import { ActivityFeed } from "@/components/activity-feed";

export default async function DashboardPage() {
  const [projects, totalCases, totalPlans] = await Promise.all([
    prisma.project.count(),
    prisma.testCase.count(),
    prisma.testPlan.count(),
  ]);

  return (
    <div className="space-y-5 bg-zinc-50 dark:bg-zinc-900">
      <AppHeader title="Overview Dashboard" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">Total Projects</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{projects}</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">Total Test Cases</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{totalCases}</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">Total Test Plans</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{totalPlans}</p>
        </Card>
      </div>

      <DashboardCharts />
      <ActivityFeed />
    </div>
  );
}
