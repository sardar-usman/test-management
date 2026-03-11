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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-6 dark:bg-zinc-950">
      <div className="w-full max-w-5xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900 md:grid md:grid-cols-2">
        <div className="hidden bg-zinc-900 p-10 text-zinc-100 md:block">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-300">Test Management Suite</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight">SprintSynergy</h1>
          <p className="mt-4 text-zinc-300">
            Manage projects, execute manual test cases, and track QA performance in one clean workspace.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-8 md:p-10 text-zinc-900 dark:text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">Welcome back</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Sign in to your workspace</h2>
          </div>

          <div className="space-y-3">
            <input
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-zinc-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none ring-zinc-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="rounded-lg bg-rose-600 px-3 py-2 text-sm text-white">{error}</p>}

          <button className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
