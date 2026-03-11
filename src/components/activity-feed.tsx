"use client";

import { useEffect, useState } from "react";

type Activity = { id: string; type: string; message: string; actor: string; createdAt: string };

export function ActivityFeed() {
  const [logs, setLogs] = useState<Activity[]>([]);

  useEffect(() => {
    fetch("/api/activity").then((r) => r.json()).then(setLogs);
  }, []);

  return (
    <div className="rounded border p-4">
      <h3 className="mb-3 font-semibold">Recent Activity</h3>
      <div className="space-y-2 text-sm">
        {logs.length === 0 ? <p className="text-slate-500">No recent activity.</p> : logs.map((log) => (
          <div key={log.id} className="rounded border p-2">
            <div className="font-medium">{log.message}</div>
            <div className="text-xs text-slate-500">{log.type} · {log.actor} · {new Date(log.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
