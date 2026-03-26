import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const integrations = await db.integration.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
    });

    // Strip tokens before returning to client
    return NextResponse.json(
      integrations.map(({ accessToken: _at, refreshToken: _rt, ...safe }) => safe)
    );
  } catch (err) {
    console.error("GET /api/integrations", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
