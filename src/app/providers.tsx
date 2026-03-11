"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        richColors
        closeButton
        position="top-right"
        toastOptions={{
          className:
            "!rounded-xl !border !border-zinc-200 !bg-white !text-zinc-900 dark:!border-zinc-800 dark:!bg-zinc-900 dark:!text-zinc-100",
        }}
      />
    </SessionProvider>
  );
}
