import { ThemeToggle } from "@/components/theme-toggle";

export function AppHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <ThemeToggle />
    </div>
  );
}
