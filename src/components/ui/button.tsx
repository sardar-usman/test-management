import type { ButtonHTMLAttributes } from "react";

type Variant = "primary"|"secondary"|"outline"|"pass"|"fail"|"blocked"|"skipped"|"pending"|"progress"|"draft"|"duplicate"|"delete"|"edit"|"create";

export function Button({ variant = "primary", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary: "text-white [background:var(--accent)] hover:[background:var(--accent-hover)]",
    secondary: "border [border-color:var(--border)] [background:var(--surface)] [color:var(--text-body)] hover:[background:var(--surface-2)]",
    outline: "border [border-color:var(--border)] [background:var(--surface)] [color:var(--text-body)] hover:[background:var(--surface-2)]",
    create: "text-white [background:var(--accent)] hover:[background:var(--accent-hover)]",
    pass: "text-white [background:var(--success)] hover:brightness-110",
    fail: "text-white [background:var(--danger)] hover:brightness-110",
    blocked: "text-white [background:var(--warning)] hover:brightness-110",
    skipped: "text-white [background:var(--info)] hover:brightness-110",
    pending: "text-white [background:var(--text-secondary)] hover:brightness-110",
    progress: "text-white [background:var(--accent)] hover:[background:var(--accent-hover)]",
    draft: "border [border-color:var(--border)] [background:var(--surface)] [color:var(--text-body)] hover:[background:var(--surface-2)]",
    duplicate: "text-white bg-violet-600 hover:bg-violet-700",
    delete: "[background:var(--danger-soft)] [color:var(--danger)] hover:brightness-95",
    edit: "[background:var(--accent-soft)] [color:var(--accent)] hover:brightness-95",
  };

  return <button className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--ring)] ${styles[variant]} ${className}`} {...props} />;
}
