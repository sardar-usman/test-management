import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 ${className}`}
      {...props}
    />
  );
}
