import Link from "next/link";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="mb-4 text-sm text-slate-500">
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? <Link className="hover:underline" href={item.href}>{item.label}</Link> : item.label}
          {i < items.length - 1 ? " / " : ""}
        </span>
      ))}
    </nav>
  );
}
