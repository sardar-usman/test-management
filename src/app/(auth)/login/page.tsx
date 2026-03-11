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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-[#0C1120]">
      <div className="w-full max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 md:grid md:grid-cols-2">
        <div className="hidden bg-slate-100 p-10 text-slate-900 dark:bg-slate-900 dark:text-slate-100 md:block">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Test Management Suite</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight">SprintSynergy</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Manage projects, manual test cases, execution, and reports in one clean workspace.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-8 md:p-10 text-slate-900 dark:text-slate-100">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Welcome back</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">Sign in to your workspace</h2>
          </div>

          <div className="space-y-3">
            <input className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-indigo-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-indigo-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900 dark:text-red-300">{error}</p>}

          <button className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Sign In</button>
        </form>
      </div>
    </div>
  );
}
