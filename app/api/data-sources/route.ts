import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sources = await db.dataSource.findMany({
      where: { userId: session.user.id },
      include: { datasets: { select: { id: true, name: true, fields: true } } },
      orderBy: { createdAt: "asc" },
    });

    // Strip sensitive connection config keys (tokens, secrets) before returning
    return NextResponse.json(
      sources.map(({ connectionConfig, ...safe }) => ({
        ...safe,
        connectionConfig: sanitizeConfig(connectionConfig as Record<string, unknown>),
      }))
    );
  } catch (err) {
    console.error("GET /api/data-sources", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** Removes sensitive keys from a connection config before client exposure. */
function sanitizeConfig(config: Record<string, unknown>): Record<string, unknown> {
  const sensitive = ["secretKey", "accessToken", "apiKey", "password"];
  return Object.fromEntries(
    Object.entries(config).filter(([key]) => !sensitive.includes(key))
  );
}
