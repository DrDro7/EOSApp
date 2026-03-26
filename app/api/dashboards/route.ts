import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

const createDashboardSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  companyId: z.string().cuid().optional(),
});

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    const dashboards = await db.dashboard.findMany({
      where: { userId: session.user.id, ...(companyId ? { companyId } : {}) },
      include: {
        company: { select: { id: true, name: true } },
        _count: { select: { widgets: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(dashboards);
  } catch (err) {
    console.error("GET /api/dashboards", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = createDashboardSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const dashboard = await db.dashboard.create({
      data: { ...parsed.data, userId: session.user.id },
      include: {
        company: { select: { id: true, name: true } },
        _count: { select: { widgets: true } },
      },
    });

    return NextResponse.json(dashboard, { status: 201 });
  } catch (err) {
    console.error("POST /api/dashboards", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
