import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "EOS — Entrepreneur Operating System",
  description:
    "Centralized KPI dashboard and operating system for entrepreneurs and teams.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pass the server session to SessionProvider to avoid a client-side flash
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers session={session}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
