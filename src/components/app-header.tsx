import { ThemeToggle } from "@/components/theme-toggle";

export function AppHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-300">Clean, minimal QA workflow dashboard</p>
      </div>
      <ThemeToggle />
    </div>
  );
}
