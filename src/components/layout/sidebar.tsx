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
    <aside className="w-64 border-r border-zinc-800 bg-zinc-900 p-4 text-white">
      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-5">
        <p className="text-xs uppercase tracking-wider text-zinc-300">QA Workspace</p>
        <h1 className="mt-1 text-xl font-bold">SprintSynergy</h1>
      </div>

      <nav className="space-y-1.5">
        {nav.map(([href, label]) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                active ? "bg-white text-zinc-900" : "text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              {label}
            </Link>
          );
        })}

        {isAdmin && (
          <Link
            href="/settings"
            className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
              pathname.startsWith("/settings") ? "bg-white text-zinc-900" : "text-zinc-200 hover:bg-zinc-800"
            }`}
          >
            Settings
          </Link>
        )}
      </nav>
    </aside>
  );
}
