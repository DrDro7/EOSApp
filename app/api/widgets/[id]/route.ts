import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

const updateWidgetSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  config: z.record(z.unknown()).optional(),
  position: z
    .object({
      x: z.number().int().min(0),
      y: z.number().int().min(0),
      w: z.number().int().min(1).max(12),
      h: z.number().int().min(1).max(6),
    })
    .optional(),
});

async function getOwnedWidget(widgetId: string, userId: string) {
  const widget = await db.widget.findUnique({ where: { id: widgetId } });
  if (!widget) return null;
  const dashboard = await db.dashboard.findFirst({ where: { id: widget.dashboardId, userId } });
  return dashboard ? widget : null;
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const widget = await getOwnedWidget(params.id, session.user.id);
    if (!widget) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const parsed = updateWidgetSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const updated = await db.widget.update({ where: { id: params.id }, data: parsed.data });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/widgets/[id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const widget = await getOwnedWidget(params.id, session.user.id);
    if (!widget) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await db.widget.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/widgets/[id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
