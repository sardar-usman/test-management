"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";

const COLORS = ["#059669", "#e11d48", "#d97706", "#0d9488", "#3f3f46"];

type DashboardData = {
  byExecution: Record<string, number>;
  byStatus: Record<string, number>;
};

export function DashboardCharts() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <Card>Loading dashboard charts...</Card>;

  const pieData = Object.entries(data.byExecution).map(([name, value]) => ({ name, value }));
  const barData = Object.entries(data.byStatus).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="h-80">
        <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Execution Status Distribution</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={95} innerRadius={40}>
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="h-80">
        <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Test Case Workflow Status</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3f3f46" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
