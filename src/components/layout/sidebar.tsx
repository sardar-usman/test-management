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
    <aside className="w-64 border-r border-[var(--border)] bg-white p-4 dark:bg-[#111827]">
      <div className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-5 dark:bg-[#1E293B]">
        <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Workspace</p>
        <h1 className="mt-1 text-xl font-bold text-[var(--text)]">SprintSynergy</h1>
        <p className="text-xs text-[var(--text-muted)]">QA Platform</p>
      </div>

      <p className="mb-2 px-2 text-xs uppercase tracking-wide text-[var(--text-muted)]">Overview</p>
      <nav className="space-y-1.5">
        {nav.map(([href, label]) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={`block rounded-lg border-l-2 px-3 py-2.5 text-sm transition-colors duration-150 ${active ? "border-indigo-600 bg-indigo-50 font-semibold text-indigo-600 dark:border-indigo-400 dark:bg-[#1E1B4B] dark:text-indigo-400" : "border-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-2)]"}`}>
              {label}
            </Link>
          );
        })}
        {isAdmin && <Link href="/settings" className={`block rounded-lg border-l-2 px-3 py-2.5 text-sm transition-colors duration-150 ${pathname.startsWith("/settings") ? "border-indigo-600 bg-indigo-50 font-semibold text-indigo-600 dark:border-indigo-400 dark:bg-[#1E1B4B] dark:text-indigo-400" : "border-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-2)]"}`}>Settings</Link>}
      </nav>
    </aside>
  );
}
