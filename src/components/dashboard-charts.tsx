"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const COLORS = ["#16a34a", "#dc2626", "#eab308", "#0284c7", "#6b7280"];

export function DashboardCharts() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <div className="rounded border p-4">Loading dashboard charts...</div>;

  const pieData = Object.entries(data.byExecution).map(([name, value]) => ({ name, value }));
  const barData = Object.entries(data.byStatus).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="h-72 rounded border p-4">
        <h3 className="mb-2 font-semibold">Execution Status Distribution</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90}>
              {pieData.map((_: any, index: number) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="h-72 rounded border p-4">
        <h3 className="mb-2 font-semibold">Test Case Workflow Status</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#334155" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
