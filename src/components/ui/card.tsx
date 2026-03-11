import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors duration-150 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 ${className}`}
      {...props}
    />
  );
}
