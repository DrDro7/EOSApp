import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import type { Session } from "next-auth";

/**
 * Returns the current session. Returns null if unauthenticated.
 * Use in server components and API route handlers.
 */
export async function getAuthSession(): Promise<Session | null> {
  return getServerSession(authOptions);
}

/**
 * Returns the current session, throwing if unauthenticated.
 * Convenience wrapper for API routes that require auth.
 */
export async function requireAuthSession(): Promise<Session> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}
