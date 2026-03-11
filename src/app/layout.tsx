import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "SprintSynergy",
  description: "Test Management Tool",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
