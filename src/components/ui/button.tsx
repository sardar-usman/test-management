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
    primary: "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white",
    secondary: "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
    outline: "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
    create: "bg-blue-600 text-white hover:bg-blue-500",
    pass: "bg-green-600 text-white hover:bg-green-500",
    fail: "bg-red-600 text-white hover:bg-red-500",
    blocked: "bg-amber-500 text-white hover:bg-amber-400",
    skipped: "bg-yellow-400 text-zinc-900 hover:bg-yellow-300",
    pending: "bg-zinc-400 text-white hover:bg-zinc-500",
    progress: "bg-blue-500 text-white hover:bg-blue-400",
    draft: "border border-zinc-400 bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200",
    duplicate: "bg-violet-500 text-white hover:bg-violet-400",
    delete: "border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300",
    edit: "border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
  };

  return <button className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${styles[variant]} ${className}`} {...props} />;
}
