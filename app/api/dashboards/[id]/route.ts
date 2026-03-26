import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

const updateDashboardSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  companyId: z.string().cuid().optional().nullable(),
});

async function getOwnedDashboard(id: string, userId: string) {
  return db.dashboard.findFirst({ where: { id, userId } });
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dashboard = await db.dashboard.findFirst({
      where: { id: params.id, userId: session.user.id },
      include: {
        company: { select: { id: true, name: true } },
        widgets: { orderBy: { createdAt: "asc" } },
        _count: { select: { widgets: true } },
      },
    });

    if (!dashboard) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(dashboard);
  } catch (err) {
    console.error("GET /api/dashboards/[id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const existing = await getOwnedDashboard(params.id, session.user.id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const parsed = updateDashboardSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const updated = await db.dashboard.update({
      where: { id: params.id },
      data: parsed.data,
      include: { company: { select: { id: true, name: true } } },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/dashboards/[id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const existing = await getOwnedDashboard(params.id, session.user.id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await db.dashboard.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/dashboards/[id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
