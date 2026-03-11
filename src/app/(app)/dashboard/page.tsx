import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { AppHeader } from "@/components/app-header";
import { DashboardCharts } from "@/components/dashboard-charts";
import { ActivityFeed } from "@/components/activity-feed";

export default async function DashboardPage() {
  const [projects, totalCases] = await Promise.all([prisma.project.count(), prisma.testCase.count()]);

  return (
    <div className="space-y-4">
      <AppHeader title="Overview Dashboard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>Total Projects: {projects}</Card>
        <Card>Total Test Cases: {totalCases}</Card>
        <Card>Real-time execution stats below</Card>
      </div>
      <DashboardCharts />
      <ActivityFeed />
    </div>
  );
}
