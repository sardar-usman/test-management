import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 ${className}`}
      {...props}
    />
  );
}
