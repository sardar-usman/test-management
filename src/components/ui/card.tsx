import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border p-6 shadow-sm transition-colors duration-150 border-[var(--border)] bg-[var(--surface)] ${className}`}
      {...props}
    />
  );
}
