import { ThemeToggle } from "@/components/theme-toggle";

export function AppHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-5 py-4 shadow-sm dark:border-zinc-700 dark:bg-black">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">SprintSynergy</p>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h1>
      </div>
      <ThemeToggle />
    </div>
  );
}
