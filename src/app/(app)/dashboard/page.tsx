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
    <div className="space-y-6">
      <AppHeader title="Overview Dashboard" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <p className="text-sm subtle-text">Total Projects</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--text)]">{projects}</p>
          <p className="mt-2 text-xs muted-text">vs last month</p>
        </Card>
        <Card>
          <p className="text-sm subtle-text">Total Test Cases</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--text)]">{totalCases}</p>
          <p className="mt-2 text-xs muted-text">vs last month</p>
        </Card>
        <Card>
          <p className="text-sm subtle-text">Total Test Plans</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--text)]">{totalPlans}</p>
          <p className="mt-2 text-xs muted-text">vs last month</p>
        </Card>
      </div>

      <DashboardCharts />
      <ActivityFeed />
    </div>
  );
}
