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
      <h3 className="mb-3 text-base font-semibold text-[var(--text)]">Recent Activity</h3>
      <div className="space-y-2 text-sm">
        {logs.length === 0 ? (
          <p className="muted-text">No recent activity.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
              <div className="font-medium text-[var(--text)]">{log.message}</div>
              <div className="text-xs muted-text">
                {log.type} · {log.actor} · {new Date(log.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
