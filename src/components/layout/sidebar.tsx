"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  ["/dashboard", "Dashboard"],
  ["/projects", "Projects"],
  ["/test-plans", "Test Plans"],
  ["/test-cases", "Test Cases"],
  ["/reports", "Reports"],
] as const;

export function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-8 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-5 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-xs uppercase tracking-wide text-zinc-400">Workspace</p>
        <h1 className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">SprintSynergy</h1>
        <p className="text-xs text-zinc-400">QA Platform</p>
      </div>

      <p className="mb-2 px-2 text-xs uppercase tracking-wide text-zinc-400">Overview</p>
      <nav className="space-y-1.5">
        {nav.map(([href, label]) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`block rounded-lg border-l-2 px-3 py-2.5 text-sm transition-colors duration-150 ${
                active
                  ? "border-zinc-900 bg-zinc-100 font-semibold text-zinc-900 dark:border-zinc-100 dark:bg-zinc-800 dark:text-zinc-100"
                  : "border-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {label}
            </Link>
          );
        })}

        {isAdmin && (
          <Link
            href="/settings"
            className={`block rounded-lg border-l-2 px-3 py-2.5 text-sm transition-colors duration-150 ${
              pathname.startsWith("/settings")
                ? "border-zinc-900 bg-zinc-100 font-semibold text-zinc-900 dark:border-zinc-100 dark:bg-zinc-800 dark:text-zinc-100"
                : "border-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            Settings
          </Link>
        )}
      </nav>

      <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="font-medium text-zinc-900 dark:text-zinc-100">Osman</p>
        <p className="text-xs text-zinc-400">Owner</p>
      </div>
    </aside>
  );
}
