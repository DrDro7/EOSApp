import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

const createWidgetSchema = z.object({
  dashboardId: z.string().cuid(),
  type: z.enum(["KPI_CARD", "LINE_CHART", "BAR_CHART", "PIE_CHART", "TABLE"]),
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  config: z.record(z.unknown()),
  position: z.object({
    x: z.number().int().min(0),
    y: z.number().int().min(0),
    w: z.number().int().min(1).max(12),
    h: z.number().int().min(1).max(6),
  }),
});

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const dashboardId = searchParams.get("dashboardId");
    if (!dashboardId) return NextResponse.json({ error: "dashboardId required" }, { status: 400 });

    const dashboard = await db.dashboard.findFirst({
      where: { id: dashboardId, userId: session.user.id },
    });
    if (!dashboard) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const widgets = await db.widget.findMany({
      where: { dashboardId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(widgets);
  } catch (err) {
    console.error("GET /api/widgets", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = createWidgetSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const dashboard = await db.dashboard.findFirst({
      where: { id: parsed.data.dashboardId, userId: session.user.id },
    });
    if (!dashboard) return NextResponse.json({ error: "Dashboard not found" }, { status: 404 });

    const { config, position, ...rest } = parsed.data;
    const widget = await db.widget.create({
      data: { ...rest, config: config as object, position: position as object },
    });
    return NextResponse.json(widget, { status: 201 });
  } catch (err) {
    console.error("POST /api/widgets", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
