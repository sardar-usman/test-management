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
    primary: "bg-zinc-900 text-white hover:bg-zinc-800",
    secondary: "bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-50",
    outline: "border border-zinc-800 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800",
    create: "bg-emerald-600 text-white hover:bg-emerald-700",
    pass: "bg-emerald-600 text-white hover:bg-emerald-700",
    fail: "bg-rose-600 text-white hover:bg-rose-700",
    blocked: "bg-amber-600 text-white hover:bg-amber-700",
    skipped: "bg-teal-600 text-white hover:bg-teal-700",
    pending: "bg-zinc-700 text-white hover:bg-zinc-800",
    progress: "bg-indigo-600 text-white hover:bg-indigo-700",
    draft: "border border-zinc-800 bg-white text-zinc-800 hover:bg-zinc-50",
    duplicate: "bg-violet-600 text-white hover:bg-violet-700",
    delete: "border border-rose-600 bg-white text-rose-600 hover:bg-rose-50",
    edit: "border border-indigo-600 bg-white text-indigo-600 hover:bg-indigo-50",
  };

  return <button className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${styles[variant]} ${className}`} {...props} />;
}
