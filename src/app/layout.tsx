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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const t = localStorage.getItem('theme'); if (t === 'dark') document.documentElement.classList.add('dark'); } catch(e){} })();`,
          }}
        />
      </head>
      <body className="transition-colors duration-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
