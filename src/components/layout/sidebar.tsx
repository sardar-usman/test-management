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
    <aside className="w-64 border-r border-slate-200/70 bg-white/70 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-600 px-4 py-5 text-white shadow-lg dark:from-zinc-700 dark:to-zinc-500">
        <p className="text-xs uppercase tracking-wider text-zinc-200">QA Workspace</p>
        <h1 className="mt-1 text-xl font-bold">SprintSynergy</h1>
      </div>

      <nav className="space-y-1.5">
        {nav.map(([href, label]) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {label}
            </Link>
          );
        })}

        {isAdmin && (
          <Link
            href="/settings"
            className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              pathname.startsWith("/settings")
                ? "bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            Settings
          </Link>
        )}
      </nav>
    </aside>
  );
}
