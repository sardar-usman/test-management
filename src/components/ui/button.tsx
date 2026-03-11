import type { ButtonHTMLAttributes } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "pass"
  | "fail"
  | "blocked"
  | "skipped"
  | "pending"
  | "progress"
  | "draft"
  | "duplicate"
  | "delete"
  | "edit"
  | "create";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary: "bg-zinc-700 text-white hover:bg-zinc-600",
    secondary: "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
    outline: "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
    create: "bg-zinc-700 text-white hover:bg-zinc-600",
    pass: "bg-emerald-600 text-white hover:bg-emerald-700",
    fail: "bg-rose-600 text-white hover:bg-rose-700",
    blocked: "bg-amber-600 text-white hover:bg-amber-700",
    skipped: "bg-teal-600 text-white hover:bg-teal-700",
    pending: "bg-zinc-700 text-white hover:bg-zinc-800",
    progress: "bg-indigo-600 text-white hover:bg-indigo-700",
    draft: "border border-zinc-400 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
    duplicate: "bg-violet-600 text-white hover:bg-violet-700",
    delete: "border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/50",
    edit: "border border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:border-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/50",
  };

  return <button className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${styles[variant]} ${className}`} {...props} />;
}
