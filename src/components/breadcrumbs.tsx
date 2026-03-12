import Link from "next/link";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="mb-2 flex items-center gap-1 text-sm subtle-text">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {item.href ? (
            <Link className="rounded px-1.5 py-0.5 hover:bg-[var(--surface-2)]" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[var(--text)]">{item.label}</span>
          )}
          {i < items.length - 1 ? <span>/</span> : ""}
        </span>
      ))}
    </nav>
  );
}
