import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const original = await db.dashboard.findFirst({
      where: { id: params.id, userId: session.user.id },
      include: { widgets: true },
    });

    if (!original) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const copy = await db.$transaction(async (tx) => {
      const newDashboard = await tx.dashboard.create({
        data: {
          name: `${original.name} (Copy)`,
          description: original.description,
          companyId: original.companyId,
          userId: session.user.id,
        },
      });

      if (original.widgets.length > 0) {
        await tx.widget.createMany({
          data: original.widgets.map((w) => ({
            dashboardId: newDashboard.id,
            type: w.type,
            title: w.title,
            description: w.description,
            config: w.config as object,
            position: w.position as object,
          })),
        });
      }

      return newDashboard;
    });

    return NextResponse.json(copy, { status: 201 });
  } catch (err) {
    console.error("POST /api/dashboards/[id]/duplicate", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
