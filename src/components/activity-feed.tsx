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
      <h3 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-100">Recent Activity</h3>
      <div className="space-y-2 text-sm">
        {logs.length === 0 ? (
          <p className="text-zinc-500">No recent activity.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="font-medium text-zinc-900 dark:text-zinc-100">{log.message}</div>
              <div className="text-xs text-zinc-400">
                {log.type} · {log.actor} · {new Date(log.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
