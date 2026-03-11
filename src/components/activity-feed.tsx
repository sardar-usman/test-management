"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

type Activity = { id: string; type: string; message: string; actor: string; createdAt: string };

export function ActivityFeed() {
  const [logs, setLogs] = useState<Activity[]>([]);

  useEffect(() => {
    fetch("/api/activity").then((r) => r.json()).then(setLogs);
  }, []);

  return (
    <Card>
      <h3 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Recent Activity</h3>
      <div className="space-y-2 text-sm">
        {logs.length === 0 ? (
          <p className="text-slate-500">No recent activity.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
              <div className="font-medium">{log.message}</div>
              <div className="text-xs text-slate-500">
                {log.type} · {log.actor} · {new Date(log.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
