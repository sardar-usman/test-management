"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";

const COLORS = ["#22c55e", "#6366f1", "#f59e0b", "#ef4444", "#06b6d4"];

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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="h-80">
        <h3 className="mb-1 text-base font-semibold text-[var(--text)]">Execution Status Distribution</h3>
        <p className="mb-3 text-sm muted-text">Overall execution outcomes</p>
        <ResponsiveContainer width="100%" height="78%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={95} innerRadius={45}>
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="h-80">
        <h3 className="mb-1 text-base font-semibold text-[var(--text)]">Test Case Workflow Status</h3>
        <p className="mb-3 text-sm muted-text">Draft, in progress, and ready mix</p>
        <ResponsiveContainer width="100%" height="78%">
          <BarChart data={barData}>
            <CartesianGrid stroke="#f4f4f5" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
