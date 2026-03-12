import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/logout-button";

export function AppHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text)]">{title}</h1>
        <p className="text-sm text-[var(--text-secondary)]">Clean, minimal QA workflow dashboard</p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </div>
  );
}
