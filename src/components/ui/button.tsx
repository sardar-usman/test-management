import type { ButtonHTMLAttributes } from "react";

type Variant = "primary"|"secondary"|"outline"|"pass"|"fail"|"blocked"|"skipped"|"pending"|"progress"|"draft"|"duplicate"|"delete"|"edit"|"create";

export function Button({ variant = "primary", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300",
    outline: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300",
    create: "bg-indigo-600 text-white hover:bg-indigo-700",
    pass: "bg-emerald-600 text-white hover:bg-emerald-700",
    fail: "bg-red-600 text-white hover:bg-red-700",
    blocked: "bg-amber-600 text-white hover:bg-amber-700",
    skipped: "bg-cyan-600 text-white hover:bg-cyan-700",
    pending: "bg-slate-700 text-white hover:bg-slate-800",
    progress: "bg-indigo-600 text-white hover:bg-indigo-700",
    draft: "bg-white border border-slate-400 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300",
    duplicate: "bg-violet-600 text-white hover:bg-violet-700",
    delete: "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900 dark:text-red-400",
    edit: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400",
  };

  return <button className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${styles[variant]} ${className}`} {...props} />;
}
