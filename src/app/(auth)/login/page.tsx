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
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 md:grid md:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-10 text-white md:block">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Test Management Suite</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight">SprintSynergy</h1>
          <p className="mt-4 text-blue-100">
            Manage projects, execute manual test cases, and track QA performance with a modern workflow.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-8 md:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Welcome back</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">Sign in to your workspace</h2>
          </div>

          <div className="space-y-3">
            <input
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-zinc-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-zinc-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/30">{error}</p>}

          <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
