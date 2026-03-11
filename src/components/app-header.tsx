import { ThemeToggle } from "@/components/theme-toggle";

export function AppHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">SprintSynergy</p>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      <ThemeToggle />
    </div>
  );
}
