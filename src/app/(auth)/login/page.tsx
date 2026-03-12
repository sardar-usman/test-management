"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.ok) router.push("/dashboard");
    else setError("Invalid credentials");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm md:grid md:grid-cols-2">
        <div className="hidden [background:var(--surface-2)] p-10 text-[var(--text)] md:block">
          <p className="text-xs uppercase tracking-[0.2em] muted-text">Test Management Suite</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight">SprintSynergy</h1>
          <p className="mt-4 subtle-text">Manage projects, manual test cases, execution, and reports in one clean workspace.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-8 text-[var(--text)] md:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] muted-text">Welcome back</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">Sign in to your workspace</h2>
          </div>

          <div className="space-y-3">
            <input className="input-field w-full py-3" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="input-field w-full py-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && <p className="rounded-lg px-3 py-2 text-sm [background:var(--danger-soft)] [color:var(--danger)]">{error}</p>}

          <button className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-white [background:var(--accent)] hover:[background:var(--accent-hover)]">Sign In</button>
        </form>
      </div>
    </div>
  );
}
