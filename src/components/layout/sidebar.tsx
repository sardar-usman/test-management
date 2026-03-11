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
    <aside className="w-60 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="mb-6 text-xl font-bold">SprintSynergy</h1>
      <nav className="space-y-1">
        {nav.map(([href, label]) => (
          <Link key={href} href={href} className={`block rounded px-3 py-2 text-sm ${pathname.startsWith(href) ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
            {label}
          </Link>
        ))}
        {isAdmin && <Link href="/settings" className="block rounded px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Settings</Link>}
      </nav>
    </aside>
  );
}
