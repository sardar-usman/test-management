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
            "!rounded-xl !border !border-[var(--border)] !bg-[var(--surface)] !text-[var(--text)]",
        }}
      />
    </SessionProvider>
  );
}
